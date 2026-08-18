import asyncio
from logging.config import fileConfig
from sqlalchemy import pool
from sqlalchemy.ext.asyncio import async_engine_from_config
from alembic import context

# Импортируем твой Base и модели
# Если папка называется backend, используем такой путь:
from backend.database import Base
from backend.models.users import User
from backend.models.fields import Field
from backend.models.analysis_result import AnalysisResult
from backend.models.field_recommendation import FieldRecommendation
from backend.models.payments import Payment

# Если есть модель Field, добавь её тоже:
# from backend.models.fields import Field

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def do_run_migrations(connection):
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    """Запуск миграций в асинхронном режиме."""

    # Создаем асинхронный движок
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        # Мост между асинхронным соединением и синхронным Alembic
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


asyncio.run(run_migrations_online())
