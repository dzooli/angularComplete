import { Page, Locator, expect } from '@playwright/test';

export interface ExpectedRow {
  year: number;
  investmentValue: number;
  totalInterests: number;
  totalValue: number;
}

export class InvestmentResultsPage {
  readonly page: Page;
  readonly resultsHeading: Locator;
  readonly table: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resultsHeading = page.getByRole('heading', {
      level: 2,
      name: 'Investment Results',
    });
    this.table = page.locator('table');
    this.rows = this.table
      .getByRole('row')
      .filter({ has: page.getByRole('cell', { name: /\d+/ }) });
  }

  async assertResultsVisible() {
    await expect(this.resultsHeading).toBeVisible();
    await expect(this.table).toBeVisible();
  }

  async getTableNumericRows(): Promise<number[][]> {
    const rowValues: number[][] = [];
    const bodyRows = this.table.locator('tbody tr');
    const count = await bodyRows.count();
    for (let i = 0; i < count; i++) {
      const cells = bodyRows.nth(i).locator('td');
      const cellCount = await cells.count();
      const row: number[] = [];
      for (let j = 0; j < cellCount; j++) {
        const raw = await cells.nth(j).innerText();
        // Strip $ and commas
        const num = Number(raw.replace(/[$,]/g, ''));
        row.push(num);
      }
      rowValues.push(row);
    }
    return rowValues;
  }

  async assertExpectedRows(expected: ExpectedRow[]) {
    const tableRows = await this.getTableNumericRows();
    expect(tableRows.length).toBe(expected.length);
    expected.forEach((exp, idx) => {
      const [year, investmentValue, totalInterests, totalValue] =
        tableRows[idx];
      expect(year).toBe(exp.year);
      expect(investmentValue).toBeCloseTo(exp.investmentValue, 2);
      expect(totalInterests).toBeCloseTo(exp.totalInterests, 2);
      expect(totalValue).toBeCloseTo(exp.totalValue, 2);
    });
  }
}
