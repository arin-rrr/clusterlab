import asyncio
from backend.services.analysis import run_clustering_logic
from backend.database import async_session_maker

FIELD_ID = 1  # подставь реальный id существующего поля из твоей БД


async def main():
    await run_clustering_logic(FIELD_ID, async_session_maker)


if __name__ == "__main__":
    asyncio.run(main())