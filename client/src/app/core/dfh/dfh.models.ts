import { DfhClass, DfhLabel, DfhPropertyProfileView, DfhPropertyView, DfhClassProfileView } from "../sdk";
import { ByPk } from "app/core/store/model";

export class DfhClassSlice {
  by_dfh_pk_class?: ByPk<DfhClass>;
  loading?: boolean;
}

export class DfhLabelSlice {
  by_dfh_pk_label?: ByPk<DfhLabel>;
  loading?: boolean;
}

export class DfhPropertyProfileViewSlice {
  dfh_has_domain__fk_property?: ByPk<DfhPropertyProfileView>;
  dfh_has_range__fk_property?: ByPk<DfhPropertyProfileView>;
  loading?: boolean;
}

export class DfhPropertyViewSlice {
  dfh_pk_property?: DfhPropertyView;
  dfh_has_domain__fk_property?: ByPk<DfhPropertyView>;
  dfh_has_range__fk_property?: ByPk<DfhPropertyView>;
  loading?: boolean;
}

export class DfhClassProfileViewSlice {
  dfh_fk_profile__fk_class?: ByPk<DfhClassProfileView>;
  loading?: boolean;
}





export interface Dfh {
  cla?: DfhClassSlice;
  property_profile_view?: DfhPropertyProfileViewSlice;
  property_view?: DfhPropertyViewSlice;
  label?: DfhLabelSlice;
}
