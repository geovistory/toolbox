/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/epics/active-project.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { ProProjectApi } from '@kleiolab/lib-sdk-lb3';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { DatActions, DfhActions, InfActions, ProActions, SysActions } from '../../state-schema/actions';
import { ActiveProjectActions, LoadingBarActions, NotificationsAPIActions } from '../actions';
/**
 * Transform ProProject to ProjectPreview
 * @param {?} project
 * @return {?}
 */
function proProjectToProjectPreview(project) {
    return {
        label: this.firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL),
        description: this.firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION),
        default_language: project.default_language,
        pk_project: project.pk_entity
    };
}
export class ActiveProjectEpics {
    /**
     * @param {?} sys
     * @param {?} dat
     * @param {?} dfh
     * @param {?} pro
     * @param {?} inf
     * @param {?} projectApi
     * @param {?} actions
     * @param {?} notificationActions
     * @param {?} loadingBarActions
     * @param {?} ngRedux
     */
    constructor(sys, dat, dfh, pro, inf, projectApi, actions, notificationActions, loadingBarActions, ngRedux) {
        this.sys = sys;
        this.dat = dat;
        this.dfh = dfh;
        this.pro = pro;
        this.inf = inf;
        this.projectApi = projectApi;
        this.actions = actions;
        this.notificationActions = notificationActions;
        this.loadingBarActions = loadingBarActions;
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createEpics() {
        return combineEpics(this.createLoadProjectBasicsEpic(), this.createLoadProjectConfigEpic(), this.createLoadProjectUpdatedEpic(), this.createClosePanelEpic(), this.createActivateTabFocusPanelEpic(), this.createMoveTabFocusPanelEpic(), this.createClosePanelFocusPanelEpic(), this.createSplitPanelActivateTabEpic(), this.createAddTabCloseListEpic());
    }
    /**
     * This epic listenes to an action that wants to load tha active project (by id)
     * It loads the project info and
     * - on loaded dispaches an action that reduces the project into the store
     * - on fail dispaches an action that shows an error notification
     * @private
     * @return {?}
     */
    createLoadProjectBasicsEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_BASICS), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        (action) => new Observable((/**
         * @param {?} globalStore
         * @return {?}
         */
        (globalStore) => {
            /**
           * Emit the global action that activates the loading bar
           */
            globalStore.next(this.loadingBarActions.startLoading());
            this.projectApi.getBasics(action.meta.pk_project)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                globalStore.next(this.actions.loadProjectBasiscsSucceded(proProjectToProjectPreview(data[0])));
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                globalStore.next(this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error.message }
                }));
            }));
        }))))));
    }
    /**
     * This epic listenes to an action that is dispached when loading projcect succeeded
     *
     * It dispaches an action that completes the loading bar
     * @private
     * @return {?}
     */
    createLoadProjectUpdatedEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED), mapTo(this.loadingBarActions.completeLoading())));
    }
    /**
     * @private
     * @return {?}
     */
    createLoadProjectConfigEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_CONFIG), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        (action) => new Observable((/**
         * @param {?} globalStore
         * @return {?}
         */
        (globalStore) => {
            globalStore.next(this.loadingBarActions.startLoading());
            combineLatest(this.dfh.profile.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.dfh.klass.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.dfh.property.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.dfh.label.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.sys.system_relevant_class.load().resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.sys.config.load().resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.dat.namespace.load('', action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.pro.text_property.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.pro.dfh_class_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.pro.dfh_profile_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.pro.class_field_config.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))), this.inf.persistent_item.typesOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !!x))))
                .pipe(filter((/**
             * @param {?} res
             * @return {?}
             */
            (res) => !res.includes(undefined))))
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            (res) => {
                globalStore.next(this.actions.loadProjectConfigSucceeded());
                globalStore.next(this.loadingBarActions.completeLoading());
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
            }));
        }))))));
    }
    /**
     * LAYOUT
     * @private
     * @return {?}
     */
    createClosePanelEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.CLOSE_TAB, ActiveProjectActions.MOVE_TAB, ActiveProjectActions.SPLIT_PANEL), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            (globalStore) => {
                this.ngRedux.getState().activeProject.panels.forEach((/**
                 * @param {?} panel
                 * @param {?} panelIndex
                 * @return {?}
                 */
                (panel, panelIndex) => {
                    if (panel.tabs.length === 0)
                        globalStore.next(this.actions.closePanel(panelIndex));
                }));
            })))));
        });
    }
    /**
     * @private
     * @return {?}
     */
    createSplitPanelActivateTabEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.SPLIT_PANEL), map((/**
             * @param {?} action
             * @return {?}
             */
            (action) => {
                /** @type {?} */
                const p = this.ngRedux.getState().activeProject;
                /** @type {?} */
                const c = action.meta.currentPanelIndex;
                /** @type {?} */
                const panelIndex = p.panels.length < (c + 1) ? c - 1 : c;
                return this.actions.activateTab(panelIndex, 0);
            })));
        });
    }
    /**
     * @private
     * @return {?}
     */
    createActivateTabFocusPanelEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.ACTIVATE_TAB), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            (globalStore) => {
                if (this.ngRedux.getState().activeProject.focusedPanel !== action.meta.panelIndex) {
                    globalStore.next(this.actions.focusPanel(action.meta.panelIndex));
                }
            })))));
        });
    }
    /**
     * @private
     * @return {?}
     */
    createMoveTabFocusPanelEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.MOVE_TAB), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            (globalStore) => {
                if (this.ngRedux.getState().activeProject.focusedPanel !== action.meta.currentPanelIndex) {
                    globalStore.next(this.actions.focusPanel(action.meta.currentPanelIndex));
                }
            })))));
        });
    }
    /**
     * @private
     * @return {?}
     */
    createClosePanelFocusPanelEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.CLOSE_PANEL), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            (globalStore) => {
                if (this.ngRedux.getState().activeProject.focusedPanel > (this.ngRedux.getState().activeProject.panels.length - 1)) {
                    globalStore.next(this.actions.focusPanel(0));
                }
            })))));
        });
    }
    /**
     * @private
     * @return {?}
     */
    createAddTabCloseListEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.ADD_TAB), mapTo(this.actions.setListType('')));
        });
    }
}
ActiveProjectEpics.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ActiveProjectEpics.ctorParameters = () => [
    { type: SysActions },
    { type: DatActions },
    { type: DfhActions },
    { type: ProActions },
    { type: InfActions },
    { type: ProProjectApi },
    { type: ActiveProjectActions },
    { type: NotificationsAPIActions },
    { type: LoadingBarActions },
    { type: NgRedux }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.sys;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.dat;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.dfh;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.pro;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.inf;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.projectApi;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.actions;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.notificationActions;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.loadingBarActions;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1ndWkvZXBpY3MvYWN0aXZlLXByb2plY3QuZXBpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFjLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR2xFLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekUsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hHLE9BQU8sRUFBdUIsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7OztBQU1uSCxTQUFTLDBCQUEwQixDQUFDLE9BQW1CO0lBQ3JELE9BQU87UUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLG9DQUFvQyxDQUFDO1FBQ2pILFdBQVcsRUFBRSxJQUFJLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsMENBQTBDLENBQUM7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O0lBQ3ZCLGlDQUF1Qjs7Ozs7SUFDdkIsaUNBQXVCOzs7OztJQUN2QixpQ0FBdUI7Ozs7O0lBQ3ZCLHdDQUFpQzs7Ozs7SUFDakMscUNBQXFDOzs7OztJQUNyQyxpREFBb0Q7Ozs7O0lBQ3BELCtDQUE0Qzs7Ozs7SUFDNUMscUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN5c0NvbmZpZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItY29uZmlnJztcbmltcG9ydCB7IFByb1Byb2plY3QsIFByb1Byb2plY3RBcGkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljLCBvZlR5cGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIG1hcFRvLCBtZXJnZU1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMnO1xuaW1wb3J0IHsgRGF0QWN0aW9ucywgRGZoQWN0aW9ucywgSW5mQWN0aW9ucywgUHJvQWN0aW9ucywgU3lzQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RBY3Rpb24sIEFjdGl2ZVByb2plY3RBY3Rpb25zLCBMb2FkaW5nQmFyQWN0aW9ucywgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IFByb2plY3RQcmV2aWV3IH0gZnJvbSAnLi4vbW9kZWxzJztcblxuLyoqXG4gKiBUcmFuc2Zvcm0gUHJvUHJvamVjdCB0byBQcm9qZWN0UHJldmlld1xuICovXG5mdW5jdGlvbiBwcm9Qcm9qZWN0VG9Qcm9qZWN0UHJldmlldyhwcm9qZWN0OiBQcm9Qcm9qZWN0KTogUHJvamVjdFByZXZpZXcge1xuICByZXR1cm4ge1xuICAgIGxhYmVsOiB0aGlzLmZpcnN0UHJvVGV4dFByb3BTdHJpbmdPZlR5cGUocHJvamVjdC50ZXh0X3Byb3BlcnRpZXMsIFN5c0NvbmZpZy5QS19TWVNURU1fVFlQRV9fVEVYVF9QUk9QRVJUWV9fTEFCRUwpLFxuICAgIGRlc2NyaXB0aW9uOiB0aGlzLmZpcnN0UHJvVGV4dFByb3BTdHJpbmdPZlR5cGUocHJvamVjdC50ZXh0X3Byb3BlcnRpZXMsIFN5c0NvbmZpZy5QS19TWVNURU1fVFlQRV9fVEVYVF9QUk9QRVJUWV9fREVTQ1JJUFRJT04pLFxuICAgIGRlZmF1bHRfbGFuZ3VhZ2U6IHByb2plY3QuZGVmYXVsdF9sYW5ndWFnZSxcbiAgICBwa19wcm9qZWN0OiBwcm9qZWN0LnBrX2VudGl0eVxuICB9XG59XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjdGl2ZVByb2plY3RFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3lzOiBTeXNBY3Rpb25zLFxuICAgIHByaXZhdGUgZGF0OiBEYXRBY3Rpb25zLFxuICAgIHByaXZhdGUgZGZoOiBEZmhBY3Rpb25zLFxuICAgIHByaXZhdGUgcHJvOiBQcm9BY3Rpb25zLFxuICAgIHByaXZhdGUgaW5mOiBJbmZBY3Rpb25zLFxuICAgIHByaXZhdGUgcHJvamVjdEFwaTogUHJvUHJvamVjdEFwaSxcbiAgICBwcml2YXRlIGFjdGlvbnM6IEFjdGl2ZVByb2plY3RBY3Rpb25zLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uQWN0aW9uczogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHJpdmF0ZSBsb2FkaW5nQmFyQWN0aW9uczogTG9hZGluZ0JhckFjdGlvbnMsXG4gICAgcHJpdmF0ZSBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgdGhpcy5jcmVhdGVMb2FkUHJvamVjdEJhc2ljc0VwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlTG9hZFByb2plY3RDb25maWdFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUxvYWRQcm9qZWN0VXBkYXRlZEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQ2xvc2VQYW5lbEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQWN0aXZhdGVUYWJGb2N1c1BhbmVsRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVNb3ZlVGFiRm9jdXNQYW5lbEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQ2xvc2VQYW5lbEZvY3VzUGFuZWxFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZVNwbGl0UGFuZWxBY3RpdmF0ZVRhYkVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQWRkVGFiQ2xvc2VMaXN0RXBpYygpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBlcGljIGxpc3RlbmVzIHRvIGFuIGFjdGlvbiB0aGF0IHdhbnRzIHRvIGxvYWQgdGhhIGFjdGl2ZSBwcm9qZWN0IChieSBpZClcbiAgICogSXQgbG9hZHMgdGhlIHByb2plY3QgaW5mbyBhbmRcbiAgICogLSBvbiBsb2FkZWQgZGlzcGFjaGVzIGFuIGFjdGlvbiB0aGF0IHJlZHVjZXMgdGhlIHByb2plY3QgaW50byB0aGUgc3RvcmVcbiAgICogLSBvbiBmYWlsIGRpc3BhY2hlcyBhbiBhY3Rpb24gdGhhdCBzaG93cyBhbiBlcnJvciBub3RpZmljYXRpb25cbiAgICovXG4gIHByaXZhdGUgY3JlYXRlTG9hZFByb2plY3RCYXNpY3NFcGljKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG5cbiAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQkFTSUNTKSxcbiAgICAgIHN3aXRjaE1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICAvKipcbiAgICAgICAqIEVtaXQgdGhlIGdsb2JhbCBhY3Rpb24gdGhhdCBhY3RpdmF0ZXMgdGhlIGxvYWRpbmcgYmFyXG4gICAgICAgKi9cbiAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLnN0YXJ0TG9hZGluZygpKTtcblxuICAgICAgICB0aGlzLnByb2plY3RBcGkuZ2V0QmFzaWNzKGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIChkYXRhOiBQcm9Qcm9qZWN0W10pID0+IHtcbiAgICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMubG9hZFByb2plY3RCYXNpc2NzU3VjY2VkZWQocHJvUHJvamVjdFRvUHJvamVjdFByZXZpZXcoZGF0YVswXSkpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLm5vdGlmaWNhdGlvbkFjdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IubWVzc2FnZSB9XG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfSlcbiAgICAgIH0pKVxuXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICogVGhpcyBlcGljIGxpc3RlbmVzIHRvIGFuIGFjdGlvbiB0aGF0IGlzIGRpc3BhY2hlZCB3aGVuIGxvYWRpbmcgcHJvamNlY3Qgc3VjY2VlZGVkXG4gICpcbiAgKiBJdCBkaXNwYWNoZXMgYW4gYWN0aW9uIHRoYXQgY29tcGxldGVzIHRoZSBsb2FkaW5nIGJhclxuICAqL1xuICBwcml2YXRlIGNyZWF0ZUxvYWRQcm9qZWN0VXBkYXRlZEVwaWMoKTogRXBpYzxGbHV4U3RhbmRhcmRBY3Rpb248YW55PiwgRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQkFTSUNTX1NVQ0NFRURFRCksXG4gICAgICBtYXBUbyh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLmNvbXBsZXRlTG9hZGluZygpKVxuICAgIClcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTG9hZFByb2plY3RDb25maWdFcGljKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG5cbiAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQ09ORklHKSxcbiAgICAgIHN3aXRjaE1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuc3RhcnRMb2FkaW5nKCkpO1xuXG4gICAgICAgIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdGhpcy5kZmgucHJvZmlsZS5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuXG4gICAgICAgICAgdGhpcy5kZmgua2xhc3MubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLmRmaC5wcm9wZXJ0eS5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMuZGZoLmxhYmVsLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG5cbiAgICAgICAgICB0aGlzLnN5cy5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MubG9hZCgpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMuc3lzLmNvbmZpZy5sb2FkKCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5kYXQubmFtZXNwYWNlLmxvYWQoJycsIGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuXG4gICAgICAgICAgdGhpcy5wcm8udGV4dF9wcm9wZXJ0eS5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMucHJvLmRmaF9jbGFzc19wcm9qX3JlbC5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMucHJvLmRmaF9wcm9maWxlX3Byb2pfcmVsLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5wcm8uY2xhc3NfZmllbGRfY29uZmlnLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG5cbiAgICAgICAgICB0aGlzLmluZi5wZXJzaXN0ZW50X2l0ZW0udHlwZXNPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICAgICAgKVxuICAgICAgICAgIC5waXBlKGZpbHRlcigocmVzOiBhbnlbXSkgPT4gIXJlcy5pbmNsdWRlcyh1bmRlZmluZWQpKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcblxuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMubG9hZFByb2plY3RDb25maWdTdWNjZWVkZWQoKSk7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuY29tcGxldGVMb2FkaW5nKCkpO1xuXG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gc3ViU3RvcmUuZGlzcGF0Y2godGhpcy5hY3Rpb25zLmxvYWRGYWlsZWQoeyBzdGF0dXM6ICcnICsgZXJyb3Iuc3RhdHVzIH0pKVxuICAgICAgICAgIH0pO1xuXG4gICAgICB9KSlcblxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIExBWU9VVFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVDbG9zZVBhbmVsRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuQ0xPU0VfVEFCLCBBY3RpdmVQcm9qZWN0QWN0aW9ucy5NT1ZFX1RBQiwgQWN0aXZlUHJvamVjdEFjdGlvbnMuU1BMSVRfUEFORUwpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICAgIHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3QucGFuZWxzLmZvckVhY2goKHBhbmVsLCBwYW5lbEluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAocGFuZWwudGFicy5sZW5ndGggPT09IDApIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmNsb3NlUGFuZWwocGFuZWxJbmRleCkpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH0pKVxuICAgICAgKVxuICAgIH1cbiAgfVxuICBwcml2YXRlIGNyZWF0ZVNwbGl0UGFuZWxBY3RpdmF0ZVRhYkVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLlNQTElUX1BBTkVMKSxcbiAgICAgICAgbWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IHtcbiAgICAgICAgICBjb25zdCBwID0gdGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdDtcbiAgICAgICAgICBjb25zdCBjID0gYWN0aW9uLm1ldGEuY3VycmVudFBhbmVsSW5kZXg7XG4gICAgICAgICAgY29uc3QgcGFuZWxJbmRleCA9IHAucGFuZWxzLmxlbmd0aCA8IChjICsgMSkgPyBjIC0gMSA6IGM7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5hY3RpdmF0ZVRhYihwYW5lbEluZGV4LCAwKVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgfVxuICBwcml2YXRlIGNyZWF0ZUFjdGl2YXRlVGFiRm9jdXNQYW5lbEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkFDVElWQVRFX1RBQiksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3QuZm9jdXNlZFBhbmVsICE9PSBhY3Rpb24ubWV0YS5wYW5lbEluZGV4KSB7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5mb2N1c1BhbmVsKGFjdGlvbi5tZXRhLnBhbmVsSW5kZXgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgICAgKVxuICAgIH1cbiAgfVxuICBwcml2YXRlIGNyZWF0ZU1vdmVUYWJGb2N1c1BhbmVsRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuTU9WRV9UQUIpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0LmZvY3VzZWRQYW5lbCAhPT0gYWN0aW9uLm1ldGEuY3VycmVudFBhbmVsSW5kZXgpIHtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmZvY3VzUGFuZWwoYWN0aW9uLm1ldGEuY3VycmVudFBhbmVsSW5kZXgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgICAgKVxuICAgIH1cbiAgfVxuICBwcml2YXRlIGNyZWF0ZUNsb3NlUGFuZWxGb2N1c1BhbmVsRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuQ0xPU0VfUEFORUwpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0LmZvY3VzZWRQYW5lbCA+ICh0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0LnBhbmVscy5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMuZm9jdXNQYW5lbCgwKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVBZGRUYWJDbG9zZUxpc3RFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5BRERfVEFCKSxcbiAgICAgICAgbWFwVG8odGhpcy5hY3Rpb25zLnNldExpc3RUeXBlKCcnKSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxufVxuIl19