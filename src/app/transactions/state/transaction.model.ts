import { firestore } from 'firebase/app';
import { Category } from '../../categories/state/category.model';

export enum TransactionType {
  Debit = '-',
  Credit = '+',
}

export interface Transaction {
  id: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
  amount: string;
  categoryId: Category['id'];
  category?: Category;
  date: firestore.Timestamp;
  details: string;
  type: TransactionType;
}

export interface TransactionMonth {
  date: string;
  index: number;
  name: string;
  year: number;
}

export type CategorizedTransaction = {
  categoryId: Category['id'];
  total: number;
  category?: Category;
};

export type DailyTransaction = {
  day: string;
  date: Transaction['date'];
  dayTotal: number;
  dayTransactionsAmount: number;
};
