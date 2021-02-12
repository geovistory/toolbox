/**
 * @fileoverview added by tsickle
 * Generated from: custom-rxjs-operators.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { concat, sort, values } from 'ramda';
import { pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { U } from './util';
/**
 * @record
 * @template T
 */
export function ByPk() { }
/**
 * @record
 * @template T
 */
export function VersionEntity() { }
if (false) {
    /** @type {?} */
    VersionEntity.prototype._latestVersion;
    /* Skipping unhandled member: [v: number]: T*/
}
/**
 * @record
 * @template T
 */
export function EntityVersionsByPk() { }
/*****************************************************************************
 * Generic operators
 *****************************************************************************/
/**
 * Returns an Observable that emits an flatened array consisting of the items of the arrays returned by getArrayFromItemFn.
 * @template T, R
 * @param {?} getArrayFromItemFn
 * @return {?}
 */
export function mapConcat(getArrayFromItemFn) {
    return map((/**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        if (typeof getArrayFromItemFn !== 'function') {
            throw new TypeError('argument is not a function.');
        }
        /** @type {?} */
        var concatenatedArray = [];
        source.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item)
                concatenatedArray = concat(concatenatedArray, getArrayFromItemFn(item));
        }));
        return concatenatedArray;
    }));
}
/**
 * Takes an object with EntityVersions indexed by pk
 * Returns an array containing the latest versions for each indexed entity
 * @template T
 * @return {?}
 */
export function latestEntityVersions() {
    return pipe(map((/**
     * @param {?} d
     * @return {?}
     */
    function (d) { return U.objNr2Arr(d); })), map((/**
     * @param {?} a
     * @return {?}
     */
    function (a) { return a.map((/**
     * @param {?} q
     * @return {?}
     */
    function (q) { return q[q._latestVersion]; })); })));
}
/**
 * Takes an object with EntityVersions indexed by pk
 * Returns an the latest versions for entity with given pkEntity
 * @template T
 * @param {?} pkEntity
 * @return {?}
 */
export function latestEntityVersion(pkEntity) {
    return pipe(map((/**
     * @param {?} byPkEntity
     * @return {?}
     */
    function (byPkEntity) { return byPkEntity[pkEntity]; })), filter((/**
     * @param {?} entityVersions
     * @return {?}
     */
    function (entityVersions) { return entityVersions && entityVersions._latestVersion !== undefined; })), map((/**
     * @param {?} entityVersions
     * @return {?}
     */
    function (entityVersions) { return entityVersions[entityVersions._latestVersion]; })));
}
/**
 * @template T
 * @param {?} versions
 * @return {?}
 */
export function latestVersion(versions) {
    /** @type {?} */
    var latestVersion = 0;
    /** @type {?} */
    var latest;
    values(versions).forEach((/**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        if (v.entity_version > latestVersion) {
            latestVersion = v.entity_version;
            latest = v;
        }
    }));
    return latest;
}
/**
 * @template T
 * @param {?} versions
 * @param {?} version
 * @return {?}
 */
export function getSpecificVersion(versions, version) {
    /** @type {?} */
    var ver = values(versions).find((/**
     * @param {?} v
     * @return {?}
     */
    function (v) { return v.entity_version === version; }));
    return ver;
}
/**
 * limits the number of items in array
 * @template T
 * @param {?=} limit
 * @return {?}
 */
export function limitTo(limit) {
    return map((/**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        if (!limit)
            return items;
        return items.slice(0, limit);
    }));
}
/**
 * limits the number of items in array
 * @template T
 * @param {?=} limit
 * @param {?=} offset
 * @return {?}
 */
export function limitOffset(limit, offset) {
    return map((/**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        if (!limit)
            return items;
        offset = offset ? offset : 0;
        /** @type {?} */
        var start = limit * offset;
        /** @type {?} */
        var end = start + limit;
        return items.slice(start, end);
    }));
}
/**
 * @template T
 * @param {?} stringFn
 * @return {?}
 */
export function sortAbc(stringFn) {
    return map((/**
     * @param {?} l
     * @return {?}
     */
    function (l) { return sort((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        /** @type {?} */
        var textA = stringFn(a);
        /** @type {?} */
        var textB = stringFn(b);
        if (!textA)
            return -1;
        if (!textB)
            return 1;
        textA = textA.toUpperCase(); // ignore upper and lowercase
        textB = textB.toUpperCase(); // ignore upper and lowercase
        if (textA < textB) {
            return -1;
        }
        if (textA > textB) {
            return 1;
        }
        // names are equal
        return 0;
    }), l); }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXJ4anMtb3BlcmF0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi11dGlscy9zcmMvbGliL2Z1bmN0aW9ucy8iLCJzb3VyY2VzIjpbImN1c3RvbS1yeGpzLW9wZXJhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM3QyxPQUFPLEVBQW9CLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUM7Ozs7O0FBRTNCLDBCQUVDOzs7OztBQUNELG1DQUdDOzs7SUFGQyx1Q0FBdUI7Ozs7Ozs7QUFHekIsd0NBRUM7Ozs7Ozs7Ozs7QUFXRCxNQUFNLFVBQVUsU0FBUyxDQUFPLGtCQUFxQztJQUNuRSxPQUFPLEdBQUc7Ozs7SUFBQyxVQUFDLE1BQVc7UUFFckIsSUFBSSxPQUFPLGtCQUFrQixLQUFLLFVBQVUsRUFBRTtZQUM1QyxNQUFNLElBQUksU0FBUyxDQUFDLDZCQUE2QixDQUFDLENBQUM7U0FDcEQ7O1lBRUcsaUJBQWlCLEdBQVEsRUFBRTtRQUMvQixNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsSUFBSTtZQUNqQixJQUFJLElBQUk7Z0JBQUUsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDbkYsQ0FBQyxFQUFDLENBQUE7UUFFRixPQUFPLGlCQUFpQixDQUFBO0lBQzFCLENBQUMsRUFBQyxDQUFBO0FBQ0osQ0FBQzs7Ozs7OztBQU9ELE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsT0FBTyxJQUFJLENBQ1QsR0FBRzs7OztJQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEs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SSxDQUFDLEtBQUs7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUVyQixLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsNkJBQTZCO1FBQzFELEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyw2QkFBNkI7UUFDMUQsSUFBSSxLQUFLLEdBQUcsS0FBSyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDWDtRQUNELElBQUksS0FBSyxHQUFHLEtBQUssRUFBRTtZQUNqQixPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0Qsa0JBQWtCO1FBQ2xCLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxHQUFFLENBQUMsQ0FBQyxFQWpCa0IsQ0FpQmxCLEVBQ0osQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb25jYXQsIHNvcnQsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IE9wZXJhdG9yRnVuY3Rpb24sIHBpcGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVSB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnlQazxUPiB7XG4gIFtwazogc3RyaW5nXTogVFxufVxuZXhwb3J0IGludGVyZmFjZSBWZXJzaW9uRW50aXR5PFQ+IHtcbiAgX2xhdGVzdFZlcnNpb246IG51bWJlciwgLy8gdmVyc2lvbiBudW1iZXIgb2YgdGhlIGxhdGVzdCB2ZXJzaW9uXG4gIFt2OiBudW1iZXJdOiBUXG59XG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVZlcnNpb25zQnlQazxUPiB7XG4gIFtwa19lbnRpdHk6IG51bWJlcl06IFZlcnNpb25FbnRpdHk8VD5cbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogR2VuZXJpYyBvcGVyYXRvcnNcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhbiBmbGF0ZW5lZCBhcnJheSBjb25zaXN0aW5nIG9mIHRoZSBpdGVtcyBvZiB0aGUgYXJyYXlzIHJldHVybmVkIGJ5IGdldEFycmF5RnJvbUl0ZW1Gbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcENvbmNhdDxULCBSPihnZXRBcnJheUZyb21JdGVtRm46ICh2YWx1ZTogVCkgPT4gUltdKTogT3BlcmF0b3JGdW5jdGlvbjxUW10sIFJbXT4ge1xuICByZXR1cm4gbWFwKChzb3VyY2U6IFRbXSkgPT4ge1xuXG4gICAgaWYgKHR5cGVvZiBnZXRBcnJheUZyb21JdGVtRm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IGlzIG5vdCBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGxldCBjb25jYXRlbmF0ZWRBcnJheTogUltdID0gW107XG4gICAgc291cmNlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbSkgY29uY2F0ZW5hdGVkQXJyYXkgPSBjb25jYXQoY29uY2F0ZW5hdGVkQXJyYXksIGdldEFycmF5RnJvbUl0ZW1GbihpdGVtKSlcbiAgICB9KVxuXG4gICAgcmV0dXJuIGNvbmNhdGVuYXRlZEFycmF5XG4gIH0pXG59XG5cblxuLyoqXG4gKiBUYWtlcyBhbiBvYmplY3Qgd2l0aCBFbnRpdHlWZXJzaW9ucyBpbmRleGVkIGJ5IHBrXG4gKiBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIGxhdGVzdCB2ZXJzaW9ucyBmb3IgZWFjaCBpbmRleGVkIGVudGl0eVxuICovXG5leHBvcnQgZnVuY3Rpb24gbGF0ZXN0RW50aXR5VmVyc2lvbnM8VD4oKTogT3BlcmF0b3JGdW5jdGlvbjxFbnRpdHlWZXJzaW9uc0J5UGs8VD4sIFRbXT4ge1xuICByZXR1cm4gcGlwZShcbiAgICBtYXAoZCA9PiBVLm9iak5yMkFycihkKSksXG4gICAgbWFwKGEgPT4gYS5tYXAocSA9PiBxW3EuX2xhdGVzdFZlcnNpb25dKSlcbiAgKVxufVxuXG5cbi8qKlxuICogVGFrZXMgYW4gb2JqZWN0IHdpdGggRW50aXR5VmVyc2lvbnMgaW5kZXhlZCBieSBwa1xuICogUmV0dXJucyBhbiB0aGUgbGF0ZXN0IHZlcnNpb25zIGZvciBlbnRpdHkgd2l0aCBnaXZlbiBwa0VudGl0eVxuICovXG5leHBvcnQgZnVuY3Rpb24gbGF0ZXN0RW50aXR5VmVyc2lvbjxUPihwa0VudGl0eTogbnVtYmVyKTogT3BlcmF0b3JGdW5jdGlvbjxFbnRpdHlWZXJzaW9uc0J5UGs8VD4sIFQ+IHtcbiAgcmV0dXJuIHBpcGUoXG4gICAgbWFwKGJ5UGtFbnRpdHkgPT4gYnlQa0VudGl0eVtwa0VudGl0eV0pLFxuICAgIGZpbHRlcihlbnRpdHlWZXJzaW9ucyA9PiBlbnRpdHlWZXJzaW9ucyAmJiBlbnRpdHlWZXJzaW9ucy5fbGF0ZXN0VmVyc2lvbiAhPT0gdW5kZWZpbmVkKSxcbiAgICBtYXAoZW50aXR5VmVyc2lvbnMgPT4gZW50aXR5VmVyc2lvbnNbZW50aXR5VmVyc2lvbnMuX2xhdGVzdFZlcnNpb25dKVxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXRlc3RWZXJzaW9uPFQ+KHZlcnNpb25zOiBCeVBrPFQ+KTogVCB7XG4gIGxldCBsYXRlc3RWZXJzaW9uID0gMFxuICBsZXQgbGF0ZXN0O1xuICB2YWx1ZXModmVyc2lvbnMpLmZvckVhY2goKHY6IGFueSkgPT4ge1xuICAgIGlmICh2LmVudGl0eV92ZXJzaW9uID4gbGF0ZXN0VmVyc2lvbikge1xuICAgICAgbGF0ZXN0VmVyc2lvbiA9IHYuZW50aXR5X3ZlcnNpb247XG4gICAgICBsYXRlc3QgPSB2O1xuICAgIH1cbiAgfSlcbiAgcmV0dXJuIGxhdGVzdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNwZWNpZmljVmVyc2lvbjxUPih2ZXJzaW9uczogQnlQazxUPiwgdmVyc2lvbik6IFQge1xuICBjb25zdCB2ZXIgPSB2YWx1ZXModmVyc2lvbnMpLmZpbmQoKHY6IGFueSkgPT4gdi5lbnRpdHlfdmVyc2lvbiA9PT0gdmVyc2lvbilcbiAgcmV0dXJuIHZlclxufVxuXG5cbi8qKlxuICogbGltaXRzIHRoZSBudW1iZXIgb2YgaXRlbXMgaW4gYXJyYXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbWl0VG88VD4obGltaXQ/OiBudW1iZXIpIHtcbiAgcmV0dXJuIG1hcCgoaXRlbXM6IFRbXSkgPT4ge1xuICAgIGlmICghbGltaXQpIHJldHVybiBpdGVtc1xuICAgIHJldHVybiBpdGVtcy5zbGljZSgwLCBsaW1pdClcbiAgfSlcbn1cblxuLyoqXG4gKiBsaW1pdHMgdGhlIG51bWJlciBvZiBpdGVtcyBpbiBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gbGltaXRPZmZzZXQ8VD4obGltaXQ/OiBudW1iZXIsIG9mZnNldD86IG51bWJlcikge1xuICByZXR1cm4gbWFwKChpdGVtczogVFtdKSA9PiB7XG4gICAgaWYgKCFsaW1pdCkgcmV0dXJuIGl0ZW1zXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ID8gb2Zmc2V0IDogMDtcbiAgICBjb25zdCBzdGFydCA9IGxpbWl0ICogb2Zmc2V0O1xuICAgIGNvbnN0IGVuZCA9IHN0YXJ0ICsgbGltaXQ7XG4gICAgcmV0dXJuIGl0ZW1zLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIH0pXG59XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gc29ydEFiYzxUPihzdHJpbmdGbjogKHg6IFQpID0+IHN0cmluZykge1xuICByZXR1cm4gbWFwKChsOiBUW10pID0+IHNvcnQoKGEsIGIpID0+IHtcbiAgICBsZXQgdGV4dEEgPSBzdHJpbmdGbihhKVxuICAgIGxldCB0ZXh0QiA9IHN0cmluZ0ZuKGIpXG5cbiAgICBpZiAoIXRleHRBKSByZXR1cm4gLTE7XG4gICAgaWYgKCF0ZXh0QikgcmV0dXJuIDE7XG5cbiAgICB0ZXh0QSA9IHRleHRBLnRvVXBwZXJDYXNlKCk7IC8vIGlnbm9yZSB1cHBlciBhbmQgbG93ZXJjYXNlXG4gICAgdGV4dEIgPSB0ZXh0Qi50b1VwcGVyQ2FzZSgpOyAvLyBpZ25vcmUgdXBwZXIgYW5kIGxvd2VyY2FzZVxuICAgIGlmICh0ZXh0QSA8IHRleHRCKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGlmICh0ZXh0QSA+IHRleHRCKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gICAgLy8gbmFtZXMgYXJlIGVxdWFsXG4gICAgcmV0dXJuIDA7XG4gIH0sIGwpXG4gIClcbn1cblxuXG4iXX0=