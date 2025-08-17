import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentReturn } from '../../interfaces/investment-return';
import { InvestmentInput } from '../../interfaces/investment-input.dto';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent {
  @Output() calculate = new EventEmitter<InvestmentInput>();
  @Input() initialInvestment: number = 10000;
  @Input() annualInvestment: number = 1000;
  @Input() interestRate: number = 4;
  @Input() duration: number = 5;
  investmentResults: InvestmentReturn[] = [];

  onSubmit() {
    this.calculate.emit({
      initialInvestment: +this.initialInvestment, // + to convert string to number
      annualInvestment: +this.annualInvestment,
      expectedReturn: +this.interestRate,
      duration: +this.duration,
    });
    console.log('Form submitted with values:', {
      initialInvestment: this.initialInvestment,
      annualInvestment: this.annualInvestment,
      interestRate: this.interestRate,
      duration: this.duration,
    });
  }
}
