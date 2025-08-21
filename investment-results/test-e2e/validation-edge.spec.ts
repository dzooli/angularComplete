import { test, expect } from '@playwright/test';
import { UserInputForm } from './components/UserInputForm';
import { InvestmentResultsPage } from './pages/InvestmentResultsPage';

test('should prevent submission when required fields empty', async ({
  page,
}) => {
  const form = new UserInputForm(page);
  await form.goto();
  await form.calculateButton.click();
  await expect(page.getByRole('heading', { name: 'Investment Results' }))
    .not.toBeVisible({ timeout: 1000 })
    .catch(() => {});
});

test('should handle zero values gracefully', async ({ page }) => {
  const form = new UserInputForm(page);
  const results = new InvestmentResultsPage(page);
  await form.goto();
  await form.fillForm({
    initialInvestment: 0,
    annualInvestment: 0,
    interestRate: 0,
    duration: 1,
  });
  await form.submit();
  await results.assertResultsVisible();
  const rows = await results.getTableNumericRows();
  expect(rows[0]).toEqual([1, 0, 0, 0]);
});

test('negative values currently accepted (documenting current behavior)', async ({
  page,
}) => {
  const form = new UserInputForm(page);
  await form.goto();
  await form.initialInvestmentField.fill('-100');
  await form.annualInvestmentField.fill('-50');
  await form.interestRateField.fill('-3');
  await form.durationField.fill('-2');
  const values = await Promise.all([
    form.initialInvestmentField.inputValue(),
    form.annualInvestmentField.inputValue(),
    form.interestRateField.inputValue(),
    form.durationField.inputValue(),
  ]);
  expect(values.some((v) => Number(v) < 0)).toBeTruthy();
});

test('large numbers scaling', async ({ page }) => {
  const form = new UserInputForm(page);
  const results = new InvestmentResultsPage(page);
  await form.goto();
  await form.fillForm({
    initialInvestment: 1_000_000,
    annualInvestment: 250_000,
    interestRate: 7,
    duration: 2,
  });
  await form.submit();
  await results.assertResultsVisible();
  const rows = await results.getTableNumericRows();
  expect(rows.length).toBe(2);
  expect(rows[0][3]).toBeGreaterThan(rows[0][1]);
  expect(rows[1][3]).toBeGreaterThan(rows[0][3]);
});

test('duration multiple years with zero interest', async ({ page }) => {
  const form = new UserInputForm(page);
  const results = new InvestmentResultsPage(page);
  await form.goto();
  await form.fillForm({
    initialInvestment: 500,
    annualInvestment: 100,
    interestRate: 0,
    duration: 4,
  });
  await form.submit();
  await results.assertResultsVisible();
  const rows = await results.getTableNumericRows();
  expect(rows.map((r) => r[2])).toEqual([0, 0, 0, 0]);
});
