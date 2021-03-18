import { FormGroupConfig } from './FormGroupConfig';
import { FormArrayConfig } from './FormArrayConfig';
import { FormControlConfig } from './FormControlConfig';
import { FormChildFactoryConfig } from './FormChildFactoryConfig';
export interface FormNodeConfig<G, A, C, Ch> {
    group?: FormGroupConfig<G>;
    array?: FormArrayConfig<A>;
    control?: FormControlConfig<C>;
    childFactory?: FormChildFactoryConfig<Ch>;
    id?: string;
    disabled?: boolean;
}
