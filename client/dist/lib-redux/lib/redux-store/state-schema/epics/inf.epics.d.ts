import { InfPersistentItemApi, InfStatementApi, InfTemporalEntityApi, InfTextPropertyApi, ProInfoProjRelApi } from '@kleiolab/lib-sdk-lb3';
import { Epic } from 'redux-observable-es6-compat';
import { DatActions, InfActions, ProActions } from '../actions';
import { NotificationsAPIActions } from '../../state-gui/actions';
import { SchemaObjectService } from '../_helpers';
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
    constructor(notification: NotificationsAPIActions, peItApi: InfPersistentItemApi, teEnApi: InfTemporalEntityApi, statementApi: InfStatementApi, textPropertyApi: InfTextPropertyApi, infActions: InfActions, proActions: ProActions, datActions: DatActions, infoProjRelApi: ProInfoProjRelApi, schemaObjectService: SchemaObjectService);
    createEpics(): Epic;
    /**
     * handles the update of store for paginated temporal entity lists.
     * @param pkProject if null, list is handled as 'repo' list
     */
    private handleTemporalEntityListAction;
}
