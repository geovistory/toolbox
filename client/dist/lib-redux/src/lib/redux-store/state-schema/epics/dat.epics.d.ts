import { DatChunkApi, DatDigitalApi, DatNamespaceApi, DatColumnApi } from '@kleiolab/lib-sdk-lb3';
import { Epic } from 'redux-observable-es6-compat';
import { DatActions } from '../actions/dat.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { InfActions } from '../actions/inf.actions';
import { ProActions } from '../actions/pro.actions';
import { SchemaObjectService } from '../services/schema-object.service';
export declare class DatEpics {
    notification: NotificationsAPIActions;
    datActions: DatActions;
    infActions: InfActions;
    proActions: ProActions;
    digitalApi: DatDigitalApi;
    chunkApi: DatChunkApi;
    columnApi: DatColumnApi;
    namespaceApi: DatNamespaceApi;
    private schemaObjectService;
    constructor(notification: NotificationsAPIActions, datActions: DatActions, infActions: InfActions, proActions: ProActions, digitalApi: DatDigitalApi, chunkApi: DatChunkApi, columnApi: DatColumnApi, namespaceApi: DatNamespaceApi, schemaObjectService: SchemaObjectService);
    createEpics(): Epic;
}
