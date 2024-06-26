import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Combine Latest or, if input is an empty array, emit empty array
 */


export function combineLatestOrEmpty<I>(obs: Observable<I>[]) {
    obs = [of(null), ...obs];
    return combineLatest(obs).pipe(
        map((values) => {
            values.shift();
            return values;
        })
    );
}
