import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { XCurrencyPipe } from './pipes/x-currency.pipe';
import { XDatePipe } from './pipes/x-date.pipe';
import { SvgSymbolDefsComponent } from './components/svg-symbol-defs/svg-symbol-defs.component';

@NgModule({
  declarations: [SvgIconComponent, LoadingBarComponent, XCurrencyPipe, XDatePipe, SvgSymbolDefsComponent],
  providers: [XCurrencyPipe, XDatePipe, DecimalPipe, DatePipe],
  imports: [CommonModule, HttpClientModule],
  exports: [SvgIconComponent, LoadingBarComponent, XCurrencyPipe, XDatePipe, SvgSymbolDefsComponent]
})
export class SharedModule {}
