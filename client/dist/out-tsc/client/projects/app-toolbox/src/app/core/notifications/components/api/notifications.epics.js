import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { NotificationsAPIActions } from './notifications.actions';
let NotificationsAPIEpics = class NotificationsAPIEpics {
    constructor(toastyService, toastyConfig) {
        this.toastyService = toastyService;
        this.toastyConfig = toastyConfig;
        // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
        // Possible values: default, bootstrap, material
        this.toastyConfig.theme = 'bootstrap';
    }
    createEpics(c) {
        return combineEpics(this.createAddToastEpic(c));
    }
    createAddToastEpic(c) {
        return (action$, store) => {
            return action$.pipe(
            /**
             * Filter the actions that triggers this epic
             */
            filter((a) => {
                return a;
            }), ofType(NotificationsAPIActions.ADD_TOAST), switchMap((action) => new Observable((observer) => {
                /**
                 * Add Toast
                 */
                const a = action;
                if (!a.payload.options.title && !a.payload.options.msg) {
                    if (a.payload.type === 'error') {
                        a.payload.options.title = 'Oops, something went wrong!';
                    }
                }
                this.toastyService[a.payload.type](a.payload.options);
            })), takeUntil(c.destroy$));
        };
    }
};
NotificationsAPIEpics = tslib_1.__decorate([
    Injectable()
], NotificationsAPIEpics);
export { NotificationsAPIEpics };
//# sourceMappingURL=notifications.epics.js.map