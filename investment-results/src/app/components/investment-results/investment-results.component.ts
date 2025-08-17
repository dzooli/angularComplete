import { Component, signal, input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { InvestmentResults } from '../../interfaces/investment-results.dto';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './investment-results.component.html',
  styleUrls: ['./investment-results.component.css'],
})
export class InvestmentResultsComponent {
  investmentResults = input<InvestmentResults[] | undefined>(undefined);
}
