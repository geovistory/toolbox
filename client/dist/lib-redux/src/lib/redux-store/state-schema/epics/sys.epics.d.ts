import { SysSystemRelevantClassApi } from '@kleiolab/lib-sdk-lb3';
import { SystemConfigurationService } from '@kleiolab/lib-sdk-lb4';
import { Epic } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { SysActions } from '../actions/sys.actions';
export declare class SysEpics {
    private actions;
    private notification;
    private sysRelevantClassApi;
    private sysConfigApi;
    constructor(actions: SysActions, notification: NotificationsAPIActions, sysRelevantClassApi: SysSystemRelevantClassApi, sysConfigApi: SystemConfigurationService);
    createEpics(): Epic;
}
