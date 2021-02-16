/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/epics/active-project.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { ProProjectApi } from '@kleiolab/lib-sdk-lb3';
import { omit } from 'ramda';
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
import { SchemaObjectService } from '../../state-schema/services/schema-object.service';
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
import * as i11 from "../../state-schema/services/schema-object.service";
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
    function ActiveProjectEpics(sys, dat, dfh, pro, inf, projectApi, actions, notificationActions, loadingBarActions, ngRedux, schemaObj) {
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
        this.schemaObj = schemaObj;
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
                _this.schemaObj.storeSchemaObject({
                    inf: { language: [data[0].default_language] },
                    pro: { project: [omit(['default_language'], data[0])] }
                }, action.meta.pk_project);
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
        { type: NgRedux },
        { type: SchemaObjectService }
    ]; };
    /** @nocollapse */ ActiveProjectEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ActiveProjectEpics_Factory() { return new ActiveProjectEpics(i0.ɵɵinject(i1.SysActions), i0.ɵɵinject(i2.DatActions), i0.ɵɵinject(i3.DfhActions), i0.ɵɵinject(i4.ProActions), i0.ɵɵinject(i5.InfActions), i0.ɵɵinject(i6.ProProjectApi), i0.ɵɵinject(i7.ActiveProjectActions), i0.ɵɵinject(i8.NotificationsAPIActions), i0.ɵɵinject(i9.LoadingBarActions), i0.ɵɵinject(i10.NgRedux), i0.ɵɵinject(i11.SchemaObjectService)); }, token: ActiveProjectEpics, providedIn: "root" });
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
    /**
     * @type {?}
     * @private
     */
    ActiveProjectEpics.prototype.schemaObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLWd1aS9lcGljcy9hY3RpdmUtcHJvamVjdC5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQWMsYUFBYSxFQUFtQixNQUFNLHVCQUF1QixDQUFDO0FBRW5GLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFN0IsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBdUIsb0JBQW9CLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUMxRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEUsT0FB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USxVQUFVO2dCQUpWLFVBQVU7Z0JBQ1YsVUFBVTtnQkFFVixVQUFVO2dCQURWLFVBQVU7Z0JBYkUsYUFBYTtnQkFRSixvQkFBb0I7Z0JBRXpDLHVCQUF1QjtnQkFEdkIsaUJBQWlCO2dCQVpqQixPQUFPO2dCQW1CUCxtQkFBbUI7Ozs2QkFuQjVCO0NBd09DLEFBbE1ELElBa01DO1NBL0xZLGtCQUFrQjs7Ozs7O0lBRTNCLGlDQUF1Qjs7Ozs7SUFDdkIsaUNBQXVCOzs7OztJQUN2QixpQ0FBdUI7Ozs7O0lBQ3ZCLGlDQUF1Qjs7Ozs7SUFDdkIsaUNBQXVCOzs7OztJQUN2Qix3Q0FBaUM7Ozs7O0lBQ2pDLHFDQUFxQzs7Ozs7SUFDckMsaURBQW9EOzs7OztJQUNwRCwrQ0FBNEM7Ozs7O0lBQzVDLHFDQUFtQzs7Ozs7SUFDbkMsdUNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN5c0NvbmZpZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItY29uZmlnJztcbmltcG9ydCB7IFByb1Byb2plY3QsIFByb1Byb2plY3RBcGksIFByb1RleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBvbWl0IH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljLCBvZlR5cGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIG1hcFRvLCBtZXJnZU1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdEFjdGlvbiwgQWN0aXZlUHJvamVjdEFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9hY3RpdmUtcHJvamVjdC5hY3Rpb24nO1xuaW1wb3J0IHsgTG9hZGluZ0JhckFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9sb2FkaW5nLWJhci5hY3Rpb25zJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IERhdEFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucy9kYXQuYWN0aW9ucyc7XG5pbXBvcnQgeyBEZmhBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvZGZoLmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zL2luZi5hY3Rpb25zJztcbmltcG9ydCB7IFByb0FjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucy9wcm8uYWN0aW9ucyc7XG5pbXBvcnQgeyBTeXNBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvc3lzLmFjdGlvbnMnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0U2VydmljZSB9IGZyb20gJy4uLy4uL3N0YXRlLXNjaGVtYS9zZXJ2aWNlcy9zY2hlbWEtb2JqZWN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvamVjdFByZXZpZXcgfSBmcm9tICcuLi9tb2RlbHMvYWN0aXZlLXByb2plY3QubW9kZWxzJztcblxuZnVuY3Rpb24gZmlyc3RQcm9UZXh0UHJvcFN0cmluZ09mVHlwZSh0ZXh0UHJvcGVydGllczogUHJvVGV4dFByb3BlcnR5W10sIGZrU3lzdGVtVHlwZSk6IHN0cmluZyB7XG4gIHJldHVybiAodGV4dFByb3BlcnRpZXMuZmluZCh0ID0+IHQuZmtfc3lzdGVtX3R5cGUgPT09IGZrU3lzdGVtVHlwZSkgfHwgeyBzdHJpbmc6ICcnIH0pLnN0cmluZ1xufVxuLyoqXG4gKiBUcmFuc2Zvcm0gUHJvUHJvamVjdCB0byBQcm9qZWN0UHJldmlld1xuICovXG5mdW5jdGlvbiBwcm9Qcm9qZWN0VG9Qcm9qZWN0UHJldmlldyhwcm9qZWN0OiBQcm9Qcm9qZWN0KTogUHJvamVjdFByZXZpZXcge1xuICByZXR1cm4ge1xuICAgIGxhYmVsOiBmaXJzdFByb1RleHRQcm9wU3RyaW5nT2ZUeXBlKHByb2plY3QudGV4dF9wcm9wZXJ0aWVzLCBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0xBQkVMKSxcbiAgICBkZXNjcmlwdGlvbjogZmlyc3RQcm9UZXh0UHJvcFN0cmluZ09mVHlwZShwcm9qZWN0LnRleHRfcHJvcGVydGllcywgU3lzQ29uZmlnLlBLX1NZU1RFTV9UWVBFX19URVhUX1BST1BFUlRZX19ERVNDUklQVElPTiksXG4gICAgZGVmYXVsdF9sYW5ndWFnZTogcHJvamVjdC5kZWZhdWx0X2xhbmd1YWdlLFxuICAgIHBrX3Byb2plY3Q6IHByb2plY3QucGtfZW50aXR5XG4gIH1cbn1cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBY3RpdmVQcm9qZWN0RXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN5czogU3lzQWN0aW9ucyxcbiAgICBwcml2YXRlIGRhdDogRGF0QWN0aW9ucyxcbiAgICBwcml2YXRlIGRmaDogRGZoQWN0aW9ucyxcbiAgICBwcml2YXRlIHBybzogUHJvQWN0aW9ucyxcbiAgICBwcml2YXRlIGluZjogSW5mQWN0aW9ucyxcbiAgICBwcml2YXRlIHByb2plY3RBcGk6IFByb1Byb2plY3RBcGksXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBBY3RpdmVQcm9qZWN0QWN0aW9ucyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbkFjdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHByaXZhdGUgbG9hZGluZ0JhckFjdGlvbnM6IExvYWRpbmdCYXJBY3Rpb25zLFxuICAgIHByaXZhdGUgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHByaXZhdGUgc2NoZW1hT2JqOiBTY2hlbWFPYmplY3RTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgdGhpcy5jcmVhdGVMb2FkUHJvamVjdEJhc2ljc0VwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlTG9hZFByb2plY3RDb25maWdFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUxvYWRQcm9qZWN0VXBkYXRlZEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQ2xvc2VQYW5lbEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQWN0aXZhdGVUYWJGb2N1c1BhbmVsRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVNb3ZlVGFiRm9jdXNQYW5lbEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQ2xvc2VQYW5lbEZvY3VzUGFuZWxFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZVNwbGl0UGFuZWxBY3RpdmF0ZVRhYkVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQWRkVGFiQ2xvc2VMaXN0RXBpYygpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBlcGljIGxpc3RlbmVzIHRvIGFuIGFjdGlvbiB0aGF0IHdhbnRzIHRvIGxvYWQgdGhhIGFjdGl2ZSBwcm9qZWN0IChieSBpZClcbiAgICogSXQgbG9hZHMgdGhlIHByb2plY3QgaW5mbyBhbmRcbiAgICogLSBvbiBsb2FkZWQgZGlzcGFjaGVzIGFuIGFjdGlvbiB0aGF0IHJlZHVjZXMgdGhlIHByb2plY3QgaW50byB0aGUgc3RvcmVcbiAgICogLSBvbiBmYWlsIGRpc3BhY2hlcyBhbiBhY3Rpb24gdGhhdCBzaG93cyBhbiBlcnJvciBub3RpZmljYXRpb25cbiAgICovXG4gIHByaXZhdGUgY3JlYXRlTG9hZFByb2plY3RCYXNpY3NFcGljKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG5cbiAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQkFTSUNTKSxcbiAgICAgIHN3aXRjaE1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICAvKipcbiAgICAgICAqIEVtaXQgdGhlIGdsb2JhbCBhY3Rpb24gdGhhdCBhY3RpdmF0ZXMgdGhlIGxvYWRpbmcgYmFyXG4gICAgICAgKi9cbiAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLnN0YXJ0TG9hZGluZygpKTtcblxuICAgICAgICB0aGlzLnByb2plY3RBcGkuZ2V0QmFzaWNzKGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIChkYXRhOiBQcm9Qcm9qZWN0W10pID0+IHtcbiAgICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMubG9hZFByb2plY3RCYXNpc2NzU3VjY2VkZWQocHJvUHJvamVjdFRvUHJvamVjdFByZXZpZXcoZGF0YVswXSkpKVxuICAgICAgICAgICAgICB0aGlzLnNjaGVtYU9iai5zdG9yZVNjaGVtYU9iamVjdCh7XG4gICAgICAgICAgICAgICAgaW5mOiB7IGxhbmd1YWdlOiBbZGF0YVswXS5kZWZhdWx0X2xhbmd1YWdlXSB9LFxuICAgICAgICAgICAgICAgIHBybzogeyBwcm9qZWN0OiBbb21pdChbJ2RlZmF1bHRfbGFuZ3VhZ2UnXSwgZGF0YVswXSldIH1cbiAgICAgICAgICAgICAgfSwgYWN0aW9uLm1ldGEucGtfcHJvamVjdClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5ub3RpZmljYXRpb25BY3Rpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yLm1lc3NhZ2UgfVxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH0pXG4gICAgICB9KSlcblxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAqIFRoaXMgZXBpYyBsaXN0ZW5lcyB0byBhbiBhY3Rpb24gdGhhdCBpcyBkaXNwYWNoZWQgd2hlbiBsb2FkaW5nIHByb2pjZWN0IHN1Y2NlZWRlZFxuICAqXG4gICogSXQgZGlzcGFjaGVzIGFuIGFjdGlvbiB0aGF0IGNvbXBsZXRlcyB0aGUgbG9hZGluZyBiYXJcbiAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVMb2FkUHJvamVjdFVwZGF0ZWRFcGljKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0JBU0lDU19TVUNDRUVERUQpLFxuICAgICAgbWFwVG8odGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5jb21wbGV0ZUxvYWRpbmcoKSlcbiAgICApXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUxvYWRQcm9qZWN0Q29uZmlnRXBpYygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuXG4gICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0NPTkZJRyksXG4gICAgICBzd2l0Y2hNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLnN0YXJ0TG9hZGluZygpKTtcblxuICAgICAgICBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMuZGZoLnByb2ZpbGUubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcblxuICAgICAgICAgIHRoaXMuZGZoLmtsYXNzLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5kZmgucHJvcGVydHkubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLmRmaC5sYWJlbC5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuXG4gICAgICAgICAgdGhpcy5zeXMuc3lzdGVtX3JlbGV2YW50X2NsYXNzLmxvYWQoKS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLnN5cy5jb25maWcubG9hZCgpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMuZGF0Lm5hbWVzcGFjZS5sb2FkKCcnLCBhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcblxuICAgICAgICAgIHRoaXMucHJvLnRleHRfcHJvcGVydHkubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLnByby5kZmhfY2xhc3NfcHJval9yZWwubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLnByby5kZmhfcHJvZmlsZV9wcm9qX3JlbC5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMucHJvLmNsYXNzX2ZpZWxkX2NvbmZpZy5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuXG4gICAgICAgICAgdGhpcy5pbmYucGVyc2lzdGVudF9pdGVtLnR5cGVzT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gICAgICAgIClcbiAgICAgICAgICAucGlwZShmaWx0ZXIoKHJlczogYW55W10pID0+ICFyZXMuaW5jbHVkZXModW5kZWZpbmVkKSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG5cbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmxvYWRQcm9qZWN0Q29uZmlnU3VjY2VlZGVkKCkpO1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLmNvbXBsZXRlTG9hZGluZygpKTtcblxuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIHN1YlN0b3JlLmRpc3BhdGNoKHRoaXMuYWN0aW9ucy5sb2FkRmFpbGVkKHsgc3RhdHVzOiAnJyArIGVycm9yLnN0YXR1cyB9KSlcbiAgICAgICAgICB9KTtcblxuICAgICAgfSkpXG5cbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBMQVlPVVRcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlQ2xvc2VQYW5lbEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1RBQiwgQWN0aXZlUHJvamVjdEFjdGlvbnMuTU9WRV9UQUIsIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNQTElUX1BBTkVMKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgICB0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0LnBhbmVscy5mb3JFYWNoKChwYW5lbCwgcGFuZWxJbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBhbmVsLnRhYnMubGVuZ3RoID09PSAwKSBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5jbG9zZVBhbmVsKHBhbmVsSW5kZXgpKTtcbiAgICAgICAgICB9KVxuICAgICAgICB9KSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVTcGxpdFBhbmVsQWN0aXZhdGVUYWJFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5TUExJVF9QQU5FTCksXG4gICAgICAgIG1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgcCA9IHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3Q7XG4gICAgICAgICAgY29uc3QgYyA9IGFjdGlvbi5tZXRhLmN1cnJlbnRQYW5lbEluZGV4O1xuICAgICAgICAgIGNvbnN0IHBhbmVsSW5kZXggPSBwLnBhbmVscy5sZW5ndGggPCAoYyArIDEpID8gYyAtIDEgOiBjO1xuICAgICAgICAgIHJldHVybiB0aGlzLmFjdGlvbnMuYWN0aXZhdGVUYWIocGFuZWxJbmRleCwgMClcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVBY3RpdmF0ZVRhYkZvY3VzUGFuZWxFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5BQ1RJVkFURV9UQUIpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0LmZvY3VzZWRQYW5lbCAhPT0gYWN0aW9uLm1ldGEucGFuZWxJbmRleCkge1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMuZm9jdXNQYW5lbChhY3Rpb24ubWV0YS5wYW5lbEluZGV4KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVNb3ZlVGFiRm9jdXNQYW5lbEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLk1PVkVfVEFCKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5mb2N1c2VkUGFuZWwgIT09IGFjdGlvbi5tZXRhLmN1cnJlbnRQYW5lbEluZGV4KSB7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5mb2N1c1BhbmVsKGFjdGlvbi5tZXRhLmN1cnJlbnRQYW5lbEluZGV4KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVDbG9zZVBhbmVsRm9jdXNQYW5lbEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1BBTkVMKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5mb2N1c2VkUGFuZWwgPiAodGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5wYW5lbHMubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmZvY3VzUGFuZWwoMCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlQWRkVGFiQ2xvc2VMaXN0RXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuQUREX1RBQiksXG4gICAgICAgIG1hcFRvKHRoaXMuYWN0aW9ucy5zZXRMaXN0VHlwZSgnJykpXG4gICAgICApXG4gICAgfVxuICB9XG5cbn1cbiJdfQ==