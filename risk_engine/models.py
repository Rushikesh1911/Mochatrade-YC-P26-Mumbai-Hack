from dataclasses import dataclass


@dataclass(frozen=True)
class FXExposure:
    """A foreign-currency payable used in the prototype FX workflow."""

    amount: float
    currency: str
    days_to_payment: int
    counterparty: str | None = None
    exposure_type: str = "payable"


@dataclass(frozen=True)
class FXAnalysis:
    exposure: FXExposure
    base_rate: float
    current_inr_exposure: float
    risk_score: int
    risk_level: str
