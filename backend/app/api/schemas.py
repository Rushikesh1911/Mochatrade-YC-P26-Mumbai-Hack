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
