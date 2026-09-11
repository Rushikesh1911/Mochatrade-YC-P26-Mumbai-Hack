import json
from typing import Any, Optional
from pydantic import BaseModel
from app.api.schemas import ExposureInput
from app.services.ai_provider import provider
from app.services.rate_service import get_live_inr_rate


# Gemini-compatible schema — NO validators (gt, ge, etc.) as they
# produce JSON Schema keywords (exclusiveMinimum) that the SDK rejects.
class _ExposureRaw(BaseModel):
    amount: float
    currency: str
    days_to_payment: int
    counterparty: Optional[str] = None
    exposure_type: str


def extract_exposure(text: str) -> ExposureInput:
    """Extracts structured FX exposure data from unstructured text using AI."""

    prompt = f"""
    You are a financial data extraction assistant. Extract the foreign-currency exposure from the following text.
    - amount: A positive number (float). Extract the numerical value.
    - currency: A 3-letter ISO currency code (e.g., USD, EUR, GBP).
    - days_to_payment: Integer number of days until the payment is due.
    - counterparty: The name of the person or business involved, or null if not mentioned.
    - exposure_type: Use 'payable' if money is owed to someone. Use 'receivable' if money is expected to come in.

    Text: "{text}"
    """

    # Step 1: LLM returns a simple flat dict (no validators, Gemini-safe)
    raw = provider.generate_structured(prompt, _ExposureRaw)

    # Step 2: Automatically fetch the live exchange rate for the extracted currency!
    currency_code = raw.currency.upper()[:3]
    live_rate = get_live_inr_rate(currency_code)

    # Step 3: Validate/coerce into the real ExposureInput (applies gt=0, etc.)
    return ExposureInput(
        amount=raw.amount,
        currency=currency_code,
        days_to_payment=max(0, raw.days_to_payment),
        counterparty=raw.counterparty,
        exposure_type=raw.exposure_type,
        base_rate=live_rate,
    )


def explain_risk(context: dict[str, Any]) -> str:
    """Generates a plain-language explanation of calculated risk metrics using AI."""

    prompt = f"""
    You are a helpful business risk analyst. Explain the following calculated FX risk metrics in plain English.
    Keep it concise (2-3 sentences max) and business-focused.
    DO NOT invent any new numbers or advice. Only explain what these numbers mean.

    Calculated Data:
    {json.dumps(context, indent=2)}
    """

    return provider.generate_text(prompt)
