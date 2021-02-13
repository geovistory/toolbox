import { opposite } from './opposite';
import { sort } from './sort';
/**
 * Returns an `Operator` that sorts the array according to the values extracted by a specified function.
 * @param mapFn Function that extracts a value from each `T`.
 * @param options Optionally determine whether to sort in reverse (descending).
 */
export function sortBy(mapFn, options = { reverse: false }) {
    return sort(!options.reverse ? sortByFn(mapFn) : opposite(sortByFn(mapFn)));
}
function sortByFn(mapFn) {
    return (itemA, itemB) => {
        const valueA = mapFn(itemA);
        const valueB = mapFn(itemB);
        return typeof valueA === 'string'
            ? compareString(valueA, valueB)
            : compareValue(valueA, valueB);
    };
}
function compareValue(a, b) {
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
function compareString(a, b) {
    return a.localeCompare(b);
}
//# sourceMappingURL=sort-by.js.map