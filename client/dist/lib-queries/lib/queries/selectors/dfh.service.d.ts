import { NgRedux } from '@angular-redux/store';
import { ByPk, DfhActions, DfhClassSlice, DfhLabelSlice, DfhProfileSlice, DfhPropertySlice, IAppState, ReducerConfigCollection } from '@kleiolab/lib-redux';
import { DfhClass, DfhLabel, DfhProfile, DfhProperty } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
import { ShouldPauseService } from '../services/should-pause.service';
declare class Selector<Slice> {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    shouldPause$: Observable<boolean>;
    slice$: Observable<Slice>;
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string, shouldPause$: Observable<boolean>);
    selector<M>(indexKey: string): {
        all$: Observable<ByPk<M>>;
        key: (x: any) => Observable<M>;
        noPause: {
            all$: Observable<ByPk<M>>;
            key: (x: any) => Observable<M>;
        };
    };
}
declare class DfhProfileSelections extends Selector<DfhProfileSlice> {
    by_pk_profile$: {
        all$: Observable<ByPk<DfhProfile>>;
        key: (x: any) => Observable<DfhProfile>;
        noPause: {
            all$: Observable<ByPk<DfhProfile>>;
            key: (x: any) => Observable<DfhProfile>;
        };
    };
}
declare class DfhClassSelections extends Selector<DfhClassSlice> {
    by_pk_class$: {
        all$: Observable<ByPk<DfhClass>>;
        key: (x: any) => Observable<DfhClass>;
        noPause: {
            all$: Observable<ByPk<DfhClass>>;
            key: (x: any) => Observable<DfhClass>;
        };
    };
    by_basic_type$: {
        all$: Observable<ByPk<ByPk<DfhClass>>>;
        key: (x: any) => Observable<ByPk<DfhClass>>;
        noPause: {
            all$: Observable<ByPk<ByPk<DfhClass>>>;
            key: (x: any) => Observable<ByPk<DfhClass>>;
        };
    };
}
declare class DfhPropertySelections extends Selector<DfhPropertySlice> {
    pk_property__has_domain__has_range$: {
        all$: Observable<ByPk<DfhProperty>>;
        key: (x: any) => Observable<DfhProperty>;
        noPause: {
            all$: Observable<ByPk<DfhProperty>>;
            key: (x: any) => Observable<DfhProperty>;
        };
    };
    by_pk_property$: {
        all$: Observable<ByPk<ByPk<DfhProperty>>>;
        key: (x: any) => Observable<ByPk<DfhProperty>>;
        noPause: {
            all$: Observable<ByPk<ByPk<DfhProperty>>>;
            key: (x: any) => Observable<ByPk<DfhProperty>>;
        };
    };
    by_has_domain$: {
        all$: Observable<ByPk<ByPk<DfhProperty>>>;
        key: (x: any) => Observable<ByPk<DfhProperty>>;
        noPause: {
            all$: Observable<ByPk<ByPk<DfhProperty>>>;
            key: (x: any) => Observable<ByPk<DfhProperty>>;
        };
    };
    by_has_range$: {
        all$: Observable<ByPk<ByPk<DfhProperty>>>;
        key: (x: any) => Observable<ByPk<DfhProperty>>;
        noPause: {
            all$: Observable<ByPk<ByPk<DfhProperty>>>;
            key: (x: any) => Observable<ByPk<DfhProperty>>;
        };
    };
    by_is_has_type_subproperty$: {
        all$: Observable<ByPk<ByPk<DfhProperty>>>;
        key: (x: any) => Observable<ByPk<DfhProperty>>;
        noPause: {
            all$: Observable<ByPk<ByPk<DfhProperty>>>;
            key: (x: any) => Observable<ByPk<DfhProperty>>;
        };
    };
}
declare class DfhLabelSelections extends Selector<DfhLabelSlice> {
    by_fks$: {
        all$: Observable<ByPk<DfhLabel>>;
        key: (x: any) => Observable<DfhLabel>;
        noPause: {
            all$: Observable<ByPk<DfhLabel>>;
            key: (x: any) => Observable<DfhLabel>;
        };
    };
    by_fk_class__type$: {
        all$: Observable<ByPk<ByPk<DfhLabel>>>;
        key: (x: any) => Observable<ByPk<DfhLabel>>;
        noPause: {
            all$: Observable<ByPk<ByPk<DfhLabel>>>;
            key: (x: any) => Observable<ByPk<DfhLabel>>;
        };
    };
    by_fk_property__type$: {
        all$: Observable<ByPk<ByPk<DfhLabel>>>;
        key: (x: any) => Observable<ByPk<DfhLabel>>;
        noPause: {
            all$: Observable<ByPk<ByPk<DfhLabel>>>;
            key: (x: any) => Observable<ByPk<DfhLabel>>;
        };
    };
    by_fk_profile__type$: {
        all$: Observable<ByPk<ByPk<DfhLabel>>>;
        key: (x: any) => Observable<ByPk<DfhLabel>>;
        noPause: {
            all$: Observable<ByPk<ByPk<DfhLabel>>>;
            key: (x: any) => Observable<ByPk<DfhLabel>>;
        };
    };
}
export declare class DfhSelector extends DfhActions {
    ngRedux: NgRedux<IAppState>;
    pause: ShouldPauseService;
    profile$: DfhProfileSelections;
    class$: DfhClassSelections;
    property$: DfhPropertySelections;
    label$: DfhLabelSelections;
    constructor(ngRedux: NgRedux<IAppState>, pause: ShouldPauseService);
}
export {};
