import { NgRedux } from '@angular-redux/store';
import { ProProjectApi } from '@kleiolab/lib-sdk-lb3';
import { FluxStandardAction } from 'flux-standard-action';
import { Epic } from 'redux-observable-es6-compat';
import { IAppState } from '../../root/models/model';
import { ActiveProjectActions } from '../../state-gui/actions/active-project.action';
import { LoadingBarActions } from '../../state-gui/actions/loading-bar.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { DatActions } from '../../state-schema/actions/dat.actions';
import { DfhActions } from '../../state-schema/actions/dfh.actions';
import { InfActions } from '../../state-schema/actions/inf.actions';
import { ProActions } from '../../state-schema/actions/pro.actions';
import { SysActions } from '../../state-schema/actions/sys.actions';
import { SchemaService } from '../../state-schema/services/schema.service';
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
    private schemaObj;
    constructor(sys: SysActions, dat: DatActions, dfh: DfhActions, pro: ProActions, inf: InfActions, projectApi: ProProjectApi, actions: ActiveProjectActions, notificationActions: NotificationsAPIActions, loadingBarActions: LoadingBarActions, ngRedux: NgRedux<IAppState>, schemaObj: SchemaService);
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
