FROM python:3.12-slim

WORKDIR /app

# System deps for GDAL/GEOS/PROJ (geospatial libs)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libexpat1 \
        libgdal-dev \
        libproj-dev \
        libgeos-dev \
        gdal-bin \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps first (better layer caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source
COPY backend/ ./backend/

# Run as non-root
RUN useradd --system --uid 1001 appuser
USER appuser

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]