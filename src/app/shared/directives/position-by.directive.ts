import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appPositionBy]',
})
export class PositionByDirective {
  @Input('appPositionBy') positionByEl: HTMLElement;
  @HostBinding('style.top.px') get positionTop() {
    return this.positionByEl.getBoundingClientRect().bottom;
  }
}
