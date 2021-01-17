import { Directive, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[role=button][tabindex=0], [role=option][tabindex=0]',
})
export class TabindexClickDirective {
  @HostListener('keydown', ['$event'])
  keydown(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      event.target.dispatchEvent(new MouseEvent('click'));
    }
  }
}
