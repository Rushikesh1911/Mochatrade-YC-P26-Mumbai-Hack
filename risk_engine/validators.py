SUPPORTED_CURRENCIES = {"USD"}


def validate_exposure(amount: float, currency: str, days_to_payment: int) -> None:
    if amount <= 0:
        raise ValueError("amount must be greater than zero")
    if currency.upper() not in SUPPORTED_CURRENCIES:
        raise ValueError("only USD exposures are supported in Phase 1")
    if not 0 <= days_to_payment <= 3650:
        raise ValueError("days_to_payment must be between 0 and 3650")


def validate_rate(rate: float) -> None:
    if rate <= 0:
        raise ValueError("USD/INR rate must be greater than zero")
