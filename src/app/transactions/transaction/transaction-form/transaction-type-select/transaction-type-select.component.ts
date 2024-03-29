import { Component, forwardRef, OnInit } from '@angular/core';
import { TransactionType } from '../../../state/transaction.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-transaction-type-select',
  templateUrl: './transaction-type-select.component.html',
  styleUrls: ['./transaction-type-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransactionTypeSelectComponent),
      multi: true
    }
  ]
})
export class TransactionTypeSelectComponent implements OnInit, ControlValueAccessor {
  transactionType = TransactionType;
  selectedType: TransactionType = TransactionType.Debit;
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor() { }

  ngOnInit() {
  }

  selectType(transactionType: TransactionType) {
    this.selectedType = transactionType;
    this.onChange(transactionType);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.selectedType = obj;
  }
}
