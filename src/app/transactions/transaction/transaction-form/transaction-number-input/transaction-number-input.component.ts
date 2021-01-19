import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fade } from '../../../../shared/animations/fade.animation';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNumber } from '@datorama/akita';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionsQuery } from '../../../state/transactions.query';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-transaction-number-input',
  templateUrl: './transaction-number-input.component.html',
  styleUrls: ['./transaction-number-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fade],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TransactionNumberInputComponent,
      multi: true,
    },
  ],
})
export class TransactionNumberInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder: string;
  // tslint:disable-next-line:no-input-rename
  @Input('open') shouldOpenControls = false;
  @ViewChild('inputValueEl') inputValueEl: ElementRef;

  controlValueRaw = '';
  inputValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'Backspace'];
  inputValuesRegex = new RegExp(/[0-9.]|(Backspace)/);
  controlsVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  controlsVisible$: Observable<boolean> = this.controlsVisibleSubject.asObservable();

  constructor(private transactionsQuery: TransactionsQuery) {}

  get controlValue(): number | null {
    return this.controlValueRaw ? Number(this.controlValueRaw) : null;
  }

  set controlValue(value: number | null) {
    this.controlValueRaw = value ? value + '' : '';
  }

  @HostListener('keydown', ['$event'])
  keydown(event: KeyboardEvent) {
    if (this.inputValuesRegex.test(event.key)) {
      event.preventDefault();
      document.getElementById(`input-value-${event.key}`)?.focus();
      this.setInputValue(event.key);
    }
  }

  onChange = (_: any) => {};

  onTouched = () => {};

  ngOnInit(): void {
    if (this.shouldOpenControls) {
      this.transactionsQuery.selectAnimationDone$.pipe(untilDestroyed(this)).subscribe((res) => {
        this.toggleControls();
        setTimeout(() => this.inputValueEl?.nativeElement.focus());
      });
    }
  }

  ngOnDestroy(): void {}

  toggleControls() {
    this.controlsVisibleSubject.next(!this.controlsVisibleSubject.value);
  }

  setInputValue(inputValue: string) {
    if (this.inputValuesRegex.test(inputValue)) {
      if (inputValue !== 'Backspace') {
        const concatenated = this.controlValueRaw.concat(inputValue);
        this.controlValueRaw = isNumber(concatenated) ? concatenated : this.controlValueRaw;
      } else {
        this.controlValueRaw = this.controlValueRaw.slice(0, -1);
      }
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
