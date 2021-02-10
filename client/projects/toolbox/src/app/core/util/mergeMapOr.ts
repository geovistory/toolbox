import { merge, Observable, partition } from 'rxjs';
import { mapTo, mergeMap } from 'rxjs/operators';

export function mergeMapOr<I, O>(defaultValue: O, elseOutput: (s: I) => Observable<O>, condition?: (x: I) => boolean) {
  return function (source: Observable<I>): Observable<O> {

    condition = condition ? condition : (x) => (!x || Object.keys(x).length < 1)
    const [mapToDefault$, mapToElseOutput$] = partition(source, condition)

    const default$ = mapToDefault$.pipe(
      mapTo(defaultValue)
    )
    const elseOutput$ = mapToElseOutput$.pipe(
      mergeMap(value => elseOutput(value))
    )

    return merge(default$, elseOutput$)

  }
}
