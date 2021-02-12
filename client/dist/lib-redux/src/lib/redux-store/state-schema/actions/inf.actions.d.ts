import { NgRedux } from '@angular-redux/store';
import { DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive } from '@kleiolab/lib-sdk-lb3';
import { IAppState, SchemaObject } from '../../root/models';
import { InfDimensionSlice, InfPersistentItemSlice } from '../models';
import { InfActionFactory } from '../_helpers/inf-action-factory';
import { ActionResultObservable, LoadActionMeta, SchemaActionsFactory } from '../_helpers/schema-actions-factory';
declare type Payload = InfPersistentItemSlice;
export interface LoadByPkMeta extends LoadActionMeta {
    pkEntity: number;
}
export declare type LoadTypesOfProjectAction = LoadActionMeta;
export interface LoadTypeOfProjectAction extends LoadActionMeta {
    pkEntity: number;
}
declare type LoadNestetedPeItResult = InfPersistentItem[];
export declare class InfPersistentItemActionFactory extends InfActionFactory<Payload, InfPersistentItem> {
    ngRedux: NgRedux<IAppState>;
    static readonly MINIMAL_BY_PK = "MINIMAL_BY_PK";
    static readonly TYPES_OF_PROJECT = "TYPES_OF_PROJECT";
    static readonly TYPE_OF_PROJECT = "TYPE_OF_PROJECT";
    loadMinimal: (pkProject: number, pkEntity: number) => ActionResultObservable<SchemaObject>;
    loadNestedObject: (pkProject: number, pkEntity: number) => ActionResultObservable<LoadNestetedPeItResult>;
    typesOfProject: (pkProject: number) => ActionResultObservable<LoadActionMeta>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): InfPersistentItemActionFactory;
}
export declare type PaginatedStatements = number[];
export interface PaginatedStatementList {
    count: number;
    schemas: SchemaObject;
    paginatedStatements: PaginatedStatements;
}
export interface LoadPaginatedStatementListMeta extends LoadActionMeta {
    pkSourceEntity: number;
    pkProperty: number;
    fkTargetClass: number;
    isOutgoing: boolean;
    limit: number;
    offset: number;
    alternatives: boolean;
}
export declare class InfTemporalEntityActionFactory extends InfActionFactory<Payload, InfTemporalEntity> {
    ngRedux: NgRedux<IAppState>;
    static readonly OWN_PROPERTIES = "OWN_PROPERTIES";
    static readonly PAGINATED_LIST = "PAGINATED_LIST";
    static readonly PAGINATED_ALTERNATIVE_LIST = "PAGINATED_ALTERNATIVE_LIST";
    loadNestedObject: (pkProject: number, pkEntity: number) => ActionResultObservable<InfTemporalEntity[]>;
    loadPaginatedList: (pkProject: number, pkSourceEntity: number, pkProperty: number, fkTargetClass: number, isOutgoing: boolean, limit: number, offset: number) => ActionResultObservable<PaginatedStatementList>;
    loadPaginatedAlternativeList: (pkProject: number, pkSourceEntity: number, pkProperty: number, fkTargetClass: number, isOutgoing: boolean, limit: number, offset: number) => ActionResultObservable<PaginatedStatementList>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): InfTemporalEntityActionFactory;
}
export interface FindStatementByParams extends LoadActionMeta {
    ofProject: boolean;
    pkEntity: number;
    pkInfoRange: number;
    pkInfoDomain: number;
    pkProperty: number;
}
export interface ContentTreeMeta extends LoadActionMeta {
    pkExpressionEntity: number;
}
export interface SourcesAndDigitalsOfEntity extends LoadActionMeta {
    ofProject: boolean;
    pkEntity: number;
}
export interface SourcesAndDigitalsOfEntityResult {
    statements: InfStatement[];
    digitals: DatDigital[];
}
export interface LoadOutgoingAlternativeStatements extends LoadActionMeta {
    pkTemporalEntity: number;
    pkProperty: number;
}
export interface LoadIngoingAlternativeStatements extends LoadActionMeta {
    pkEntity: number;
    pkProperty: number;
}
export interface AddToProjectWithTeEntActionMeta {
    pkStatements: number[];
    pk: number;
    addPending: string;
}
export declare class InfStatementActionFactory extends InfActionFactory<Payload, InfStatement> {
    ngRedux: NgRedux<IAppState>;
    static readonly ALTERNATIVES_INGOING = "ALTERNATIVES_INGOING";
    static readonly PAGINATED_LIST = "PAGINATED_LIST";
    static readonly CONTENT_TREE = "CONTENT_TREE";
    static readonly SOURCES_AND_DIGITALS_OF_ENTITY = "SOURCES_AND_DIGITALS_OF_ENTITY";
    static readonly BY_PARAMS = "BY_PARAMS";
    loadIngoingAlternatives: (pkEntity: any, pkProperty: any, pkProjec: any) => ActionResultObservable<InfStatement>;
    loadPaginatedList: (pkProject: number, pkSourceEntity: number, pkProperty: number, fkTargetClass: number, isOutgoing: boolean, limit: number, offset: number) => ActionResultObservable<PaginatedStatementList>;
    sourcesAndDigitalsOfEntity: (ofProject: boolean, pkProject: number, pkEntity: number) => ActionResultObservable<SourcesAndDigitalsOfEntityResult>;
    findByParams: (ofProject: boolean, pkProject: number, pkEntity: number, pkInfoRange: number, pkInfoDomain: number, pkProperty: number) => void;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): InfStatementActionFactory;
}
export interface LoadAlternativeTextProperties extends LoadActionMeta {
    fkEntity: number;
    fkClassField: number;
}
export declare class InfTextPropertyActionFactory extends InfActionFactory<Payload, InfTextProperty> {
    ngRedux: NgRedux<IAppState>;
    static readonly ALTERNATIVES = "ALTERNATIVES";
    loadAlternatives: (fkEntity: any, fkClassField: any, fkProject: any) => ActionResultObservable<InfTextProperty>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): InfTextPropertyActionFactory;
}
export declare class InfActions {
    ngRedux: NgRedux<IAppState>;
    persistent_item: InfPersistentItemActionFactory;
    temporal_entity: InfTemporalEntityActionFactory;
    statement: InfStatementActionFactory;
    language: SchemaActionsFactory<InfPersistentItemSlice, InfLanguage>;
    appellation: SchemaActionsFactory<InfPersistentItemSlice, InfAppellation>;
    lang_string: SchemaActionsFactory<InfPersistentItemSlice, InfLangString>;
    dimension: SchemaActionsFactory<InfDimensionSlice, InfDimension>;
    place: SchemaActionsFactory<InfPersistentItemSlice, InfPlace>;
    time_primitive: SchemaActionsFactory<InfPersistentItemSlice, InfTimePrimitive>;
    text_property: InfTextPropertyActionFactory;
    constructor(ngRedux: NgRedux<IAppState>);
}
export {};
