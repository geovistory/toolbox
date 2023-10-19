import { DfhProperty } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '@kleiolab/lib-utils';

export class DfhPropertySlice {
  by_pk_property__has_domain__has_range?: ByPk<DfhProperty>;
  by_pk_property?: ByPk<ByPk<DfhProperty>>;
  by_has_domain?: ByPk<ByPk<DfhProperty>>;
  by_has_range?: ByPk<ByPk<DfhProperty>>;
  by_is_has_type_subproperty?: ByPk<ByPk<DfhProperty>>;
}
