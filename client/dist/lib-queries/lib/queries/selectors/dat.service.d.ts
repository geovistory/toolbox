import { NgRedux } from '@angular-redux/store';
import { ByPk, DatActions, IAppState, ReducerConfigCollection } from '@kleiolab/lib-redux';
import { DatChunk, DatColumn, DatDigital, DatNamespace, DatTextProperty } from '@kleiolab/lib-sdk-lb3';
import { DatClassColumnMapping } from '@kleiolab/lib-sdk-lb4';
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
declare class DatDigitalSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity__entity_version$: {
        all$: Observable<ByPk<DatDigital>>;
        key: (x: any) => Observable<DatDigital>;
    };
    by_pk_entity$: {
        all$: Observable<ByPk<ByPk<DatDigital>>>;
        key: (x: any) => Observable<ByPk<DatDigital>>;
    };
    by_pk_text$: {
        all$: Observable<ByPk<ByPk<DatDigital>>>;
        key: (x: any) => Observable<ByPk<DatDigital>>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
    latestVersion(pkDigital: number): Observable<DatDigital>;
}
declare class DatNamespaceSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<DatNamespace>>;
        key: (x: any) => Observable<DatNamespace>;
    };
    by_fk_project$: {
        all$: Observable<ByPk<ByPk<DatNamespace>>>;
        key: (x: any) => Observable<ByPk<DatNamespace>>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
declare class DatChunkSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<DatChunk>>;
        key: (x: any) => Observable<DatChunk>;
    };
    by_fk_text$: {
        all$: Observable<ByPk<ByPk<DatChunk>>>;
        key: (x: any) => Observable<ByPk<DatChunk>>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
declare class DatClassColumnMappingSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<DatClassColumnMapping>>;
        key: (x: any) => Observable<DatClassColumnMapping>;
    };
    by_fk_column$: {
        all$: Observable<ByPk<ByPk<DatClassColumnMapping>>>;
        key: (x: any) => Observable<ByPk<DatClassColumnMapping>>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
declare class DatColumnSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<DatColumn>>;
        key: (x: any) => Observable<DatColumn>;
    };
    by_fk_digital$: {
        all$: Observable<ByPk<ByPk<DatColumn>>>;
        key: (x: any) => Observable<ByPk<DatColumn>>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
declare class DatTextPropertySelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<DatTextProperty>>;
        key: (x: any) => Observable<DatTextProperty>;
    };
    by_fk_entity__fk_system_type$: {
        all$: Observable<ByPk<ByPk<DatTextProperty>>>;
        key: (x: any) => Observable<ByPk<DatTextProperty>>;
    };
    constructor(ngRedux: NgRedux<IAppState>, configs: ReducerConfigCollection, model: string);
}
export declare class DatSelector extends DatActions {
    ngRedux: NgRedux<IAppState>;
    digital$: DatDigitalSelections;
    namespace$: DatNamespaceSelections;
    chunk$: DatChunkSelections;
    column$: DatColumnSelections;
    class_column_mapping$: DatClassColumnMappingSelections;
    text_property$: DatTextPropertySelections;
    constructor(ngRedux: NgRedux<IAppState>);
}
export {};
