import { Injectable, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormFactoryConfig } from '../core/form-factory.models';
import { FormGroupFactory } from '../core/form-group-factory';
import { FormFactory } from './FormFactory';

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
