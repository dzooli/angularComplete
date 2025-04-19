import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentReturn } from '../../interfaces/investment-return';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent {
  @Input() initialInvestment: number = 0;
  @Input() annualInvestment: number = 0;
  @Input() interestRate: number = 0;
  @Input() duration: number = 0;
  investmentResults: InvestmentReturn[] = [];

  calculateInvestmentResults() {
    console.log('Calculating investment results...');
    const annualData: InvestmentReturn[] = [];
    let investmentValue = this.initialInvestment;

    for (let i = 0; i < this.duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (this.interestRate / 100);
      investmentValue += interestEarnedInYear + this.annualInvestment;
      const totalInterest =
        investmentValue - this.annualInvestment * year - this.initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: this.annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested:
          this.initialInvestment + this.annualInvestment * year,
      } as InvestmentReturn);
    }

    this.investmentResults = annualData;
    console.log(
      'Investment results calculated:',
      this.investmentResults.length
        ? this.investmentResults
        : 'No results found'
    );
  }
}
