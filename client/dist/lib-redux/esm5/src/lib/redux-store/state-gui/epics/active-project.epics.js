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
        { type: Injectable }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1ndWkvZXBpY3MvYWN0aXZlLXByb2plY3QuZXBpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFjLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBR2xFLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekUsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hHLE9BQU8sRUFBdUIsb0JBQW9CLEVBQUUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7OztBQU1uSCxTQUFTLDBCQUEwQixDQUFDLE9BQW1CO0lBQ3JELE9BQU87UUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLDRCQUE0QixDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLG9DQUFvQyxDQUFDO1FBQ2pILFdBQVcsRUFBRSxJQUFJLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsMENBQTBDLENBQUM7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QUFDLElBQUksQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFILENBQUcsRUFBQyxDQUFDLEVBRXJGLEtBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFILENBQUcsRUFBQyxDQUFDLEVBQ3RFLEtBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQUMsQ0FBQyxFQUN2RCxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFILENBQUcsRUFBQyxDQUFDLEVBRXBGLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQUMsQ0FBQyxFQUM3RixLQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsRUFBSCxDQUFHLEVBQUMsQ0FBQyxFQUNsRyxLQUFJLENBQUMsR0FB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VyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ3BDLENBQUE7UUFDSCxDQUFDLEVBQUE7SUFDSCxDQUFDOztnQkF6TEYsVUFBVTs7OztnQkFqQjhDLFVBQVU7Z0JBQTFELFVBQVU7Z0JBQUUsVUFBVTtnQkFBYyxVQUFVO2dCQUF0QixVQUFVO2dCQVB0QixhQUFhO2dCQVFKLG9CQUFvQjtnQkFBcUIsdUJBQXVCO2dCQUExQyxpQkFBaUI7Z0JBWDVELE9BQU87O0lBc05oQix5QkFBQztDQUFBLEFBM0xELElBMkxDO1NBMUxZLGtCQUFrQjs7Ozs7O0lBRTNCLGlDQUF1Qjs7Ozs7SUFDdkIsaUNBQXVCOzs7OztJQUN2QixpQ0FBdUI7Ozs7O0lBQ3ZCLGlDQUF1Qjs7Ozs7SUFDdkIsaUNBQXVCOzs7OztJQUN2Qix3Q0FBaUM7Ozs7O0lBQ2pDLHFDQUFxQzs7Ozs7SUFDckMsaURBQW9EOzs7OztJQUNwRCwrQ0FBNEM7Ozs7O0lBQzVDLHFDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTeXNDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBQcm9Qcm9qZWN0LCBQcm9Qcm9qZWN0QXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBtYXBUbywgbWVyZ2VNYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzJztcbmltcG9ydCB7IERhdEFjdGlvbnMsIERmaEFjdGlvbnMsIEluZkFjdGlvbnMsIFByb0FjdGlvbnMsIFN5c0FjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucyc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0QWN0aW9uLCBBY3RpdmVQcm9qZWN0QWN0aW9ucywgTG9hZGluZ0JhckFjdGlvbnMsIE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9qZWN0UHJldmlldyB9IGZyb20gJy4uL21vZGVscyc7XG5cbi8qKlxuICogVHJhbnNmb3JtIFByb1Byb2plY3QgdG8gUHJvamVjdFByZXZpZXdcbiAqL1xuZnVuY3Rpb24gcHJvUHJvamVjdFRvUHJvamVjdFByZXZpZXcocHJvamVjdDogUHJvUHJvamVjdCk6IFByb2plY3RQcmV2aWV3IHtcbiAgcmV0dXJuIHtcbiAgICBsYWJlbDogdGhpcy5maXJzdFByb1RleHRQcm9wU3RyaW5nT2ZUeXBlKHByb2plY3QudGV4dF9wcm9wZXJ0aWVzLCBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0xBQkVMKSxcbiAgICBkZXNjcmlwdGlvbjogdGhpcy5maXJzdFByb1RleHRQcm9wU3RyaW5nT2ZUeXBlKHByb2plY3QudGV4dF9wcm9wZXJ0aWVzLCBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0RFU0NSSVBUSU9OKSxcbiAgICBkZWZhdWx0X2xhbmd1YWdlOiBwcm9qZWN0LmRlZmF1bHRfbGFuZ3VhZ2UsXG4gICAgcGtfcHJvamVjdDogcHJvamVjdC5wa19lbnRpdHlcbiAgfVxufVxuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY3RpdmVQcm9qZWN0RXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN5czogU3lzQWN0aW9ucyxcbiAgICBwcml2YXRlIGRhdDogRGF0QWN0aW9ucyxcbiAgICBwcml2YXRlIGRmaDogRGZoQWN0aW9ucyxcbiAgICBwcml2YXRlIHBybzogUHJvQWN0aW9ucyxcbiAgICBwcml2YXRlIGluZjogSW5mQWN0aW9ucyxcbiAgICBwcml2YXRlIHByb2plY3RBcGk6IFByb1Byb2plY3RBcGksXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBBY3RpdmVQcm9qZWN0QWN0aW9ucyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbkFjdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHByaXZhdGUgbG9hZGluZ0JhckFjdGlvbnM6IExvYWRpbmdCYXJBY3Rpb25zLFxuICAgIHByaXZhdGUgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIHRoaXMuY3JlYXRlTG9hZFByb2plY3RCYXNpY3NFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUxvYWRQcm9qZWN0Q29uZmlnRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVMb2FkUHJvamVjdFVwZGF0ZWRFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUNsb3NlUGFuZWxFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUFjdGl2YXRlVGFiRm9jdXNQYW5lbEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlTW92ZVRhYkZvY3VzUGFuZWxFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUNsb3NlUGFuZWxGb2N1c1BhbmVsRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVTcGxpdFBhbmVsQWN0aXZhdGVUYWJFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUFkZFRhYkNsb3NlTGlzdEVwaWMoKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZXBpYyBsaXN0ZW5lcyB0byBhbiBhY3Rpb24gdGhhdCB3YW50cyB0byBsb2FkIHRoYSBhY3RpdmUgcHJvamVjdCAoYnkgaWQpXG4gICAqIEl0IGxvYWRzIHRoZSBwcm9qZWN0IGluZm8gYW5kXG4gICAqIC0gb24gbG9hZGVkIGRpc3BhY2hlcyBhbiBhY3Rpb24gdGhhdCByZWR1Y2VzIHRoZSBwcm9qZWN0IGludG8gdGhlIHN0b3JlXG4gICAqIC0gb24gZmFpbCBkaXNwYWNoZXMgYW4gYWN0aW9uIHRoYXQgc2hvd3MgYW4gZXJyb3Igbm90aWZpY2F0aW9uXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUxvYWRQcm9qZWN0QmFzaWNzRXBpYygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuXG4gICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0JBU0lDUyksXG4gICAgICBzd2l0Y2hNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgLyoqXG4gICAgICAgKiBFbWl0IHRoZSBnbG9iYWwgYWN0aW9uIHRoYXQgYWN0aXZhdGVzIHRoZSBsb2FkaW5nIGJhclxuICAgICAgICovXG4gICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5zdGFydExvYWRpbmcoKSk7XG5cbiAgICAgICAgdGhpcy5wcm9qZWN0QXBpLmdldEJhc2ljcyhhY3Rpb24ubWV0YS5wa19wcm9qZWN0KVxuICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZGF0YTogUHJvUHJvamVjdFtdKSA9PiB7XG4gICAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmxvYWRQcm9qZWN0QmFzaXNjc1N1Y2NlZGVkKHByb1Byb2plY3RUb1Byb2plY3RQcmV2aWV3KGRhdGFbMF0pKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5ub3RpZmljYXRpb25BY3Rpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yLm1lc3NhZ2UgfVxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH0pXG4gICAgICB9KSlcblxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAqIFRoaXMgZXBpYyBsaXN0ZW5lcyB0byBhbiBhY3Rpb24gdGhhdCBpcyBkaXNwYWNoZWQgd2hlbiBsb2FkaW5nIHByb2pjZWN0IHN1Y2NlZWRlZFxuICAqXG4gICogSXQgZGlzcGFjaGVzIGFuIGFjdGlvbiB0aGF0IGNvbXBsZXRlcyB0aGUgbG9hZGluZyBiYXJcbiAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVMb2FkUHJvamVjdFVwZGF0ZWRFcGljKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0JBU0lDU19TVUNDRUVERUQpLFxuICAgICAgbWFwVG8odGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5jb21wbGV0ZUxvYWRpbmcoKSlcbiAgICApXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUxvYWRQcm9qZWN0Q29uZmlnRXBpYygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuXG4gICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0NPTkZJRyksXG4gICAgICBzd2l0Y2hNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLnN0YXJ0TG9hZGluZygpKTtcblxuICAgICAgICBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMuZGZoLnByb2ZpbGUubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcblxuICAgICAgICAgIHRoaXMuZGZoLmtsYXNzLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5kZmgucHJvcGVydHkubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLmRmaC5sYWJlbC5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuXG4gICAgICAgICAgdGhpcy5zeXMuc3lzdGVtX3JlbGV2YW50X2NsYXNzLmxvYWQoKS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLnN5cy5jb25maWcubG9hZCgpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMuZGF0Lm5hbWVzcGFjZS5sb2FkKCcnLCBhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcblxuICAgICAgICAgIHRoaXMucHJvLnRleHRfcHJvcGVydHkubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLnByby5kZmhfY2xhc3NfcHJval9yZWwubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLnByby5kZmhfcHJvZmlsZV9wcm9qX3JlbC5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMucHJvLmNsYXNzX2ZpZWxkX2NvbmZpZy5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuXG4gICAgICAgICAgdGhpcy5pbmYucGVyc2lzdGVudF9pdGVtLnR5cGVzT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gICAgICAgIClcbiAgICAgICAgICAucGlwZShmaWx0ZXIoKHJlczogYW55W10pID0+ICFyZXMuaW5jbHVkZXModW5kZWZpbmVkKSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG5cbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmxvYWRQcm9qZWN0Q29uZmlnU3VjY2VlZGVkKCkpO1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLmNvbXBsZXRlTG9hZGluZygpKTtcblxuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIHN1YlN0b3JlLmRpc3BhdGNoKHRoaXMuYWN0aW9ucy5sb2FkRmFpbGVkKHsgc3RhdHVzOiAnJyArIGVycm9yLnN0YXR1cyB9KSlcbiAgICAgICAgICB9KTtcblxuICAgICAgfSkpXG5cbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBMQVlPVVRcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlQ2xvc2VQYW5lbEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1RBQiwgQWN0aXZlUHJvamVjdEFjdGlvbnMuTU9WRV9UQUIsIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNQTElUX1BBTkVMKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgICB0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0LnBhbmVscy5mb3JFYWNoKChwYW5lbCwgcGFuZWxJbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBhbmVsLnRhYnMubGVuZ3RoID09PSAwKSBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5jbG9zZVBhbmVsKHBhbmVsSW5kZXgpKTtcbiAgICAgICAgICB9KVxuICAgICAgICB9KSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVTcGxpdFBhbmVsQWN0aXZhdGVUYWJFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5TUExJVF9QQU5FTCksXG4gICAgICAgIG1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgcCA9IHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3Q7XG4gICAgICAgICAgY29uc3QgYyA9IGFjdGlvbi5tZXRhLmN1cnJlbnRQYW5lbEluZGV4O1xuICAgICAgICAgIGNvbnN0IHBhbmVsSW5kZXggPSBwLnBhbmVscy5sZW5ndGggPCAoYyArIDEpID8gYyAtIDEgOiBjO1xuICAgICAgICAgIHJldHVybiB0aGlzLmFjdGlvbnMuYWN0aXZhdGVUYWIocGFuZWxJbmRleCwgMClcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVBY3RpdmF0ZVRhYkZvY3VzUGFuZWxFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5BQ1RJVkFURV9UQUIpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0LmZvY3VzZWRQYW5lbCAhPT0gYWN0aW9uLm1ldGEucGFuZWxJbmRleCkge1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMuZm9jdXNQYW5lbChhY3Rpb24ubWV0YS5wYW5lbEluZGV4KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVNb3ZlVGFiRm9jdXNQYW5lbEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLk1PVkVfVEFCKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5mb2N1c2VkUGFuZWwgIT09IGFjdGlvbi5tZXRhLmN1cnJlbnRQYW5lbEluZGV4KSB7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5mb2N1c1BhbmVsKGFjdGlvbi5tZXRhLmN1cnJlbnRQYW5lbEluZGV4KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVDbG9zZVBhbmVsRm9jdXNQYW5lbEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1BBTkVMKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5mb2N1c2VkUGFuZWwgPiAodGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5wYW5lbHMubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmZvY3VzUGFuZWwoMCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlQWRkVGFiQ2xvc2VMaXN0RXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuQUREX1RBQiksXG4gICAgICAgIG1hcFRvKHRoaXMuYWN0aW9ucy5zZXRMaXN0VHlwZSgnJykpXG4gICAgICApXG4gICAgfVxuICB9XG5cbn1cbiJdfQ==