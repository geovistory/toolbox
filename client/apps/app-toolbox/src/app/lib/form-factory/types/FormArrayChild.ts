import { AbstractControlFactory } from '../core/abstract-control-factory';
import { FormArrayFactory } from '../core/form-array-factory';
import { FormChildFactory } from '../core/form-child-factory';
import { FormControlFactory } from '../core/form-control-factory';


export interface FormArrayChild<C, A, Ch> extends AbstractControlFactory {
  controlFactory?: FormControlFactory<C>;
  arrayFactory?: FormArrayFactory<C, A, Ch>;
  childFactory?: FormChildFactory<Ch>;
}
