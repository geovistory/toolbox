import { Observable } from 'rxjs';
/**
 * Debug combineLatestOrEmpty:
 * Waits for a moment and reports to console which items did not next
 *
 * @param wait number of miliseconds to wait
 * @param namedObs array of objects with a name and a observable
 *                  the name is used to create the report
 */
export declare function debugCombineLatestOrEmpty<I>(obs: Observable<I>[], wait?: number): Observable<I[]>;
