import { NgRedux } from '@angular-redux/store';
import { TabCell } from '@kleiolab/lib-sdk-lb4';
import { IAppState } from '../../root/models';
import { TabCellSlice } from '../models';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
export declare class TabActions {
    ngRedux: NgRedux<IAppState>;
    cell: SchemaActionsFactory<TabCellSlice, TabCell>;
    constructor(ngRedux: NgRedux<IAppState>);
}
