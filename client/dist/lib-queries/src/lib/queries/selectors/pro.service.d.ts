import { NgRedux } from '@angular-redux/store';
import { ByPk, IAppState, ProActions, ReducerConfigCollection } from '@kleiolab/lib-redux';
import { ProDfhClassProjRel, ProDfhProfileProjRel, ProInfoProjRel, ProTextProperty } from '@kleiolab/lib-sdk-lb3';
import { ProAnalysis, ProClassFieldConfig, ProProject } from '@kleiolab/lib-sdk-lb4';
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
declare class ProProjectSelector extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<ProProject>>;
        key: (x: string | (string | number)[]) => Observable<ProProject>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
declare class ProInfoProjRelSelector extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_fk_project__fk_entity$: {
        all$: Observable<ByPk<ProInfoProjRel>>;
        key: (x: string | (string | number)[]) => Observable<ProInfoProjRel>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
declare class ProDfhClassProjRelSelector extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_fk_project__enabled_in_entities$: {
        all$: Observable<ByPk<ByPk<ProDfhClassProjRel>>>;
        key: (x: string | (string | number)[]) => Observable<ByPk<ProDfhClassProjRel>>;
    };
    by_fk_project__fk_class$: {
        all$: Observable<ByPk<ProDfhClassProjRel>>;
        key: (x: string | (string | number)[]) => Observable<ProDfhClassProjRel>;
    };
    by_fk_project$: {
        all$: Observable<ByPk<ProDfhClassProjRel>>;
        key: (x: string | (string | number)[]) => Observable<ProDfhClassProjRel>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
declare class ProDfhProfileProjRelSelector extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_fk_project__enabled$: {
        all$: Observable<ByPk<ByPk<ProDfhProfileProjRel>>>;
        key: (x: string | (string | number)[]) => Observable<ByPk<ProDfhProfileProjRel>>;
    };
    by_fk_project__fk_profile$: {
        all$: Observable<ByPk<ProDfhProfileProjRel>>;
        key: (x: string | (string | number)[]) => Observable<ProDfhProfileProjRel>;
    };
    by_fk_project$: {
        all$: Observable<ByPk<ProDfhProfileProjRel>>;
        key: (x: string | (string | number)[]) => Observable<ProDfhProfileProjRel>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
declare class ProClassFieldConfigSelector extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_fk_project__fk_class$: {
        all$: Observable<ByPk<ByPk<ProClassFieldConfig>>>;
        key: (x: string | (string | number)[]) => Observable<ByPk<ProClassFieldConfig>>;
    };
    by_pk_entity$: {
        all$: Observable<ByPk<ProClassFieldConfig>>;
        key: (x: string | (string | number)[]) => Observable<ProClassFieldConfig>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
declare class ProTextPropertySelector extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_fks$: {
        all$: Observable<ByPk<ProTextProperty>>;
        key: (x: string | (string | number)[]) => Observable<ProTextProperty>;
    };
    by_fks_without_lang$: {
        all$: Observable<ByPk<ByPk<ProTextProperty>>>;
        key: (x: string | (string | number)[]) => Observable<ByPk<ProTextProperty>>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
declare class ProAnalysisSelector extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<ProAnalysis>>;
        key: (x: string | (string | number)[]) => Observable<ProAnalysis>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
export declare class ProSelector extends ProActions {
    ngRedux: NgRedux<IAppState>;
    project$: ProProjectSelector;
    info_proj_rel$: ProInfoProjRelSelector;
    dfh_class_proj_rel$: ProDfhClassProjRelSelector;
    dfh_profile_proj_rel$: ProDfhProfileProjRelSelector;
    class_field_config$: ProClassFieldConfigSelector;
    text_property$: ProTextPropertySelector;
    analysis$: ProAnalysisSelector;
    constructor(ngRedux: NgRedux<IAppState>);
}
export {};
