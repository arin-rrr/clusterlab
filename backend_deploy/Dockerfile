# syntax=docker/dockerfile:1
FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libexpat1 \
        libgdal-dev \
        libproj-dev \
        libgeos-dev \
        gdal-bin \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN --mount=type=cache,target=/root/.cache/pip \
    pip config set global.index-url https://mirror.yandex.ru/mirrors/pypi/simple/ && \
    pip config set global.extra-index-url https://pypi.org/simple/ && \
    pip config set global.timeout 120 && \
    pip install --prefer-binary --no-cache-dir -r requirements.txt

COPY backend/ ./backend/

RUN useradd --system --uid 1001 appuser
USER appuser

EXPOSE 8000
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]