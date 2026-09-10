from fastapi import APIRouter, HTTPException

from app.api.schemas import AnalysisResponse, ExposureInput
from risk_engine import FXExposure, calculate_fx_analysis

router = APIRouter(tags=["analysis"])


@router.post("/analyze", response_model=AnalysisResponse)
def analyze_exposure(payload: ExposureInput) -> AnalysisResponse:
    try:
        result = calculate_fx_analysis(
            FXExposure(payload.amount, payload.currency, payload.days_to_payment, payload.counterparty, payload.exposure_type),
            payload.base_rate,
        )
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
    return AnalysisResponse(
        **payload.model_dump(),
        current_inr_exposure=result.current_inr_exposure,
        risk_score=result.risk_score,
        risk_level=result.risk_level,
    )
