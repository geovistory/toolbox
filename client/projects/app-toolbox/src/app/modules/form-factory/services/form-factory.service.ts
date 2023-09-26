import { Injectable, Injector } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormGroupFactory } from '../core/form-group-factory';
import { FormFactory } from '../core/form-factory';
import { FormFactoryConfig } from './FormFactoryConfig';

@Injectable()
export class FormFactoryService {
  constructor(
    private fb: UntypedFormBuilder,
    public _injector: Injector,
  ) {
  }

  create<G, A, C, Ch>(config: FormFactoryConfig<G, A, C, Ch>, destroy$: Observable<boolean>): Observable<FormFactory> {
    const level = 0;
    const globalConfig = { ...config, fb: this.fb, destroy$, _injector: this._injector }
    return new FormGroupFactory(globalConfig, level).formFactory$;
  }
}
