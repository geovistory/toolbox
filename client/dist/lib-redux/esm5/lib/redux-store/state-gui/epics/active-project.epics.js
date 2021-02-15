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
import { ActiveProjectActions } from '../../state-gui/actions/active-project.action';
import { LoadingBarActions } from '../../state-gui/actions/loading-bar.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { DatActions } from '../../state-schema/actions/dat.actions';
import { DfhActions } from '../../state-schema/actions/dfh.actions';
import { InfActions } from '../../state-schema/actions/inf.actions';
import { ProActions } from '../../state-schema/actions/pro.actions';
import { SysActions } from '../../state-schema/actions/sys.actions';
import * as i0 from "@angular/core";
import * as i1 from "../../state-schema/actions/sys.actions";
import * as i2 from "../../state-schema/actions/dat.actions";
import * as i3 from "../../state-schema/actions/dfh.actions";
import * as i4 from "../../state-schema/actions/pro.actions";
import * as i5 from "../../state-schema/actions/inf.actions";
import * as i6 from "@kleiolab/lib-sdk-lb3";
import * as i7 from "../actions/active-project.action";
import * as i8 from "../actions/notifications.actions";
import * as i9 from "../actions/loading-bar.actions";
import * as i10 from "@angular-redux/store";
/**
 * @param {?} textProperties
 * @param {?} fkSystemType
 * @return {?}
 */
function firstProTextPropStringOfType(textProperties, fkSystemType) {
    return (textProperties.find((/**
     * @param {?} t
     * @return {?}
     */
    function (t) { return t.fk_system_type === fkSystemType; })) || { string: '' }).string;
}
/**
 * Transform ProProject to ProjectPreview
 * @param {?} project
 * @return {?}
 */
function proProjectToProjectPreview(project) {
    return {
        label: firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL),
        description: firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION),
        default_language: project.default_language,
        pk_project: project.pk_entity
    };
}
var ActiveProjectEpics = /** @class */ (function () {
    function ActiveProjectEpics(sys, dat, dfh, pro, inf, projectApi, actions, notificationActions, loadingBarActions, ngRedux) {
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
    ActiveProjectEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        return combineEpics(this.createLoadProjectBasicsEpic(), this.createLoadProjectConfigEpic(), this.createLoadProjectUpdatedEpic(), this.createClosePanelEpic(), this.createActivateTabFocusPanelEpic(), this.createMoveTabFocusPanelEpic(), this.createClosePanelFocusPanelEpic(), this.createSplitPanelActivateTabEpic(), this.createAddTabCloseListEpic());
    };
    /**
     * This epic listenes to an action that wants to load tha active project (by id)
     * It loads the project info and
     * - on loaded dispaches an action that reduces the project into the store
     * - on fail dispaches an action that shows an error notification
     */
    /**
     * This epic listenes to an action that wants to load tha active project (by id)
     * It loads the project info and
     * - on loaded dispaches an action that reduces the project into the store
     * - on fail dispaches an action that shows an error notification
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createLoadProjectBasicsEpic = /**
     * This epic listenes to an action that wants to load tha active project (by id)
     * It loads the project info and
     * - on loaded dispaches an action that reduces the project into the store
     * - on fail dispaches an action that shows an error notification
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_BASICS), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} globalStore
         * @return {?}
         */
        function (globalStore) {
            /**
           * Emit the global action that activates the loading bar
           */
            globalStore.next(_this.loadingBarActions.startLoading());
            _this.projectApi.getBasics(action.meta.pk_project)
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                globalStore.next(_this.actions.loadProjectBasiscsSucceded(proProjectToProjectPreview(data[0])));
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                globalStore.next(_this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error.message }
                }));
            }));
        })); }))); });
    };
    /**
    * This epic listenes to an action that is dispached when loading projcect succeeded
    *
    * It dispaches an action that completes the loading bar
    */
    /**
     * This epic listenes to an action that is dispached when loading projcect succeeded
     *
     * It dispaches an action that completes the loading bar
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createLoadProjectUpdatedEpic = /**
     * This epic listenes to an action that is dispached when loading projcect succeeded
     *
     * It dispaches an action that completes the loading bar
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED), mapTo(_this.loadingBarActions.completeLoading())); });
    };
    /**
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createLoadProjectConfigEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) { return action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_CONFIG), switchMap((/**
         * @param {?} action
         * @return {?}
         */
        function (action) { return new Observable((/**
         * @param {?} globalStore
         * @return {?}
         */
        function (globalStore) {
            globalStore.next(_this.loadingBarActions.startLoading());
            combineLatest(_this.dfh.profile.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.dfh.klass.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.dfh.property.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.dfh.label.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.sys.system_relevant_class.load().resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.sys.config.load().resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.dat.namespace.load('', action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.pro.text_property.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.pro.dfh_class_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.pro.dfh_profile_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.pro.class_field_config.loadOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))), _this.inf.persistent_item.typesOfProject(action.meta.pk_project).resolved$.pipe(filter((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return !!x; }))))
                .pipe(filter((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return !res.includes(undefined); })))
                .subscribe((/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                globalStore.next(_this.actions.loadProjectConfigSucceeded());
                globalStore.next(_this.loadingBarActions.completeLoading());
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) {
                // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
            }));
        })); }))); });
    };
    /**
     * LAYOUT
     */
    /**
     * LAYOUT
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createClosePanelEpic = /**
     * LAYOUT
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(ActiveProjectActions.CLOSE_TAB, ActiveProjectActions.MOVE_TAB, ActiveProjectActions.SPLIT_PANEL), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            function (globalStore) {
                _this.ngRedux.getState().activeProject.panels.forEach((/**
                 * @param {?} panel
                 * @param {?} panelIndex
                 * @return {?}
                 */
                function (panel, panelIndex) {
                    if (panel.tabs.length === 0)
                        globalStore.next(_this.actions.closePanel(panelIndex));
                }));
            })); })));
        });
    };
    /**
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createSplitPanelActivateTabEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(ActiveProjectActions.SPLIT_PANEL), map((/**
             * @param {?} action
             * @return {?}
             */
            function (action) {
                /** @type {?} */
                var p = _this.ngRedux.getState().activeProject;
                /** @type {?} */
                var c = action.meta.currentPanelIndex;
                /** @type {?} */
                var panelIndex = p.panels.length < (c + 1) ? c - 1 : c;
                return _this.actions.activateTab(panelIndex, 0);
            })));
        });
    };
    /**
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createActivateTabFocusPanelEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(ActiveProjectActions.ACTIVATE_TAB), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            function (globalStore) {
                if (_this.ngRedux.getState().activeProject.focusedPanel !== action.meta.panelIndex) {
                    globalStore.next(_this.actions.focusPanel(action.meta.panelIndex));
                }
            })); })));
        });
    };
    /**
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createMoveTabFocusPanelEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(ActiveProjectActions.MOVE_TAB), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            function (globalStore) {
                if (_this.ngRedux.getState().activeProject.focusedPanel !== action.meta.currentPanelIndex) {
                    globalStore.next(_this.actions.focusPanel(action.meta.currentPanelIndex));
                }
            })); })));
        });
    };
    /**
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createClosePanelFocusPanelEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(ActiveProjectActions.CLOSE_PANEL), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalStore
             * @return {?}
             */
            function (globalStore) {
                if (_this.ngRedux.getState().activeProject.focusedPanel > (_this.ngRedux.getState().activeProject.panels.length - 1)) {
                    globalStore.next(_this.actions.focusPanel(0));
                }
            })); })));
        });
    };
    /**
     * @private
     * @return {?}
     */
    ActiveProjectEpics.prototype.createAddTabCloseListEpic = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(ActiveProjectActions.ADD_TAB), mapTo(_this.actions.setListType('')));
        });
    };
    ActiveProjectEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ActiveProjectEpics.ctorParameters = function () { return [
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
    ]; };
    /** @nocollapse */ ActiveProjectEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ActiveProjectEpics_Factory() { return new ActiveProjectEpics(i0.ɵɵinject(i1.SysActions), i0.ɵɵinject(i2.DatActions), i0.ɵɵinject(i3.DfhActions), i0.ɵɵinject(i4.ProActions), i0.ɵɵinject(i5.InfActions), i0.ɵɵinject(i6.ProProjectApi), i0.ɵɵinject(i7.ActiveProjectActions), i0.ɵɵinject(i8.NotificationsAPIActions), i0.ɵɵinject(i9.LoadingBarActions), i0.ɵɵinject(i10.NgRedux)); }, token: ActiveProjectEpics, providedIn: "root" });
    return ActiveProjectEpics;
}());
export { ActiveProjectEpics };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLWd1aS9lcGljcy9hY3RpdmUtcHJvamVjdC5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQWMsYUFBYSxFQUFtQixNQUFNLHVCQUF1QixDQUFDO0FBR25GLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekUsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQXVCLG9CQUFvQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDMUcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7Ozs7Ozs7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QUFPLENBQUMsUUFBUSxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ2xILFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDOUM7WUFDSCxDQUFDLEVBQUMsRUFKd0MsQ0FJeEMsRUFBQyxDQUNKLENBQUE7UUFDSCxDQUFDLEVBQUE7SUFDSCxDQUFDOzs7OztJQUNPLHNEQUF5Qjs7OztJQUFqQztRQUFBLGlCQU9DO1FBTkM7Ozs7O1FBQU8sVUFBQyxPQUFPLEVBQUUsS0FBSztZQUNwQixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQ2pCLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsRUFDcEMsS0FBSyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ3BDLENBQUE7UUFDSCxDQUFDLEVBQUE7SUFDSCxDQUFDOztnQkEzTEYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFyQlEsVUFBVTtnQkFKVixVQUFVO2dCQUNWLFVBQVU7Z0JBRVYsVUFBVTtnQkFEVixVQUFVO2dCQVpFLGFBQWE7Z0JBT0osb0JBQW9CO2dCQUV6Qyx1QkFBdUI7Z0JBRHZCLGlCQUFpQjtnQkFYakIsT0FBTzs7OzZCQUFoQjtDQWlPQyxBQTdMRCxJQTZMQztTQTFMWSxrQkFBa0I7Ozs7OztJQUUzQixpQ0FBdUI7Ozs7O0lBQ3ZCLGlDQUF1Qjs7Ozs7SUFDdkIsaUNBQXVCOzs7OztJQUN2QixpQ0FBdUI7Ozs7O0lBQ3ZCLGlDQUF1Qjs7Ozs7SUFDdkIsd0NBQWlDOzs7OztJQUNqQyxxQ0FBcUM7Ozs7O0lBQ3JDLGlEQUFvRDs7Ozs7SUFDcEQsK0NBQTRDOzs7OztJQUM1QyxxQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3lzQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgUHJvUHJvamVjdCwgUHJvUHJvamVjdEFwaSwgUHJvVGV4dFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBtYXBUbywgbWVyZ2VNYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RBY3Rpb24sIEFjdGl2ZVByb2plY3RBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvYWN0aXZlLXByb2plY3QuYWN0aW9uJztcbmltcG9ydCB7IExvYWRpbmdCYXJBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbG9hZGluZy1iYXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvZGF0LmFjdGlvbnMnO1xuaW1wb3J0IHsgRGZoQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zL2RmaC5hY3Rpb25zJztcbmltcG9ydCB7IEluZkFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucy9pbmYuYWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9BY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgU3lzQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3N5cy5hY3Rpb25zJztcbmltcG9ydCB7IFByb2plY3RQcmV2aWV3IH0gZnJvbSAnLi4vbW9kZWxzL2FjdGl2ZS1wcm9qZWN0Lm1vZGVscyc7XG5cbmZ1bmN0aW9uIGZpcnN0UHJvVGV4dFByb3BTdHJpbmdPZlR5cGUodGV4dFByb3BlcnRpZXM6IFByb1RleHRQcm9wZXJ0eVtdLCBma1N5c3RlbVR5cGUpOiBzdHJpbmcge1xuICByZXR1cm4gKHRleHRQcm9wZXJ0aWVzLmZpbmQodCA9PiB0LmZrX3N5c3RlbV90eXBlID09PSBma1N5c3RlbVR5cGUpIHx8IHsgc3RyaW5nOiAnJyB9KS5zdHJpbmdcbn1cbi8qKlxuICogVHJhbnNmb3JtIFByb1Byb2plY3QgdG8gUHJvamVjdFByZXZpZXdcbiAqL1xuZnVuY3Rpb24gcHJvUHJvamVjdFRvUHJvamVjdFByZXZpZXcocHJvamVjdDogUHJvUHJvamVjdCk6IFByb2plY3RQcmV2aWV3IHtcbiAgcmV0dXJuIHtcbiAgICBsYWJlbDogZmlyc3RQcm9UZXh0UHJvcFN0cmluZ09mVHlwZShwcm9qZWN0LnRleHRfcHJvcGVydGllcywgU3lzQ29uZmlnLlBLX1NZU1RFTV9UWVBFX19URVhUX1BST1BFUlRZX19MQUJFTCksXG4gICAgZGVzY3JpcHRpb246IGZpcnN0UHJvVGV4dFByb3BTdHJpbmdPZlR5cGUocHJvamVjdC50ZXh0X3Byb3BlcnRpZXMsIFN5c0NvbmZpZy5QS19TWVNURU1fVFlQRV9fVEVYVF9QUk9QRVJUWV9fREVTQ1JJUFRJT04pLFxuICAgIGRlZmF1bHRfbGFuZ3VhZ2U6IHByb2plY3QuZGVmYXVsdF9sYW5ndWFnZSxcbiAgICBwa19wcm9qZWN0OiBwcm9qZWN0LnBrX2VudGl0eVxuICB9XG59XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWN0aXZlUHJvamVjdEVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzeXM6IFN5c0FjdGlvbnMsXG4gICAgcHJpdmF0ZSBkYXQ6IERhdEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBkZmg6IERmaEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBwcm86IFByb0FjdGlvbnMsXG4gICAgcHJpdmF0ZSBpbmY6IEluZkFjdGlvbnMsXG4gICAgcHJpdmF0ZSBwcm9qZWN0QXBpOiBQcm9Qcm9qZWN0QXBpLFxuICAgIHByaXZhdGUgYWN0aW9uczogQWN0aXZlUHJvamVjdEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb25BY3Rpb25zOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwcml2YXRlIGxvYWRpbmdCYXJBY3Rpb25zOiBMb2FkaW5nQmFyQWN0aW9ucyxcbiAgICBwcml2YXRlIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYzxGbHV4U3RhbmRhcmRBY3Rpb248YW55PiwgRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG4gICAgICB0aGlzLmNyZWF0ZUxvYWRQcm9qZWN0QmFzaWNzRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVMb2FkUHJvamVjdENvbmZpZ0VwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlTG9hZFByb2plY3RVcGRhdGVkRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVDbG9zZVBhbmVsRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVBY3RpdmF0ZVRhYkZvY3VzUGFuZWxFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZU1vdmVUYWJGb2N1c1BhbmVsRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVDbG9zZVBhbmVsRm9jdXNQYW5lbEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlU3BsaXRQYW5lbEFjdGl2YXRlVGFiRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVBZGRUYWJDbG9zZUxpc3RFcGljKCksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGVwaWMgbGlzdGVuZXMgdG8gYW4gYWN0aW9uIHRoYXQgd2FudHMgdG8gbG9hZCB0aGEgYWN0aXZlIHByb2plY3QgKGJ5IGlkKVxuICAgKiBJdCBsb2FkcyB0aGUgcHJvamVjdCBpbmZvIGFuZFxuICAgKiAtIG9uIGxvYWRlZCBkaXNwYWNoZXMgYW4gYWN0aW9uIHRoYXQgcmVkdWNlcyB0aGUgcHJvamVjdCBpbnRvIHRoZSBzdG9yZVxuICAgKiAtIG9uIGZhaWwgZGlzcGFjaGVzIGFuIGFjdGlvbiB0aGF0IHNob3dzIGFuIGVycm9yIG5vdGlmaWNhdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVMb2FkUHJvamVjdEJhc2ljc0VwaWMoKTogRXBpYzxGbHV4U3RhbmRhcmRBY3Rpb248YW55PiwgRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcblxuICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9CQVNJQ1MpLFxuICAgICAgc3dpdGNoTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgIC8qKlxuICAgICAgICogRW1pdCB0aGUgZ2xvYmFsIGFjdGlvbiB0aGF0IGFjdGl2YXRlcyB0aGUgbG9hZGluZyBiYXJcbiAgICAgICAqL1xuICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuc3RhcnRMb2FkaW5nKCkpO1xuXG4gICAgICAgIHRoaXMucHJvamVjdEFwaS5nZXRCYXNpY3MoYWN0aW9uLm1ldGEucGtfcHJvamVjdClcbiAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGRhdGE6IFByb1Byb2plY3RbXSkgPT4ge1xuICAgICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5sb2FkUHJvamVjdEJhc2lzY3NTdWNjZWRlZChwcm9Qcm9qZWN0VG9Qcm9qZWN0UHJldmlldyhkYXRhWzBdKSkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubm90aWZpY2F0aW9uQWN0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvci5tZXNzYWdlIH1cbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgfSkpXG5cbiAgICApXG4gIH1cblxuICAvKipcbiAgKiBUaGlzIGVwaWMgbGlzdGVuZXMgdG8gYW4gYWN0aW9uIHRoYXQgaXMgZGlzcGFjaGVkIHdoZW4gbG9hZGluZyBwcm9qY2VjdCBzdWNjZWVkZWRcbiAgKlxuICAqIEl0IGRpc3BhY2hlcyBhbiBhY3Rpb24gdGhhdCBjb21wbGV0ZXMgdGhlIGxvYWRpbmcgYmFyXG4gICovXG4gIHByaXZhdGUgY3JlYXRlTG9hZFByb2plY3RVcGRhdGVkRXBpYygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9CQVNJQ1NfU1VDQ0VFREVEKSxcbiAgICAgIG1hcFRvKHRoaXMubG9hZGluZ0JhckFjdGlvbnMuY29tcGxldGVMb2FkaW5nKCkpXG4gICAgKVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVMb2FkUHJvamVjdENvbmZpZ0VwaWMoKTogRXBpYzxGbHV4U3RhbmRhcmRBY3Rpb248YW55PiwgRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcblxuICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9DT05GSUcpLFxuICAgICAgc3dpdGNoTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5zdGFydExvYWRpbmcoKSk7XG5cbiAgICAgICAgY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLmRmaC5wcm9maWxlLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG5cbiAgICAgICAgICB0aGlzLmRmaC5rbGFzcy5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMuZGZoLnByb3BlcnR5LmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5kZmgubGFiZWwubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcblxuICAgICAgICAgIHRoaXMuc3lzLnN5c3RlbV9yZWxldmFudF9jbGFzcy5sb2FkKCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5zeXMuY29uZmlnLmxvYWQoKS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLmRhdC5uYW1lc3BhY2UubG9hZCgnJywgYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG5cbiAgICAgICAgICB0aGlzLnByby50ZXh0X3Byb3BlcnR5LmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5wcm8uZGZoX2NsYXNzX3Byb2pfcmVsLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5wcm8uZGZoX3Byb2ZpbGVfcHJval9yZWwubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLnByby5jbGFzc19maWVsZF9jb25maWcubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcblxuICAgICAgICAgIHRoaXMuaW5mLnBlcnNpc3RlbnRfaXRlbS50eXBlc09mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICAgICApXG4gICAgICAgICAgLnBpcGUoZmlsdGVyKChyZXM6IGFueVtdKSA9PiAhcmVzLmluY2x1ZGVzKHVuZGVmaW5lZCkpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuXG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5sb2FkUHJvamVjdENvbmZpZ1N1Y2NlZWRlZCgpKTtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5jb21wbGV0ZUxvYWRpbmcoKSk7XG5cbiAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyBzdWJTdG9yZS5kaXNwYXRjaCh0aGlzLmFjdGlvbnMubG9hZEZhaWxlZCh7IHN0YXR1czogJycgKyBlcnJvci5zdGF0dXMgfSkpXG4gICAgICAgICAgfSk7XG5cbiAgICAgIH0pKVxuXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogTEFZT1VUXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUNsb3NlUGFuZWxFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5DTE9TRV9UQUIsIEFjdGl2ZVByb2plY3RBY3Rpb25zLk1PVkVfVEFCLCBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TUExJVF9QQU5FTCksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgICAgdGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5wYW5lbHMuZm9yRWFjaCgocGFuZWwsIHBhbmVsSW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChwYW5lbC50YWJzLmxlbmd0aCA9PT0gMCkgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMuY2xvc2VQYW5lbChwYW5lbEluZGV4KSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlU3BsaXRQYW5lbEFjdGl2YXRlVGFiRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuU1BMSVRfUEFORUwpLFxuICAgICAgICBtYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IHAgPSB0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0O1xuICAgICAgICAgIGNvbnN0IGMgPSBhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleDtcbiAgICAgICAgICBjb25zdCBwYW5lbEluZGV4ID0gcC5wYW5lbHMubGVuZ3RoIDwgKGMgKyAxKSA/IGMgLSAxIDogYztcbiAgICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmFjdGl2YXRlVGFiKHBhbmVsSW5kZXgsIDApXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlQWN0aXZhdGVUYWJGb2N1c1BhbmVsRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuQUNUSVZBVEVfVEFCKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5mb2N1c2VkUGFuZWwgIT09IGFjdGlvbi5tZXRhLnBhbmVsSW5kZXgpIHtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmZvY3VzUGFuZWwoYWN0aW9uLm1ldGEucGFuZWxJbmRleCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlTW92ZVRhYkZvY3VzUGFuZWxFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5NT1ZFX1RBQiksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3QuZm9jdXNlZFBhbmVsICE9PSBhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleCkge1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMuZm9jdXNQYW5lbChhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlQ2xvc2VQYW5lbEZvY3VzUGFuZWxFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5DTE9TRV9QQU5FTCksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3QuZm9jdXNlZFBhbmVsID4gKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3QucGFuZWxzLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5mb2N1c1BhbmVsKDApKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgICAgKVxuICAgIH1cbiAgfVxuICBwcml2YXRlIGNyZWF0ZUFkZFRhYkNsb3NlTGlzdEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkFERF9UQUIpLFxuICAgICAgICBtYXBUbyh0aGlzLmFjdGlvbnMuc2V0TGlzdFR5cGUoJycpKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG59XG4iXX0=