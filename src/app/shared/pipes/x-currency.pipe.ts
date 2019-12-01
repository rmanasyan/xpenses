import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TransactionType } from '../../transactions/state/transaction.model';

@Pipe({
  name: 'xCurrency'
})
export class XCurrencyPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: any, transactionType?: TransactionType): string {
    const prefix = transactionType && transactionType === TransactionType.Debit ? '-' : '';

    return prefix + this.decimalPipe.transform(value, '1.0-2');
  }
}
