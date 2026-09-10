# API contract

## Conventions

All endpoints return JSON. Validation failures return HTTP `422` with a `detail` field. Phase 1 supports USD payables only and is intentionally stateless.

## `GET /health`

Returns `200` and `{"status":"ok"}` when the API is reachable.

## `POST /api/upload`

Parses a CSV, XLS, or XLSX file. Send a multipart `file` field and an optional numeric query parameter `base_rate` (default: `87`). Headers are case-normalized. The first row must contain `amount`, `currency`, and `days_to_payment`; `counterparty` and `exposure_type` are optional.

Response (`200`):

```json
{"filename":"demo_data.csv","rows_processed":1,"exposure":{"amount":50000,"currency":"USD","days_to_payment":45,"counterparty":"ABC Electronics","exposure_type":"payable","base_rate":87}}
```

## `POST /api/analyze`

Request (`application/json`):

```json
{"amount":50000,"currency":"USD","days_to_payment":45,"counterparty":"ABC Electronics","exposure_type":"payable","base_rate":87}
```

Response (`200`) contains submitted fields and `current_inr_exposure`, `risk_score`, and `risk_level`:

```json
{"amount":50000,"currency":"USD","days_to_payment":45,"counterparty":"ABC Electronics","exposure_type":"payable","base_rate":87,"current_inr_exposure":4350000,"risk_score":35,"risk_level":"medium"}
```

The detailed runnable requests and failure example are in [API_EXAMPLES.md](API_EXAMPLES.md).
