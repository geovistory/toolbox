/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/epics/loading-bar.epics.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1iYXIuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1ndWkvZXBpY3MvbG9hZGluZy1iYXIuZXBpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRW5FLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7OztBQVFoRixNQUFNLE9BQU8sZUFBZTs7OztJQUMxQixZQUNVLE9BQThCO1FBQTlCLFlBQU8sR0FBUCxPQUFPLENBQXVCO0lBQ3BDLENBQUM7Ozs7SUFFRSxXQUFXO1FBQ2hCLE9BQU8sWUFBWSxDQUNqQixJQUFJLENBQUMseUJBQXlCLEVBQUUsRUFDaEMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQ3BDLENBQUM7SUFDSixDQUFDOzs7OztJQUVPLDRCQUE0QjtRQUNsQzs7Ozs7UUFBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ3JDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFDbEMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ2IsT0FBTyxVQUFVLENBQUMsTUFBTTs7OztZQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO2dCQUN2Qiw0Q0FBNEM7WUFDOUMsQ0FBQyxFQUFDLENBQUE7UUFDSixDQUFDLEVBQUMsQ0FDSCxFQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFFTyx5QkFBeUI7UUFDL0I7Ozs7O1FBQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNyQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEVBQy9CLFNBQVM7OztRQUFDLEdBQUcsRUFBRTtZQUNiLE9BQU8sVUFBVSxDQUFDLE1BQU07Ozs7WUFBQyxRQUFRLENBQUMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUMsQ0FBQTtRQUNKLENBQUMsRUFBQyxDQUNILEVBQUE7SUFDSCxDQUFDOzs7WUFwQ0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBWlEscUJBQXFCOzs7Ozs7OztJQWUxQixrQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTbGltTG9hZGluZ0JhclNlcnZpY2UgfSBmcm9tICdAY2ltZS9uZ3gtc2xpbS1sb2FkaW5nLWJhcic7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMsIG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMb2FkaW5nQmFyQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL2xvYWRpbmctYmFyLmFjdGlvbnMnO1xuXG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMb2FkaW5nQmFyRXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNlcnZpY2U6IFNsaW1Mb2FkaW5nQmFyU2VydmljZSxcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYzxGbHV4U3RhbmRhcmRBY3Rpb248YW55PiwgRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG4gICAgICB0aGlzLmNyZWF0ZVN0YXJ0TG9hZGluZ0JhckVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQ29tcGxldGVMb2FkaW5nQmFyRXBpYygpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29tcGxldGVMb2FkaW5nQmFyRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICBvZlR5cGUoTG9hZGluZ0JhckFjdGlvbnMuQ09QTUxFVEUpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IHtcbiAgICAgICAgICB0aGlzLnNlcnZpY2UuY29tcGxldGUoKVxuICAgICAgICAgIC8vIG9ic2VydmVyLm5leHQodGhpcy5hY3Rpb25zLnN0b3BMb2FkaW5nKCkpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU3RhcnRMb2FkaW5nQmFyRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICBvZlR5cGUoTG9hZGluZ0JhckFjdGlvbnMuU1RBUlQpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKG9ic2VydmVyID0+IHtcbiAgICAgICAgICB0aGlzLnNlcnZpY2Uuc3RhcnQoKTtcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG4iXX0=