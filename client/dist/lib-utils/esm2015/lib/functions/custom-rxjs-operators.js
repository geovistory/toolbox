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
    (source) => {
        if (typeof getArrayFromItemFn !== 'function') {
            throw new TypeError('argument is not a function.');
        }
        /** @type {?} */
        let concatenatedArray = [];
        source.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
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
    d => U.objNr2Arr(d))), map((/**
     * @param {?} a
     * @return {?}
     */
    a => a.map((/**
     * @param {?} q
     * @return {?}
     */
    q => q[q._latestVersion])))));
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
    byPkEntity => byPkEntity[pkEntity])), filter((/**
     * @param {?} entityVersions
     * @return {?}
     */
    entityVersions => entityVersions && entityVersions._latestVersion !== undefined)), map((/**
     * @param {?} entityVersions
     * @return {?}
     */
    entityVersions => entityVersions[entityVersions._latestVersion])));
}
/**
 * @template T
 * @param {?} versions
 * @return {?}
 */
export function latestVersion(versions) {
    /** @type {?} */
    let latestVersion = 0;
    /** @type {?} */
    let latest;
    values(versions).forEach((/**
     * @param {?} v
     * @return {?}
     */
    (v) => {
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
    const ver = values(versions).find((/**
     * @param {?} v
     * @return {?}
     */
    (v) => v.entity_version === version));
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
    (items) => {
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
    (items) => {
        if (!limit)
            return items;
        offset = offset ? offset : 0;
        /** @type {?} */
        const start = limit * offset;
        /** @type {?} */
        const end = start + limit;
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
    (l) => sort((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    (a, b) => {
        /** @type {?} */
        let textA = stringFn(a);
        /** @type {?} */
        let textB = stringFn(b);
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
    }), l)));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXJ4anMtb3BlcmF0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi11dGlscy8iLCJzb3VyY2VzIjpbImxpYi9mdW5jdGlvbnMvY3VzdG9tLXJ4anMtb3BlcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzdDLE9BQU8sRUFBb0IsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7Ozs7QUFFM0IsMEJBRUM7Ozs7O0FBQ0QsbUNBR0M7OztJQUZDLHVDQUF1Qjs7Ozs7OztBQUd6Qix3Q0FFQzs7Ozs7Ozs7OztBQVdELE1BQU0sVUFBVSxTQUFTLENBQU8sa0JBQXFDO0lBQ25FLE9BQU8sR0FBRzs7OztJQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7UUFFekIsSUFBSSxPQUFPLGtCQUFrQixLQUFLLFVBQVUsRUFBRTtZQUM1QyxNQUFNLElBQUksU0FBUyxDQUFDLDZCQUE2QixDQUFDLENBQUM7U0FDcEQ7O1lBRUcsaUJBQWlCLEdBQVEsRUFBRTtRQUMvQixNQUFNLENBQUMsT0FBTzs7OztRQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BCLElBQUksSUFBSTtnQkFBRSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUNuRixDQUFDLEVBQUMsQ0FBQTtRQUVGLE9BQU8saUJBQWlCLENBQUE7SUFDMUIsQ0FBQyxFQUFDLENBQUE7QUFDSixDQUFDOzs7Ozs7O0FBT0QsTUFBTSxVQUFVLG9CQUFvQjtJQUNsQyxPQUFPLElBQUksQ0FDVCxHQUFHOzs7O0lBQUMsQ0FBQyxDQUFD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LENBQUMsQ0FBQztRQUVyQixLQUFLLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsNkJBQTZCO1FBQzFELEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyw2QkFBNkI7UUFDMUQsSUFBSSxLQUFLLEdBQUcsS0FBSyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDWDtRQUNELElBQUksS0FBSyxHQUFHLEtBQUssRUFBRTtZQUNqQixPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0Qsa0JBQWtCO1FBQ2xCLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxHQUFFLENBQUMsQ0FBQyxFQUNKLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uY2F0LCBzb3J0LCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBPcGVyYXRvckZ1bmN0aW9uLCBwaXBlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFUgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJ5UGs8VD4ge1xuICBbcGs6IHN0cmluZ106IFRcbn1cbmV4cG9ydCBpbnRlcmZhY2UgVmVyc2lvbkVudGl0eTxUPiB7XG4gIF9sYXRlc3RWZXJzaW9uOiBudW1iZXIsIC8vIHZlcnNpb24gbnVtYmVyIG9mIHRoZSBsYXRlc3QgdmVyc2lvblxuICBbdjogbnVtYmVyXTogVFxufVxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlWZXJzaW9uc0J5UGs8VD4ge1xuICBbcGtfZW50aXR5OiBudW1iZXJdOiBWZXJzaW9uRW50aXR5PFQ+XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEdlbmVyaWMgb3BlcmF0b3JzXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgYW4gZmxhdGVuZWQgYXJyYXkgY29uc2lzdGluZyBvZiB0aGUgaXRlbXMgb2YgdGhlIGFycmF5cyByZXR1cm5lZCBieSBnZXRBcnJheUZyb21JdGVtRm4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXBDb25jYXQ8VCwgUj4oZ2V0QXJyYXlGcm9tSXRlbUZuOiAodmFsdWU6IFQpID0+IFJbXSk6IE9wZXJhdG9yRnVuY3Rpb248VFtdLCBSW10+IHtcbiAgcmV0dXJuIG1hcCgoc291cmNlOiBUW10pID0+IHtcblxuICAgIGlmICh0eXBlb2YgZ2V0QXJyYXlGcm9tSXRlbUZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBpcyBub3QgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBsZXQgY29uY2F0ZW5hdGVkQXJyYXk6IFJbXSA9IFtdO1xuICAgIHNvdXJjZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGl0ZW0pIGNvbmNhdGVuYXRlZEFycmF5ID0gY29uY2F0KGNvbmNhdGVuYXRlZEFycmF5LCBnZXRBcnJheUZyb21JdGVtRm4oaXRlbSkpXG4gICAgfSlcblxuICAgIHJldHVybiBjb25jYXRlbmF0ZWRBcnJheVxuICB9KVxufVxuXG5cbi8qKlxuICogVGFrZXMgYW4gb2JqZWN0IHdpdGggRW50aXR5VmVyc2lvbnMgaW5kZXhlZCBieSBwa1xuICogUmV0dXJucyBhbiBhcnJheSBjb250YWluaW5nIHRoZSBsYXRlc3QgdmVyc2lvbnMgZm9yIGVhY2ggaW5kZXhlZCBlbnRpdHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxhdGVzdEVudGl0eVZlcnNpb25zPFQ+KCk6IE9wZXJhdG9yRnVuY3Rpb248RW50aXR5VmVyc2lvbnNCeVBrPFQ+LCBUW10+IHtcbiAgcmV0dXJuIHBpcGUoXG4gICAgbWFwKGQgPT4gVS5vYmpOcjJBcnIoZCkpLFxuICAgIG1hcChhID0+IGEubWFwKHEgPT4gcVtxLl9sYXRlc3RWZXJzaW9uXSkpXG4gIClcbn1cblxuXG4vKipcbiAqIFRha2VzIGFuIG9iamVjdCB3aXRoIEVudGl0eVZlcnNpb25zIGluZGV4ZWQgYnkgcGtcbiAqIFJldHVybnMgYW4gdGhlIGxhdGVzdCB2ZXJzaW9ucyBmb3IgZW50aXR5IHdpdGggZ2l2ZW4gcGtFbnRpdHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxhdGVzdEVudGl0eVZlcnNpb248VD4ocGtFbnRpdHk6IG51bWJlcik6IE9wZXJhdG9yRnVuY3Rpb248RW50aXR5VmVyc2lvbnNCeVBrPFQ+LCBUPiB7XG4gIHJldHVybiBwaXBlKFxuICAgIG1hcChieVBrRW50aXR5ID0+IGJ5UGtFbnRpdHlbcGtFbnRpdHldKSxcbiAgICBmaWx0ZXIoZW50aXR5VmVyc2lvbnMgPT4gZW50aXR5VmVyc2lvbnMgJiYgZW50aXR5VmVyc2lvbnMuX2xhdGVzdFZlcnNpb24gIT09IHVuZGVmaW5lZCksXG4gICAgbWFwKGVudGl0eVZlcnNpb25zID0+IGVudGl0eVZlcnNpb25zW2VudGl0eVZlcnNpb25zLl9sYXRlc3RWZXJzaW9uXSlcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbGF0ZXN0VmVyc2lvbjxUPih2ZXJzaW9uczogQnlQazxUPik6IFQge1xuICBsZXQgbGF0ZXN0VmVyc2lvbiA9IDBcbiAgbGV0IGxhdGVzdDtcbiAgdmFsdWVzKHZlcnNpb25zKS5mb3JFYWNoKCh2OiBhbnkpID0+IHtcbiAgICBpZiAodi5lbnRpdHlfdmVyc2lvbiA+IGxhdGVzdFZlcnNpb24pIHtcbiAgICAgIGxhdGVzdFZlcnNpb24gPSB2LmVudGl0eV92ZXJzaW9uO1xuICAgICAgbGF0ZXN0ID0gdjtcbiAgICB9XG4gIH0pXG4gIHJldHVybiBsYXRlc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTcGVjaWZpY1ZlcnNpb248VD4odmVyc2lvbnM6IEJ5UGs8VD4sIHZlcnNpb24pOiBUIHtcbiAgY29uc3QgdmVyID0gdmFsdWVzKHZlcnNpb25zKS5maW5kKCh2OiBhbnkpID0+IHYuZW50aXR5X3ZlcnNpb24gPT09IHZlcnNpb24pXG4gIHJldHVybiB2ZXJcbn1cblxuXG4vKipcbiAqIGxpbWl0cyB0aGUgbnVtYmVyIG9mIGl0ZW1zIGluIGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaW1pdFRvPFQ+KGxpbWl0PzogbnVtYmVyKSB7XG4gIHJldHVybiBtYXAoKGl0ZW1zOiBUW10pID0+IHtcbiAgICBpZiAoIWxpbWl0KSByZXR1cm4gaXRlbXNcbiAgICByZXR1cm4gaXRlbXMuc2xpY2UoMCwgbGltaXQpXG4gIH0pXG59XG5cbi8qKlxuICogbGltaXRzIHRoZSBudW1iZXIgb2YgaXRlbXMgaW4gYXJyYXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbWl0T2Zmc2V0PFQ+KGxpbWl0PzogbnVtYmVyLCBvZmZzZXQ/OiBudW1iZXIpIHtcbiAgcmV0dXJuIG1hcCgoaXRlbXM6IFRbXSkgPT4ge1xuICAgIGlmICghbGltaXQpIHJldHVybiBpdGVtc1xuICAgIG9mZnNldCA9IG9mZnNldCA/IG9mZnNldCA6IDA7XG4gICAgY29uc3Qgc3RhcnQgPSBsaW1pdCAqIG9mZnNldDtcbiAgICBjb25zdCBlbmQgPSBzdGFydCArIGxpbWl0O1xuICAgIHJldHVybiBpdGVtcy5zbGljZShzdGFydCwgZW5kKVxuICB9KVxufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRBYmM8VD4oc3RyaW5nRm46ICh4OiBUKSA9PiBzdHJpbmcpIHtcbiAgcmV0dXJuIG1hcCgobDogVFtdKSA9PiBzb3J0KChhLCBiKSA9PiB7XG4gICAgbGV0IHRleHRBID0gc3RyaW5nRm4oYSlcbiAgICBsZXQgdGV4dEIgPSBzdHJpbmdGbihiKVxuXG4gICAgaWYgKCF0ZXh0QSkgcmV0dXJuIC0xO1xuICAgIGlmICghdGV4dEIpIHJldHVybiAxO1xuXG4gICAgdGV4dEEgPSB0ZXh0QS50b1VwcGVyQ2FzZSgpOyAvLyBpZ25vcmUgdXBwZXIgYW5kIGxvd2VyY2FzZVxuICAgIHRleHRCID0gdGV4dEIudG9VcHBlckNhc2UoKTsgLy8gaWdub3JlIHVwcGVyIGFuZCBsb3dlcmNhc2VcbiAgICBpZiAodGV4dEEgPCB0ZXh0Qikge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBpZiAodGV4dEEgPiB0ZXh0Qikge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIC8vIG5hbWVzIGFyZSBlcXVhbFxuICAgIHJldHVybiAwO1xuICB9LCBsKVxuICApXG59XG5cblxuIl19