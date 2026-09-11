from fastapi import APIRouter, HTTPException
from app.api.schemas import AIExplanationRequest, AIExplanationResponse
from app.services.ai_service import explain_risk

router = APIRouter(tags=["ai", "explanation"])

@router.post("/explain", response_model=AIExplanationResponse)
def explain_risk_endpoint(payload: AIExplanationRequest) -> AIExplanationResponse:
    try:
        explanation = explain_risk(context=payload.context)
        return AIExplanationResponse(explanation=explanation)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to generate explanation: {str(e)}")
