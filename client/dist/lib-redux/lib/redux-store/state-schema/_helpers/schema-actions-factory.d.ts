import { NgRedux } from '@angular-redux/store';
import { GvSubfieldPage } from '@kleiolab/lib-sdk-lb4';
import { FluxStandardAction } from 'flux-standard-action';
import { ActionsObservable } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { IAppState } from '../../root/models/model';
export interface LoadActionMeta {
    addPending: string;
    pk?: number;
}
export interface LoadVersionAction extends LoadActionMeta {
    pkEntity: number;
    entityVersion: number;
}
export interface LoadByPkAndVersionActionMeta {
    addPending: string;
    pk?: number;
    pkEntity: number;
    version: number;
}
export interface ModifyActionMeta<Model> {
    items: Model[];
    addPending: string;
    pk?: number;
}
export interface SucceedActionMeta<Model> {
    items: Model[];
    removePending: string;
    pk?: number;
}
export interface FailActionMeta {
    removePending: string;
    pk?: number;
}
export interface PaginateByParam {
    [key: string]: number | boolean | string;
}
export interface LoadPageMeta {
    page: GvSubfieldPage;
    pk?: number;
}
export interface LoadPageSucceededMeta {
    pks: number[];
    count: number;
    page: GvSubfieldPage;
    pk?: number;
}
export interface ActionResultObservable<Model> {
    pending$: Observable<boolean>;
    resolved$: Observable<SucceedActionMeta<Model>>;
    key: string;
}
export declare type FluxActionObservable<Payload, Meta> = ActionsObservable<FluxStandardAction<Payload, Meta>>;
/**
 * A: Schema Action Type (e.g. DfhAction)
 * M: Model for whitch the Actions are produced
 */
export declare class SchemaActionsFactory<Payload, Model> {
    ngRedux: NgRedux<IAppState>;
    load: (suffix?: string, pk?: number) => ActionResultObservable<Model>;
    /**
     * @param pk is used for facetting
     */
    loadSucceeded: (items: Model[], removePending: string, pk?: number) => void;
    /**
     * @param pk is used for facetting
     */
    upsert: (items: Partial<Model>[], pk?: number) => ActionResultObservable<Model>;
    /**
     * @param pk is used for facetting
     */
    upsertSucceeded: (items: Model[], removePending: string, pk?: number) => void;
    /**
     * @param pk is used for facetting
     */
    delete: (items: Model[], pk?: number) => ActionResultObservable<Model>;
    /**
     * @param pk is used for facetting
     */
    deleteSucceeded: (items: Model[], removePending: string, pk?: number) => void;
    /**
     * @param pk is used for facetting
     */
    failed: (error: any, removePending: string, pk?: number) => void;
    /**
     * @param pk is used for facetting
     */
    loadPage: (page: GvSubfieldPage, pk?: number) => void;
    /**
   * @param pk is used for facetting
   */
    loadPageSucceeded: (pks: number[], count: number, page: GvSubfieldPage, pk?: number) => void;
    loadPageFailed: (page: GvSubfieldPage, pk?: number) => void;
    /**
     * this action is not model specific but pendingKey specific.
     * Reducer will add whole meta part to the resolved key.
     */
    succeeded: (items: Model[], removePending: string, pk?: number) => void;
    actionPrefix: string;
    modelName: string;
    constructor(ngRedux: NgRedux<IAppState>);
    createCrudActions(actionPrefix: string, modelName: string): SchemaActionsFactory<Payload, Model>;
}
export interface SchemaObjectLoadActionMeta {
    removePending: string;
    pk?: number;
}
