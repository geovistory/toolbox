import { FormArrayFactory } from '../core/form-array-factory';
import { FormGroupFactory } from '../core/form-group-factory';


export interface ParentFactory<C, A, Ch> {
    groupFactory?: FormGroupFactory; arrayFactory?: FormArrayFactory<C, A, Ch>;
}
