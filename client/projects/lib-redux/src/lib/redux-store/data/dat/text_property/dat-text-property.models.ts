import { DatTextProperty } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../../_lib/ByPk';

export class TextPropertySlice {
  by_pk_entity?: ByPk<DatTextProperty>;
  by_fk_entity__fk_system_type?: ByPk<ByPk<DatTextProperty>>;
}

