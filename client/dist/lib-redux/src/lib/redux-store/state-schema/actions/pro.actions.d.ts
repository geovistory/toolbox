import { NgRedux } from '@angular-redux/store';
import { ProClassFieldConfig, ProDfhClassProjRel, ProDfhProfileProjRel, ProInfoProjRel, ProProject, ProTextProperty } from '@kleiolab/lib-sdk-lb3';
import { ProAnalysis } from '@kleiolab/lib-sdk-lb4';
import { IAppState } from '../../root/models';
import { ProAnalysisSlice, ProInfoProjRelSlice } from '../models';
import { ActionResultObservable, SchemaActionsFactory } from '../_helpers/schema-actions-factory';
declare type Payload = ProInfoProjRelSlice;
export declare class ProProjectActionFactory extends SchemaActionsFactory<Payload, ProProject> {
    ngRedux: NgRedux<IAppState>;
    static readonly OF_ACCOUNT = "OF_ACCOUNT";
    static readonly LOAD_BASICS = "LOAD_BASICS";
    loadOfAccount: (pkProject: any) => ActionResultObservable<ProProject>;
    /**
     * loads the ProProject and the default InfLanguage
     */
    loadBasics: (pkProject: any) => ActionResultObservable<ProProject>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): ProProjectActionFactory;
}
export interface MarkStatementAsFavoriteActionMeta {
    addPending: string;
    pk: number;
    pkStatement: number;
    isOutgoing: boolean;
}
export declare class ProInfoProjRelActionFactory extends SchemaActionsFactory<Payload, ProInfoProjRel> {
    ngRedux: NgRedux<IAppState>;
    static readonly MARK_ROLE_AS_FAVORITE = "MARK_ROLE_AS_FAVORITE";
    markStatementAsFavorite: (pkProject: number, pkStatement: number, isOutgoing: boolean) => ActionResultObservable<ProInfoProjRel>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): ProInfoProjRelActionFactory;
}
export declare class ProDfhClassProjRelActionFactory extends SchemaActionsFactory<Payload, ProDfhClassProjRel> {
    ngRedux: NgRedux<IAppState>;
    static readonly OF_PROJECT = "OF_PROJECT";
    loadOfProject: (pkProject: any) => ActionResultObservable<ProDfhClassProjRel>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): ProDfhClassProjRelActionFactory;
}
export declare class ProDfhProfileProjRelActionFactory extends SchemaActionsFactory<Payload, ProDfhProfileProjRel> {
    ngRedux: NgRedux<IAppState>;
    static readonly OF_PROJECT = "OF_PROJECT";
    loadOfProject: (pkProject: any) => ActionResultObservable<ProDfhProfileProjRel>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): ProDfhProfileProjRelActionFactory;
}
export declare class ProClassFieldConfigActionFactory extends SchemaActionsFactory<Payload, ProClassFieldConfig> {
    ngRedux: NgRedux<IAppState>;
    static readonly OF_PROJECT = "OF_PROJECT";
    loadOfProject: (pkProject: any) => ActionResultObservable<ProClassFieldConfig>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): ProClassFieldConfigActionFactory;
}
export declare class ProTextPropertyActionFactory extends SchemaActionsFactory<Payload, ProTextProperty> {
    ngRedux: NgRedux<IAppState>;
    static readonly OF_PROJECT = "OF_PROJECT";
    loadOfProject: (pkProject: any) => ActionResultObservable<ProTextProperty>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): ProTextPropertyActionFactory;
}
export declare class ProAnalysisActionFactory extends SchemaActionsFactory<ProAnalysisSlice, ProAnalysis> {
    ngRedux: NgRedux<IAppState>;
    static readonly BY_PK_AND_VERSION = "BY_PK_AND_VERSION";
    loadByIdAndVersion: (pkProject: number, pkEntity: number, version: number) => ActionResultObservable<ProAnalysis>;
    constructor(ngRedux: NgRedux<IAppState>);
    createActions(): ProAnalysisActionFactory;
}
export declare class ProActions {
    ngRedux: NgRedux<IAppState>;
    project: ProProjectActionFactory;
    info_proj_rel: ProInfoProjRelActionFactory;
    text_property: ProTextPropertyActionFactory;
    dfh_class_proj_rel: ProDfhClassProjRelActionFactory;
    dfh_profile_proj_rel: ProDfhProfileProjRelActionFactory;
    class_field_config: ProClassFieldConfigActionFactory;
    analysis: ProAnalysisActionFactory;
    constructor(ngRedux: NgRedux<IAppState>);
}
export {};
