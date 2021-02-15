/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/epics/loading-bar.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadingBarActions } from '../../state-gui/actions/loading-bar.actions';
import * as i0 from "@angular/core";
import * as i1 from "@cime/ngx-slim-loading-bar/src/slim-loading-bar.service";
export class LoadingBarEpics {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
    }
    /**
     * @return {?}
     */
    createEpics() {
        return combineEpics(this.createStartLoadingBarEpic(), this.createCompleteLoadingBarEpic());
    }
    /**
     * @private
     * @return {?}
     */
    createCompleteLoadingBarEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(LoadingBarActions.COPMLETE), switchMap((/**
         * @return {?}
         */
        () => {
            return Observable.create((/**
             * @param {?} observer
             * @return {?}
             */
            observer => {
                this.service.complete();
                // observer.next(this.actions.stopLoading())
            }));
        }))));
    }
    /**
     * @private
     * @return {?}
     */
    createStartLoadingBarEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(LoadingBarActions.START), switchMap((/**
         * @return {?}
         */
        () => {
            return Observable.create((/**
             * @param {?} observer
             * @return {?}
             */
            observer => {
                this.service.start();
            }));
        }))));
    }
}
LoadingBarEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
LoadingBarEpics.ctorParameters = () => [
    { type: SlimLoadingBarService }
];
/** @nocollapse */ LoadingBarEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function LoadingBarEpics_Factory() { return new LoadingBarEpics(i0.ɵɵinject(i1.SlimLoadingBarService)); }, token: LoadingBarEpics, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    LoadingBarEpics.prototype.service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLWd1aS9lcGljcy9sb2FkaW5nLWJhci5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFbkUsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7O0FBUWhGLE1BQU0sT0FBTyxlQUFlOzs7O0lBQzFCLFlBQ1UsT0FBOEI7UUFBOUIsWUFBTyxHQUFQLE9BQU8sQ0FBdUI7SUFDcEMsQ0FBQzs7OztJQUVFLFdBQVc7UUFDaEIsT0FBTyxZQUFZLENBQ2pCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxFQUNoQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FDcEMsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRU8sNEJBQTRCO1FBQ2xDOzs7OztRQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDckMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUNsQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDYixPQUFPLFVBQVUsQ0FBQyxNQUFNOzs7O1lBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUE7Z0JBQ3ZCLDRDQUE0QztZQUM5QyxDQUFDLEVBQUMsQ0FBQTtRQUNKLENBQUMsRUFBQyxDQUNILEVBQUE7SUFDSCxDQUFDOzs7OztJQUVPLHlCQUF5QjtRQUMvQjs7Ozs7UUFBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ3JDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFDL0IsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ2IsT0FBTyxVQUFVLENBQUMsTUFBTTs7OztZQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLENBQUMsRUFBQyxDQUFBO1FBQ0osQ0FBQyxFQUFDLENBQ0gsRUFBQTtJQUNILENBQUM7OztZQXBDRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFaUSxxQkFBcUI7Ozs7Ozs7O0lBZTFCLGtDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNsaW1Mb2FkaW5nQmFyU2VydmljZSB9IGZyb20gJ0BjaW1lL25neC1zbGltLWxvYWRpbmctYmFyJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExvYWRpbmdCYXJBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbG9hZGluZy1iYXIuYWN0aW9ucyc7XG5cblxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIExvYWRpbmdCYXJFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc2VydmljZTogU2xpbUxvYWRpbmdCYXJTZXJ2aWNlLFxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIHRoaXMuY3JlYXRlU3RhcnRMb2FkaW5nQmFyRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVDb21wbGV0ZUxvYWRpbmdCYXJFcGljKClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb21wbGV0ZUxvYWRpbmdCYXJFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShMb2FkaW5nQmFyQWN0aW9ucy5DT1BNTEVURSksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgICAgIHRoaXMuc2VydmljZS5jb21wbGV0ZSgpXG4gICAgICAgICAgLy8gb2JzZXJ2ZXIubmV4dCh0aGlzLmFjdGlvbnMuc3RvcExvYWRpbmcoKSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTdGFydExvYWRpbmdCYXJFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShMb2FkaW5nQmFyQWN0aW9ucy5TVEFSVCksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUob2JzZXJ2ZXIgPT4ge1xuICAgICAgICAgIHRoaXMuc2VydmljZS5zdGFydCgpO1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICApXG4gIH1cbn1cbiJdfQ==