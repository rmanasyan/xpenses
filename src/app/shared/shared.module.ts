import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { XCurrencyPipe } from './pipes/x-currency.pipe';
import { XDatePipe } from './pipes/x-date.pipe';
import { IconSelectComponent } from './components/icon-select/icon-select.component';

@NgModule({
  declarations: [SvgIconComponent, LoadingBarComponent, XCurrencyPipe, XDatePipe, IconSelectComponent],
  providers: [XCurrencyPipe, XDatePipe, DecimalPipe, DatePipe],
  imports: [CommonModule],
  exports: [SvgIconComponent, LoadingBarComponent, XCurrencyPipe, XDatePipe, IconSelectComponent]
})
export class SharedModule {}
