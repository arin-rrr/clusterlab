from sqlalchemy import Integer, String, ForeignKey, Numeric, DateTime, func
from sqlalchemy.orm import mapped_column, Mapped
from backend.database import Base
from datetime import datetime

class Payment(Base):
    __tablename__ = 'payments'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)  # id платежа
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False) # user_id, кто будет платить
    tariff: Mapped[str] = mapped_column(String(50), nullable=False)  # 'standard' / 'pro'
    amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)  # сколько клиент заплатил
    status: Mapped[str] = mapped_column(String(30), nullable=False)  # 'pending', 'succeeded', 'failed'
    provider_payment_id: Mapped[str] = mapped_column(String(100), nullable=True)  # id платежа в ЮKassa
    payment_method_id: Mapped[str] = mapped_column(String(100), nullable=True)  # токен для рекуррентных списаний
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())