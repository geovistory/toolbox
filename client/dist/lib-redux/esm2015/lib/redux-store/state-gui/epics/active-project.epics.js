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
import { SchemaService } from '../../state-schema/services/schema.service';
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
import * as i11 from "../../state-schema/services/schema.service";
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
    { type: SchemaService }
];
/** @nocollapse */ ActiveProjectEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ActiveProjectEpics_Factory() { return new ActiveProjectEpics(i0.ɵɵinject(i1.SysActions), i0.ɵɵinject(i2.DatActions), i0.ɵɵinject(i3.DfhActions), i0.ɵɵinject(i4.ProActions), i0.ɵɵinject(i5.InfActions), i0.ɵɵinject(i6.ProProjectApi), i0.ɵɵinject(i7.ActiveProjectActions), i0.ɵɵinject(i8.NotificationsAPIActions), i0.ɵɵinject(i9.LoadingBarActions), i0.ɵɵinject(i10.NgRedux), i0.ɵɵinject(i11.SchemaService)); }, token: ActiveProjectEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QuZXBpY3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLWd1aS9lcGljcy9hY3RpdmUtcHJvamVjdC5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQWMsYUFBYSxFQUFtQixNQUFNLHVCQUF1QixDQUFDO0FBRW5GLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFN0IsT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBdUIsb0JBQW9CLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUMxRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNoRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDcEUsT0FB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RUFBRSxDQUFDLElBQUksVUFBVTs7OztRQUFTLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDaEYsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUV4RCxhQUFhLENBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFFdkYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFDckYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFDeEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFFckYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUN0RSxJ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O0lBQ3JDLGlEQUFvRDs7Ozs7SUFDcEQsK0NBQTRDOzs7OztJQUM1QyxxQ0FBbUM7Ozs7O0lBQ25DLHVDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTeXNDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBQcm9Qcm9qZWN0LCBQcm9Qcm9qZWN0QXBpLCBQcm9UZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgb21pdCB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYywgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBtYXBUbywgbWVyZ2VNYXAsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RBY3Rpb24sIEFjdGl2ZVByb2plY3RBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvYWN0aXZlLXByb2plY3QuYWN0aW9uJztcbmltcG9ydCB7IExvYWRpbmdCYXJBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbG9hZGluZy1iYXIuYWN0aW9ucyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvZGF0LmFjdGlvbnMnO1xuaW1wb3J0IHsgRGZoQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zL2RmaC5hY3Rpb25zJztcbmltcG9ydCB7IEluZkFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1zY2hlbWEvYWN0aW9ucy9pbmYuYWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9BY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtc2NoZW1hL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgU3lzQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLXNjaGVtYS9hY3Rpb25zL3N5cy5hY3Rpb25zJztcbmltcG9ydCB7IFNjaGVtYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zdGF0ZS1zY2hlbWEvc2VydmljZXMvc2NoZW1hLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvamVjdFByZXZpZXcgfSBmcm9tICcuLi9tb2RlbHMvYWN0aXZlLXByb2plY3QubW9kZWxzJztcblxuZnVuY3Rpb24gZmlyc3RQcm9UZXh0UHJvcFN0cmluZ09mVHlwZSh0ZXh0UHJvcGVydGllczogUHJvVGV4dFByb3BlcnR5W10sIGZrU3lzdGVtVHlwZSk6IHN0cmluZyB7XG4gIHJldHVybiAodGV4dFByb3BlcnRpZXMuZmluZCh0ID0+IHQuZmtfc3lzdGVtX3R5cGUgPT09IGZrU3lzdGVtVHlwZSkgfHwgeyBzdHJpbmc6ICcnIH0pLnN0cmluZ1xufVxuLyoqXG4gKiBUcmFuc2Zvcm0gUHJvUHJvamVjdCB0byBQcm9qZWN0UHJldmlld1xuICovXG5mdW5jdGlvbiBwcm9Qcm9qZWN0VG9Qcm9qZWN0UHJldmlldyhwcm9qZWN0OiBQcm9Qcm9qZWN0KTogUHJvamVjdFByZXZpZXcge1xuICByZXR1cm4ge1xuICAgIGxhYmVsOiBmaXJzdFByb1RleHRQcm9wU3RyaW5nT2ZUeXBlKHByb2plY3QudGV4dF9wcm9wZXJ0aWVzLCBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0xBQkVMKSxcbiAgICBkZXNjcmlwdGlvbjogZmlyc3RQcm9UZXh0UHJvcFN0cmluZ09mVHlwZShwcm9qZWN0LnRleHRfcHJvcGVydGllcywgU3lzQ29uZmlnLlBLX1NZU1RFTV9UWVBFX19URVhUX1BST1BFUlRZX19ERVNDUklQVElPTiksXG4gICAgZGVmYXVsdF9sYW5ndWFnZTogcHJvamVjdC5kZWZhdWx0X2xhbmd1YWdlLFxuICAgIHBrX3Byb2plY3Q6IHByb2plY3QucGtfZW50aXR5XG4gIH1cbn1cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBY3RpdmVQcm9qZWN0RXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN5czogU3lzQWN0aW9ucyxcbiAgICBwcml2YXRlIGRhdDogRGF0QWN0aW9ucyxcbiAgICBwcml2YXRlIGRmaDogRGZoQWN0aW9ucyxcbiAgICBwcml2YXRlIHBybzogUHJvQWN0aW9ucyxcbiAgICBwcml2YXRlIGluZjogSW5mQWN0aW9ucyxcbiAgICBwcml2YXRlIHByb2plY3RBcGk6IFByb1Byb2plY3RBcGksXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBBY3RpdmVQcm9qZWN0QWN0aW9ucyxcbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbkFjdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHByaXZhdGUgbG9hZGluZ0JhckFjdGlvbnM6IExvYWRpbmdCYXJBY3Rpb25zLFxuICAgIHByaXZhdGUgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHByaXZhdGUgc2NoZW1hT2JqOiBTY2hlbWFTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuICAgICAgdGhpcy5jcmVhdGVMb2FkUHJvamVjdEJhc2ljc0VwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlTG9hZFByb2plY3RDb25maWdFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZUxvYWRQcm9qZWN0VXBkYXRlZEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQ2xvc2VQYW5lbEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQWN0aXZhdGVUYWJGb2N1c1BhbmVsRXBpYygpLFxuICAgICAgdGhpcy5jcmVhdGVNb3ZlVGFiRm9jdXNQYW5lbEVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQ2xvc2VQYW5lbEZvY3VzUGFuZWxFcGljKCksXG4gICAgICB0aGlzLmNyZWF0ZVNwbGl0UGFuZWxBY3RpdmF0ZVRhYkVwaWMoKSxcbiAgICAgIHRoaXMuY3JlYXRlQWRkVGFiQ2xvc2VMaXN0RXBpYygpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBlcGljIGxpc3RlbmVzIHRvIGFuIGFjdGlvbiB0aGF0IHdhbnRzIHRvIGxvYWQgdGhhIGFjdGl2ZSBwcm9qZWN0IChieSBpZClcbiAgICogSXQgbG9hZHMgdGhlIHByb2plY3QgaW5mbyBhbmRcbiAgICogLSBvbiBsb2FkZWQgZGlzcGFjaGVzIGFuIGFjdGlvbiB0aGF0IHJlZHVjZXMgdGhlIHByb2plY3QgaW50byB0aGUgc3RvcmVcbiAgICogLSBvbiBmYWlsIGRpc3BhY2hlcyBhbiBhY3Rpb24gdGhhdCBzaG93cyBhbiBlcnJvciBub3RpZmljYXRpb25cbiAgICovXG4gIHByaXZhdGUgY3JlYXRlTG9hZFByb2plY3RCYXNpY3NFcGljKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG5cbiAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5MT0FEX1BST0pFQ1RfQkFTSUNTKSxcbiAgICAgIHN3aXRjaE1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICAvKipcbiAgICAgICAqIEVtaXQgdGhlIGdsb2JhbCBhY3Rpb24gdGhhdCBhY3RpdmF0ZXMgdGhlIGxvYWRpbmcgYmFyXG4gICAgICAgKi9cbiAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLnN0YXJ0TG9hZGluZygpKTtcblxuICAgICAgICB0aGlzLnByb2plY3RBcGkuZ2V0QmFzaWNzKGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpXG4gICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgIChkYXRhOiBQcm9Qcm9qZWN0W10pID0+IHtcbiAgICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMubG9hZFByb2plY3RCYXNpc2NzU3VjY2VkZWQocHJvUHJvamVjdFRvUHJvamVjdFByZXZpZXcoZGF0YVswXSkpKVxuICAgICAgICAgICAgICB0aGlzLnNjaGVtYU9iai5zdG9yZVNjaGVtYU9iamVjdCh7XG4gICAgICAgICAgICAgICAgaW5mOiB7IGxhbmd1YWdlOiBbZGF0YVswXS5kZWZhdWx0X2xhbmd1YWdlXSB9LFxuICAgICAgICAgICAgICAgIHBybzogeyBwcm9qZWN0OiBbb21pdChbJ2RlZmF1bHRfbGFuZ3VhZ2UnXSwgZGF0YVswXSldIH1cbiAgICAgICAgICAgICAgfSwgYWN0aW9uLm1ldGEucGtfcHJvamVjdClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5ub3RpZmljYXRpb25BY3Rpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yLm1lc3NhZ2UgfVxuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIH0pXG4gICAgICB9KSlcblxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAqIFRoaXMgZXBpYyBsaXN0ZW5lcyB0byBhbiBhY3Rpb24gdGhhdCBpcyBkaXNwYWNoZWQgd2hlbiBsb2FkaW5nIHByb2pjZWN0IHN1Y2NlZWRlZFxuICAqXG4gICogSXQgZGlzcGFjaGVzIGFuIGFjdGlvbiB0aGF0IGNvbXBsZXRlcyB0aGUgbG9hZGluZyBiYXJcbiAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVMb2FkUHJvamVjdFVwZGF0ZWRFcGljKCk6IEVwaWM8Rmx1eFN0YW5kYXJkQWN0aW9uPGFueT4sIEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCB2b2lkLCBhbnk+IHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiBhY3Rpb24kLnBpcGUoXG4gICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0JBU0lDU19TVUNDRUVERUQpLFxuICAgICAgbWFwVG8odGhpcy5sb2FkaW5nQmFyQWN0aW9ucy5jb21wbGV0ZUxvYWRpbmcoKSlcbiAgICApXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUxvYWRQcm9qZWN0Q29uZmlnRXBpYygpOiBFcGljPEZsdXhTdGFuZGFyZEFjdGlvbjxhbnk+LCBGbHV4U3RhbmRhcmRBY3Rpb248YW55Piwgdm9pZCwgYW55PiB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4gYWN0aW9uJC5waXBlKFxuXG4gICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuTE9BRF9QUk9KRUNUX0NPTkZJRyksXG4gICAgICBzd2l0Y2hNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLnN0YXJ0TG9hZGluZygpKTtcblxuICAgICAgICBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMuZGZoLnByb2ZpbGUubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcblxuICAgICAgICAgIHRoaXMuZGZoLmtsYXNzLmxvYWRPZlByb2plY3QoYWN0aW9uLm1ldGEucGtfcHJvamVjdCkucmVzb2x2ZWQkLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAgICAgdGhpcy5kZmgucHJvcGVydHkubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLmRmaC5sYWJlbC5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuXG4gICAgICAgICAgdGhpcy5zeXMuc3lzdGVtX3JlbGV2YW50X2NsYXNzLmxvYWQoKS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLnN5cy5jb25maWcubG9hZCgpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMuZGF0Lm5hbWVzcGFjZS5sb2FkKCcnLCBhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcblxuICAgICAgICAgIHRoaXMucHJvLnRleHRfcHJvcGVydHkubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLnByby5kZmhfY2xhc3NfcHJval9yZWwubG9hZE9mUHJvamVjdChhY3Rpb24ubWV0YS5wa19wcm9qZWN0KS5yZXNvbHZlZCQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAgICB0aGlzLnByby5kZmhfcHJvZmlsZV9wcm9qX3JlbC5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICAgIHRoaXMucHJvLmNsYXNzX2ZpZWxkX2NvbmZpZy5sb2FkT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuXG4gICAgICAgICAgdGhpcy5pbmYucGVyc2lzdGVudF9pdGVtLnR5cGVzT2ZQcm9qZWN0KGFjdGlvbi5tZXRhLnBrX3Byb2plY3QpLnJlc29sdmVkJC5waXBlKGZpbHRlcih4ID0+ICEheCkpXG4gICAgICAgIClcbiAgICAgICAgICAucGlwZShmaWx0ZXIoKHJlczogYW55W10pID0+ICFyZXMuaW5jbHVkZXModW5kZWZpbmVkKSkpXG4gICAgICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG5cbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmxvYWRQcm9qZWN0Q29uZmlnU3VjY2VlZGVkKCkpO1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmxvYWRpbmdCYXJBY3Rpb25zLmNvbXBsZXRlTG9hZGluZygpKTtcblxuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIHN1YlN0b3JlLmRpc3BhdGNoKHRoaXMuYWN0aW9ucy5sb2FkRmFpbGVkKHsgc3RhdHVzOiAnJyArIGVycm9yLnN0YXR1cyB9KSlcbiAgICAgICAgICB9KTtcblxuICAgICAgfSkpXG5cbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBMQVlPVVRcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlQ2xvc2VQYW5lbEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1RBQiwgQWN0aXZlUHJvamVjdEFjdGlvbnMuTU9WRV9UQUIsIEFjdGl2ZVByb2plY3RBY3Rpb25zLlNQTElUX1BBTkVMKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgICB0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0LnBhbmVscy5mb3JFYWNoKChwYW5lbCwgcGFuZWxJbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBhbmVsLnRhYnMubGVuZ3RoID09PSAwKSBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5jbG9zZVBhbmVsKHBhbmVsSW5kZXgpKTtcbiAgICAgICAgICB9KVxuICAgICAgICB9KSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVTcGxpdFBhbmVsQWN0aXZhdGVUYWJFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5TUExJVF9QQU5FTCksXG4gICAgICAgIG1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiB7XG4gICAgICAgICAgY29uc3QgcCA9IHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLmFjdGl2ZVByb2plY3Q7XG4gICAgICAgICAgY29uc3QgYyA9IGFjdGlvbi5tZXRhLmN1cnJlbnRQYW5lbEluZGV4O1xuICAgICAgICAgIGNvbnN0IHBhbmVsSW5kZXggPSBwLnBhbmVscy5sZW5ndGggPCAoYyArIDEpID8gYyAtIDEgOiBjO1xuICAgICAgICAgIHJldHVybiB0aGlzLmFjdGlvbnMuYWN0aXZhdGVUYWIocGFuZWxJbmRleCwgMClcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVBY3RpdmF0ZVRhYkZvY3VzUGFuZWxFcGljKCk6IEVwaWMge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZShBY3RpdmVQcm9qZWN0QWN0aW9ucy5BQ1RJVkFURV9UQUIpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBBY3RpdmVQcm9qZWN0QWN0aW9uKSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxTdG9yZSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS5hY3RpdmVQcm9qZWN0LmZvY3VzZWRQYW5lbCAhPT0gYWN0aW9uLm1ldGEucGFuZWxJbmRleCkge1xuICAgICAgICAgICAgZ2xvYmFsU3RvcmUubmV4dCh0aGlzLmFjdGlvbnMuZm9jdXNQYW5lbChhY3Rpb24ubWV0YS5wYW5lbEluZGV4KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVNb3ZlVGFiRm9jdXNQYW5lbEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLk1PVkVfVEFCKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5mb2N1c2VkUGFuZWwgIT09IGFjdGlvbi5tZXRhLmN1cnJlbnRQYW5lbEluZGV4KSB7XG4gICAgICAgICAgICBnbG9iYWxTdG9yZS5uZXh0KHRoaXMuYWN0aW9ucy5mb2N1c1BhbmVsKGFjdGlvbi5tZXRhLmN1cnJlbnRQYW5lbEluZGV4KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVDbG9zZVBhbmVsRm9jdXNQYW5lbEVwaWMoKTogRXBpYyB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKEFjdGl2ZVByb2plY3RBY3Rpb25zLkNMT1NFX1BBTkVMKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogQWN0aXZlUHJvamVjdEFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsU3RvcmUpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5mb2N1c2VkUGFuZWwgPiAodGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkuYWN0aXZlUHJvamVjdC5wYW5lbHMubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgIGdsb2JhbFN0b3JlLm5leHQodGhpcy5hY3Rpb25zLmZvY3VzUGFuZWwoMCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICApXG4gICAgfVxuICB9XG4gIHByaXZhdGUgY3JlYXRlQWRkVGFiQ2xvc2VMaXN0RXBpYygpOiBFcGljIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUoQWN0aXZlUHJvamVjdEFjdGlvbnMuQUREX1RBQiksXG4gICAgICAgIG1hcFRvKHRoaXMuYWN0aW9ucy5zZXRMaXN0VHlwZSgnJykpXG4gICAgICApXG4gICAgfVxuICB9XG5cbn1cbiJdfQ==