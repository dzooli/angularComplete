import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './investment-results.component.html',
  styleUrls: ['./investment-results.component.css'],
})
export class InvestmentResultsComponent {
  constructor(private investmentService: InvestmentService) {}

  // This component is currently empty, but you can add methods and properties
  // to handle the display of investment results as needed.
  get results() {
    return this.investmentService.resultData;
  }
}
