from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import FileResponse

import hashlib
import time
import shutil
import os

file_router = APIRouter(
    prefix="/file"
)


def generate_hashed_id(data):
    unique_data = data + str(time.time())
    return hashlib.sha256(unique_data.encode()).hexdigest()


def get_file_extension(content_type: str) -> str:
    content_type_map = {
        "image/png": "png",
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "application/pdf": "pdf"
    }
    return content_type_map.get(content_type, None)


@file_router.post("/", response_description="Upload file")
async def upload_image(file: UploadFile = File(...)):
    file_extension = get_file_extension(file.content_type)
    if file_extension is None:
        raise HTTPException(status_code=400, detail="Invalid file format")

    file_name = generate_hashed_id(file.filename)
    file_path = f'{file_name}.{file_extension}'

    os.makedirs('./files', exist_ok=True)

    with open(f'./files/{file_path}', 'wb') as f:
        shutil.copyfileobj(file.file, f)

    return {"file_url": f"http://localhost:8000/file/{file_path}"}


@file_router.get("/{filename}")
async def get_image(filename: str):
    image_path = f"./files/{filename}"
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="file not found")
    return FileResponse(image_path)
