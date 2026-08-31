from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase

DATABASE_URL='postgresql+asyncpg://neondb_owner:npg_oWXjymT9za3F@ep-floral-bird-za7jd8bb-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

# Создаём Engine
async_engine = create_async_engine(DATABASE_URL, echo=True)

# Настраиваем фабрику сеансов
async_session_maker = async_sessionmaker(async_engine, expire_on_commit=False, class_=AsyncSession)


class Base(DeclarativeBase):
    pass