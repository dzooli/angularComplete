import { Component, EventEmitter, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentReturn } from '../../interfaces/investment-return.dto';
import { InvestmentInput } from '../../interfaces/investment-input.dto';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent {
  calculate = output<InvestmentInput>();
  initialInvestment = signal(0);
  annualInvestment = signal(0);
  expectedReturn = signal(4);
  duration = signal(5);

  investmentResults: InvestmentReturn[] = [];

  onSubmit() {
    this.calculate.emit({
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
