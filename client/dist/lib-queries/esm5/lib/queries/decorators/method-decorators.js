/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/decorators/method-decorators.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
export var cache = (/**
 * @param {?=} options
 * @return {?}
 */
function (options) { return (/**
 * @param {?} target
 * @param {?} propertyKey
 * @param {?} descriptor
 * @return {?}
 */
function (target, propertyKey, descriptor) {
    /** @type {?} */
    var o = tslib_1.__assign({ refCount: true }, options);
    /** @type {?} */
    var c = new Map();
    /** @type {?} */
    var originalFunction = descriptor.value;
    descriptor.value = (/**
     * @param {...?} request
     * @return {?}
     */
    function () {
        var request = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            request[_i] = arguments[_i];
        }
        /** @type {?} */
        var uniq = JSON.stringify(request);
        if (!c.has(uniq)) {
            /** @type {?} */
            var boundOriginalFunction = originalFunction.bind(this)
            // const x = target, y = propertyKey;
            ;
            // const x = target, y = propertyKey;
            c.set(uniq, boundOriginalFunction.apply(void 0, tslib_1.__spread(request)).pipe(shareReplay({ refCount: o.refCount, bufferSize: 1 }), tag("FROM-CACHE-" + target.constructor.name + "::" + propertyKey + "::" + request.join(':'))));
        }
        return c.get(uniq);
    });
    return descriptor;
}); });
/**
 * @param {?} target
 * @param {?} propertyKey
 * @param {?} descriptor
 * @return {?}
 */
export function spyTag(target, propertyKey, descriptor) {
    /** @type {?} */
    var originalFunction = descriptor.value;
    descriptor.value = (/**
     * @param {...?} request
     * @return {?}
     */
    function () {
        var request = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            request[_i] = arguments[_i];
        }
        /** @type {?} */
        var boundOriginalFunction = originalFunction.bind(this);
        return boundOriginalFunction.apply(void 0, tslib_1.__spread(request)).pipe(tag(target.constructor.name + "::" + propertyKey + "::" + request.join(':')));
    });
    return descriptor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0aG9kLWRlY29yYXRvcnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBRXpDLGtDQUVDOzs7SUFEQyxnQ0FBaUI7Ozs7Ozs7Ozs7Ozs7O0FBY25CLE1BQU0sS0FBTyxLQUFLOzs7O0FBQUcsVUFBQyxPQUFzQjs7Ozs7O0FBQUssVUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVU7O1FBQ3pFLENBQUMsc0JBRUwsUUFBUSxFQUFFLElBQUksSUFFWCxPQUFPLENBQ1g7O1FBQ0ssQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFOztRQUNiLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxLQUFLO0lBQ3pDLFVBQVUsQ0FBQyxLQUFLOzs7O0lBQUc7UUFBVSxpQkFBVTthQUFWLFVBQVUsRUFBVixxQkFBVSxFQUFWLElBQVU7WUFBViw0QkFBVTs7O1lBQy9CLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTs7Z0JBQ1YscUJBQXFCLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN6RCxxQ0FBcUM7O1lBQXJDLHFDQUFxQztZQUNyQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxxQkFBcUIsZ0NBQUksT0FBTyxHQUFFLElBQUksQ0FDaEQsV0FBVyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQ3BELEdBQUcsQ0FBQyxnQkFBYyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksVUFBSyxXQUFXLFVBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUNuRixDQUFDLENBQUE7U0FDSDtRQUNELE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQixDQUFDLENBQUEsQ0FBQztJQUNGLE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsSUFBQSxDQUFBOzs7Ozs7O0FBR0QsTUFBTSxVQUFVLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVU7O1FBQzlDLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxLQUFLO0lBQ3pDLFVBQVUsQ0FBQyxLQUFLOzs7O0lBQUc7UUFBVSxpQkFBVTthQUFWLFVBQVUsRUFBVixxQkFBVSxFQUFWLElBQVU7WUFBViw0QkFBVTs7O1lBQy9CLHFCQUFxQixHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDekQsT0FBTyxxQkFBcUIsZ0NBQUksT0FBTyxHQUFFLElBQUksQ0FDM0MsR0FBRyxDQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxVQUFLLFdBQVcsVUFBSyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQ3hFLENBQUE7SUFDSCxDQUFDLENBQUEsQ0FBQztJQUNGLE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUT0RPIERFTEVURVxuaW1wb3J0IHsgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyB0YWcgfSBmcm9tICdyeGpzLXNweS9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhY2hlT3B0aW9ucyB7XG4gIHJlZkNvdW50OiBib29sZWFuXG59XG4vKipcbiAqIERlY29yYXRvciBmdW5jdGlvbiBmb3IgbWV0aG9kcyB0aGF0IHRha2UgYW55IGFyZ3VtZW50IGFuZCByZXR1cm4gYW5cbiAqIG9ic2V2YWJsZS4gRGVjb3JhdGVkIE1ldGhvZHMgd2lsbCBiZSBleHRlbmRlZCBieSBhIGNhY2hlOlxuICogRm9yIGVhY2ggY2FsbCB0byB0aGUgbWV0aG9kIHdpdGggdGhlIHNhbWUgaW5wdXQgYXJndW1lbnRzIGEgY2FjaGVcbiAqIHNoYXJlUmVwbGF5IG9wZXJhdG9yIGlzIGFkZGVkLCBhY3RpbmcgYXMgYSBtaWRkbGVtYW4gc3ViY3JpYmluZyB0b1xuICogdGhlIFNvdXJjZSAodGhlIG9ic2VydmFibGUgcmV0dXJuZWQgYnkgdGhlIGRlY29yYXRlZCBmdW5jdGlvbikgYW5kXG4gKiBlbXR0aW5nIHRoZSBsYXRlc3QgdmFsdWUuIFJlYWQgbW9yZSBhYm91dCBzaGFyZVJlcGxheSBoZXJlOlxuICogaHR0cHM6Ly9pdG5leHQuaW8vdGhlLW1hZ2ljLW9mLXJ4anMtc2hhcmluZy1vcGVyYXRvcnMtYW5kLXRoZWlyLWRpZmZlcmVuY2VzLTNhMDNkNjk5ZDI1NVxuICpcbiAqIEBvcHRpb25zOlxuICovXG5cbmV4cG9ydCBjb25zdCBjYWNoZSA9IChvcHRpb25zPzogQ2FjaGVPcHRpb25zKSA9PiAodGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcikgPT4ge1xuICBjb25zdCBvOiBDYWNoZU9wdGlvbnMgPSB7XG4gICAgLy8gZGVmYXVsdCBvcHRpb25cbiAgICByZWZDb3VudDogdHJ1ZSxcbiAgICAvLyBvdmVycmlkZSB3aXRoIGN1c3RvbSBvcHRpb25zXG4gICAgLi4ub3B0aW9uc1xuICB9XG4gIGNvbnN0IGMgPSBuZXcgTWFwKClcbiAgY29uc3Qgb3JpZ2luYWxGdW5jdGlvbiA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiAoLi4ucmVxdWVzdCkge1xuICAgIGNvbnN0IHVuaXEgPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0KVxuICAgIGlmICghYy5oYXModW5pcSkpIHtcbiAgICAgIGNvbnN0IGJvdW5kT3JpZ2luYWxGdW5jdGlvbiA9IG9yaWdpbmFsRnVuY3Rpb24uYmluZCh0aGlzKVxuICAgICAgLy8gY29uc3QgeCA9IHRhcmdldCwgeSA9IHByb3BlcnR5S2V5O1xuICAgICAgYy5zZXQodW5pcSwgYm91bmRPcmlnaW5hbEZ1bmN0aW9uKC4uLnJlcXVlc3QpLnBpcGUoXG4gICAgICAgIHNoYXJlUmVwbGF5KHsgcmVmQ291bnQ6IG8ucmVmQ291bnQsIGJ1ZmZlclNpemU6IDEgfSksXG4gICAgICAgIHRhZyhgRlJPTS1DQUNIRS0ke3RhcmdldC5jb25zdHJ1Y3Rvci5uYW1lfTo6JHtwcm9wZXJ0eUtleX06OiR7cmVxdWVzdC5qb2luKCc6Jyl9YClcbiAgICAgICkpXG4gICAgfVxuICAgIHJldHVybiBjLmdldCh1bmlxKVxuICB9O1xuICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc3B5VGFnKHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpIHtcbiAgY29uc3Qgb3JpZ2luYWxGdW5jdGlvbiA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiAoLi4ucmVxdWVzdCkge1xuICAgIGNvbnN0IGJvdW5kT3JpZ2luYWxGdW5jdGlvbiA9IG9yaWdpbmFsRnVuY3Rpb24uYmluZCh0aGlzKVxuICAgIHJldHVybiBib3VuZE9yaWdpbmFsRnVuY3Rpb24oLi4ucmVxdWVzdCkucGlwZShcbiAgICAgIHRhZyhgJHt0YXJnZXQuY29uc3RydWN0b3IubmFtZX06OiR7cHJvcGVydHlLZXl9Ojoke3JlcXVlc3Quam9pbignOicpfWApXG4gICAgKVxuICB9O1xuICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cbiJdfQ==