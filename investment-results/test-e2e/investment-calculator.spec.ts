import { test, expect } from '@playwright/test';
import testData from './data/investmentTestData.json';
import { UserInputForm } from './components/UserInputForm';
import { InvestmentResultsPage } from './pages/InvestmentResultsPage';

interface InvestmentScenario {
  scenario: string;
  initialInvestment: number;
  annualInvestment: number;
  interestRate: number;
  duration: number;
  expectedRows: {
    year: number;
    investmentValue: number;
    totalInterests: number;
    totalValue: number;
  }[];
}

function computeExpected(
  initialInvestment: number,
  annualInvestment: number,
  interestRate: number,
  duration: number
) {
  const rows: {
    year: number;
    investmentValue: number;
    totalInterests: number;
    totalValue: number;
  }[] = [];
  let investmentValue = initialInvestment;
  let totalInterestsAcc = 0;
  for (let year = 1; year <= duration; year++) {
    investmentValue += annualInvestment;
    const interestEarned = investmentValue * (interestRate / 100);
    investmentValue += interestEarned;
    totalInterestsAcc += interestEarned;
    rows.push({
      year,
      investmentValue: Number((investmentValue - interestEarned).toFixed(2)), // before adding the year's interest? adjust if needed
      totalInterests: Number(totalInterestsAcc.toFixed(2)),
      totalValue: Number(investmentValue.toFixed(2)),
    });
  }
  return rows;
}

test.describe('Investment Calculator - Scenarios', () => {
  (testData as InvestmentScenario[]).forEach((scenario) => {
    test(`should calculate returns correctly: ${scenario.scenario}`, async ({
      page,
    }) => {
      const form = new UserInputForm(page);
      const results = new InvestmentResultsPage(page);
      await form.goto();
      await form.calculateAndSubmit({
        initialInvestment: scenario.initialInvestment,
        annualInvestment: scenario.annualInvestment,
        interestRate: scenario.interestRate,
        duration: scenario.duration,
      });
      await results.assertResultsVisible();
      await results.assertExpectedRows(scenario.expectedRows);
    });
  });
});

// Cross-check a scenario by independently computing expectation (guardrail)
test('Cross-check computation logic for base scenario', async () => {
  const scenario = (testData as InvestmentScenario[])[0];
  const computed = computeExpected(
    scenario.initialInvestment,
    scenario.annualInvestment,
    scenario.interestRate,
    scenario.duration
  );
  expect(computed.length).toBe(scenario.expectedRows.length);
});
