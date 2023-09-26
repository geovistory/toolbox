import { Injector } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormGroupFactory } from '../core/form-group-factory';
import { FormFactoryConfig } from './FormFactoryConfig';
/**
 * Interface for the internal global object shared and passed down the tree by
 * all Children Factories
 */
export interface FormFactoryGlobal<G, A, C, Ch> extends FormFactoryConfig<G, A, C, Ch> {
    fb: UntypedFormBuilder;
    root?: FormGroupFactory;
    destroy$: Observable<boolean>;
    _injector: Injector;
}
