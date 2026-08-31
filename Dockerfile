FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libexpat1 \
        libgdal-dev \
        libproj-dev \
        libgeos-dev \
        gdal-bin \
    && ldconfig \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]