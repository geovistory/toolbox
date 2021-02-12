import { FluxStandardAction } from 'flux-standard-action';
import { Action } from 'redux';
import { Observable, Subscriber } from 'rxjs';
import { NotificationsAPIActions } from '../../state-gui/actions';
import { LoadActionMeta, ModifyActionMeta, SchemaActionsFactory } from './schema-actions-factory';
export declare class SchemaEpicsFactory<Payload, Model> {
    actionPrefix: string;
    modelName: string;
    actions: SchemaActionsFactory<Payload, Model>;
    notifications: NotificationsAPIActions;
    constructor(actionPrefix: string, modelName: string, actions: SchemaActionsFactory<Payload, Model>, notifications: NotificationsAPIActions);
    createLoadEpic<T>(apiFn: (meta: T) => Observable<Model[]>, actionSuffix: string, onSuccessHook?: (data: Model[], pk?: any, initialMeta?: T) => void): (action$: import("redux-observable-es6-compat").ActionsObservable<FluxStandardAction<Payload, LoadActionMeta>>, store: any) => Observable<Action<any>>;
    createUpsertEpic<T>(apiFn: (meta: T) => Observable<Model[]>, onSuccessHook?: (data: Model[], pk?: any) => void): (action$: any, store: any) => any;
    createDeleteEpic(apiFn: (meta: ModifyActionMeta<Model>) => Observable<Model[]>): (action$: any, store: any) => any;
    /**
     * Create the string used as action.type
     */
    type(operation: 'LOAD' | 'UPSERT' | ' DELETE', actionSuffix: string): string;
    /**
    * Create the onError logic for standard actions
    * @param globalActions pass in the subscriber to the action$ stream
    */
    onError(globalActions: Subscriber<Action>, error: any, pendingKey: any, pkProject: any): void;
}
