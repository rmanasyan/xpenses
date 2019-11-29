import { ID } from '@datorama/akita';
import { firestore } from 'firebase/app';

export enum TransactionType {
  Debit = '-',
  Credit = '+'
}

export interface Transaction {
  id: ID;
  createdAt: firestore.FieldValue;
  updatedAt: firestore.FieldValue;
  amount: string;
  category: string;
  date: string;
  details: string;
  type: TransactionType;
}

/**
 * A factory function that creates Transactions
 */
export function createTransaction(params: Partial<Transaction>) {
  return {

  } as Transaction;
}