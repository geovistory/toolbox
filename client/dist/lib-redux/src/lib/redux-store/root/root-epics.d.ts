import { Action } from 'redux';
import { Epic } from 'redux-observable-es6-compat';
import { AccountEpics } from '../state-gui/epics/account.epics';
import { ActiveProjectEpics } from '../state-gui/epics/active-project.epics';
import { LoadingBarEpics } from '../state-gui/epics/loading-bar.epics';
import { NotificationsAPIEpics } from '../state-gui/epics/notifications.epics';
import { ActionResolverEpics } from '../state-schema/epics/action-resolver.epics';
import { DatEpics } from '../state-schema/epics/dat.epics';
import { DfhEpics } from '../state-schema/epics/dfh.epics';
import { InfEpics } from '../state-schema/epics/inf.epics';
import { ProEpics } from '../state-schema/epics/pro.epics';
import { SysEpics } from '../state-schema/epics/sys.epics';
export declare class RootEpics {
    private loadingBarEpics;
    private notificationEpics;
    private activeProjectEpics;
    private accountEpics;
    private systemEpics;
    private dfhEpics;
    private infEpics;
    private datEpics;
    private proEpics;
    private actionResolver;
    private rootEpicStream$;
    private rootEpic;
    constructor(loadingBarEpics: LoadingBarEpics, notificationEpics: NotificationsAPIEpics, activeProjectEpics: ActiveProjectEpics, accountEpics: AccountEpics, systemEpics: SysEpics, dfhEpics: DfhEpics, infEpics: InfEpics, datEpics: DatEpics, proEpics: ProEpics, actionResolver: ActionResolverEpics);
    getRootEpic(): Epic<Action<any>, Action<any>, void, any>;
    /**
     * Adds an epic to the RootEpic middleware
     * @param epic that will be added to the RootEpics
     */
    addEpic(epic: Epic<Action<any>, Action<any>, void, any>): void;
}
