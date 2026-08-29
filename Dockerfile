FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

# Устанавливаем системные библиотеки Linux (включая libexpat1 для rasterio)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libexpat1 \
    gdal-bin \
    libgdal-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Копируем и устанавливаем зависимости Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем исходный код проекта
COPY . .

# Запускаем FastAPI через uvicorn
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "80"]