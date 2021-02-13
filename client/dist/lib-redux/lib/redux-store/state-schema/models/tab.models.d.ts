import { TabCell } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../root/models/model';
export declare class TabCellSlice {
    by_pk_cell?: ByPk<TabCell>;
    by_fk_column_fk_row?: ByPk<ByPk<TabCell>>;
}
export interface Tab {
    cell?: TabCellSlice;
}
