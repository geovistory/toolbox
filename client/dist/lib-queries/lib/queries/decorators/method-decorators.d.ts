export interface CacheOptions {
    refCount: boolean;
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
 * @options:
 */
export declare const cache: (options?: CacheOptions) => (target: any, propertyKey: any, descriptor: any) => any;
export declare function spyTag(target: any, propertyKey: any, descriptor: any): any;
