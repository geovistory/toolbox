import { InfPersistentItemApi, InfStatementApi, InfTemporalEntityApi, InfTextPropertyApi, ProInfoProjRelApi } from '@kleiolab/lib-sdk-lb3';
import { Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { DatActions } from '../actions/dat.actions';
import { InfActions } from '../actions/inf.actions';
import { ProActions } from '../actions/pro.actions';
import { SchemaService } from '../services/schema.service';
export declare class InfEpics {
    notification: NotificationsAPIActions;
    peItApi: InfPersistentItemApi;
    teEnApi: InfTemporalEntityApi;
    statementApi: InfStatementApi;
    textPropertyApi: InfTextPropertyApi;
    infActions: InfActions;
    proActions: ProActions;
    datActions: DatActions;
    infoProjRelApi: ProInfoProjRelApi;
    private schemaObjectService;
    constructor(notification: NotificationsAPIActions, peItApi: InfPersistentItemApi, teEnApi: InfTemporalEntityApi, statementApi: InfStatementApi, textPropertyApi: InfTextPropertyApi, infActions: InfActions, proActions: ProActions, datActions: DatActions, infoProjRelApi: ProInfoProjRelApi, schemaObjectService: SchemaService);
    createEpics(): Epic;
    /**
     * handles the update of store for paginated temporal entity lists.
     * @param pkProject if null, list is handled as 'repo' list
     */
    private handleTemporalEntityListAction;
}
