import { NgRedux } from '@angular-redux/store';
import { ByPk, IAppState, ReducerConfigCollection, TabActions } from '@kleiolab/lib-redux';
import { TabCell } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
declare class Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
    selector<M>(indexKey: string): {
        all$: Observable<ByPk<M>>;
        key: (x: any) => Observable<M>;
    };
}
declare class TabCellSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_cell$: {
        all$: Observable<ByPk<TabCell>>;
        key: (x: any) => Observable<TabCell>;
    };
    by_fk_column_fk_row$: {
        all$: Observable<ByPk<ByPk<TabCell>>>;
        key: (x: any) => Observable<ByPk<TabCell>>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
export declare class TabSelector extends TabActions {
    ngRedux: NgRedux<IAppState>;
    cell$: TabCellSelections;
    constructor(ngRedux: NgRedux<IAppState>);
}
export {};
