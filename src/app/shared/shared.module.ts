import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { XCurrencyPipe } from './pipes/x-currency.pipe';

@NgModule({
  declarations: [SvgIconComponent, LoadingBarComponent, XCurrencyPipe],
  providers: [XCurrencyPipe, CurrencyPipe],
  imports: [CommonModule],
  exports: [SvgIconComponent, LoadingBarComponent, XCurrencyPipe]
})
export class SharedModule {}
