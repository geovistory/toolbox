import { PubAccountApi } from '@kleiolab/lib-sdk-lb3';
import { FluxStandardAction } from 'flux-standard-action';
import { Epic } from 'redux-observable-es6-compat';
import { AccountActions } from '../actions/account.actions';
import { LoadingBarActions } from '../actions/loading-bar.actions';
import { NotificationsAPIActions } from '../actions/notifications.actions';
export declare class AccountEpics {
    private actions;
    private loadingBarActions;
    private accountApi;
    private notificationActions;
    constructor(actions: AccountActions, loadingBarActions: LoadingBarActions, accountApi: PubAccountApi, notificationActions: NotificationsAPIActions);
    createEpics(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any>;
    private loadRoles;
}
