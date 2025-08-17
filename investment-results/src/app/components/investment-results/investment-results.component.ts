import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { InvestmentResults } from '../../interfaces/investment-results';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './investment-results.component.html',
  styleUrls: ['./investment-results.component.css'],
})
export class InvestmentResultsComponent {
  @Input() investmentResults?: InvestmentResults[];
}
