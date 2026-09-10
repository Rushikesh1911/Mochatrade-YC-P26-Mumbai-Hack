from io import BytesIO

import pandas as pd


REQUIRED_COLUMNS = {"amount", "currency", "days_to_payment"}


def parse_exposure_file(filename: str, content: bytes) -> dict:
    """Read the first row of a CSV/XLSX into the Phase 1 exposure contract."""
    if filename.lower().endswith(".csv"):
        frame = pd.read_csv(BytesIO(content))
    elif filename.lower().endswith((".xlsx", ".xls")):
        frame = pd.read_excel(BytesIO(content))
    else:
        raise ValueError("upload a CSV or Excel file")
    frame.columns = [str(column).strip().lower() for column in frame.columns]
    missing = REQUIRED_COLUMNS - set(frame.columns)
    if missing:
        raise ValueError(f"missing required columns: {', '.join(sorted(missing))}")
    if frame.empty:
        raise ValueError("the uploaded file has no data rows")
    row = frame.iloc[0]
    return {
        "amount": float(row["amount"]),
        "currency": str(row["currency"]),
        "days_to_payment": int(row["days_to_payment"]),
        "counterparty": None if pd.isna(row.get("counterparty")) else str(row.get("counterparty")),
        "exposure_type": str(row.get("exposure_type", "payable")),
    }, len(frame)
