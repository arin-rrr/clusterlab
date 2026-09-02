from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import asyncio
from datetime import datetime
from decimal import Decimal
from datetime import timezone

from backend.models.fields import Field as FieldModel
from backend.schema import FieldCreate, Field as FieldSchema
from backend.db_depends import get_async_db
from backend.auth import get_current_user
from backend.services.analysis import run_clustering_logic
from backend.database import async_session_maker
from backend.models.analysis_result import AnalysisResult as AnalysisResultModel
from fastapi.responses import HTMLResponse
from backend.services.analysis import (
    run_clustering_logic,
    build_cluster_map_html,
    build_cluster_polygons,
    build_prescription_shapefile,
)
from backend.models.field_recommendation import FieldRecommendation as FieldRecommendationModel
from sqlalchemy import func
from fastapi.responses import StreamingResponse
import io as io_module

CLUSTER_COLORS = ["#FFB800",
  "#FF5722",
  "#00D2C4",
  "#FFFFFF",
  "#E91E63",
  "#29B6F6"]



router = APIRouter(prefix='/fields', tags=['fields'])

@router.get("/{field_id}/status")
async def get_field_status(
    field_id: int,
    db: AsyncSession = Depends(get_async_db)
):
    result = await db.execute(select(FieldModel).where(FieldModel.id == field_id))
    field = result.scalar_one_or_none()
    if not field:
        raise HTTPException(404, detail="Поле не найдено")
    return {"status": field.status}

async def get_used_area(user_id: int, db: AsyncSession) -> Decimal:
    result = await db.execute(
        select(func.coalesce(func.sum(FieldModel.area), 0))
        .where(FieldModel.user_id == user_id, FieldModel.status != "Ошибка")
    )
    return result.scalar()

@router.post('/analyze', response_model=FieldSchema)
async def create_field(
        payload: FieldCreate,
        background_tasks: BackgroundTasks,
        db: AsyncSession = Depends(get_async_db),
        current_user=Depends(get_current_user)
):
    calculated_area_float = ((2*payload.radius) ** 2) / 10000
    calculated_area = Decimal(str(round(calculated_area_float, 2)))

    if datetime.now(timezone.utc) > current_user.tariff_ends_at:
        raise HTTPException(403, detail='Срок подписки завершён')

    # Считаем реально использованную площадь на лету, а не по хранимому счётчику
    used_area = await get_used_area(current_user.id, db)

    if used_area + calculated_area > current_user.max_area:
        raise HTTPException(400, detail='Площадь для анализа закончилась')

    new_field = FieldModel(
        latitude=payload.latitude,
        longitude=payload.longitude,
        radius=payload.radius,
        area=calculated_area,
        culture=payload.culture,
        region=payload.region,
        agrochem=payload.agrochem,
        user_id=current_user.id,
        status="В обработке"
    )

    # Больше НЕ трогаем current_user.current_area — считаем всегда динамически
    db.add(new_field)

    try:
        await db.commit()
        await db.refresh(new_field)
    except Exception as e:
        await db.rollback()
        print(f"ERROR: {e}")
        raise HTTPException(500, detail='Ошибка сохранения в БД')

    background_tasks.add_task(run_clustering_logic, new_field.id, async_session_maker)
    return new_field

@router.get('/my_fields', response_model=list[FieldSchema])
async def get_user_fields(db: AsyncSession = Depends(get_async_db), current_user = Depends(get_current_user)):
    result = await db.scalars(select(FieldModel).where(FieldModel.user_id == current_user.id))
    return result.all()

@router.get("/{field_id}/result")
async def get_field_result(
    field_id: int,
    db: AsyncSession = Depends(get_async_db),
    current_user=Depends(get_current_user)
):
    result = await db.execute(
        select(FieldModel).where(
            FieldModel.id == field_id,
            FieldModel.user_id == current_user.id
        )
    )
    field = result.scalar_one_or_none()
    if not field:
        raise HTTPException(404, detail="Поле не найдено")

    if field.status != "Готово":
        return {"status": field.status, "field": None, "result": None}

    analysis_result = await db.execute(
        select(AnalysisResultModel).where(AnalysisResultModel.field_id == field_id)
    )
    analysis = analysis_result.scalar_one_or_none()

    return {
        "status": field.status,
        "field": {
            "culture": field.culture,
            "region": field.region,
            "area": float(field.area),
            "latitude": float(field.latitude),
            "longitude": float(field.longitude),
            "radius": float(field.radius),
        },
        "result": analysis.cluster_data if analysis else None,
    }

@router.get("/{field_id}/map", response_class=HTMLResponse)
async def get_field_map(
    field_id: int,
    db: AsyncSession = Depends(get_async_db),
    current_user=Depends(get_current_user),
):
    result = await db.execute(
        select(FieldModel).where(FieldModel.id == field_id, FieldModel.user_id == current_user.id)
    )
    field = result.scalar_one_or_none()
    if not field or field.status != "Готово":
        raise HTTPException(404, detail="Карта недоступна")

    analysis_result = await db.execute(
        select(AnalysisResultModel).where(AnalysisResultModel.field_id == field_id)
    )
    analysis = analysis_result.scalar_one_or_none()
    if not analysis:
        raise HTTPException(404, detail="Результат анализа не найден")

    rec_result = await db.execute(
        select(FieldRecommendationModel).where(FieldRecommendationModel.field_id == field_id)
    )
    rec = rec_result.scalar_one_or_none()
    short_recs = rec.short_zone_rec if rec else []

    html = await asyncio.to_thread(
        build_cluster_map_html,
        field.latitude,
        field.longitude,
        field.radius,
        analysis.cluster_data["map_data"],
        CLUSTER_COLORS,
        short_recs,
    )
    return HTMLResponse(content=html)

@router.get("/{field_id}/recommendations")
async def get_field_recommendations(
    field_id: int,
    db: AsyncSession = Depends(get_async_db),
    current_user=Depends(get_current_user),
):
    field_result = await db.execute(
        select(FieldModel).where(FieldModel.id == field_id, FieldModel.user_id == current_user.id)
    )
    if not field_result.scalar_one_or_none():
        raise HTTPException(404, detail="Поле не найдено")

    rec_result = await db.execute(
        select(FieldRecommendationModel).where(FieldRecommendationModel.field_id == field_id)
    )
    rec = rec_result.scalar_one_or_none()
    if not rec:
        raise HTTPException(404, detail="Рекомендации ещё не готовы")

    return {"zones": rec.zones_rec}


@router.get("/{field_id}/export/shapefile")
async def export_shapefile(
    field_id: int,
    db: AsyncSession = Depends(get_async_db),
    current_user=Depends(get_current_user),
):
    field_result = await db.execute(
        select(FieldModel).where(FieldModel.id == field_id, FieldModel.user_id == current_user.id)
    )
    field = field_result.scalar_one_or_none()
    if not field:
        raise HTTPException(404, detail="Поле не найдено")

    analysis_result = await db.execute(
        select(AnalysisResultModel).where(AnalysisResultModel.field_id == field_id)
    )
    analysis = analysis_result.scalar_one_or_none()

    rec_result = await db.execute(
        select(FieldRecommendationModel).where(FieldRecommendationModel.field_id == field_id)
    )
    rec = rec_result.scalar_one_or_none()

    if not analysis or not rec:
        raise HTTPException(404, detail="Данные для экспорта не найдены")

    polygons = await asyncio.to_thread(
        build_cluster_polygons, field.latitude, field.longitude, field.radius, analysis.cluster_data["map_data"]
    )
    zip_bytes = await asyncio.to_thread(build_prescription_shapefile, polygons, rec.zones_rec)

    return StreamingResponse(
        io_module.BytesIO(zip_bytes),
        media_type="application/zip",
        headers={"Content-Disposition": f"attachment; filename=field_{field_id}_prescription.zip"},
    )