import { ID } from '@datorama/akita';
import { firestore } from 'firebase/app';
import { Category } from '../../categories/state/category.model';

export enum TransactionType {
  Debit = '-',
  Credit = '+'
}

export interface Transaction {
  id: ID;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
  amount: string;
  category: Category['id'];
  categoryFull?: Category;
  date: firestore.Timestamp;
  details: string;
  type: TransactionType;
}

export type CategorizedTransaction = [Category['id'], { total: number; categoryFull?: Category }];

/**
 * A factory function that creates Transactions
 */
export function createTransaction(params: Partial<Transaction>) {
  return {

  } as Transaction;
}
