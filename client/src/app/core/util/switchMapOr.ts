import { merge, Observable, partition } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { tag } from '../../../../node_modules/rxjs-spy/operators';


/**
 * switchMaps to the default, if condition is true, else to provided elseOutput
 *
 */
export function switchMapOr<I, O>(defaultValue: O, elseOutput: (s: I) => Observable<O>, condition?: (x: I) => boolean) {
  return function (source: Observable<I>): Observable<O> {

    condition = condition ? condition : (x) => (!x || Object.keys(x).length < 1)
    const [mapToDefault$, mapToElseOutput$] = partition(source, condition)

    const default$ = mapToDefault$.pipe(
      mapTo(defaultValue),
      tag(`switchMapOr::mapToDefault`)
    )
    const elseOutput$ = mapToElseOutput$.pipe(
      switchMap(value => elseOutput(value)),
      tag(`switchMapOr::mapToElseOutput`)
    )

    return merge(default$, elseOutput$)

  }
}
