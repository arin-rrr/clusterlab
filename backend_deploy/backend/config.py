import os
from pathlib import Path
from dotenv import load_dotenv

# Находим путь к папке, где лежит этот файл config.py
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

SECRET_KEY = os.getenv("SECRET_KEY")
print(env_path)
print(SECRET_KEY)
if not SECRET_KEY:
    # Если всё равно None, выдаем ошибку сразу при запуске, а не при логине
    raise ValueError("SECRET_KEY не найден! Проверь файл .env")

ALGORITHM = "HS256"