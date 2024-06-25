import { DatColumn } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../../_lib/ByPk';

export class ColumnSlice {
  by_pk_entity?: ByPk<DatColumn>;
  by_fk_digital?: ByPk<ByPk<DatColumn>>;
}
