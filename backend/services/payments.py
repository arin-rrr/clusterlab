import os
import uuid
from fastapi import HTTPException
from yookassa import Configuration, Payment as YKPayment
from yookassa.domain.exceptions import BadRequestError

Configuration.account_id = os.getenv("YOOKASSA_SHOP_ID")
Configuration.secret_key = os.getenv("YOOKASSA_SECRET_KEY")

TARIFF_PRICES = {
    "standard": {"amount": 1500.00, "max_area": 100},
    "pro": {"amount": 4500.00, "max_area": 500},
}

# Подставьте свой код НДС (зависит от вашей системы налогообложения):
# 1 — без НДС (УСН), 2 — НДС 20%, 4 — НДС 0%
VAT_CODE = 1


def create_payment(user_id: int, user_email: str, tariff: str):
    if tariff not in TARIFF_PRICES:
        raise ValueError("Неизвестный тариф")

    tariff_info = TARIFF_PRICES[tariff]
    amount = f"{tariff_info['amount']:.2f}"
    frontend_url = os.getenv("FRONTEND_URL", "https://clusterlab.site")

    try:
        payment = YKPayment.create({
            "amount": {
                "value": amount,
                "currency": "RUB"
            },
            "confirmation": {
                "type": "redirect",
                "return_url": f"{frontend_url}/profile"
            },
            "capture": True,
            "description": f"Подписка «{tariff}» — ClusterLab",
            "receipt": {
                "customer": {
                    "email": user_email
                },
                "items": [
                    {
                        "description": f"Подписка «{tariff}» — ClusterLab",
                        "quantity": "1",
                        "amount": {
                            "value": amount,
                            "currency": "RUB"
                        },
                        "vat_code": VAT_CODE,
                        "payment_subject": "service",  # ← добавить
                        "payment_mode": "full_payment"  # ← добавить (обычно тоже требуется)
                    }
                ]
            },
            "metadata": {"user_id": str(user_id), "tariff": tariff},
        }, str(uuid.uuid4()))

    except BadRequestError as e:
        raise HTTPException(status_code=400, detail=f"Ошибка ЮKassa: {e}")

    return payment