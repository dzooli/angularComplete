import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InvestmentResultsComponent } from './components/investment-results/investment-results.component';
import { BrowserModule } from '@angular/platform-browser';
import { UserInputModule } from './components/user-input/user-input.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, InvestmentResultsComponent],
  imports: [BrowserModule, UserInputModule],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
