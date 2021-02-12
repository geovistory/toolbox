import { ProInfoProjRelApi } from '@kleiolab/lib-sdk-lb3';
import { Observable } from 'rxjs';
import { ProActions } from '../actions';
import { NotificationsAPIActions } from '../../state-gui/actions';
import { InfActionFactory } from './inf-action-factory';
import { SchemaEpicsFactory } from './schema-epics-factory';
export declare class InfEpicsFactory<Payload, Model> extends SchemaEpicsFactory<Payload, Model> {
    actionPrefix: string;
    modelName: string;
    actions: InfActionFactory<Payload, Model>;
    notifications: NotificationsAPIActions;
    infoProjRelApi: ProInfoProjRelApi;
    proActions: ProActions;
    constructor(actionPrefix: string, modelName: string, actions: InfActionFactory<Payload, Model>, notifications: NotificationsAPIActions, infoProjRelApi: ProInfoProjRelApi, proActions: ProActions);
    /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     */
    createUpsertEpic<T>(apiFn: (meta: T) => Observable<Model[]>, onSuccessHook?: (data: Model[], pk?: any) => void): (action$: any, store: any) => any;
    /**
     * This epic maps the items to remove in minimalisic instances of
     * InfoProjRel, containing only the fk_entity and is_in_project=false.
     * The pk of the project, that removes the items, is transported in meta.pk.
     */
    createRemoveEpic(): (action$: any, store: any) => any;
    /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     */
    createCustomUpsertEpic<T>(apiFn: (meta: T) => Observable<Model[]>, actionSuffix: string, onSuccessHook?: (data: Model[], pk?: any) => void): (action$: any, store: any) => any;
}
