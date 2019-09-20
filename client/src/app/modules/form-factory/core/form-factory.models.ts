import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { AbstractControl } from "@angular/forms";

export type FactoryType = 'array' | 'control' | 'group'

export abstract class AbstractControlFactory {
  factoryType: FactoryType
  control: AbstractControl

  valueChanges$ = new BehaviorSubject(undefined)
}


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
