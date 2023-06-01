import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fade } from '../../../../shared/animations/fade.animation';

const icons = [
  'icon-address',
  'icon-adjust',
  'icon-air',
  'icon-aircraft',
  'icon-battery',
  'icon-beamed-note',
  'icon-bell',
  'icon-book',
  'icon-bowl',
  'icon-bucket',
  'icon-cake',
  'icon-calculator',
  'icon-clock',
  'icon-cloud',
  'icon-cog',
  'icon-colours',
  'icon-credit',
  'icon-credit-card',
  'icon-cup',
  'icon-drink',
  'icon-emoji-flirt',
  'icon-emoji-happy',
  'icon-emoji-neutral',
  'icon-feather',
  'icon-flash',
  'icon-game-controller',
  'icon-hour-glass',
  'icon-image-inverted',
  'icon-key',
  'icon-keyboard',
  'icon-lab-flask',
  'icon-laptop',
  'icon-leaf',
  'icon-light-bulb',
  'icon-light-up',
  'icon-map',
  'icon-mask',
  'icon-medal',
  'icon-mobile',
  'icon-open-book',
  'icon-price-tag',
  'icon-rocket',
  'icon-shield',
  'icon-shopping-bag',
  'icon-shopping-basket',
  'icon-sound',
  'icon-tree',
  'icon-trophy',
  'icon-video'
];

@Component({
  selector: 'app-icon-select',
  templateUrl: './category-icon-select.component.html',
  styleUrls: ['./category-icon-select.component.scss'],
  animations: [fade],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoryIconSelectComponent),
      multi: true
    }
  ]
})
export class CategoryIconSelectComponent implements OnInit, ControlValueAccessor {
  icons: string[];
  iconsVisible = false;
  selectedIcon: string;
  disabledState = false;
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor() {}

  ngOnInit() {
    this.icons = icons;
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;
    this.onChange(icon);
    this.onTouched();
    this.toggleIcons();
  }

  toggleIcons() {
    this.iconsVisible = !this.iconsVisible;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.selectedIcon = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState = isDisabled;
  }
}
