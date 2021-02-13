import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { environment } from 'projects/app-toolbox/src/environments/environment';
import { combineEpics } from 'redux-observable-es6-compat';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
let RootEpics = class RootEpics {
    constructor(loadingBarEpics, accountEpics, activeProjectEpics, systemEpics, dfhEpics, infEpics, datEpics, proEpics, actionResolver) {
        this.loadingBarEpics = loadingBarEpics;
        this.accountEpics = accountEpics;
        this.activeProjectEpics = activeProjectEpics;
        this.systemEpics = systemEpics;
        this.dfhEpics = dfhEpics;
        this.infEpics = infEpics;
        this.datEpics = datEpics;
        this.proEpics = proEpics;
        this.actionResolver = actionResolver;
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
        this.rootEpicStream$ = new BehaviorSubject(combineEpics(this.loadingBarEpics.createEpics(), this.systemEpics.createEpics(), this.activeProjectEpics.createEpics(), this.accountEpics.createEpics(), this.dfhEpics.createEpics(), this.infEpics.createEpics(), this.datEpics.createEpics(), this.proEpics.createEpics(), 
        // important: this needs to be the last epic in
        this.actionResolver.createEpics()));
        this.rootEpic = (action$, state$, dependencies = undefined) => {
            return this.rootEpicStream$.pipe(mergeMap((epic) => epic(action$, state$, dependencies)));
        };
    }
    getRootEpic() {
        return this.rootEpic;
    }
    /**
     * Adds an epic to the RootEpic middleware
     * @param epic that will be added to the RootEpics
     */
    addEpic(epic) {
        this.rootEpicStream$.next(epic);
    }
};
RootEpics = tslib_1.__decorate([
    Injectable()
], RootEpics);
export { RootEpics };
//# sourceMappingURL=root-epics.js.map