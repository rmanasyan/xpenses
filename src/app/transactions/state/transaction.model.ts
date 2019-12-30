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

export interface TransactionMonth {
  date: string;
  name: string;
}

export type CategorizedTransaction = [Category['id'], { total: number; categoryFull?: Category }];
