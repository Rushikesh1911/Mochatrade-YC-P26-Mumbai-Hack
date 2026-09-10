from io import BytesIO

import pandas as pd
from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def test_upload_parses_csv_and_normalizes_headers():
    response = client.post(
        "/api/upload?base_rate=88.5",
        files={"file": ("exposure.csv", b" Amount , Currency , Days_To_Payment , Counterparty\n50000,usd,45,ABC Electronics\n", "text/csv")},
    )

    assert response.status_code == 200
    assert response.json() == {
        "filename": "exposure.csv",
        "rows_processed": 1,
        "exposure": {"amount": 50000, "currency": "USD", "days_to_payment": 45, "counterparty": "ABC Electronics", "exposure_type": "payable", "base_rate": 88.5},
    }


def test_upload_parses_xlsx():
    content = BytesIO()
    pd.DataFrame([{"amount": 1250, "currency": "USD", "days_to_payment": 14}]).to_excel(content, index=False)

    response = client.post("/api/upload", files={"file": ("exposure.xlsx", content.getvalue(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")})

    assert response.status_code == 200
    assert response.json()["exposure"]["amount"] == 1250
    assert response.json()["exposure"]["base_rate"] == 87


def test_upload_rejects_missing_required_columns():
    response = client.post("/api/upload", files={"file": ("exposure.csv", b"amount,currency\n50,USD\n", "text/csv")})

    assert response.status_code == 422
    assert response.json()["detail"] == "missing required columns: days_to_payment"


def test_upload_rejects_empty_and_unsupported_files():
    empty = client.post("/api/upload", files={"file": ("empty.csv", b"", "text/csv")})
    unsupported = client.post("/api/upload", files={"file": ("exposure.txt", b"anything", "text/plain")})

    assert empty.status_code == 422
    assert empty.json()["detail"] == "the uploaded file has no data rows"
    assert unsupported.status_code == 422
    assert unsupported.json()["detail"] == "upload a CSV or Excel file"
