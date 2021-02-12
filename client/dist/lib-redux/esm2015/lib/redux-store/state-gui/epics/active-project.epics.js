/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/epics/active-project.epics.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLWd1aS9lcGljcy9hY3RpdmUtcHJvamVjdC5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHbEUsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEcsT0FBTyxFQUF1QixvQkFBb0IsRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFlBQVksQ0FBQzs7Ozs7O0FBTW5ILFNBQVMsMEJBQTBCLENBQUMsT0FBbUI7SUFDckQsT0FBTztRQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsb0NBQW9DLENBQUM7UUFDakgsV0FBVyxFQUFFLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQywwQ0FBMEMsQ0FBQztRQUM3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dkIsaUNBQXVCOzs7OztJQUN2QixpQ0FBdUI7Ozs7O0lBQ3ZCLGlDQUF1Qjs7Ozs7SUFDdkIsd0NBQWlDOzs7OztJQUNqQyxxQ0FBcUM7Ozs7O0lBQ3JDLGlEQUFvRDs7Ozs7SUFDcEQsK0NBQTRDOzs7OztJQUM1QyxxQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3lzQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgUHJvUHJvamVjdCwgUHJvUHJvamVjdEFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMsIG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgbWFwVG8sIG1lcmdlTWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscyc7XG5pbXBvcnQgeyBEYXRBY3Rpb25zLCBEZmhBY3Rpb25zLCBJbmZBY3Rpb25zLCBQcm9BY3Rpb25zLCBTeXNBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdEFjdGlvbiwgQWN0aXZlUHJvamVjdEFjdGlvbnMsIExvYWRpbmdCYXJBY3Rpb25zLCBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgUHJvamVjdFByZXZpZXcgfSBmcm9tICcuLi9tb2RlbHMnO1xuXG4vKipcbiAqIFRyYW5zZm9ybSBQcm9Qcm9qZWN0IHRvIFByb2plY3RQcmV2aWV3XG4gKi9cbmZ1bmN0aW9uIHByb1Byb2plY3RUb1Byb2plY3RQcmV2aWV3KHByb2plY3Q6IFByb1Byb2plY3QpOiBQcm9qZWN0UHJldmlldyB7XG4gIHJldHVybiB7XG4gICAgbGFiZWw6IHRoaXMuZmlyc3RQcm9UZXh0UHJvcFN0cmluZ09mVHlwZShwcm9qZWN0LnRleHRfcHJvcGVydGllcywgU3lzQ29uZmlnLlBLX1NZU1RFTV9UWVBFX19URVhUX1BST1BFUlRZX19MQUJFTCksXG4gICAgZGVzY3JpcHRpb246IHRoaXMuZmlyc3RQcm9UZXh0UHJvcFN0cmluZ09mVHlwZShwcm9qZWN0LnRleHRfcHJvcGVydGllcywgU3lzQ29uZmlnLlBLX1NZU1RFTV9UWVBFX19URVhUX1BST1BFUlRZX19ERVNDUklQVElPTiksXG4gICAgZGVmYXVsdF9sYW5ndWFnZTogcHJvamVjdC5kZWZhdWx0X2xhbmd1YWdlLFxuICAgIHBrX3Byb2plY3Q6IHByb2plY3QucGtfZW50aXR5XG4gIH1cbn1cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWN0aXZlUHJvamVjdEVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzeXM6IFN5c0FjdGlvbnMsXG4gICAgcHJpdmF0ZSBkYXQ6IERhdEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBkZmg6IERmaEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBwcm86IFByb0FjdGlvbnMsXG4gICAgcHJpdmF0ZSBpbmY6IEluZkFjdGlvbnMsXG4gICAgcHJpdmF0ZSBwcm9qZWN0QXBpOiBQcm9Qcm9qZWN0QXBpLFxuICAgIHByaXZhdGUgYWN0aW9uczogQWN0aXZlUHJvamVjdEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb25BY3Rpb25zOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwcml2YXRlIGxvYWRpbmdCYXJBY3Rpb25zOiBMb2FkaW5nQmFyQWN0aW9ucyxcbiAgICBwcml2YXRlIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYzxGbHV4U3RhbmRhcmRBY3Rpb248YW55PiwgRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG4gICAgICB0aGlzLmNyZWF0ZUxvYWRQcm9qZWN0QmFzaWNzRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVMb2FkUHJvamVjdENvbmZpZ0VwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlTG9hZFByb2plY3RVcGRhdGVkRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVDbG9zZVBhbmVsRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVBY3RpdmF0ZVRhYkZvY3VzUGFuZWxFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZU1vdmVUYWJGb2N1c1BhbmVsRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVDbG9zZVBhbmVsRm9jdXNQYW5lbEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlU3BsaXRQYW5lbEFjdGl2YXRlVGFiRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVBZGRUYWJDbG9zZUxpc3RFcGljKCksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGVwaWMgbGlzdGVuZXMgdG8gYW4gYWN0aW9uIHRoYXQgd2FudHMgdG8gbG9hZCB0aGEgYWN0aXZlIHByb2plY3QgKGJ5IGlkKVxuICAgKiBJdCBsb2FkcyB0aGUgcHJvamVjdCBpbmZvIGFuZFxuICAgKiAtIG9uIGxvYWRlZCBkaXNwYWNoZXMgYW4gYWN0aW9uIHRoYXQgcmVkdWNlcyB0aGUgcHJvamVjdCBpbnRvIHRoZSBzdG9yZVxuICAgKiAtIG9uIGZhaWwgZGlzcGFjaGVzIGFuIGFjdGlvbiB0aGF0IHNob3dzIGFuIGVycm9yIG5vdGlmaWNhdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVMb2FkUHJvamVjdEJhc2ljc0VwaWMoKTogRXBpYzxGbHV4U3RhbmRhcmRBY3Rpb248YW55PiwgRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcblxuICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9CQVNJQ1MpLFxuICAgICAgc3dpdGNoTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgIC8qKlxuICAgICAgICogRW1pdCB0aGUgZ2xvYmFsIGFjdGlvbiB0aGF0IGFjdGl2YXRlcyB0aGUgbG9hZGluZyBiYXJcbiAgICAgICAqL1xuICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuc3RhcnRMb2FkaW5nKCkpO1xuXG4gICAgICAgIHRoaXMucHJvamVjdEFwaS5nZXRCYXNpY3MoYWN0aW9uLm1ldGEucGtfcHJvamVjdClcbiAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGRhdGE6IFByb1Byb2plY3RbXSkgPT4ge1xuICAgICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5sb2FkUHJvamVjdEJhc2lzY3NTdWNjZWRlZChwcm9Qcm9qZWN0VG9Qcm9qZWN0UHJldmlldyhkYXRhWzBdKSkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubm90aWZpY2F0aW9uQWN0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvci5tZXNzYWdlIH1cbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgfSkpXG5cbiAgICApXG4gIH1cblxuICAvKipcbiAgKiBUaGlzIGVwaWMgbGlzdGVuZXMgdG8gYW4gYWN0aW9uIHRoYXQgaXMgZGlzcGFjaGVkIHdoZW4gbG9hZGluZyBwcm9qY2VjdCBzdWNjZWVkZWRcbiAgKlxuICAqIEl0IGRpc3BhY2hlcyBhbiBhY3Rpb24gdGhhdCBjb21wbGV0ZXMgdGhlIGxvYWRpbmcgYmFyXG4gICovXG4gIHByaXZhdGUgY3JlYXRlTG9hZFByb2plY3RVcGRhdGVkRXBpYygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9CQVNJQ1NfU1VDQ0VFREVEKSxcbiAgICAgIG1hcFRvKHRoaXMubG9hZGluZ0JhckFjdGlvbnMuY29tcGxldGVMb2FkaW5nKCkpXG4gICAgKVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVMb2FkUHJvamVjdENvbmZpZ0VwaWMoKTogRXBpYzxGbHV4U3RhbmRhcmRBY3Rpb248YW55PiwgRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcblxuICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9DT05GSUcpLFxuICAgICAgc3dpdGNoTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5zdGFydExvYWRpbmcoKSk7XG5cbiAgICAgICAgY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLmRmaC5wcm9maWxlLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG5cbiAgICAgICAgICB0aGlzLmRmaC5rbGFzcy5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMuZGZoLnByb3BlcnR5LmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5kZmgubGFiZWwubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcblxuICAgICAgICAgIHRoaXMuc3lzLnN5c3RlbV9yZWxldmFudF9jbGFzcy5sb2FkKCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5zeXMuY29uZmlnLmxvYWQoKS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLmRhdC5uYW1lc3BhY2UubG9hZCgnJywgYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG5cbiAgICAgICAgICB0aGlzLnByby50ZXh0X3Byb3BlcnR5LmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5wcm8uZGZoX2NsYXNzX3Byb2pfcmVsLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5wcm8uZGZoX3Byb2ZpbGVfcHJval9yZWwubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLnByby5jbGFzc19maWVsZF9jb25maWcubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcblxuICAgICAgICAgIHRoaXMuaW5mLnBlcnNpc3RlbnRfaXRlbS50eXBlc09mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICAgICApXG4gICAgICAgICAgLnBpcGUoZmlsdGVyKChyZXM6IGFueVtdKSA9PiAhcmVzLmluY2x1ZGVzKHVuZGVmaW5lZCkpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuXG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5sb2FkUHJvamVjdENvbmZpZ1N1Y2NlZWRlZCgpKTtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5jb21wbGV0ZUxvYWRpbmcoKSk7XG5cbiAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyBzdWJTdG9yZS5kaXNwYXRjaCh0aGlzLmFjdGlvbnMubG9hZEZhaWxlZCh7IHN0YXR1czogJycgKyBlcnJvci5zdGF0dXMgfSkpXG4gICAgICAgICAgfSk7XG5cbiAgICAgIH0pKVxuXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogTEFZT1VUXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUNsb3NlUGFuZWxFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5DTE9TRV9UQUIsIEFjdGl2ZVByb2plY3RBY3Rpb25zLk1PVkVfVEFCLCBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TUExJVF9QQU5FTCksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgICAgdGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5wYW5lbHMuZm9yRWFjaCgocGFuZWwsIHBhbmVsSW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChwYW5lbC50YWJzLmxlbmd0aCA9PT0gMCkgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMuY2xvc2VQYW5lbChwYW5lbEluZGV4KSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlU3BsaXRQYW5lbEFjdGl2YXRlVGFiRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuU1BMSVRfUEFORUwpLFxuICAgICAgICBtYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IHAgPSB0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0O1xuICAgICAgICAgIGNvbnN0IGMgPSBhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleDtcbiAgICAgICAgICBjb25zdCBwYW5lbEluZGV4ID0gcC5wYW5lbHMubGVuZ3RoIDwgKGMgKyAxKSA/IGMgLSAxIDogYztcbiAgICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmFjdGl2YXRlVGFiKHBhbmVsSW5kZXgsIDApXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlQWN0aXZhdGVUYWJGb2N1c1BhbmVsRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuQUNUSVZBVEVfVEFCKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5mb2N1c2VkUGFuZWwgIT09IGFjdGlvbi5tZXRhLnBhbmVsSW5kZXgpIHtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmZvY3VzUGFuZWwoYWN0aW9uLm1ldGEucGFuZWxJbmRleCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlTW92ZVRhYkZvY3VzUGFuZWxFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5NT1ZFX1RBQiksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3QuZm9jdXNlZFBhbmVsICE9PSBhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleCkge1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMuZm9jdXNQYW5lbChhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlQ2xvc2VQYW5lbEZvY3VzUGFuZWxFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5DTE9TRV9QQU5FTCksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3QuZm9jdXNlZFBhbmVsID4gKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3QucGFuZWxzLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5mb2N1c1BhbmVsKDApKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgICAgKVxuICAgIH1cbiAgfVxuICBwcml2YXRlIGNyZWF0ZUFkZFRhYkNsb3NlTGlzdEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkFERF9UQUIpLFxuICAgICAgICBtYXBUbyh0aGlzLmFjdGlvbnMuc2V0TGlzdFR5cGUoJycpKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG59XG4iXX0=