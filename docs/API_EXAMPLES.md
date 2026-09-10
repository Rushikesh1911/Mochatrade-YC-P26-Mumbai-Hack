# API examples

Examples assume the backend is running on `localhost:8000`.

## Analyze a USD payable

```bash
curl -X POST http://localhost:8000/api/analyze \
  -H 'Content-Type: application/json' \
  -d '{"amount":50000,"currency":"USD","days_to_payment":45,"counterparty":"ABC Electronics","exposure_type":"payable","base_rate":87}'
```

```json
{
  "amount": 50000,
  "currency": "USD",
  "days_to_payment": 45,
  "counterparty": "ABC Electronics",
  "exposure_type": "payable",
  "base_rate": 87,
  "current_inr_exposure": 4350000,
  "risk_score": 35,
  "risk_level": "medium"
}
```

## Upload a file

```bash
curl -X POST 'http://localhost:8000/api/upload?base_rate=87' \
  -F 'file=@data/sample/demo_data.csv'
```

```json
{
  "filename": "demo_data.csv",
  "rows_processed": 1,
  "exposure": {
    "amount": 50000,
    "currency": "USD",
    "days_to_payment": 45,
    "counterparty": "ABC Electronics",
    "exposure_type": "payable",
    "base_rate": 87
  }
}
```

## Validation error

Unsupported currencies are rejected in Phase 1:

```json
{"detail":"only USD exposures are supported in Phase 1"}
```
