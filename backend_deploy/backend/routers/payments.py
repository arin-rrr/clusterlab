from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timedelta

from backend.db_depends import get_async_db
from backend.auth import get_current_user
from backend.models.payment import Payment as PaymentModel
from backend.models.users import User as UserModel
from backend.services.payments import create_payment, TARIFF_PRICES

router = APIRouter(prefix='/payments', tags=['payments'])


@router.post('/create')
async def create_payment_endpoint(
    tariff: str,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_async_db),
):
    if tariff not in TARIFF_PRICES:
        raise HTTPException(400, detail="Неизвестный тариф")

    # передаём email — он нужен для фискального чека (54-ФЗ)
    payment = create_payment(current_user.id, current_user.email, tariff)

    new_payment = PaymentModel(
        user_id=current_user.id,
        tariff=tariff,
        amount=TARIFF_PRICES[tariff]["amount"],
        status="pending",
        provider_payment_id=payment.id,
    )
    db.add(new_payment)
    await db.commit()

    # отдаём confirmation_url, фронтенд редиректит пользователя туда
    return {"confirmation_url": payment.confirmation.confirmation_url}


@router.post('/webhook')
async def payment_webhook(request: Request, db: AsyncSession = Depends(get_async_db)):
    """
    ЮKassa уведомляет нас, когда платёж переходит в 'succeeded'.
    """
    data = await request.json()

    if data.get("event") != "payment.succeeded":
        return {"status": "ignored"}

    payment_obj = data["object"]
    provider_payment_id = payment_obj["id"]

    result = await db.scalars(
        select(PaymentModel).where(PaymentModel.provider_payment_id == provider_payment_id)
    )
    payment_record = result.first()

    if not payment_record:
        return {"status": "unknown payment"}

    if payment_record.status == "succeeded":
        return {"status": "already processed"}  # защита от повторной обработки webhook

    user_id = int(payment_obj["metadata"]["user_id"])
    tariff = payment_obj["metadata"]["tariff"]

    user = await db.get(UserModel, user_id)
    if not user:
        return {"status": "unknown user"}  # если запись платежа есть, а пользователя — нет

    user.tariff = tariff
    user.max_area = TARIFF_PRICES[tariff]["max_area"]
    user.tariff_ends_at = datetime.now() + timedelta(days=30)

    payment_record.status = "succeeded"

    await db.commit()
    return {"status": "ok"}