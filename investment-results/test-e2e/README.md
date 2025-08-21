# Investment Calculator E2E Tests

## Structure
```
playwright.config.ts        # Playwright configuration
/test-e2e
  /components               # Component objects (form widgets etc.)
  /pages                    # Page objects (full-page abstractions)
  /data                     # Test data & expected results
  investment-calculator.spec.ts  # Main spec iterating scenarios
```

## Running Tests
1. Start the dev server (if not already running):
2. Run Playwright tests:
```
npx playwright test
```
3. Open HTML report:
```
npx playwright show-report test-e2e/report
```

## Conventions
- Page Objects expose assertions & accessors.
- Component Objects encapsulate form interactions.
- Test data separated in JSON for scalability.
- Trace & screenshot on failure enabled.

## Adding a Scenario
Append to `test-e2e/data/investmentTestData.json` an object with fields:
```
{
  "scenario": "descriptive name",
  "initialInvestment": 1000,
  "annualInvestment": 500,
  "interestRate": 5,
  "duration": 3,
  "expectedRows": [ { "year": 1, "investmentValue": ..., "totalInterests": ..., "totalValue": ... } ]
}
```
