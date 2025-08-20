import { Injectable } from '@angular/core';
import { InvestmentInput } from '../interfaces/investment-input.dto';
import { InvestmentResults } from '../interfaces/investment-results.dto';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  resultData?: InvestmentResults[];
  constructor() {}

  calculateInvestmentResults(data: InvestmentInput) {
    const { initialInvestment, duration, expectedReturn, annualInvestment } =
      data;
    const annualData: InvestmentResults[] = [];

    let investmentValue = initialInvestment;

    console.log('Calculating investment results...');
    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    console.log('Investment results calculated:', annualData);
    this.resultData = annualData;
  }
}
