from pydantic import BaseModel, Field, field_validator


class ExposureInput(BaseModel):
    amount: float = Field(gt=0, description="Foreign-currency amount")
    currency: str = Field(default="USD", min_length=3, max_length=3)
    days_to_payment: int = Field(ge=0, le=3650)
    counterparty: str | None = None
    exposure_type: str = "payable"
    base_rate: float = Field(gt=0, description="Base USD/INR rate")

    @field_validator("currency")
    @classmethod
    def normalize_currency(cls, value: str) -> str:
        return value.upper()


class AnalysisResponse(BaseModel):
    amount: float
    currency: str
    days_to_payment: int
    counterparty: str | None
    exposure_type: str
    base_rate: float
    current_inr_exposure: float
    risk_score: int
    risk_level: str


class UploadResponse(BaseModel):
    filename: str
    rows_processed: int
    exposure: ExposureInput


class ScenarioInput(ExposureInput):
    scenario_rate: float = Field(gt=0, description="User-supplied USD/INR scenario rate")


class ScenarioResponse(AnalysisResponse):
    scenario_rate: float
    unhedged_scenario_cost: float
    additional_unhedged_cost: float
    rate_change: float
    rate_change_percent: float


class MitigationInput(ScenarioInput):
    hedge_ratio: float = Field(ge=0, le=1, description="Illustrative portion protected, from 0 to 1")
    assumed_hedge_rate: float = Field(gt=0, description="Explicit illustrative USD/INR hedge-rate assumption")


class MitigationResponse(ScenarioResponse):
    hedge_ratio: float
    assumed_hedge_rate: float
    hedged_portion: float
    unhedged_portion: float
    illustrative_hedged_scenario_cost: float
    illustrative_benefit: float
    disclaimer: str
