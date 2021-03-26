import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { FormFactory } from "./form-factory";

export type FactoryType = 'array' | 'control' | 'group' | 'childFactory'

export interface StatusChange {
  status: 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED'
  errors?: ValidationErrors
  children?: StatusChange[]
}

export abstract class AbstractControlFactory {
  factoryType: FactoryType
  control: AbstractControl
  valueChanges$ = new BehaviorSubject(undefined)
  statusChanges$ = new BehaviorSubject<StatusChange>(undefined)

  abstract markAllAsTouched()

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


export interface FormFactoryCompontentInjectData<M> {
  initVal$: M
}

export interface FormFactoryComponent {
  initVal$?: Observable<any>
  formFactory$: Observable<FormFactory>;
  formFactory: FormFactory;
  afterViewInit$: BehaviorSubject<boolean>
}
