FROM python:3.12-slim

WORKDIR /app

# 1. Сначала системные библиотеки (включая libexpat)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libexpat1 \
        libgdal-dev \
        libproj-dev \
        libgeos-dev \
        gdal-bin \
    && ldconfig \
    && rm -rf /var/lib/apt/lists/*

# 2. Копируем requirements
COPY requirements.txt .

# 3. Устанавливаем Python-зависимости
RUN pip install --no-cache-dir -r requirements.txt

# 4. Копируем код
COPY . .

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]