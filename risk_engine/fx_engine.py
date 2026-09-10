from .models import FXAnalysis, FXExposure
from .scoring import calculate_risk_score, risk_level
from .validators import validate_exposure, validate_rate


def calculate_fx_analysis(exposure: FXExposure, base_rate: float) -> FXAnalysis:
    """Calculate current INR liability for a USD payable without AI or market calls."""
    validate_exposure(exposure.amount, exposure.currency, exposure.days_to_payment)
    validate_rate(base_rate)
    score = calculate_risk_score(exposure.amount, exposure.days_to_payment, base_rate)
    return FXAnalysis(
        exposure=exposure,
        base_rate=base_rate,
        current_inr_exposure=exposure.amount * base_rate,
        risk_score=score,
        risk_level=risk_level(score),
    )
