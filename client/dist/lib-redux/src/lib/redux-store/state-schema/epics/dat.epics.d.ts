import { DatChunkApi, DatColumnApi, DatDigitalApi, DatNamespaceApi } from '@kleiolab/lib-sdk-lb3';
import { Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { DatActions } from '../actions/dat.actions';
import { InfActions } from '../actions/inf.actions';
import { ProActions } from '../actions/pro.actions';
import { SchemaService } from '../services/schema.service';
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
    constructor(notification: NotificationsAPIActions, datActions: DatActions, infActions: InfActions, proActions: ProActions, digitalApi: DatDigitalApi, chunkApi: DatChunkApi, columnApi: DatColumnApi, namespaceApi: DatNamespaceApi, schemaObjectService: SchemaService);
    createEpics(): Epic;
}
