from sqlalchemy import Integer, Numeric, String, CheckConstraint, ForeignKey, DateTime, func, JSON
from sqlalchemy.orm import mapped_column, Mapped, relationship
from backend.database import Base
from datetime import datetime


class AnalysisResult(Base):
    __tablename__ = 'analysis_results'
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    field_id: Mapped[int] = mapped_column(ForeignKey("fields.id"), nullable=False)
    cluster_data: Mapped[dict] = mapped_column(JSON, nullable=False)
    silhouette_score: Mapped[float | None] = mapped_column(Numeric(4, 3))