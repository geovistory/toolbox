import { UnaryFunction, Observable, pipe, filter, OperatorFunction } from 'rxjs';

/**
 * Unary function preventing all values from passing downstream that are null or undefined.
 * @returns
 */
export function filterNullish<T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
  return pipe(
    filter(x => x != null) as OperatorFunction<T | null |  undefined, T>
  );
}
