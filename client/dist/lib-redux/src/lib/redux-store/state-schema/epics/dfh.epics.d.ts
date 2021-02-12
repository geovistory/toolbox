import { DfhLabelApi, DfhProfileApi } from '@kleiolab/lib-sdk-lb3';
import { DfhClassControllerService, DfhPropertyControllerService } from '@kleiolab/lib-sdk-lb4/public-api';
import { Epic } from 'redux-observable-es6-compat';
import { DfhActions } from '../actions';
import { NotificationsAPIActions } from '../../state-gui/actions';
export declare class DfhEpics {
    private actions;
    private notification;
    private profileApi;
    private classApi;
    private propertyApi;
    private labelApi;
    constructor(actions: DfhActions, notification: NotificationsAPIActions, profileApi: DfhProfileApi, classApi: DfhClassControllerService, propertyApi: DfhPropertyControllerService, labelApi: DfhLabelApi);
    createEpics(): Epic;
}
