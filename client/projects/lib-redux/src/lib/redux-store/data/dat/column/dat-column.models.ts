import { DatColumn } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../../public-api';

export class ColumnSlice {
  by_pk_entity?: ByPk<DatColumn>;
  by_fk_digital?: ByPk<ByPk<DatColumn>>;
}
