from sqlalchemy import Integer, String, DateTime, Numeric, Boolean
from datetime import datetime, timedelta
from sqlalchemy.orm import mapped_column, Mapped, relationship
from backend.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)

    tariff: Mapped[str] = mapped_column(String, nullable=False, server_default='test')
    tariff_ends_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now() + timedelta(days=7))

    max_area: Mapped[float] = mapped_column(Numeric(3, 1), default=10.0)
    current_area: Mapped[float] = mapped_column(Numeric(3, 1), default=0.0)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    verification_code: Mapped[str | None] = mapped_column(String(6), nullable=True)
    verification_code_expires: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    fields: Mapped[list["Field"]] = relationship("Field", back_populates="user")