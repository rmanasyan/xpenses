import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';

@NgModule({
  declarations: [SvgIconComponent, LoadingBarComponent],
  imports: [CommonModule],
  exports: [SvgIconComponent, LoadingBarComponent]
})
export class SharedModule {}
