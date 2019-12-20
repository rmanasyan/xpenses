import { ID } from '@datorama/akita';
import { firestore } from 'firebase';

export interface Category {
  id: ID;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
  name: string;
  icon: string;
  sortIndex: number;
}

export function createCategory(params: Partial<Category>) {
  return {} as Category;
}
