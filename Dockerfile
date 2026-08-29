FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

# Системные зависимости Linux (включая libexpat1 для rasterio)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libexpat1 \
    gdal-bin \
    libgdal-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Открываем порт 8080
EXPOSE 8080

# Запускаем uvicorn на порту 8080
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]