import { SubfieldPageControllerService } from '@kleiolab/lib-sdk-lb4';
import { Epic } from 'redux-observable-es6-compat';
import { LoadingBarActions } from '../../state-gui/actions/loading-bar.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { InfActions } from '../actions/inf.actions';
import { SchemaService } from '../services/schema.service';
export declare class SchemaEpics {
    private schemaObjectService;
    private loadingBarActions;
    private notificationActions;
    infActions: InfActions;
    private pag;
    constructor(schemaObjectService: SchemaService, loadingBarActions: LoadingBarActions, notificationActions: NotificationsAPIActions, infActions: InfActions, pag: SubfieldPageControllerService);
    createEpics(): Epic;
}
