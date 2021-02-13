import { NgRedux } from '@angular-redux/store';
import { ByPk, IAppState, ReducerConfigCollection, SysActions, SysConfigSlice, SysRelevantClassSlice } from '@kleiolab/lib-redux';
import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb3';
import { SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
declare class Selector<Slice> {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    slice$: Observable<Slice>;
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
    selector<M>(indexKey: string): {
        all$: Observable<ByPk<M>>;
        key: (x: any) => Observable<M>;
    };
}
declare class SysSystemRelevantClassSelections extends Selector<SysRelevantClassSlice> {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<SysSystemRelevantClass>>;
        key: (x: any) => Observable<SysSystemRelevantClass>;
    };
    by_fk_class$: {
        all$: Observable<ByPk<ByPk<SysSystemRelevantClass>>>;
        key: (x: any) => Observable<ByPk<SysSystemRelevantClass>>;
    };
    by_required_by_sources$: {
        all$: Observable<ByPk<ByPk<SysSystemRelevantClass>>>;
        key: (x: any) => Observable<ByPk<SysSystemRelevantClass>>;
    };
    by_required$: {
        all$: Observable<ByPk<ByPk<SysSystemRelevantClass>>>;
        key: (x: any) => Observable<ByPk<SysSystemRelevantClass>>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
declare class SysConfigSelections extends Selector<SysConfigSlice> {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    main$: Observable<SysConfigValue>;
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
export declare class SysSelector extends SysActions {
    system_relevant_class$: SysSystemRelevantClassSelections;
    config$: SysConfigSelections;
}
export {};
