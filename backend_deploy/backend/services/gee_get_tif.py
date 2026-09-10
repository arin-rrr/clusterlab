import ee
import requests
import os

ee.Initialize(project='clusterlab-487108')


def download_field_data(field_id, user_id, lat, lon, radius):
    point = ee.Geometry.Point([lon, lat])
    region = point.buffer(radius).bounds()

    image = (ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
             .filterBounds(region)
             .filterDate('2025-01-01', '2026-04-09')
             .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
             .median()
             .clip(region)
             .select(['B2', 'B3', 'B4', 'B8', 'B11', 'B12']))

    url = image.getDownloadURL({
        'scale': 10,
        'format': 'GEO_TIFF',
        'region': region
    })

    save_path = f"backend/storage/field_{field_id}_{user_id}.tif"
    os.makedirs("backend/storage", exist_ok=True)

    response = requests.get(url)
    if response.status_code == 200:
        with open(file_path, 'wb') as f:
            f.write(response.content)
        print(f"Снимок для поля {field_id} успешно сохранен: {file_path}")
        return file_path
    else:
        raise Exception(f"Ошибка при скачивании из GEE: {response.text}")