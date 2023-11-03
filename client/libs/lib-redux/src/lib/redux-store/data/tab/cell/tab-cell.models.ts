import { TabCell } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '@kleiolab/lib-utils';

export interface TabCellSlice {
  by_pk_cell?: ByPk<TabCell>;
  by_fk_column_fk_row?: ByPk<ByPk<TabCell>>;
}
