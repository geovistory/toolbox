/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/epics/active-project.epics.ts
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
    t => t.fk_system_type === fkSystemType)) || { string: '' }).string;
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
     * @param {?} schemaObj
     */
    constructor(sys, dat, dfh, pro, inf, projectApi, actions, notificationActions, loadingBarActions, ngRedux, schemaObj) {
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
                this.schemaObj.storeSchemaObject({
                    inf: { language: [data[0].default_language] },
                    pro: { project: [omit(['default_language'], data[0])] }
                }, action.meta.pk_project);
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
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
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
    { type: NgRedux },
    { type: SchemaObjectService }
];
/** @nocollapse */ ActiveProjectEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ActiveProjectEpics_Factory() { return new ActiveProjectEpics(i0.ɵɵinject(i1.SysActions), i0.ɵɵinject(i2.DatActions), i0.ɵɵinject(i3.DfhActions), i0.ɵɵinject(i4.ProActions), i0.ɵɵinject(i5.InfActions), i0.ɵɵinject(i6.ProProjectApi), i0.ɵɵinject(i7.ActiveProjectActions), i0.ɵɵinject(i8.NotificationsAPIActions), i0.ɵɵinject(i9.LoadingBarActions), i0.ɵɵinject(i10.NgRedux), i0.ɵɵinject(i11.SchemaObjectService)); }, token: ActiveProjectEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1ndWkvZXBpY3MvYWN0aXZlLXByb2plY3QuZXBpY3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakQsT0FBTyxFQUFjLGFBQWEsRUFBbUIsTUFBTSx1QkFBdUIsQ0FBQztBQUVuRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRTdCLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekUsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQXVCLG9CQUFvQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDMUcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDaEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BF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Q0FBcUM7Ozs7O0lBQ3JDLGlEQUFvRDs7Ozs7SUFDcEQsK0NBQTRDOzs7OztJQUM1QyxxQ0FBbUM7Ozs7O0lBQ25DLHVDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTeXNDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBQcm9Qcm9qZWN0LCBQcm9Qcm9qZWN0QXBpLCBQcm9UZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgb21pdCB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBtYXBUbywgbWVyZ2VNYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RBY3Rpb24sIEFjdGl2ZVByb2plY3RBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvYWN0aXZlLXByb2plY3QuYWN0aW9uJztcbmltcG9ydCB7IExvYWRpbmdCYXJBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbG9hZGluZy1iYXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvZGF0LmFjdGlvbnMnO1xuaW1wb3J0IHsgRGZoQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zL2RmaC5hY3Rpb25zJztcbmltcG9ydCB7IEluZkFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucy9pbmYuYWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9BY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgU3lzQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3N5cy5hY3Rpb25zJztcbmltcG9ydCB7IFNjaGVtYU9iamVjdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zdGF0ZS1zY2hlbWEvc2VydmljZXMvc2NoZW1hLW9iamVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2plY3RQcmV2aWV3IH0gZnJvbSAnLi4vbW9kZWxzL2FjdGl2ZS1wcm9qZWN0Lm1vZGVscyc7XG5cbmZ1bmN0aW9uIGZpcnN0UHJvVGV4dFByb3BTdHJpbmdPZlR5cGUodGV4dFByb3BlcnRpZXM6IFByb1RleHRQcm9wZXJ0eVtdLCBma1N5c3RlbVR5cGUpOiBzdHJpbmcge1xuICByZXR1cm4gKHRleHRQcm9wZXJ0aWVzLmZpbmQodCA9PiB0LmZrX3N5c3RlbV90eXBlID09PSBma1N5c3RlbVR5cGUpIHx8IHsgc3RyaW5nOiAnJyB9KS5zdHJpbmdcbn1cbi8qKlxuICogVHJhbnNmb3JtIFByb1Byb2plY3QgdG8gUHJvamVjdFByZXZpZXdcbiAqL1xuZnVuY3Rpb24gcHJvUHJvamVjdFRvUHJvamVjdFByZXZpZXcocHJvamVjdDogUHJvUHJvamVjdCk6IFByb2plY3RQcmV2aWV3IHtcbiAgcmV0dXJuIHtcbiAgICBsYWJlbDogZmlyc3RQcm9UZXh0UHJvcFN0cmluZ09mVHlwZShwcm9qZWN0LnRleHRfcHJvcGVydGllcywgU3lzQ29uZmlnLlBLX1NZU1RFTV9UWVBFX19URVhUX1BST1BFUlRZX19MQUJFTCksXG4gICAgZGVzY3JpcHRpb246IGZpcnN0UHJvVGV4dFByb3BTdHJpbmdPZlR5cGUocHJvamVjdC50ZXh0X3Byb3BlcnRpZXMsIFN5c0NvbmZpZy5QS19TWVNURU1fVFlQRV9fVEVYVF9QUk9QRVJUWV9fREVTQ1JJUFRJT04pLFxuICAgIGRlZmF1bHRfbGFuZ3VhZ2U6IHByb2plY3QuZGVmYXVsdF9sYW5ndWFnZSxcbiAgICBwa19wcm9qZWN0OiBwcm9qZWN0LnBrX2VudGl0eVxuICB9XG59XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWN0aXZlUHJvamVjdEVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzeXM6IFN5c0FjdGlvbnMsXG4gICAgcHJpdmF0ZSBkYXQ6IERhdEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBkZmg6IERmaEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBwcm86IFByb0FjdGlvbnMsXG4gICAgcHJpdmF0ZSBpbmY6IEluZkFjdGlvbnMsXG4gICAgcHJpdmF0ZSBwcm9qZWN0QXBpOiBQcm9Qcm9qZWN0QXBpLFxuICAgIHByaXZhdGUgYWN0aW9uczogQWN0aXZlUHJvamVjdEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb25BY3Rpb25zOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwcml2YXRlIGxvYWRpbmdCYXJBY3Rpb25zOiBMb2FkaW5nQmFyQWN0aW9ucyxcbiAgICBwcml2YXRlIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwcml2YXRlIHNjaGVtYU9iajogU2NoZW1hT2JqZWN0U2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcbiAgICAgIHRoaXMuY3JlYXRlTG9hZFByb2plY3RCYXNpY3NFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUxvYWRQcm9qZWN0Q29uZmlnRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVMb2FkUHJvamVjdFVwZGF0ZWRFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUNsb3NlUGFuZWxFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUFjdGl2YXRlVGFiRm9jdXNQYW5lbEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlTW92ZVRhYkZvY3VzUGFuZWxFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUNsb3NlUGFuZWxGb2N1c1BhbmVsRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVTcGxpdFBhbmVsQWN0aXZhdGVUYWJFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUFkZFRhYkNsb3NlTGlzdEVwaWMoKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZXBpYyBsaXN0ZW5lcyB0byBhbiBhY3Rpb24gdGhhdCB3YW50cyB0byBsb2FkIHRoYSBhY3RpdmUgcHJvamVjdCAoYnkgaWQpXG4gICAqIEl0IGxvYWRzIHRoZSBwcm9qZWN0IGluZm8gYW5kXG4gICAqIC0gb24gbG9hZGVkIGRpc3BhY2hlcyBhbiBhY3Rpb24gdGhhdCByZWR1Y2VzIHRoZSBwcm9qZWN0IGludG8gdGhlIHN0b3JlXG4gICAqIC0gb24gZmFpbCBkaXNwYWNoZXMgYW4gYWN0aW9uIHRoYXQgc2hvd3MgYW4gZXJyb3Igbm90aWZpY2F0aW9uXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUxvYWRQcm9qZWN0QmFzaWNzRXBpYygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuXG4gICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0JBU0lDUyksXG4gICAgICBzd2l0Y2hNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgLyoqXG4gICAgICAgKiBFbWl0IHRoZSBnbG9iYWwgYWN0aW9uIHRoYXQgYWN0aXZhdGVzIHRoZSBsb2FkaW5nIGJhclxuICAgICAgICovXG4gICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5zdGFydExvYWRpbmcoKSk7XG5cbiAgICAgICAgdGhpcy5wcm9qZWN0QXBpLmdldEJhc2ljcyhhY3Rpb24ubWV0YS5wa19wcm9qZWN0KVxuICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZGF0YTogUHJvUHJvamVjdFtdKSA9PiB7XG4gICAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmxvYWRQcm9qZWN0QmFzaXNjc1N1Y2NlZGVkKHByb1Byb2plY3RUb1Byb2plY3RQcmV2aWV3KGRhdGFbMF0pKSlcbiAgICAgICAgICAgICAgdGhpcy5zY2hlbWFPYmouc3RvcmVTY2hlbWFPYmplY3Qoe1xuICAgICAgICAgICAgICAgIGluZjogeyBsYW5ndWFnZTogW2RhdGFbMF0uZGVmYXVsdF9sYW5ndWFnZV0gfSxcbiAgICAgICAgICAgICAgICBwcm86IHsgcHJvamVjdDogW29taXQoWydkZWZhdWx0X2xhbmd1YWdlJ10sIGRhdGFbMF0pXSB9XG4gICAgICAgICAgICAgIH0sIGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMubm90aWZpY2F0aW9uQWN0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvci5tZXNzYWdlIH1cbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgfSkpXG5cbiAgICApXG4gIH1cblxuICAvKipcbiAgKiBUaGlzIGVwaWMgbGlzdGVuZXMgdG8gYW4gYWN0aW9uIHRoYXQgaXMgZGlzcGFjaGVkIHdoZW4gbG9hZGluZyBwcm9qY2VjdCBzdWNjZWVkZWRcbiAgKlxuICAqIEl0IGRpc3BhY2hlcyBhbiBhY3Rpb24gdGhhdCBjb21wbGV0ZXMgdGhlIGxvYWRpbmcgYmFyXG4gICovXG4gIHByaXZhdGUgY3JlYXRlTG9hZFByb2plY3RVcGRhdGVkRXBpYygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9CQVNJQ1NfU1VDQ0VFREVEKSxcbiAgICAgIG1hcFRvKHRoaXMubG9hZGluZ0JhckFjdGlvbnMuY29tcGxldGVMb2FkaW5nKCkpXG4gICAgKVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVMb2FkUHJvamVjdENvbmZpZ0VwaWMoKTogRXBpYzxGbHV4U3RhbmRhcmRBY3Rpb248YW55PiwgRmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIHZvaWQsIGFueT4ge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IGFjdGlvbiQucGlwZShcblxuICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkxPQURfUFJPSkVDVF9DT05GSUcpLFxuICAgICAgc3dpdGNoTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5zdGFydExvYWRpbmcoKSk7XG5cbiAgICAgICAgY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLmRmaC5wcm9maWxlLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG5cbiAgICAgICAgICB0aGlzLmRmaC5rbGFzcy5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMuZGZoLnByb3BlcnR5LmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5kZmgubGFiZWwubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcblxuICAgICAgICAgIHRoaXMuc3lzLnN5c3RlbV9yZWxldmFudF9jbGFzcy5sb2FkKCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5zeXMuY29uZmlnLmxvYWQoKS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLmRhdC5uYW1lc3BhY2UubG9hZCgnJywgYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG5cbiAgICAgICAgICB0aGlzLnByby50ZXh0X3Byb3BlcnR5LmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5wcm8uZGZoX2NsYXNzX3Byb2pfcmVsLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5wcm8uZGZoX3Byb2ZpbGVfcHJval9yZWwubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLnByby5jbGFzc19maWVsZF9jb25maWcubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcblxuICAgICAgICAgIHRoaXMuaW5mLnBlcnNpc3RlbnRfaXRlbS50eXBlc09mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKVxuICAgICAgICApXG4gICAgICAgICAgLnBpcGUoZmlsdGVyKChyZXM6IGFueVtdKSA9PiAhcmVzLmluY2x1ZGVzKHVuZGVmaW5lZCkpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuXG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5sb2FkUHJvamVjdENvbmZpZ1N1Y2NlZWRlZCgpKTtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5jb21wbGV0ZUxvYWRpbmcoKSk7XG5cbiAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAvLyBzdWJTdG9yZS5kaXNwYXRjaCh0aGlzLmFjdGlvbnMubG9hZEZhaWxlZCh7IHN0YXR1czogJycgKyBlcnJvci5zdGF0dXMgfSkpXG4gICAgICAgICAgfSk7XG5cbiAgICAgIH0pKVxuXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogTEFZT1VUXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUNsb3NlUGFuZWxFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5DTE9TRV9UQUIsIEFjdGl2ZVByb2plY3RBY3Rpb25zLk1PVkVfVEFCLCBBY3RpdmVQcm9qZWN0QWN0aW9ucy5TUExJVF9QQU5FTCksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgICAgdGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5wYW5lbHMuZm9yRWFjaCgocGFuZWwsIHBhbmVsSW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChwYW5lbC50YWJzLmxlbmd0aCA9PT0gMCkgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMuY2xvc2VQYW5lbChwYW5lbEluZGV4KSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlU3BsaXRQYW5lbEFjdGl2YXRlVGFiRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuU1BMSVRfUEFORUwpLFxuICAgICAgICBtYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4ge1xuICAgICAgICAgIGNvbnN0IHAgPSB0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0O1xuICAgICAgICAgIGNvbnN0IGMgPSBhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleDtcbiAgICAgICAgICBjb25zdCBwYW5lbEluZGV4ID0gcC5wYW5lbHMubGVuZ3RoIDwgKGMgKyAxKSA/IGMgLSAxIDogYztcbiAgICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmFjdGl2YXRlVGFiKHBhbmVsSW5kZXgsIDApXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlQWN0aXZhdGVUYWJGb2N1c1BhbmVsRXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuQUNUSVZBVEVfVEFCKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5mb2N1c2VkUGFuZWwgIT09IGFjdGlvbi5tZXRhLnBhbmVsSW5kZXgpIHtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmZvY3VzUGFuZWwoYWN0aW9uLm1ldGEucGFuZWxJbmRleCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlTW92ZVRhYkZvY3VzUGFuZWxFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5NT1ZFX1RBQiksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3QuZm9jdXNlZFBhbmVsICE9PSBhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleCkge1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMuZm9jdXNQYW5lbChhY3Rpb24ubWV0YS5jdXJyZW50UGFuZWxJbmRleCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlQ2xvc2VQYW5lbEZvY3VzUGFuZWxFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5DTE9TRV9QQU5FTCksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEFjdGl2ZVByb2plY3RBY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbFN0b3JlKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3QuZm9jdXNlZFBhbmVsID4gKHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3QucGFuZWxzLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5mb2N1c1BhbmVsKDApKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgICAgKVxuICAgIH1cbiAgfVxuICBwcml2YXRlIGNyZWF0ZUFkZFRhYkNsb3NlTGlzdEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkFERF9UQUIpLFxuICAgICAgICBtYXBUbyh0aGlzLmFjdGlvbnMuc2V0TGlzdFR5cGUoJycpKVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG59XG4iXX0=