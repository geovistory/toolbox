import { UnaryFunction } from 'rxjs';

/**
 * Returns an `Operator` that sorts the array according to a specified compare function
 * @param compareFn Function that compares two values (`a` and `b`).
 * Return `1` for `a -> b`, or `-1` for `b -> a`, or `0` for no change.
 *
 * Default: `Array.prototype.sort`
 */
export function sort<T>(
  compareFn?: (a: T, b: T) => number
): UnaryFunction<T[], T[]> {
  return source => source.slice().sort(compareFn);
}
