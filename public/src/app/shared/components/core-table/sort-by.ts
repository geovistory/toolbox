import { UnaryFunction } from 'rxjs';
import { opposite } from './opposite';
import { sort } from './sort';

/**
 * Returns an `Operator` that sorts the array according to the values extracted by a specified function.
 * @param mapFn Function that extracts a value from each `T`.
 * @param options Optionally determine whether to sort in reverse (descending).
 */
export function sortBy<T>(
  mapFn: (item: T) => any,
  options = { reverse: false }
): UnaryFunction<T[], T[]> {
  return sort(!options.reverse ? sortByFn(mapFn) : opposite(sortByFn(mapFn)));
}

function sortByFn<T>(mapFn: (item: T) => any): (itemA: T, itemB: T) => number {
  return (itemA: T, itemB: T) => {
    const valueA = mapFn(itemA);
    const valueB = mapFn(itemB);

    return typeof valueA === 'string'
      ? compareString(valueA, valueB)
      : compareValue(valueA, valueB);
  };
}

function compareValue(a: any, b: any): 0 | 1 | -1 {
  if (a == null) {
    if (b == null) {
      return 0;
    }
    return -1;
  }
  if (b == null || a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }

  return 0;
}

function compareString(a: string, b: any): number {
  return a.localeCompare(b);
}
