import { Injectable, Injector } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { U } from 'app/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroupFactory } from '../core/form-group-factory';
import { FormArrayFactory } from '../core/form-array-factory';
import { FormControlFactory } from '../core/form-control-factory';
import { FormChildFactory } from '../core/form-child-factory';

export class FormFactory {
  constructor(
    public formGroup: FormGroup,
    public formGroupFactory: FormGroupFactory
  ) { }
  markAllAsTouched() {
    this.formGroupFactory.markAllAsTouched()
  }
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

  initValue?: any[] // initial value of the array


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


@Injectable()
export class FormFactoryService {
  constructor(
    private fb: FormBuilder,
    public _injector: Injector,
  ) {
  }

  create<G, A, C, Ch>(config: FormFactoryConfig<G, A, C, Ch>, destroy$: Observable<boolean>): Observable<FormFactory> {
    const level = 0;
    const globalConfig = { ...config, fb: this.fb, destroy$, _injector: this._injector }
    return new FormGroupFactory(globalConfig, level).formFactory$;
  }
}
