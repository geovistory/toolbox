/**
 * @fileoverview added by tsickle
 * Generated from: lib/functions/custom-rxjs-operators.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXJ4anMtb3BlcmF0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi11dGlscy8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvY3VzdG9tLXJ4anMtb3BlcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzdDLE9BQU8sRUFBb0IsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFFM0IsMEJBRUM7Ozs7O0FBQ0QsbUNBR0M7OztJQUZDLHVDQUF1Qjs7Ozs7OztBQUd6Qix3Q0FFQzs7Ozs7Ozs7OztBQVdELE1BQU0sVUFBVSxTQUFTLENBQU8sa0JBQXFDO0lBQ25FLE9BQU8sR0FBRzs7OztJQUFDLFVBQUMsTUFBVztRQUVyQixJQUFJLE9BQU8sa0JBQWtCLEtBQUssVUFBVSxFQUFFO1lBQzVDLE1BQU0sSUFBSSxTQUFTLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUNwRDs7WUFFRyxpQkFBaUIsR0FBUSxFQUFFO1FBQy9CLE1BQU0sQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQSxJQUFJO1lBQ2pCLElBQUksSUFBSTtnQkFBRSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNuRixDQUFDLEVBQUMsQ0FBQTtRQUVGLE9BQU8saUJBQWlCLENBQUE7SUFDMUIsQ0FBQyxFQUFDLENBQUE7QUFDSixDQUFDOzs7Ozs7O0FBT0QsTUFBTSxVQUFVLG9CQUFvQjtJQUNsQyxPQUFPLElBQUksQ0FDVCxHQUFHOzs7O0lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFD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QUMsS0FBSztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXJCLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyw2QkFBNkI7UUFDMUQsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLDZCQUE2QjtRQUMxRCxJQUFJLEtBQUssR0FBRyxLQUFLLEVBQUU7WUFDakIsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNYO1FBQ0QsSUFBSSxLQUFLLEdBQUcsS0FBSyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7UUFDRCxrQkFBa0I7UUFDbEIsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDLEdBQUUsQ0FBQyxDQUFDLEVBakJrQixDQWlCbEIsRUFDSixDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmNhdCwgc29ydCwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgT3BlcmF0b3JGdW5jdGlvbiwgcGlwZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBCeVBrPFQ+IHtcbiAgW3BrOiBzdHJpbmddOiBUXG59XG5leHBvcnQgaW50ZXJmYWNlIFZlcnNpb25FbnRpdHk8VD4ge1xuICBfbGF0ZXN0VmVyc2lvbjogbnVtYmVyLCAvLyB2ZXJzaW9uIG51bWJlciBvZiB0aGUgbGF0ZXN0IHZlcnNpb25cbiAgW3Y6IG51bWJlcl06IFRcbn1cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5VmVyc2lvbnNCeVBrPFQ+IHtcbiAgW3BrX2VudGl0eTogbnVtYmVyXTogVmVyc2lvbkVudGl0eTxUPlxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBHZW5lcmljIG9wZXJhdG9yc1xuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKipcbiAqIFJldHVybnMgYW4gT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIGFuIGZsYXRlbmVkIGFycmF5IGNvbnNpc3Rpbmcgb2YgdGhlIGl0ZW1zIG9mIHRoZSBhcnJheXMgcmV0dXJuZWQgYnkgZ2V0QXJyYXlGcm9tSXRlbUZuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwQ29uY2F0PFQsIFI+KGdldEFycmF5RnJvbUl0ZW1GbjogKHZhbHVlOiBUKSA9PiBSW10pOiBPcGVyYXRvckZ1bmN0aW9uPFRbXSwgUltdPiB7XG4gIHJldHVybiBtYXAoKHNvdXJjZTogVFtdKSA9PiB7XG5cbiAgICBpZiAodHlwZW9mIGdldEFycmF5RnJvbUl0ZW1GbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgaXMgbm90IGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgbGV0IGNvbmNhdGVuYXRlZEFycmF5OiBSW10gPSBbXTtcbiAgICBzb3VyY2UuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtKSBjb25jYXRlbmF0ZWRBcnJheSA9IGNvbmNhdChjb25jYXRlbmF0ZWRBcnJheSwgZ2V0QXJyYXlGcm9tSXRlbUZuKGl0ZW0pKVxuICAgIH0pXG5cbiAgICByZXR1cm4gY29uY2F0ZW5hdGVkQXJyYXlcbiAgfSlcbn1cblxuXG4vKipcbiAqIFRha2VzIGFuIG9iamVjdCB3aXRoIEVudGl0eVZlcnNpb25zIGluZGV4ZWQgYnkgcGtcbiAqIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgbGF0ZXN0IHZlcnNpb25zIGZvciBlYWNoIGluZGV4ZWQgZW50aXR5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXRlc3RFbnRpdHlWZXJzaW9uczxUPigpOiBPcGVyYXRvckZ1bmN0aW9uPEVudGl0eVZlcnNpb25zQnlQazxUPiwgVFtdPiB7XG4gIHJldHVybiBwaXBlKFxuICAgIG1hcChkID0+IFUub2JqTnIyQXJyKGQpKSxcbiAgICBtYXAoYSA9PiBhLm1hcChxID0+IHFbcS5fbGF0ZXN0VmVyc2lvbl0pKVxuICApXG59XG5cblxuLyoqXG4gKiBUYWtlcyBhbiBvYmplY3Qgd2l0aCBFbnRpdHlWZXJzaW9ucyBpbmRleGVkIGJ5IHBrXG4gKiBSZXR1cm5zIGFuIHRoZSBsYXRlc3QgdmVyc2lvbnMgZm9yIGVudGl0eSB3aXRoIGdpdmVuIHBrRW50aXR5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXRlc3RFbnRpdHlWZXJzaW9uPFQ+KHBrRW50aXR5OiBudW1iZXIpOiBPcGVyYXRvckZ1bmN0aW9uPEVudGl0eVZlcnNpb25zQnlQazxUPiwgVD4ge1xuICByZXR1cm4gcGlwZShcbiAgICBtYXAoYnlQa0VudGl0eSA9PiBieVBrRW50aXR5W3BrRW50aXR5XSksXG4gICAgZmlsdGVyKGVudGl0eVZlcnNpb25zID0+IGVudGl0eVZlcnNpb25zICYmIGVudGl0eVZlcnNpb25zLl9sYXRlc3RWZXJzaW9uICE9PSB1bmRlZmluZWQpLFxuICAgIG1hcChlbnRpdHlWZXJzaW9ucyA9PiBlbnRpdHlWZXJzaW9uc1tlbnRpdHlWZXJzaW9ucy5fbGF0ZXN0VmVyc2lvbl0pXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhdGVzdFZlcnNpb248VD4odmVyc2lvbnM6IEJ5UGs8VD4pOiBUIHtcbiAgbGV0IGxhdGVzdFZlcnNpb24gPSAwXG4gIGxldCBsYXRlc3Q7XG4gIHZhbHVlcyh2ZXJzaW9ucykuZm9yRWFjaCgodjogYW55KSA9PiB7XG4gICAgaWYgKHYuZW50aXR5X3ZlcnNpb24gPiBsYXRlc3RWZXJzaW9uKSB7XG4gICAgICBsYXRlc3RWZXJzaW9uID0gdi5lbnRpdHlfdmVyc2lvbjtcbiAgICAgIGxhdGVzdCA9IHY7XG4gICAgfVxuICB9KVxuICByZXR1cm4gbGF0ZXN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3BlY2lmaWNWZXJzaW9uPFQ+KHZlcnNpb25zOiBCeVBrPFQ+LCB2ZXJzaW9uKTogVCB7XG4gIGNvbnN0IHZlciA9IHZhbHVlcyh2ZXJzaW9ucykuZmluZCgodjogYW55KSA9PiB2LmVudGl0eV92ZXJzaW9uID09PSB2ZXJzaW9uKVxuICByZXR1cm4gdmVyXG59XG5cblxuLyoqXG4gKiBsaW1pdHMgdGhlIG51bWJlciBvZiBpdGVtcyBpbiBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gbGltaXRUbzxUPihsaW1pdD86IG51bWJlcikge1xuICByZXR1cm4gbWFwKChpdGVtczogVFtdKSA9PiB7XG4gICAgaWYgKCFsaW1pdCkgcmV0dXJuIGl0ZW1zXG4gICAgcmV0dXJuIGl0ZW1zLnNsaWNlKDAsIGxpbWl0KVxuICB9KVxufVxuXG4vKipcbiAqIGxpbWl0cyB0aGUgbnVtYmVyIG9mIGl0ZW1zIGluIGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW1pdE9mZnNldDxUPihsaW1pdD86IG51bWJlciwgb2Zmc2V0PzogbnVtYmVyKSB7XG4gIHJldHVybiBtYXAoKGl0ZW1zOiBUW10pID0+IHtcbiAgICBpZiAoIWxpbWl0KSByZXR1cm4gaXRlbXNcbiAgICBvZmZzZXQgPSBvZmZzZXQgPyBvZmZzZXQgOiAwO1xuICAgIGNvbnN0IHN0YXJ0ID0gbGltaXQgKiBvZmZzZXQ7XG4gICAgY29uc3QgZW5kID0gc3RhcnQgKyBsaW1pdDtcbiAgICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIGVuZClcbiAgfSlcbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBzb3J0QWJjPFQ+KHN0cmluZ0ZuOiAoeDogVCkgPT4gc3RyaW5nKSB7XG4gIHJldHVybiBtYXAoKGw6IFRbXSkgPT4gc29ydCgoYSwgYikgPT4ge1xuICAgIGxldCB0ZXh0QSA9IHN0cmluZ0ZuKGEpXG4gICAgbGV0IHRleHRCID0gc3RyaW5nRm4oYilcblxuICAgIGlmICghdGV4dEEpIHJldHVybiAtMTtcbiAgICBpZiAoIXRleHRCKSByZXR1cm4gMTtcblxuICAgIHRleHRBID0gdGV4dEEudG9VcHBlckNhc2UoKTsgLy8gaWdub3JlIHVwcGVyIGFuZCBsb3dlcmNhc2VcbiAgICB0ZXh0QiA9IHRleHRCLnRvVXBwZXJDYXNlKCk7IC8vIGlnbm9yZSB1cHBlciBhbmQgbG93ZXJjYXNlXG4gICAgaWYgKHRleHRBIDwgdGV4dEIpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgaWYgKHRleHRBID4gdGV4dEIpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICAvLyBuYW1lcyBhcmUgZXF1YWxcbiAgICByZXR1cm4gMDtcbiAgfSwgbClcbiAgKVxufVxuXG5cbiJdfQ==