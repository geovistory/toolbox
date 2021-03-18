import { iif, Observable, of } from 'rxjs';
import { tag } from 'rxjs-spy/operators';
import { switchMap } from 'rxjs/operators';


/**
 * switchMaps to the default, if condition is true, else to provided elseOutput
 *
 */
export function switchMapOr<I, O>(defaultValue: O, elseOutput: (s: I) => Observable<O>, conditionForDefault?: (x: I) => boolean) {
  return function (source: Observable<I>): Observable<O> {

    conditionForDefault = conditionForDefault ? conditionForDefault : (x) => (!x || Object.keys(x).length < 1)

    return source.pipe(
      // auditTime(1),
      switchMap(value => {
        return iif(() => conditionForDefault(value), of(defaultValue), elseOutput(value))
      }),
      tag(`switchMapOr`)
    )

  }
}
