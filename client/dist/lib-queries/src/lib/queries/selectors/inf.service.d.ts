import { NgRedux } from '@angular-redux/store';
import { ByPk, EntityModelAndClass, IAppState, IndexStatementByObject, IndexStatementByObjectProperty, IndexStatementBySubject, IndexStatementBySubjectProperty, ReducerConfigCollection } from '@kleiolab/lib-redux';
import { InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive } from '@kleiolab/lib-sdk-lb3';
import { GvFieldId, GvFieldPage } from '@kleiolab/lib-sdk-lb4';
import { Observable } from 'rxjs';
export declare type InfModelName = 'persistent_item' | 'temporal_entity' | 'statement' | 'text_property' | 'appellation' | 'language' | 'place' | 'dimension' | 'lang_string' | 'time_primitive';
declare class Selector {
    ngRedux: NgRedux<IAppState>;
    pkProject$: Observable<number | string>;
    configs: ReducerConfigCollection;
    model: string;
    constructor(ngRedux: NgRedux<IAppState>, pkProject$: Observable<number | string>, configs: ReducerConfigCollection, model: string);
    selector<M>(indexKey: string): {
        all$: Observable<ByPk<M>>;
        key: (x: any) => Observable<M>;
    };
    paginationSelector<M>(): {
        pipePage: (page: GvFieldPage) => Observable<M[]>;
        pipeCount: (page: GvFieldId) => Observable<number>;
        pipePageLoadNeeded: (page: GvFieldPage, trigger$: Observable<any>) => Observable<boolean>;
    };
    pipeItemsInProject<M>(pkProject$: Observable<number | string>, getFkEntity: (item: M) => number): import("rxjs").UnaryFunction<Observable<ByPk<M>>, Observable<ByPk<M>>>;
    pipeItemInProject<M>(pkProject$: Observable<number | string>, getFkEntity: (item: M) => number): import("rxjs").UnaryFunction<Observable<M>, Observable<any>>;
}
declare class InfPersistentItemSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    pkProject$: Observable<number | string>;
    configs: ReducerConfigCollection;
    model: string;
    private _by_pk_entity$;
    private _by_fk_class$;
    constructor(ngRedux: NgRedux<IAppState>, pkProject$: Observable<number | string>, configs: ReducerConfigCollection, model: string);
    by_pk_entity_key$(key: string | number, ofProject?: boolean): Observable<any>;
    by_pk_entity_all$(ofProject?: boolean): Observable<ByPk<InfPersistentItem>>;
    by_fk_class_key$(key: string | number, ofProject?: boolean): Observable<ByPk<InfPersistentItem>>;
}
declare class InfTemporalEntitySelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    pkProject$: Observable<number | string>;
    configs: ReducerConfigCollection;
    model: string;
    _by_pk_entity$: {
        all$: Observable<ByPk<InfTemporalEntity>>;
        key: (x: any) => Observable<InfTemporalEntity>;
    };
    constructor(ngRedux: NgRedux<IAppState>, pkProject$: Observable<number | string>, configs: ReducerConfigCollection, model: string);
    by_pk_entity_key$(key: string | number, ofProject?: boolean): Observable<any>;
}
declare class InfStatementSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    pkProject$: Observable<number | string>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<InfStatement>>;
        key: (x: any) => Observable<InfStatement>;
    };
    by_fk_subject_data$: {
        all$: Observable<ByPk<ByPk<InfStatement>>>;
        key: (x: any) => Observable<ByPk<InfStatement>>;
    };
    pagination$: {
        pipePage: (page: GvFieldPage) => Observable<number[]>;
        pipeCount: (page: GvFieldId) => Observable<number>;
        pipePageLoadNeeded: (page: GvFieldPage, trigger$: Observable<any>) => Observable<boolean>;
    };
    constructor(ngRedux: NgRedux<IAppState>, pkProject$: Observable<number | string>, configs: ReducerConfigCollection, model: string);
    by_pk_entity_key$(key: string | number, ofProject?: boolean): Observable<any>;
    by_subject$(foreignKeys: IndexStatementBySubject, ofProject?: boolean): Observable<InfStatement[]>;
    by_subject_and_property$(foreignKeys: IndexStatementBySubjectProperty, ofProject?: boolean): Observable<InfStatement[]>;
    by_subject_and_property_indexed$(foreignKeys: IndexStatementBySubjectProperty, ofProject?: boolean): Observable<ByPk<InfStatement>>;
    by_object$(foreignKeys: IndexStatementByObject, ofProject?: boolean): Observable<InfStatement[]>;
    by_object_and_property$(foreignKeys: IndexStatementByObjectProperty, ofProject?: boolean): Observable<InfStatement[]>;
    by_object_and_property_indexed$(foreignKeys: IndexStatementByObjectProperty, ofProject?: boolean): Observable<ByPk<InfStatement>>;
}
declare class InfTextPropertySelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    pkProject$: Observable<number | string>;
    configs: ReducerConfigCollection;
    model: string;
    private _by_pk_entity$;
    private _by_fk_concerned_entity__fk_class_field$;
    private _by_fk_concerned_entity$;
    constructor(ngRedux: NgRedux<IAppState>, pkProject$: Observable<number | string>, configs: ReducerConfigCollection, model: string);
    by_pk_entity_key$(key: string | number, ofProject?: boolean): Observable<any>;
    by_fk_concerned_entity__fk_class_field_indexed$(key: string, ofProject?: boolean): Observable<ByPk<InfTextProperty>>;
    by_fk_concerned_entity_indexed$(key: string | number, ofProject?: boolean): Observable<ByPk<InfTextProperty>>;
}
declare class InfAppellationSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    pkProject$: Observable<number | string>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<InfAppellation>>;
        key: (x: any) => Observable<InfAppellation>;
    };
    constructor(ngRedux: NgRedux<IAppState>, pkProject$: Observable<number | string>, configs: ReducerConfigCollection, model: string);
}
declare class InfLangStringSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    pkProject$: Observable<number | string>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<InfLangString>>;
        key: (x: any) => Observable<InfLangString>;
    };
    constructor(ngRedux: NgRedux<IAppState>, pkProject$: Observable<number | string>, configs: ReducerConfigCollection, model: string);
}
declare class InfPlaceSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    pkProject$: Observable<number | string>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<InfPlace>>;
        key: (x: any) => Observable<InfPlace>;
    };
    constructor(ngRedux: NgRedux<IAppState>, pkProject$: Observable<number | string>, configs: ReducerConfigCollection, model: string);
}
declare class InfTimePrimitiveSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    pkProject$: Observable<number | string>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<InfTimePrimitive>>;
        key: (x: any) => Observable<InfTimePrimitive>;
    };
    constructor(ngRedux: NgRedux<IAppState>, pkProject$: Observable<number | string>, configs: ReducerConfigCollection, model: string);
}
declare class InfLanguageSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    pkProject$: Observable<number | string>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<InfLanguage>>;
        key: (x: any) => Observable<InfLanguage>;
    };
    constructor(ngRedux: NgRedux<IAppState>, pkProject$: Observable<number | string>, configs: ReducerConfigCollection, model: string);
}
declare class InfDimensionSelections extends Selector {
    ngRedux: NgRedux<IAppState>;
    pkProject$: Observable<number | string>;
    configs: ReducerConfigCollection;
    model: string;
    by_pk_entity$: {
        all$: Observable<ByPk<InfDimension>>;
        key: (x: any) => Observable<InfDimension>;
    };
    constructor(ngRedux: NgRedux<IAppState>, pkProject$: Observable<number | string>, configs: ReducerConfigCollection, model: string);
}
export declare class InfSelector {
    ngRedux: NgRedux<IAppState>;
    pkProject$: Observable<number | string>;
    persistent_item$: InfPersistentItemSelections;
    temporal_entity$: InfTemporalEntitySelections;
    statement$: InfStatementSelections;
    appellation$: InfAppellationSelections;
    place$: InfPlaceSelections;
    text_property$: InfTextPropertySelections;
    lang_string$: InfLangStringSelections;
    time_primitive$: InfTimePrimitiveSelections;
    language$: InfLanguageSelections;
    dimension$: InfDimensionSelections;
    pkEntityModelMap$: Observable<unknown>;
    constructor(ngRedux: NgRedux<IAppState>, pkProject$: Observable<number | string>);
    getModelOfEntity$(pkEntity: number): Observable<EntityModelAndClass<InfModelName>>;
}
export {};
