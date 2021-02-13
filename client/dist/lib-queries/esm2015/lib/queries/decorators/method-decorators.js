/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/decorators/method-decorators.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kLWRlY29yYXRvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFFekMsa0NBRUM7OztJQURDLGdDQUFpQjs7Ozs7Ozs7Ozs7Ozs7QUFjbkIsTUFBTSxPQUFPLEtBQUs7Ozs7QUFBRyxDQUFDLE9BQXNCLEVBQUUsRUFBRTs7Ozs7O0FBQUMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxFQUFFOztVQUM3RSxDQUFDLG1CQUVMLFFBQVEsRUFBRSxJQUFJLElBRVgsT0FBTyxDQUNYOztVQUNLLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRTs7VUFDYixnQkFBZ0IsR0FBRyxVQUFVLENBQUMsS0FBSztJQUN6QyxVQUFVLENBQUMsS0FBSzs7OztJQUFHLFVBQVUsR0FBRyxPQUFPOztjQUMvQixJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7O2tCQUNWLHFCQUFxQixHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDekQscUNBQXFDOztZQUFyQyxxQ0FBcUM7WUFDckMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2hELFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUNwRCxHQUFHLENBQUMsY0FBYyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxXQUFXLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQ25GLENBQUMsQ0FBQTtTQUNIO1FBQ0QsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3BCLENBQUMsQ0FBQSxDQUFDO0lBQ0YsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyxDQUFBLENBQUE7Ozs7Ozs7QUFHRCxNQUFNLFVBQVUsTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVTs7VUFDOUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLEtBQUs7SUFDekMsVUFBVSxDQUFDLEtBQUs7Ozs7SUFBRyxVQUFVLEdBQUcsT0FBTzs7Y0FDL0IscUJBQXFCLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN6RCxPQUFPLHFCQUFxQixDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUMzQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxXQUFXLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQ3hFLENBQUE7SUFDSCxDQUFDLENBQUEsQ0FBQztJQUNGLE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUT0RPIERFTEVURVxuaW1wb3J0IHsgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyB0YWcgfSBmcm9tICdyeGpzLXNweS9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhY2hlT3B0aW9ucyB7XG4gIHJlZkNvdW50OiBib29sZWFuXG59XG4vKipcbiAqIERlY29yYXRvciBmdW5jdGlvbiBmb3IgbWV0aG9kcyB0aGF0IHRha2UgYW55IGFyZ3VtZW50IGFuZCByZXR1cm4gYW5cbiAqIG9ic2V2YWJsZS4gRGVjb3JhdGVkIE1ldGhvZHMgd2lsbCBiZSBleHRlbmRlZCBieSBhIGNhY2hlOlxuICogRm9yIGVhY2ggY2FsbCB0byB0aGUgbWV0aG9kIHdpdGggdGhlIHNhbWUgaW5wdXQgYXJndW1lbnRzIGEgY2FjaGVcbiAqIHNoYXJlUmVwbGF5IG9wZXJhdG9yIGlzIGFkZGVkLCBhY3RpbmcgYXMgYSBtaWRkbGVtYW4gc3ViY3JpYmluZyB0b1xuICogdGhlIFNvdXJjZSAodGhlIG9ic2VydmFibGUgcmV0dXJuZWQgYnkgdGhlIGRlY29yYXRlZCBmdW5jdGlvbikgYW5kXG4gKiBlbXR0aW5nIHRoZSBsYXRlc3QgdmFsdWUuIFJlYWQgbW9yZSBhYm91dCBzaGFyZVJlcGxheSBoZXJlOlxuICogaHR0cHM6Ly9pdG5leHQuaW8vdGhlLW1hZ2ljLW9mLXJ4anMtc2hhcmluZy1vcGVyYXRvcnMtYW5kLXRoZWlyLWRpZmZlcmVuY2VzLTNhMDNkNjk5ZDI1NVxuICpcbiAqIEBvcHRpb25zOlxuICovXG5cbmV4cG9ydCBjb25zdCBjYWNoZSA9IChvcHRpb25zPzogQ2FjaGVPcHRpb25zKSA9PiAodGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcikgPT4ge1xuICBjb25zdCBvOiBDYWNoZU9wdGlvbnMgPSB7XG4gICAgLy8gZGVmYXVsdCBvcHRpb25cbiAgICByZWZDb3VudDogdHJ1ZSxcbiAgICAvLyBvdmVycmlkZSB3aXRoIGN1c3RvbSBvcHRpb25zXG4gICAgLi4ub3B0aW9uc1xuICB9XG4gIGNvbnN0IGMgPSBuZXcgTWFwKClcbiAgY29uc3Qgb3JpZ2luYWxGdW5jdGlvbiA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiAoLi4ucmVxdWVzdCkge1xuICAgIGNvbnN0IHVuaXEgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0KVxuICAgIGlmICghYy5oYXModW5pcSkpIHtcbiAgICAgIGNvbnN0IGJvdW5kT3JpZ2luYWxGdW5jdGlvbiA9IG9yaWdpbmFsRnVuY3Rpb24uYmluZCh0aGlzKVxuICAgICAgLy8gY29uc3QgeCA9IHRhcmdldCwgeSA9IHByb3BlcnR5S2V5O1xuICAgICAgYy5zZXQodW5pcSwgYm91bmRPcmlnaW5hbEZ1bmN0aW9uKC4uLnJlcXVlc3QpLnBpcGUoXG4gICAgICAgIHNoYXJlUmVwbGF5KHsgcmVmQ291bnQ6IG8ucmVmQ291bnQsIGJ1ZmZlclNpemU6IDEgfSksXG4gICAgICAgIHRhZyhgRlJPTS1DQUNIRS0ke3RhcmdldC5jb25zdHJ1Y3Rvci5uYW1lfTo6JHtwcm9wZXJ0eUtleX06OiR7cmVxdWVzdC5qb2luKCc6Jyl9YClcbiAgICAgICkpXG4gICAgfVxuICAgIHJldHVybiBjLmdldCh1bmlxKVxuICB9O1xuICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc3B5VGFnKHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpIHtcbiAgY29uc3Qgb3JpZ2luYWxGdW5jdGlvbiA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiAoLi4ucmVxdWVzdCkge1xuICAgIGNvbnN0IGJvdW5kT3JpZ2luYWxGdW5jdGlvbiA9IG9yaWdpbmFsRnVuY3Rpb24uYmluZCh0aGlzKVxuICAgIHJldHVybiBib3VuZE9yaWdpbmFsRnVuY3Rpb24oLi4ucmVxdWVzdCkucGlwZShcbiAgICAgIHRhZyhgJHt0YXJnZXQuY29uc3RydWN0b3IubmFtZX06OiR7cHJvcGVydHlLZXl9Ojoke3JlcXVlc3Quam9pbignOicpfWApXG4gICAgKVxuICB9O1xuICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cbiJdfQ==