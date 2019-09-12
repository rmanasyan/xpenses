import { defer, Observable } from 'rxjs';

export const prepare = <T>(callback: () => void) => {
  return (source: Observable<T>): Observable<T> => defer(() => {
    callback();
    return source;
  });
};
