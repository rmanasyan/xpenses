import { ID } from '@datorama/akita';

export interface Auth {
  id: ID;
}

/**
 * A factory function that creates Auth
 */
export function createAuth(params: Partial<Auth>) {
  return {

  } as Auth;
}
