import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Category } from '../../../../categories/state/category.model';

@Component({
  selector: 'app-transaction-category-select',
  templateUrl: './transaction-category-select.component.html',
  styleUrls: ['./transaction-category-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TransactionCategorySelectComponent,
      multi: true
    }
  ]
})
export class TransactionCategorySelectComponent implements OnInit, ControlValueAccessor {
  @Input() categories: Category[];
  selectedCategoryId: Category['id'];
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor() { }

  ngOnInit() {
  }

  selectCategory(id: Category['id']) {
    this.selectedCategoryId = id;
    this.onChange(id);
    this.onTouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.selectedCategoryId = obj;
  }
}
