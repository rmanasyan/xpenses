import { ID } from '@datorama/akita';

export interface Transaction {
  id: ID;
}

/**
 * A factory function that creates Transactions
 */
export function createTransaction(params: Partial<Transaction>) {
  return {

  } as Transaction;
}
