from sqlalchemy import Integer, ForeignKey, JSON, func, String
from sqlalchemy.orm import mapped_column, Mapped
from backend.database import Base
from datetime import datetime


class FieldRecommendation(Base):
    __tablename__ = 'field_recommendations'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    field_id: Mapped[int] = mapped_column(ForeignKey("fields.id"), nullable=False)
    zones_rec: Mapped[list] = mapped_column(JSON, nullable=False)  # список зон с рекомендациями
    short_zone_rec: Mapped[list] = mapped_column(JSON, nullable=False) # список кратких рекомендаций для визуализации
