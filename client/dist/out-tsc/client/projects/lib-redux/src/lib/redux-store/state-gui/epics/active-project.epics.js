import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { ActiveProjectActions } from '../../state-gui/actions/active-project.action';
/**
 * Transform ProProject to ProjectPreview
 */
function proProjectToProjectPreview(project) {
    return {
        label: this.firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL),
        description: this.firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION),
        default_language: project.default_language,
        pk_project: project.pk_entity
    };
}
let ActiveProjectEpics = class ActiveProjectEpics {
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
    createEpics() {
        return combineEpics(this.createLoadProjectBasicsEpic(), this.createLoadProjectConfigEpic(), this.createLoadProjectUpdatedEpic(), this.createClosePanelEpic(), this.createActivateTabFocusPanelEpic(), this.createMoveTabFocusPanelEpic(), this.createClosePanelFocusPanelEpic(), this.createSplitPanelActivateTabEpic(), this.createAddTabCloseListEpic());
    }
    /**
     * This epic listenes to an action that wants to load tha active project (by id)
     * It loads the project info and
     * - on loaded dispaches an action that reduces the project into the store
     * - on fail dispaches an action that shows an error notification
     */
    createLoadProjectBasicsEpic() {
        return (action$, store) => action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_BASICS), switchMap((action) => new Observable((globalStore) => {
            /**
           * Emit the global action that activates the loading bar
           */
            globalStore.next(this.loadingBarActions.startLoading());
            this.projectApi.getBasics(action.meta.pk_project)
                .subscribe((data) => {
                globalStore.next(this.actions.loadProjectBasiscsSucceded(proProjectToProjectPreview(data[0])));
            }, error => {
                globalStore.next(this.notificationActions.addToast({
                    type: 'error',
                    options: { title: error.message }
                }));
            });
        })));
    }
    /**
    * This epic listenes to an action that is dispached when loading projcect succeeded
    *
    * It dispaches an action that completes the loading bar
    */
    createLoadProjectUpdatedEpic() {
        return (action$, store) => action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED), mapTo(this.loadingBarActions.completeLoading()));
    }
    createLoadProjectConfigEpic() {
        return (action$, store) => action$.pipe(ofType(ActiveProjectActions.LOAD_PROJECT_CONFIG), switchMap((action) => new Observable((globalStore) => {
            globalStore.next(this.loadingBarActions.startLoading());
            combineLatest(this.dfh.profile.loadOfProject(action.meta.pk_project).resolved$.pipe(filter(x => !!x)), this.dfh.klass.loadOfProject(action.meta.pk_project).resolved$.pipe(filter(x => !!x)), this.dfh.property.loadOfProject(action.meta.pk_project).resolved$.pipe(filter(x => !!x)), this.dfh.label.loadOfProject(action.meta.pk_project).resolved$.pipe(filter(x => !!x)), this.sys.system_relevant_class.load().resolved$.pipe(filter(x => !!x)), this.sys.config.load().resolved$.pipe(filter(x => !!x)), this.dat.namespace.load('', action.meta.pk_project).resolved$.pipe(filter(x => !!x)), this.pro.text_property.loadOfProject(action.meta.pk_project).resolved$.pipe(filter(x => !!x)), this.pro.dfh_class_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(filter(x => !!x)), this.pro.dfh_profile_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(filter(x => !!x)), this.pro.class_field_config.loadOfProject(action.meta.pk_project).resolved$.pipe(filter(x => !!x)), this.inf.persistent_item.typesOfProject(action.meta.pk_project).resolved$.pipe(filter(x => !!x)))
                .pipe(filter((res) => !res.includes(undefined)))
                .subscribe((res) => {
                globalStore.next(this.actions.loadProjectConfigSucceeded());
                globalStore.next(this.loadingBarActions.completeLoading());
            }, error => {
                // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
            });
        })));
    }
    /**
     * LAYOUT
     */
    createClosePanelEpic() {
        return (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.CLOSE_TAB, ActiveProjectActions.MOVE_TAB, ActiveProjectActions.SPLIT_PANEL), mergeMap((action) => new Observable((globalStore) => {
                this.ngRedux.getState().activeProject.panels.forEach((panel, panelIndex) => {
                    if (panel.tabs.length === 0)
                        globalStore.next(this.actions.closePanel(panelIndex));
                });
            })));
        };
    }
    createSplitPanelActivateTabEpic() {
        return (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.SPLIT_PANEL), map((action) => {
                const p = this.ngRedux.getState().activeProject;
                const c = action.meta.currentPanelIndex;
                const panelIndex = p.panels.length < (c + 1) ? c - 1 : c;
                return this.actions.activateTab(panelIndex, 0);
            }));
        };
    }
    createActivateTabFocusPanelEpic() {
        return (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.ACTIVATE_TAB), mergeMap((action) => new Observable((globalStore) => {
                if (this.ngRedux.getState().activeProject.focusedPanel !== action.meta.panelIndex) {
                    globalStore.next(this.actions.focusPanel(action.meta.panelIndex));
                }
            })));
        };
    }
    createMoveTabFocusPanelEpic() {
        return (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.MOVE_TAB), mergeMap((action) => new Observable((globalStore) => {
                if (this.ngRedux.getState().activeProject.focusedPanel !== action.meta.currentPanelIndex) {
                    globalStore.next(this.actions.focusPanel(action.meta.currentPanelIndex));
                }
            })));
        };
    }
    createClosePanelFocusPanelEpic() {
        return (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.CLOSE_PANEL), mergeMap((action) => new Observable((globalStore) => {
                if (this.ngRedux.getState().activeProject.focusedPanel > (this.ngRedux.getState().activeProject.panels.length - 1)) {
                    globalStore.next(this.actions.focusPanel(0));
                }
            })));
        };
    }
    createAddTabCloseListEpic() {
        return (action$, store) => {
            return action$.pipe(ofType(ActiveProjectActions.ADD_TAB), mapTo(this.actions.setListType('')));
        };
    }
};
ActiveProjectEpics = tslib_1.__decorate([
    Injectable()
], ActiveProjectEpics);
export { ActiveProjectEpics };
//# sourceMappingURL=active-project.epics.js.map