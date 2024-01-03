import { ValidationErrors } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import type { FormFactory } from './form-factory';

export type FactoryType = 'array' | 'control' | 'group' | 'childFactory'

export interface StatusChange {
  status: 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED'
  errors?: ValidationErrors
  children?: StatusChange[]
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
