import firebase from 'firebase/compat/app';
import { Category } from '../../categories/state/category.model';

export enum TransactionType {
  Debit = '-',
  Credit = '+',
}

export interface Transaction {
  id: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  amount: string;
  categoryId: Category['id'];
  category?: Category;
  date: firebase.firestore.Timestamp;
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
