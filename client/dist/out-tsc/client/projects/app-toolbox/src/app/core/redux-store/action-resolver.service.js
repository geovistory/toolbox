import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
let ActionResolverService = class ActionResolverService {
    // requestMap: { [uuid: string]: ActionResultObservable<any> } = {};
    constructor() {
        this.createEpics = () => combineEpics(this.createResolveEpic());
    }
    createResolveEpic() {
        return (action$, store) => action$.pipe(filter(action => !!action && !!action.meta && !!action.meta.removePending), switchMap(action => (of({ type: 'CLEAN_UP_RESOLVED', meta: { uuid: action.meta.removePending } }))));
    }
};
ActionResolverService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ActionResolverService);
export { ActionResolverService };
//# sourceMappingURL=action-resolver.service.js.map