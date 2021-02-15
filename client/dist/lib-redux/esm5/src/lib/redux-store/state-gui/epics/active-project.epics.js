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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1ndWkvZXBpY3MvYWN0aXZlLXByb2plY3QuZXBpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFjLGFBQWEsRUFBbUIsTUFBTSx1QkFBdUIsQ0FBQztBQUduRixPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUF1QixvQkFBb0IsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQzFHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7Ozs7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QUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUNsSCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlDO1lBQ0gsQ0FBQyxFQUFDLEVBSndDLENBSXhDLEVBQUMsQ0FDSixDQUFBO1FBQ0gsQ0FBQyxFQUFBO0lBQ0gsQ0FBQzs7Ozs7SUFDTyxzREFBeUI7Ozs7SUFBakM7UUFBQSxpQkFPQztRQU5DOzs7OztRQUFPLFVBQUMsT0FBTyxFQUFFLEtBQUs7WUFDcEIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUNqQixNQUFNLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLEVBQ3BDLEtBQUssQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUNwQyxDQUFBO1FBQ0gsQ0FBQyxFQUFBO0lBQ0gsQ0FBQzs7Z0JBM0xGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBckJRLFVBQVU7Z0JBSlYsVUFBVTtnQkFDVixVQUFVO2dCQUVWLFVBQVU7Z0JBRFYsVUFBVTtnQkFaRSxhQUFhO2dCQU9KLG9CQUFvQjtnQkFFekMsdUJBQXVCO2dCQUR2QixpQkFBaUI7Z0JBWGpCLE9BQU87Ozs2QkFBaEI7Q0FpT0MsQUE3TEQsSUE2TEM7U0ExTFksa0JBQWtCOzs7Ozs7SUFFM0IsaUNBQXVCOzs7OztJQUN2QixpQ0FBdUI7Ozs7O0lBQ3ZCLGlDQUF1Qjs7Ozs7SUFDdkIsaUNBQXVCOzs7OztJQUN2QixpQ0FBdUI7Ozs7O0lBQ3ZCLHdDQUFpQzs7Ozs7SUFDakMscUNBQXFDOzs7OztJQUNyQyxpREFBb0Q7Ozs7O0lBQ3BELCtDQUE0Qzs7Ozs7SUFDNUMscUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN5c0NvbmZpZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItY29uZmlnJztcbmltcG9ydCB7IFByb1Byb2plY3QsIFByb1Byb2plY3RBcGksIFByb1RleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMsIG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgbWFwVG8sIG1lcmdlTWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0QWN0aW9uLCBBY3RpdmVQcm9qZWN0QWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL2FjdGl2ZS1wcm9qZWN0LmFjdGlvbic7XG5pbXBvcnQgeyBMb2FkaW5nQmFyQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL2xvYWRpbmctYmFyLmFjdGlvbnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgRGF0QWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zL2RhdC5hY3Rpb25zJztcbmltcG9ydCB7IERmaEFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucy9kZmguYWN0aW9ucyc7XG5pbXBvcnQgeyBJbmZBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvaW5mLmFjdGlvbnMnO1xuaW1wb3J0IHsgUHJvQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3Byby5hY3Rpb25zJztcbmltcG9ydCB7IFN5c0FjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucy9zeXMuYWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9qZWN0UHJldmlldyB9IGZyb20gJy4uL21vZGVscy9hY3RpdmUtcHJvamVjdC5tb2RlbHMnO1xuXG5mdW5jdGlvbiBmaXJzdFByb1RleHRQcm9wU3RyaW5nT2ZUeXBlKHRleHRQcm9wZXJ0aWVzOiBQcm9UZXh0UHJvcGVydHlbXSwgZmtTeXN0ZW1UeXBlKTogc3RyaW5nIHtcbiAgcmV0dXJuICh0ZXh0UHJvcGVydGllcy5maW5kKHQgPT4gdC5ma19zeXN0ZW1fdHlwZSA9PT0gZmtTeXN0ZW1UeXBlKSB8fCB7IHN0cmluZzogJycgfSkuc3RyaW5nXG59XG4vKipcbiAqIFRyYW5zZm9ybSBQcm9Qcm9qZWN0IHRvIFByb2plY3RQcmV2aWV3XG4gKi9cbmZ1bmN0aW9uIHByb1Byb2plY3RUb1Byb2plY3RQcmV2aWV3KHByb2plY3Q6IFByb1Byb2plY3QpOiBQcm9qZWN0UHJldmlldyB7XG4gIHJldHVybiB7XG4gICAgbGFiZWw6IGZpcnN0UHJvVGV4dFByb3BTdHJpbmdPZlR5cGUocHJvamVjdC50ZXh0X3Byb3BlcnRpZXMsIFN5c0NvbmZpZy5QS19TWVNURU1fVFlQRV9fVEVYVF9QUk9QRVJUWV9fTEFCRUwpLFxuICAgIGRlc2NyaXB0aW9uOiBmaXJzdFByb1RleHRQcm9wU3RyaW5nT2ZUeXBlKHByb2plY3QudGV4dF9wcm9wZXJ0aWVzLCBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0RFU0NSSVBUSU9OKSxcbiAgICBkZWZhdWx0X2xhbmd1YWdlOiBwcm9qZWN0LmRlZmF1bHRfbGFuZ3VhZ2UsXG4gICAgcGtfcHJvamVjdDogcHJvamVjdC5wa19lbnRpdHlcbiAgfVxufVxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFjdGl2ZVByb2plY3RFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3lzOiBTeXNBY3Rpb25zLFxuICAgIHByaXZhdGUgZGF0OiBEYXRBY3Rpb25zLFxuICAgIHByaXZhdGUgZGZoOiBEZmhBY3Rpb25zLFxuICAgIHByaXZhdGUgcHJvOiBQcm9BY3Rpb25zLFxuICAgIHByaXZhdGUgaW5mOiBJbmZBY3Rpb25zLFxuICAgIHByaXZhdGUgcHJvamVjdEFwaTogUHJvUHJvamVjdEFwaSxcbiAgICBwcml2YXRlIGFjdGlvbnM6IEFjdGl2ZVByb2plY3RBY3Rpb25zLFxuICAgIHByaXZhdGUgbm90aWZpY2F0aW9uQWN0aW9uczogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHJpdmF0ZSBsb2FkaW5nQmFyQWN0aW9uczogTG9hZGluZ0JhckFjdGlvbnMsXG4gICAgcHJpdmF0ZSBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgdGhpcy5jcmVhdGVMb2FkUHJvamVjdEJhc2ljc0VwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlTG9hZFByb2plY3RDb25maWdFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUxvYWRQcm9qZWN0VXBkYXRlZEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQ2xvc2VQYW5lbEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQWN0aXZhdGVUYWJGb2N1c1BhbmVsRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVNb3ZlVGFiRm9jdXNQYW5lbEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQ2xvc2VQYW5lbEZvY3VzUGFuZWxFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZVNwbGl0UGFuZWxBY3RpdmF0ZVRhYkVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQWRkVGFiQ2xvc2VMaXN0RXBpYygpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBlcGljIGxpc3RlbmVzIHRvIGFuIGFjdGlvbiB0aGF0IHdhbnRzIHRvIGxvYWQgdGhhIGFjdGl2ZSBwcm9qZWN0IChieSBpZClcbiAgICogSXQgbG9hZHMgdGhlIHByb2plY3QgaW5mbyBhbmRcbiAgICogLSBvbiBsb2FkZWQgZGlzcGFjaGVzIGFuIGFjdGlvbiB0aGF0IHJlZHVjZXMgdGhlIHByb2plY3QgaW50byB0aGUgc3RvcmVcbiAgICogLSBvbiBmYWlsIGRpc3BhY2hlcyBhbiBhY3Rpb24gdGhhdCBzaG93cyBhbiBlcnJvciBub3RpZmljYXRpb25cbiAgICovXG4gIHByaXZhdGUgY3JlYXRlTG9hZFByb2plY3RCYXNpY3NFcGljKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG5cbiAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQkFTSUNTKSxcbiAgICAgIHN3aXRjaE1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICAvKipcbiAgICAgICAqIEVtaXQgdGhlIGdsb2JhbCBhY3Rpb24gdGhhdCBhY3RpdmF0ZXMgdGhlIGxvYWRpbmcgYmFyXG4gICAgICAgKi9cbiAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLnN0YXJ0TG9hZGluZygpKTtcblxuICAgICAgICB0aGlzLnByb2plY3RBcGkuZ2V0QmFzaWNzKGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIChkYXRhOiBQcm9Qcm9qZWN0W10pID0+IHtcbiAgICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMubG9hZFByb2plY3RCYXNpc2NzU3VjY2VkZWQocHJvUHJvamVjdFRvUHJvamVjdFByZXZpZXcoZGF0YVswXSkpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLm5vdGlmaWNhdGlvbkFjdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IubWVzc2FnZSB9XG4gICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfSlcbiAgICAgIH0pKVxuXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICogVGhpcyBlcGljIGxpc3RlbmVzIHRvIGFuIGFjdGlvbiB0aGF0IGlzIGRpc3BhY2hlZCB3aGVuIGxvYWRpbmcgcHJvamNlY3Qgc3VjY2VlZGVkXG4gICpcbiAgKiBJdCBkaXNwYWNoZXMgYW4gYWN0aW9uIHRoYXQgY29tcGxldGVzIHRoZSBsb2FkaW5nIGJhclxuICAqL1xuICBwcml2YXRlIGNyZWF0ZUxvYWRQcm9qZWN0VXBkYXRlZEVwaWMoKTogRXBpYzxGbHV4U3RhbmRhcmRBY3Rpb248YW55PiwgRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQkFTSUNTX1NVQ0NFRURFRCksXG4gICAgICBtYXBUbyh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLmNvbXBsZXRlTG9hZGluZygpKVxuICAgIClcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTG9hZFByb2plY3RDb25maWdFcGljKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG5cbiAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQ09ORklHKSxcbiAgICAgIHN3aXRjaE1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuc3RhcnRMb2FkaW5nKCkpO1xuXG4gICAgICAgIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdGhpcy5kZmgucHJvZmlsZS5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuXG4gICAgICAgICAgdGhpcy5kZmgua2xhc3MubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLmRmaC5wcm9wZXJ0eS5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMuZGZoLmxhYmVsLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG5cbiAgICAgICAgICB0aGlzLnN5cy5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MubG9hZCgpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMuc3lzLmNvbmZpZy5sb2FkKCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5kYXQubmFtZXNwYWNlLmxvYWQoJycsIGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuXG4gICAgICAgICAgdGhpcy5wcm8udGV4dF9wcm9wZXJ0eS5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMucHJvLmRmaF9jbGFzc19wcm9qX3JlbC5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMucHJvLmRmaF9wcm9maWxlX3Byb2pfcmVsLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5wcm8uY2xhc3NfZmllbGRfY29uZmlnLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG5cbiAgICAgICAgICB0aGlzLmluZi5wZXJzaXN0ZW50X2l0ZW0udHlwZXNPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSlcbiAgICAgICAgKVxuICAgICAgICAgIC5waXBlKGZpbHRlcigocmVzOiBhbnlbXSkgPT4gIXJlcy5pbmNsdWRlcyh1bmRlZmluZWQpKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcblxuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMubG9hZFByb2plY3RDb25maWdTdWNjZWVkZWQoKSk7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubG9hZGluZ0JhckFjdGlvbnMuY29tcGxldGVMb2FkaW5nKCkpO1xuXG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy8gc3ViU3RvcmUuZGlzcGF0Y2godGhpcy5hY3Rpb25zLmxvYWRGYWlsZWQoeyBzdGF0dXM6ICcnICsgZXJyb3Iuc3RhdHVzIH0pKVxuICAgICAgICAgIH0pO1xuXG4gICAgICB9KSlcblxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIExBWU9VVFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVDbG9zZVBhbmVsRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuQ0xPU0VfVEFCLCBBY3RpdmVQcm9qZWN0QWN0aW9ucy5NT1ZFX1RBQiwgQWN0aXZlUHJvamVjdEFjdGlvbnMuU1BMSVRfUEFORUwpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICAgIHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3QucGFuZWxzLmZvckVhY2goKHBhbmVsLCBwYW5lbEluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAocGFuZWwudGFicy5sZW5ndGggPT09IDApIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmNsb3NlUGFuZWwocGFuZWxJbmRleCkpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH0pKVxuICAgICAgKVxuICAgIH1cbiAgfVxuICBwcml2YXRlIGNyZWF0ZVNwbGl0UGFuZWxBY3RpdmF0ZVRhYkVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLlNQTElUX1BBTkVMKSxcbiAgICAgICAgbWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IHtcbiAgICAgICAgICBjb25zdCBwID0gdGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdDtcbiAgICAgICAgICBjb25zdCBjID0gYWN0aW9uLm1ldGEuY3VycmVudFBhbmVsSW5kZXg7XG4gICAgICAgICAgY29uc3QgcGFuZWxJbmRleCA9IHAucGFuZWxzLmxlbmd0aCA8IChjICsgMSkgPyBjIC0gMSA6IGM7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9ucy5hY3RpdmF0ZVRhYihwYW5lbEluZGV4LCAwKVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH1cbiAgfVxuICBwcml2YXRlIGNyZWF0ZUFjdGl2YXRlVGFiRm9jdXNQYW5lbEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkFDVElWQVRFX1RBQiksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3QuZm9jdXNlZFBhbmVsICE9PSBhY3Rpb24ubWV0YS5wYW5lbEluZGV4KSB7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5mb2N1c1BhbmVsKGFjdGlvbi5tZXRhLnBhbmVsSW5kZXgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgICAgKVxuICAgIH1cbiAgfVxuICBwcml2YXRlIGNyZWF0ZU1vdmVUYWJGb2N1c1BhbmVsRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuTU9WRV9UQUIpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0LmZvY3VzZWRQYW5lbCAhPT0gYWN0aW9uLm1ldGEuY3VycmVudFBhbmVsSW5kZXgpIHtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmZvY3VzUGFuZWwoYWN0aW9uLm1ldGEuY3VycmVudFBhbmVsSW5kZXgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgICAgKVxuICAgIH1cbiAgfVxuICBwcml2YXRlIGNyZWF0ZUNsb3NlUGFuZWxGb2N1c1BhbmVsRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuQ0xPU0VfUEFORUwpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0LmZvY3VzZWRQYW5lbCA+ICh0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0LnBhbmVscy5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMuZm9jdXNQYW5lbCgwKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVBZGRUYWJDbG9zZUxpc3RFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5BRERfVEFCKSxcbiAgICAgICAgbWFwVG8odGhpcy5hY3Rpb25zLnNldExpc3RUeXBlKCcnKSlcbiAgICAgIClcbiAgICB9XG4gIH1cblxufVxuIl19