import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadingBarActions } from './loading-bar.actions';
let LoadingBarEpics = class LoadingBarEpics {
    constructor(service, actions) {
        this.service = service;
        this.actions = actions;
    }
    createEpics() {
        return combineEpics(this.createStartLoadingBarEpic(), this.createCompleteLoadingBarEpic());
    }
    createCompleteLoadingBarEpic() {
        return (action$, store) => action$.pipe(ofType(LoadingBarActions.COPMLETE), switchMap(() => {
            return Observable.create(observer => {
                this.service.complete();
                // observer.next(this.actions.stopLoading())
            });
        }));
    }
    createStartLoadingBarEpic() {
        return (action$, store) => action$.pipe(ofType(LoadingBarActions.START), switchMap(() => {
            return Observable.create(observer => {
                this.service.start();
            });
        }));
    }
};
LoadingBarEpics = tslib_1.__decorate([
    Injectable()
], LoadingBarEpics);
export { LoadingBarEpics };
//# sourceMappingURL=loading-bar.epics.js.map