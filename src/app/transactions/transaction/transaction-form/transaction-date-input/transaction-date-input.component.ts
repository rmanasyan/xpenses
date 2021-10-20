import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import firebase from 'firebase/compat/app';
import { Transaction } from '../../../state/transaction.model';
import { fade } from '../../../../shared/animations/fade.animation';

type ControlName = 'year' | 'month' | 'date' | 'hours' | 'minutes';

@UntilDestroy()
@Component({
  selector: 'app-transaction-date-input',
  templateUrl: './transaction-date-input.component.html',
  styleUrls: ['./transaction-date-input.component.scss'],
  animations: [fade],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TransactionDateInputComponent,
      multi: true,
    },
  ],
})
export class TransactionDateInputComponent implements OnInit, ControlValueAccessor {
  controlsVisible = false;
  controlValue: Date;
  dateGroup: FormGroup;
  datePlaceholder: Date;
  selectedControl: ControlName = 'date';

  constructor(private fb: FormBuilder) {}

  onChange = (_: any) => {};

  onTouched = () => {};

  ngOnInit() {
    this.dateGroup = this.fb.group({
      year: ['', [Validators.required, Validators.min(1981), Validators.max(2121)]],
      month: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      date: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      hours: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      minutes: ['', [Validators.required, Validators.min(0), Validators.max(59)]],
      seconds: [''],
    });

    this.dateGroup.valueChanges.pipe(untilDestroyed(this)).subscribe((form) => this.setDate(form));
  }

  selectControl(ctrl: ControlName) {
    this.selectedControl = ctrl;
  }

  step(stepIncrement: number) {
    const ctrl = this.dateGroup.get(this.selectedControl);
    ctrl.setValue(ctrl.value + stepIncrement);
  }

  setDate(form) {
    if (this.dateGroup.valid) {
      this.controlValue = new Date(form.year, form.month - 1, form.date, form.hours, form.minutes, form.seconds);
      this.onChange(firebase.firestore.Timestamp.fromDate(this.controlValue));
      this.onTouched();
    }
  }

  toggleControls() {
    this.controlsVisible = !this.controlsVisible;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(date: Transaction['date']): void {
    this.controlValue = date.toDate();
    this.datePlaceholder = date.toDate();

    this.dateGroup.setValue({
      year: this.controlValue.getFullYear(),
      month: this.controlValue.getMonth() + 1,
      date: this.controlValue.getDate(),
      hours: this.controlValue.getHours(),
      minutes: this.controlValue.getMinutes(),
      seconds: this.controlValue.getSeconds(),
    });
  }
}
