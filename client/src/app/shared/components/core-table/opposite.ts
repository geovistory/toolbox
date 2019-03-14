import { UnaryFunction } from 'rxjs';

/**
 * Returns a function that opposes values returned by the specified function.
 *
 * note: opposite means multiplying numbers by -1.
 */
export function opposite(fn: Function): UnaryFunction<any, number>;
export function opposite<T>(fn: (source?: T) => any): UnaryFunction<T, number> {
  return (...args) => fn(...args) * -1;
}
