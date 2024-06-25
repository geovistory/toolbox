import { Observable } from 'rxjs';
import { FormGroupConfig } from './FormGroupConfig';
import { FormNodeConfig } from './FormNodeConfig';
/**
 * Interface for the public API of the module
 */
export interface FormFactoryConfig<G, A, C, Ch> {
    hideTitle?: boolean;
    rootFormGroup$: Observable<FormGroupConfig<G>>;
    getChildNodeConfigs?: (config?: FormNodeConfig<G, A, C, Ch>) => Observable<FormNodeConfig<G, A, C, Ch>[]>;
}
