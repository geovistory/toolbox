/**
 * @fileoverview added by tsickle
 * Generated from: decorators/method-decorators.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// TODO DELETE
import { shareReplay } from 'rxjs/operators';
import { tag } from 'rxjs-spy/operators';
/**
 * @record
 */
export function CacheOptions() { }
if (false) {
    /** @type {?} */
    CacheOptions.prototype.refCount;
}
/**
 * Decorator function for methods that take any argument and return an
 * obsevable. Decorated Methods will be extended by a cache:
 * For each call to the method with the same input arguments a cache
 * shareReplay operator is added, acting as a middleman subcribing to
 * the Source (the observable returned by the decorated function) and
 * emtting the latest value. Read more about shareReplay here:
 * https://itnext.io/the-magic-of-rxjs-sharing-operators-and-their-differences-3a03d699d255
 *
 * \@options:
 * @type {?}
 */
export const cache = (/**
 * @param {?=} options
 * @return {?}
 */
(options) => (/**
 * @param {?} target
 * @param {?} propertyKey
 * @param {?} descriptor
 * @return {?}
 */
(target, propertyKey, descriptor) => {
    /** @type {?} */
    const o = Object.assign({ refCount: true }, options);
    /** @type {?} */
    const c = new Map();
    /** @type {?} */
    const originalFunction = descriptor.value;
    descriptor.value = (/**
     * @param {...?} request
     * @return {?}
     */
    function (...request) {
        /** @type {?} */
        const uniq = JSON.stringify(request);
        if (!c.has(uniq)) {
            /** @type {?} */
            const boundOriginalFunction = originalFunction.bind(this)
            // const x = target, y = propertyKey;
            ;
            // const x = target, y = propertyKey;
            c.set(uniq, boundOriginalFunction(...request).pipe(shareReplay({ refCount: o.refCount, bufferSize: 1 }), tag(`FROM-CACHE-${target.constructor.name}::${propertyKey}::${request.join(':')}`)));
        }
        return c.get(uniq);
    });
    return descriptor;
}));
/**
 * @param {?} target
 * @param {?} propertyKey
 * @param {?} descriptor
 * @return {?}
 */
export function spyTag(target, propertyKey, descriptor) {
    /** @type {?} */
    const originalFunction = descriptor.value;
    descriptor.value = (/**
     * @param {...?} request
     * @return {?}
     */
    function (...request) {
        /** @type {?} */
        const boundOriginalFunction = originalFunction.bind(this);
        return boundOriginalFunction(...request).pipe(tag(`${target.constructor.name}::${propertyKey}::${request.join(':')}`));
    });
    return descriptor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kLWRlY29yYXRvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9tZXRob2QtZGVjb3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBRXpDLGtDQUVDOzs7SUFEQyxnQ0FBaUI7Ozs7Ozs7Ozs7Ozs7O0FBY25CLE1BQU0sT0FBTyxLQUFLOzs7O0FBQUcsQ0FBQyxPQUFzQixFQUFFLEVBQUU7Ozs7OztBQUFDLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsRUFBRTs7VUFDN0UsQ0FBQyxtQkFFTCxRQUFRLEVBQUUsSUFBSSxJQUVYLE9BQU8sQ0FDWDs7VUFDSyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUU7O1VBQ2IsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLEtBQUs7SUFDekMsVUFBVSxDQUFDLEtBQUs7Ozs7SUFBRyxVQUFVLEdBQUcsT0FBTzs7Y0FDL0IsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFOztrQkFDVixxQkFBcUIsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3pELHFDQUFxQzs7WUFBckMscUNBQXFDO1lBQ3JDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLHFCQUFxQixDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNoRCxXQUFXLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDcEQsR0FBRyxDQUFDLGNBQWMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssV0FBVyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUNuRixDQUFDLENBQUE7U0FDSDtRQUNELE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUEsQ0FBQztJQUNGLE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsQ0FBQSxDQUFBOzs7Ozs7O0FBR0QsTUFBTSxVQUFVLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVU7O1VBQzlDLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxLQUFLO0lBQ3pDLFVBQVUsQ0FBQyxLQUFLOzs7O0lBQUcsVUFBVSxHQUFHLE9BQU87O2NBQy9CLHFCQUFxQixHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDekQsT0FBTyxxQkFBcUIsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDM0MsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssV0FBVyxLQUFLLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUN4RSxDQUFBO0lBQ0gsQ0FBQyxDQUFBLENBQUM7SUFDRixPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETyBERUxFVEVcbmltcG9ydCB7IHNoYXJlUmVwbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgdGFnIH0gZnJvbSAncnhqcy1zcHkvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBDYWNoZU9wdGlvbnMge1xuICByZWZDb3VudDogYm9vbGVhblxufVxuLyoqXG4gKiBEZWNvcmF0b3IgZnVuY3Rpb24gZm9yIG1ldGhvZHMgdGhhdCB0YWtlIGFueSBhcmd1bWVudCBhbmQgcmV0dXJuIGFuXG4gKiBvYnNldmFibGUuIERlY29yYXRlZCBNZXRob2RzIHdpbGwgYmUgZXh0ZW5kZWQgYnkgYSBjYWNoZTpcbiAqIEZvciBlYWNoIGNhbGwgdG8gdGhlIG1ldGhvZCB3aXRoIHRoZSBzYW1lIGlucHV0IGFyZ3VtZW50cyBhIGNhY2hlXG4gKiBzaGFyZVJlcGxheSBvcGVyYXRvciBpcyBhZGRlZCwgYWN0aW5nIGFzIGEgbWlkZGxlbWFuIHN1YmNyaWJpbmcgdG9cbiAqIHRoZSBTb3VyY2UgKHRoZSBvYnNlcnZhYmxlIHJldHVybmVkIGJ5IHRoZSBkZWNvcmF0ZWQgZnVuY3Rpb24pIGFuZFxuICogZW10dGluZyB0aGUgbGF0ZXN0IHZhbHVlLiBSZWFkIG1vcmUgYWJvdXQgc2hhcmVSZXBsYXkgaGVyZTpcbiAqIGh0dHBzOi8vaXRuZXh0LmlvL3RoZS1tYWdpYy1vZi1yeGpzLXNoYXJpbmctb3BlcmF0b3JzLWFuZC10aGVpci1kaWZmZXJlbmNlcy0zYTAzZDY5OWQyNTVcbiAqXG4gKiBAb3B0aW9uczpcbiAqL1xuXG5leHBvcnQgY29uc3QgY2FjaGUgPSAob3B0aW9ucz86IENhY2hlT3B0aW9ucykgPT4gKHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpID0+IHtcbiAgY29uc3QgbzogQ2FjaGVPcHRpb25zID0ge1xuICAgIC8vIGRlZmF1bHQgb3B0aW9uXG4gICAgcmVmQ291bnQ6IHRydWUsXG4gICAgLy8gb3ZlcnJpZGUgd2l0aCBjdXN0b20gb3B0aW9uc1xuICAgIC4uLm9wdGlvbnNcbiAgfVxuICBjb25zdCBjID0gbmV3IE1hcCgpXG4gIGNvbnN0IG9yaWdpbmFsRnVuY3Rpb24gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24gKC4uLnJlcXVlc3QpIHtcbiAgICBjb25zdCB1bmlxID0gSlNPTi5zdHJpbmdpZnkocmVxdWVzdClcbiAgICBpZiAoIWMuaGFzKHVuaXEpKSB7XG4gICAgICBjb25zdCBib3VuZE9yaWdpbmFsRnVuY3Rpb24gPSBvcmlnaW5hbEZ1bmN0aW9uLmJpbmQodGhpcylcbiAgICAgIC8vIGNvbnN0IHggPSB0YXJnZXQsIHkgPSBwcm9wZXJ0eUtleTtcbiAgICAgIGMuc2V0KHVuaXEsIGJvdW5kT3JpZ2luYWxGdW5jdGlvbiguLi5yZXF1ZXN0KS5waXBlKFxuICAgICAgICBzaGFyZVJlcGxheSh7IHJlZkNvdW50OiBvLnJlZkNvdW50LCBidWZmZXJTaXplOiAxIH0pLFxuICAgICAgICB0YWcoYEZST00tQ0FDSEUtJHt0YXJnZXQuY29uc3RydWN0b3IubmFtZX06OiR7cHJvcGVydHlLZXl9Ojoke3JlcXVlc3Quam9pbignOicpfWApXG4gICAgICApKVxuICAgIH1cbiAgICByZXR1cm4gYy5nZXQodW5pcSlcbiAgfTtcbiAgcmV0dXJuIGRlc2NyaXB0b3I7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNweVRhZyh0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKSB7XG4gIGNvbnN0IG9yaWdpbmFsRnVuY3Rpb24gPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24gKC4uLnJlcXVlc3QpIHtcbiAgICBjb25zdCBib3VuZE9yaWdpbmFsRnVuY3Rpb24gPSBvcmlnaW5hbEZ1bmN0aW9uLmJpbmQodGhpcylcbiAgICByZXR1cm4gYm91bmRPcmlnaW5hbEZ1bmN0aW9uKC4uLnJlcXVlc3QpLnBpcGUoXG4gICAgICB0YWcoYCR7dGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWV9Ojoke3Byb3BlcnR5S2V5fTo6JHtyZXF1ZXN0LmpvaW4oJzonKX1gKVxuICAgIClcbiAgfTtcbiAgcmV0dXJuIGRlc2NyaXB0b3I7XG59XG4iXX0=