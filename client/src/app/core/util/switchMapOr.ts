import { merge, Observable, partition, iif, of } from 'rxjs';
import { mapTo, switchMap, delay, auditTime } from 'rxjs/operators';
import { tag } from '../../../../node_modules/rxjs-spy/operators';


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
         return iif(()=>conditionForDefault(value), of(defaultValue), elseOutput(value))
      }),
      tag(`switchMapOr`)
    )
    // const [mapToDefault$, mapToElseOutput$] = partition(source, conditionForDefault)

    // const default$ = mapToDefault$.pipe(
    //   delay(0),
    //   mapTo(defaultValue),
    //   tag(`switchMapOr::mapToDefault`)
    // )
    // const elseOutput$ = mapToElseOutput$.pipe(
    //   switchMap(value => elseOutput(value)),
    //   tag(`switchMapOr::mapToElseOutput`)
    // )

    // return merge(default$, elseOutput$)

  }
}
