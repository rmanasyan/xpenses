import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { XCurrencyPipe } from './pipes/x-currency.pipe';
import { XDatePipe } from './pipes/x-date.pipe';

@NgModule({
  declarations: [SvgIconComponent, LoadingBarComponent, XCurrencyPipe, XDatePipe],
  providers: [XCurrencyPipe, XDatePipe, DecimalPipe, DatePipe],
  imports: [CommonModule],
  exports: [SvgIconComponent, LoadingBarComponent, XCurrencyPipe, XDatePipe]
})
export class SharedModule {}
