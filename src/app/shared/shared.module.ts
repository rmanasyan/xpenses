import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { XCurrencyPipe } from './pipes/x-currency.pipe';
import { XDatePipe } from './pipes/x-date.pipe';
import { AvatarComponent } from './components/avatar/avatar.component';
import { SvgSymbolDefsComponent } from './components/svg-symbol-defs/svg-symbol-defs.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { VersionComponent } from './components/version/version.component';
import { TabindexClickDirective } from './directives/tabindex-click.directive';
import { PositionByDirective } from './directives/position-by.directive';

@NgModule({
  declarations: [
    LoadingBarComponent,
    LoadingIndicatorComponent,
    SvgIconComponent,
    SvgSymbolDefsComponent,
    VersionComponent,
    XCurrencyPipe,
    XDatePipe,
    TabindexClickDirective,
    PositionByDirective,
    AvatarComponent
  ],
  providers: [XCurrencyPipe, XDatePipe, DecimalPipe, DatePipe],
  imports: [CommonModule, HttpClientModule],
  exports: [
    LoadingBarComponent,
    LoadingIndicatorComponent,
    SvgIconComponent,
    SvgSymbolDefsComponent,
    VersionComponent,
    XCurrencyPipe,
    XDatePipe,
    TabindexClickDirective,
    PositionByDirective,
    AvatarComponent
  ]
})
export class SharedModule {}
