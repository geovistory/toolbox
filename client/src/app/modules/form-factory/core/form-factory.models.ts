import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { AbstractControl, ValidationErrors, ValidatorFn, FormBuilder } from '@angular/forms';
import { FormFactory } from "../services/FormFactory";
import { FormGroupFactory } from './form-group-factory';
import { Injector } from '@angular/core';

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
}


export interface FormGroupConfig<M> {
  data: M // custom data depending on implementation
}
export interface FormArrayConfig<A> {
  data: A // custom data depending on implementation

  placeholder: string
  isList?: boolean;
  required?: boolean;
  maxLength?: number;
  validators?: ValidatorFn[]

  // If this is a list, the number defines how many children are added on init
  addOnInit?: number;

  mapValue: (d) => any;


}
export interface FormControlConfig<M> {
  placeholder: string
  data: M // custom data depending on implementation
  required: boolean;
  disabled$?: BehaviorSubject<boolean>;
  validators?: ValidatorFn[]
  initValue? // initial value of the control

  mapValue: (d) => any

  // gets called when removed
  removeHook?: () => any
}
export interface FormChildFactoryConfig<Ch> {
  component: any;
  required: boolean;
  validators?: ValidatorFn[]
  data: Ch

  mapValue: (d) => any

  /**
   * function that gets called when data is injected
   * to child component. the data obbject will be passed
   * in the paramter. The return value will be injected
   */
  getInjectData: (data: Ch) => any

  // gets called when removed
  removeHook?: () => any
}

export interface FormNodeConfig<G, A, C, Ch> {
  group?: FormGroupConfig<G>
  array?: FormArrayConfig<A>
  control?: FormControlConfig<C>
  childFactory?: FormChildFactoryConfig<Ch>
  id?: string

  disabled?: boolean
}

/**
 * Interface for the public API of the module
 */
export interface FormFactoryConfig<G, A, C, Ch> {
  hideTitle?: boolean;
  rootFormGroup$: Observable<FormGroupConfig<G>>
  getChildNodeConfigs?: (config?: FormNodeConfig<G, A, C, Ch>) => Observable<FormNodeConfig<G, A, C, Ch>[]>
}


/**
 * Interface for the internal global object shared and passed down the tree by
 * all Children Factories
 */
export interface FormFactoryGlobal<G, A, C, Ch> extends FormFactoryConfig<G, A, C, Ch> {
  fb: FormBuilder
  root?: FormGroupFactory
  destroy$: Observable<boolean>
  _injector: Injector
}

