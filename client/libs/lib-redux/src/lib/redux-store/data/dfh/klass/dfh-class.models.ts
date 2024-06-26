import { DfhClass } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '@kleiolab/lib-utils';

export class DfhClassSlice {
  by_pk_class?: ByPk<DfhClass>;
  by_basic_type?: ByPk<ByPk<DfhClass>>;
}
