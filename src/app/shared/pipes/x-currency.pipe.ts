import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TransactionType } from '../../transactions/state/transaction.model';

@Pipe({
  name: 'xCurrency'
})
export class XCurrencyPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: any, transactionType?: TransactionType): string {
    let transformedValue: string;
    const prefix = transactionType && transactionType === TransactionType.Debit ? '-' : '';
    value = value || 0;

    // shorten 100M
    if (Math.abs(value) >= 1e+8) {
      transformedValue = Number.parseFloat(value).toExponential(3);
    } else {
      transformedValue = this.decimalPipe.transform(value, '1.0-2');
    }

    return prefix + transformedValue;
  }
}
