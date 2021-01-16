import { Component, Input, OnInit } from '@angular/core';
import { fade } from '../../../../shared/animations/fade.animation';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNumber } from '@datorama/akita';

@Component({
  selector: 'app-transaction-number-input',
  templateUrl: './transaction-number-input.component.html',
  styleUrls: ['./transaction-number-input.component.scss'],
  animations: [fade],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TransactionNumberInputComponent,
      multi: true,
    },
  ],
})
export class TransactionNumberInputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  controlsVisible = false;
  controlValueRaw = '';
  dialogPositionTop: number;
  inputValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];

  constructor() {}

  get controlValue(): number | null {
    return this.controlValueRaw ? Number(this.controlValueRaw) : null;
  }

  set controlValue(value: number | null) {
    this.controlValueRaw = value ? value + '' : '';
  }

  onChange = (_: any) => {};

  onTouched = () => {};

  ngOnInit(): void {}

  toggleControls(trigger?: HTMLElement) {
    this.dialogPositionTop = trigger?.offsetTop + trigger?.offsetHeight;
    this.controlsVisible = !this.controlsVisible;
  }

  setInputValue(inputValue: string | boolean) {
    if (typeof inputValue === 'string' && /[0-9.]/.test(inputValue)) {
      const concatenated = this.controlValueRaw.concat(inputValue);
      this.controlValueRaw = isNumber(concatenated) ? concatenated : this.controlValueRaw;
    } else if (inputValue === false) {
      this.controlValueRaw = this.controlValueRaw.slice(0, -1);
    }

    this.onChange(this.controlValue);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(inputValue: number | null): void {
    this.controlValue = inputValue;
  }
}
