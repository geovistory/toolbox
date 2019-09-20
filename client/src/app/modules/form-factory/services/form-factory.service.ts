import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormGroupFactory } from '../core/form-group-factory';
import { FormArrayFactory } from '../core/form-array-factory';
import { FormControlFactory } from '../core/form-control-factory';

export interface FormFactory {
  formGroup: FormGroup;
  formGroupFactory: FormGroupFactory
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

  // If this is a list, the number defines how many children are added on init
  addOnInit?: number;

  mapValue: (d) => any;


}
export interface FormControlConfig<M> {
  placeholder: string
  data: M // custom data depending on implementation
  required: boolean;
  initValue? // initial value of the control

  mapValue: (d) => any

  // gets called when removed
  removeHook?: () => any
}

export interface FormNodeConfig<G, A, C> {
  group?: FormGroupConfig<G>
  array?: FormArrayConfig<A>
  control?: FormControlConfig<C>

  id?: string

  disabled?: boolean
}

/**
 * Interface for the public API of the module
 */
export interface FormFactoryConfig<G, A, C> {
  hideTitle?: boolean;
  rootFormGroup$: Observable<FormGroupConfig<G>>
  getChildNodeConfigs?: (config?: FormNodeConfig<G, A, C>) => Observable<FormNodeConfig<G, A, C>[]>
}

/**
 * Interface for the internal global object shared and passed down the tree by
 * all Children Factories
 */
export interface FormFactoryGlobal<G, A, C> extends FormFactoryConfig<G, A, C> {
  fb: FormBuilder
  destroy$: Observable<boolean>
}


@Injectable()
export class FormFactoryService {
  constructor(private fb: FormBuilder) {
  }

  create<G, A, C>(config: FormFactoryConfig<G, A, C>, destroy$: Observable<boolean>): Observable<FormFactory> {
    const level = 0;
    const globalConfig = { ...config, fb: this.fb, destroy$ }
    return new FormGroupFactory(globalConfig, level).formFactory$;
  }
}
