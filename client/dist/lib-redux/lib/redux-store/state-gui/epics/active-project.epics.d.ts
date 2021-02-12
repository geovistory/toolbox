import { NgRedux } from '@angular-redux/store';
import { ProProjectApi } from '@kleiolab/lib-sdk-lb3';
import { FluxStandardAction } from 'flux-standard-action';
import { Epic } from 'redux-observable-es6-compat';
import { IAppState } from '../../root/models';
import { DatActions, DfhActions, InfActions, ProActions, SysActions } from '../../state-schema/actions';
import { ActiveProjectActions, LoadingBarActions, NotificationsAPIActions } from '../actions';
export declare class ActiveProjectEpics {
    private sys;
    private dat;
    private dfh;
    private pro;
    private inf;
    private projectApi;
    private actions;
    private notificationActions;
    private loadingBarActions;
    private ngRedux;
    constructor(sys: SysActions, dat: DatActions, dfh: DfhActions, pro: ProActions, inf: InfActions, projectApi: ProProjectApi, actions: ActiveProjectActions, notificationActions: NotificationsAPIActions, loadingBarActions: LoadingBarActions, ngRedux: NgRedux<IAppState>);
    createEpics(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any>;
    /**
     * This epic listenes to an action that wants to load tha active project (by id)
     * It loads the project info and
     * - on loaded dispaches an action that reduces the project into the store
     * - on fail dispaches an action that shows an error notification
     */
    private createLoadProjectBasicsEpic;
    /**
    * This epic listenes to an action that is dispached when loading projcect succeeded
    *
    * It dispaches an action that completes the loading bar
    */
    private createLoadProjectUpdatedEpic;
    private createLoadProjectConfigEpic;
    /**
     * LAYOUT
     */
    private createClosePanelEpic;
    private createSplitPanelActivateTabEpic;
    private createActivateTabFocusPanelEpic;
    private createMoveTabFocusPanelEpic;
    private createClosePanelFocusPanelEpic;
    private createAddTabCloseListEpic;
}
