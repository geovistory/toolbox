import { DfhLabel } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '@kleiolab/lib-utils';

export class DfhLabelSlice {
  by_fks?: ByPk<DfhLabel>;
  by_fk_class__type?: ByPk<ByPk<DfhLabel>>;
  by_fk_property__type?: ByPk<ByPk<DfhLabel>>;
  by_fk_profile__type?: ByPk<ByPk<DfhLabel>>;
}
