// TODO DELETE UNUSED
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';

/**
 * Debug combineLatestOrEmpty:
 * Waits for a moment and reports to console which items did not next
 *
 * @param wait number of miliseconds to wait
 * @param namedObs array of objects with a name and a observable
 *                  the name is used to create the report
 */
export function debugCombineLatestOrEmpty<I>(obs: Observable<I>[], wait = 500) {
  const until$ = new Subject()
  const report = []
  setTimeout(() => {
    until$.next(undefined)
    console.log('> Report')
    console.log(`  ${report.map((item, i) => `${i} ${item}`).join('\n')}`)
  }, wait)
  obs.forEach((item, i) => {
    report.push('> No value emitted')
    item.pipe(
      first(),
      takeUntil(until$)
    ).subscribe((val) => {
      report[i] = 'Ok'
    })
  })
  obs = [of(null), ...obs];
  return combineLatest(obs).pipe(
    map((values) => {
      values.shift();
      return values;
    })
  );
}
