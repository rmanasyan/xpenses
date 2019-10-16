import { ID } from '@datorama/akita';

export interface Transaction {
  id: ID;
  createdAt: Date;
  modifiedAt: Date;
  amount: string;
  category: string;
  date: Date;
  details: string;
  type: string;
}

/**
 * A factory function that creates Transactions
 */
export function createTransaction(params: Partial<Transaction>) {
  return {

  } as Transaction;
}
