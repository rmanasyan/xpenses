import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent {
  @Input() icon: string;
  @Input() iconSet = 'entypo';
}
