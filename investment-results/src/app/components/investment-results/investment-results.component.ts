import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrls: ['./investment-results.component.css'],
  standalone: true,
  imports: [CurrencyPipe],
})
export class InvestmentResultsComponent {
  constructor(private investmentService: InvestmentService) {}

  //results = computed(() => this.investmentService.resultData()); // Would be read-only by default
  results = this.investmentService.resultData.asReadonly();
}
