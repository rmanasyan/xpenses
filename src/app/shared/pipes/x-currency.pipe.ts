import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType } from '../../transactions/state/transaction.model';

@Pipe({
  name: 'xCurrency'
})
export class XCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: any, transactionType?: TransactionType): string {
    const prefix = transactionType && transactionType === TransactionType.Debit ? '-' : '';

    return prefix + this.currencyPipe.transform(value, 'UAH', '',  '1.0-0');
  }

}
