import { NgRedux } from '@angular-redux/store';
import { ByPk, IAppState, ReducerConfigCollection, WarActions } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
declare class Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
    selector<M>(indexKey: string): {
        all$: Observable<ByPk<M>>;
        key: (x: string | (string | number)[]) => Observable<M>;
    };
}
declare class WarEntityPreviewSelector extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<WarEntityPreview>>;
        key: (x: string | (string | number)[]) => Observable<WarEntityPreview>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
export declare class WarSelector extends WarActions {
    ngRedux: NgRedux<IAppState>;
    entity_preview$: WarEntityPreviewSelector;
    constructor(ngRedux: NgRedux<IAppState>);
}
export {};
