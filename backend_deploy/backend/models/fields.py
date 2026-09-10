from sqlalchemy import Integer, Numeric, String, CheckConstraint, ForeignKey, DateTime, func
from sqlalchemy.orm import mapped_column, Mapped, relationship
from backend.database import Base
from datetime import datetime

class Field(Base):
    __tablename__ = 'fields'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    latitude: Mapped[float] = mapped_column(Numeric(8, 6), CheckConstraint('latitude >= -90.000000 AND latitude <= '
                                                                           '90.000000'), nullable=False)
    longitude: Mapped[float] = mapped_column(Numeric(9, 6), CheckConstraint('longitude >= -180.000000 AND longitude '
                                                                            '<= 180.000000'), nullable=False)
    radius: Mapped[float] = mapped_column(Numeric(5, 1), CheckConstraint('radius >= 5.0 AND radius <= 3000.0'), nullable=False)
    area: Mapped[float] = mapped_column(Numeric(5, 1), nullable=False)  # площадь поля в га
    culture: Mapped[str | None] = mapped_column(String(150), nullable=True)
    region: Mapped[str | None] = mapped_column(String(150), nullable=True)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="В обработке")
    agrochem: Mapped[str | None] = mapped_column(String(150), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now())

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    user:Mapped["User"] = relationship("User", back_populates='fields')
