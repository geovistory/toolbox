import { DfhLabel, DfhProfile } from '@kleiolab/lib-sdk-lb3';
import { DfhClass, DfhProperty } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../root/models';


export class DfhProfileSlice {
  by_pk_profile?: ByPk<DfhProfile>;

  loading?: boolean; // todo remove in reducer factory then here
}

export class DfhClassSlice {
  by_pk_class?: ByPk<DfhClass>;
  by_basic_type?: ByPk<ByPk<DfhClass>>;
  loading?: boolean; // todo remove in reducer factory then here
}

export class DfhPropertySlice {
  by_pk_property?: ByPk<ByPk<DfhProperty>>;
  by_has_domain__fk_property?: ByPk<ByPk<DfhProperty>>;
  by_has_range__fk_property?: ByPk<ByPk<DfhProperty>>;
  by_has_domain?: ByPk<ByPk<DfhProperty>>;
  by_has_range?: ByPk<ByPk<DfhProperty>>;
  by_pk_property__has_domain__has_range?: ByPk<DfhProperty>;
  by_is_has_type_subproperty?: ByPk<ByPk<DfhProperty>>;

  loading?: boolean; // todo remove in reducer factory then here
}

export class DfhLabelSlice {
  by_fks?: ByPk<DfhLabel>;
  by_fk_class__type?: ByPk<ByPk<DfhLabel>>;
  by_fk_property__type?: ByPk<ByPk<DfhLabel>>;
  by_fk_profile__type?: ByPk<ByPk<DfhLabel>>;

  loading?: boolean; // todo remove in reducer factory then here
}

export interface Dfh {
  profile?: DfhProfileSlice;
  klass?: DfhClassSlice;
  property?: DfhPropertySlice;
  label?: DfhLabelSlice;

  pkEntityModelMap: ByPk<{ modelName: string }>
}
