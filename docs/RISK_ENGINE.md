# Risk engine

## Principles

The engine is deterministic, formula-driven, and independent from FastAPI, UI, database, and AI code. AI may produce candidate structured inputs or a prose explanation, but it must never provide a rate, loss, hedge price, score, or other numerical calculation.

## Phase 1 formula

For foreign-currency exposure `E` and supplied base USD/INR rate `R0`:

```text
Current INR exposure = E × R0
```

For USD 50,000 at ₹87/USD, this equals ₹4,350,000.

## Validation

- Amount must be greater than zero.
- Currency must be USD in the current prototype.
- Payment horizon must be an integer from 0 to 3,650 days.
- Rate must be greater than zero.

## Prototype risk score

The score is a transparent 0–100 indicator, not financial advice or a predictive model.

```text
inr_exposure = E × R0
size_points = min(60, round((inr_exposure / 10,000,000) × 60))
timing_points = min(40, round((days_to_payment / 180) × 40))
score = min(100, size_points + timing_points)
```

The fixed ₹10,000,000 business scale is a prototype assumption. Risk levels are low (0–34), medium (35–69), and high (70–100).

## Reserved Phase 2/3 formulas

For a scenario rate `R1`, hedge ratio `H` (0–1), and explicitly assumed hedge rate `Rh`:

```text
Unhedged scenario cost = E × R1
Additional unhedged cost = E × (R1 − R0)
Hedged portion = E × H
Unhedged portion = E × (1 − H)
Illustrative hedged scenario cost = (E × H × Rh) + (E × (1 − H) × R1)
Illustrative benefit = (E × R1) − hedged scenario cost
```

`Rh` is an explicit configurable illustrative assumption, potentially equal to `R0` for the demo. It is not a live or executable derivative price.
