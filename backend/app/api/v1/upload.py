from fastapi import APIRouter, File, HTTPException, Query, UploadFile

from app.api.schemas import ExposureInput, UploadResponse
from app.services.upload_service import parse_exposure_file

router = APIRouter(tags=["upload"])


@router.post("/upload", response_model=UploadResponse)
async def upload_exposure(file: UploadFile = File(...), base_rate: float = Query(default=87.0, gt=0)) -> UploadResponse:
    try:
        parsed, row_count = parse_exposure_file(file.filename or "", await file.read())
        exposure = ExposureInput(**parsed, base_rate=base_rate)
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
    return UploadResponse(filename=file.filename or "upload", rows_processed=row_count, exposure=exposure)
