import { ID } from '@datorama/akita';

export interface Transaction {
  id: ID;
  amount: string;
}

/**
 * A factory function that creates Transactions
 */
export function createTransaction(params: Partial<Transaction>) {
  return {

  } as Transaction;
}
