import { ByPk } from 'app/core/redux-store/model';
import { TabCell } from '../sdk-lb4';

export class TabCellSlice {
  by_pk_cell?: ByPk<TabCell>;
  by_fk_column_fk_row?: ByPk<ByPk<TabCell>>;
}

export interface Tab {
  cell?: TabCellSlice;
}




