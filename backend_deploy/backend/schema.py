from pydantic import BaseModel, Field, ConfigDict, EmailStr
from datetime import datetime, timedelta
from typing import ClassVar
from enum import Enum

class UserCreate(BaseModel):
    email: EmailStr = Field(..., description='Email пользователя')
    full_name: str = Field(..., min_length=2, description='Имя или название компании')
    password: str = Field(..., min_length=8, description='Пароль (минимум 8 символов)')


class User(BaseModel):
    id: int
    email: EmailStr
    full_name: str = Field(description='Имя или название компании')
    tariff: str = Field(default='test', description='Тариф: test, standard, pro')
    tariff_ends_at: datetime = Field(default_factory=lambda: datetime.now() + timedelta(days=7))
    current_area: float = Field(default=0.0, description='Проанализированная площадь')
    max_area: float = Field(default=10.0, description='Максимальная площадь для анализа')
    model_config = ConfigDict(from_attributes=True)


class FieldStatus(str, Enum):
    IN_PROGRESS = 'В обработке'
    DONE = 'Готово'
    ERROR = 'Ошибка'

class FieldCreate(BaseModel):
    culture: str | None = Field(description='Культура, выращиваемая на поле (пшеница, кукуруза и т.д.). Для более '
                                            'точных рекомендаций - standard, pro')
    latitude: float = Field(..., description='Широта центра поля', ge=-90, le=90)
    longitude: float = Field(..., description='Долгота центра поля', ge=-180, le=180)
    radius: float = Field(..., description='Радиус поля в метрах', ge=3, le=10000)
    region: str | None = Field(description='Регион (область, край, республика). Для более точных рекомендаций - standard, pro', min_length=2)
    agrochem: str | None = Field(description='Известные агрохимические данные', min_length=2)


class Field(FieldCreate):
    id: int
    user_id: int
    area: float
    status: FieldStatus = FieldStatus.IN_PROGRESS
    created_at: datetime

    ERROR_MSG: ClassVar[str] = 'Ошибка'

    model_config = ConfigDict(from_attributes=True)

class RefreshTokenRequest(BaseModel):
    refresh_token: str
