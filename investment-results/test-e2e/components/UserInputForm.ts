import { Page, Locator, expect } from '@playwright/test';

export class UserInputForm {
  readonly page: Page;
  readonly initialInvestmentField: Locator;
  readonly annualInvestmentField: Locator;
  readonly interestRateField: Locator;
  readonly durationField: Locator;
  readonly calculateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.initialInvestmentField = page.getByRole('spinbutton', {
      name: 'Initial Investment Amount:',
    });
    this.annualInvestmentField = page.getByRole('spinbutton', {
      name: 'Annual Investment Amount:',
    });
    this.interestRateField = page.getByRole('spinbutton', {
      name: 'Interest Rate (%):',
    });
    this.durationField = page.getByRole('spinbutton', {
      name: 'Investment Duration (Years):',
    });
    this.calculateButton = page.getByRole('button', { name: 'Calculate' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async fillForm(data: {
    initialInvestment: number;
    annualInvestment: number;
    interestRate: number;
    duration: number;
  }) {
    await this.initialInvestmentField.fill(data.initialInvestment.toString());
    await this.annualInvestmentField.fill(data.annualInvestment.toString());
    await this.interestRateField.fill(data.interestRate.toString());
    await this.durationField.fill(data.duration.toString());
  }

  async submit() {
    await this.calculateButton.click();
  }

  async calculateAndSubmit(data: {
    initialInvestment: number;
    annualInvestment: number;
    interestRate: number;
    duration: number;
  }) {
    await this.fillForm(data);
    await this.submit();
  }
}
