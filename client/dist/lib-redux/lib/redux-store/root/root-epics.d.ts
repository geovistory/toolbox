import { Action } from 'redux';
import { Epic } from 'redux-observable-es6-compat';
import { AccountEpics, ActiveProjectEpics, LoadingBarEpics, NotificationsAPIEpics } from '../state-gui/epics';
import { DatEpics, DfhEpics, InfEpics, ProEpics, SysEpics } from '../state-schema/epics';
import { ActionResolverEpics } from '../state-schema/_helpers';
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
