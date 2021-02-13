// TODO DELETE
import { shareReplay } from "rxjs/operators";
import { tag } from "rxjs-spy/operators";
/**
 * Decorator function for methods that take any argument and return an
 * obsevable. Decorated Methods will be extended by a cache:
 * For each call to the method with the same input arguments a cache
 * shareReplay operator is added, acting as a middleman subcribing to
 * the Source (the observable returned by the decorated function) and
 * emtting the latest value. Read more about shareReplay here:
 * https://itnext.io/the-magic-of-rxjs-sharing-operators-and-their-differences-3a03d699d255
 *
 * @options:
 */
export const cache = (options) => (target, propertyKey, descriptor) => {
    const o = Object.assign({ 
        // default option
        refCount: true }, options);
    const c = new Map();
    const originalFunction = descriptor.value;
    descriptor.value = function (...request) {
        const uniq = JSON.stringify(request);
        if (!c.has(uniq)) {
            const boundOriginalFunction = originalFunction.bind(this);
            // const x = target, y = propertyKey;
            c.set(uniq, boundOriginalFunction(...request).pipe(shareReplay({ refCount: o.refCount, bufferSize: 1 }), tag(`FROM-CACHE-${target.constructor.name}::${propertyKey}::${request.join(':')}`)));
        }
        return c.get(uniq);
    };
    return descriptor;
};
export function spyTag(target, propertyKey, descriptor) {
    const originalFunction = descriptor.value;
    descriptor.value = function (...request) {
        const boundOriginalFunction = originalFunction.bind(this);
        return boundOriginalFunction(...request).pipe(tag(`${target.constructor.name}::${propertyKey}::${request.join(':')}`));
    };
    return descriptor;
}
//# sourceMappingURL=method-decorators.js.map