import { Observable } from "rxjs";
/**
 * Combine Latest or, if input is an empty array, emit empty array
 */
export declare function combineLatestOrEmpty<I>(obs: Observable<I>[]): Observable<I[]>;
