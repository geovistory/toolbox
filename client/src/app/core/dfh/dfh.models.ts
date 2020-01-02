import { ByPk } from 'app/core/store/model';
import { DfhClass, DfhLabel, DfhProfile, DfhProperty } from '../sdk';

export class DfhProfileSlice {
  by_pk_profile?: DfhProfile;
}

export class DfhClassSlice {
  by_pk_class?: DfhClass;
}

export class DfhPropertySlice {
  by_pk_property?: DfhProperty;
  by_has_domain__pk_property?: ByPk<DfhProperty>;
  by_has_range__pk_property?: ByPk<DfhProperty>;
}

export class DfhLabelSlice {
  by_pk?: DfhLabel;
  by_fk_class__type?: ByPk<DfhLabel>;
  by_fk_property__type?: ByPk<DfhLabel>;
  by_fk_profile__type?: ByPk<DfhLabel>;
}

export interface Dfh {
  profile?: DfhProfileSlice;
  cla?: DfhClassSlice;
  property?: DfhPropertySlice;
  label?: DfhLabelSlice;
}
