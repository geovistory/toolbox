import { Observable } from 'rxjs';
/**
 * switchMaps to the default, if condition is true, else to provided elseOutput
 *
 */
export declare function switchMapOr<I, O>(defaultValue: O, elseOutput: (s: I) => Observable<O>, conditionForDefault?: (x: I) => boolean): (source: Observable<I>) => Observable<O>;
