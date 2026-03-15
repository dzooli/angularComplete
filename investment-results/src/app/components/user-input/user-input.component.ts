import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentReturn } from '../../interfaces/investment-return.dto';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class UserInputComponent {
  initialInvestment = signal<number>(0);
  annualInvestment = signal<number>(0);
  expectedReturn = signal<number>(4);
  duration = signal<number>(5);

  investmentResults: InvestmentReturn[] = [];

  constructor(private readonly investmentService: InvestmentService) {}

  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.initialInvestment(),
      annualInvestment: +this.annualInvestment(),
      expectedReturn: +this.expectedReturn(),
      duration: +this.duration(),
    });
    console.log('Form submitted with values:', {
      initialInvestment: this.initialInvestment(),
      annualInvestment: this.annualInvestment(),
      expectedReturn: this.expectedReturn(),
      duration: this.duration(),
    });
    this.initialInvestment.set(0);
    this.annualInvestment.set(0);
    this.expectedReturn.set(4);
    this.duration.set(5);
  }
}
