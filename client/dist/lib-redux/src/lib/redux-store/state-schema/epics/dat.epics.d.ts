import { DatChunkApi, DatColumnApi, DatDigitalApi, DatNamespaceApi } from '@kleiolab/lib-sdk-lb3';
import { Epic } from 'redux-observable-es6-compat';
import { DatActions, InfActions, ProActions } from '../actions';
import { NotificationsAPIActions } from '../../state-gui/actions';
import { SchemaObjectService } from '../_helpers';
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
