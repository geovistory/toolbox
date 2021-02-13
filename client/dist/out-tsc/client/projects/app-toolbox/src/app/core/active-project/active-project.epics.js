import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics, ofType } from 'redux-observable-es6-compat';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { U } from '../util/util';
import { ActiveProjectActions } from './active-project.action';
let ActiveProjectEpics = class ActiveProjectEpics {
    constructor(sys, dat, dfh, pro, inf, peItApi, infProjRelApi, chunkApi, projectApi, actions, notificationActions, loadingBarActions, ngRedux) {
        this.sys = sys;
        this.dat = dat;
        this.dfh = dfh;
        this.pro = pro;
        this.inf = inf;
        this.peItApi = peItApi;
        this.infProjRelApi = infProjRelApi;
        this.chunkApi = chunkApi;
        this.projectApi = projectApi;
        this.actions = actions;
        this.notificationActions = notificationActions;
        this.loadingBarActions = loadingBarActions;
        this.ngRedux = ngRedux;
    }
    createEpics() {
        return combineEpics(this.createLoadProjectBasicsEpic(), this.createLoadProjectConfigEpic(), this.createLoadProjectUpdatedEpic(), 
        // this.createLoadChunkEpic(),
        // this.createLoadTypesEpic(),
        this.createClosePanelEpic(), this.createActivateTabFocusPanelEpic(), this.createMoveTabFocusPanelEpic(), this.createClosePanelFocusPanelEpic(), this.createSplitPanelActivateTabEpic(), this.createAddTabCloseListEpic());
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
                globalStore.next(this.actions.loadProjectBasiscsSucceded(U.proProjectToProjectPreview(data[0])));
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
            this.dfh.profile.loadOfProject(action.meta.pk_project);
            this.dfh.klass.loadOfProject(action.meta.pk_project);
            this.dfh.property.loadOfProject(action.meta.pk_project);
            this.dfh.label.loadOfProject(action.meta.pk_project);
            this.sys.system_relevant_class.load();
            // this.sys.analysis_type.load();
            this.sys.config.load();
            this.dat.namespace.load('', action.meta.pk_project);
            this.pro.text_property.loadOfProject(action.meta.pk_project);
            this.pro.dfh_class_proj_rel.loadOfProject(action.meta.pk_project);
            this.pro.dfh_profile_proj_rel.loadOfProject(action.meta.pk_project);
            this.pro.class_field_config.loadOfProject(action.meta.pk_project);
            this.inf.persistent_item.typesOfProject(action.meta.pk_project);
            combineLatest(this.dfh.profile$.by_pk_profile$.noPause.all$, this.dfh.class$.by_pk_class$.noPause.all$, this.dfh.property$.pk_property__has_domain__has_range$.noPause.all$, this.dfh.label$.by_fks$.noPause.all$, this.sys.system_relevant_class$.by_fk_class$.all$, 
            // this.sys.analysis_type$.slice$,
            this.sys.config$.main$, this.dat.namespace$.by_fk_project$.key(action.meta.pk_project), this.pro.project.loadBasics(action.meta.pk_project).resolved$.pipe(filter(x => !!x)), this.pro.class_field_config$.by_pk_entity$.all$, this.pro.dfh_class_proj_rel$.by_fk_project$.all$, this.pro.dfh_profile_proj_rel$.by_fk_project$.all$)
                .pipe(filter((res) => !res.includes(undefined)))
                .subscribe((res) => {
                globalStore.next(this.actions.loadProjectConfigSucceeded());
                globalStore.next(this.loadingBarActions.completeLoading());
            }, error => {
                // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
            });
        })));
    }
    // private createLoadTypesEpic(): Epic {
    //   return (action$, store) => {
    //     return action$.pipe(
    //       /**
    //        * Filter the actions that triggers this epic
    //        */
    //       ofType(ActiveProjectActions.LOAD_TYPES),
    //       mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
    //         /**
    //          * Emit the global action that activates the loading bar
    //          */
    //         globalStore.next(this.loadingBarActions.startLoading());
    //         this.peItApi.typesOfClassesAndProject(action.meta.pk_project, action.meta.pk_classes)
    //           .subscribe((data) => {
    //             globalStore.next(this.actions.loadTypesSucceeded(data, action.meta.pk_classes));
    //             globalStore.next(this.loadingBarActions.completeLoading());
    //           }, error => {
    //             globalStore.next(this.loadingBarActions.completeLoading());
    //             globalStore.next(this.notificationActions.addToast({
    //               type: 'error',
    //               options: {
    //                 title: error.message
    //               }
    //             }));
    //             globalStore.next(this.actions.loadTypesFailed({ status: '' + error.status }))
    //           })
    //       }))
    //     )
    //   }
    // }
    // private createLoadChunkEpic(): Epic {
    //   return (action$, store) => {
    //     return action$.pipe(
    //       /**
    //        * Filter the actions that triggers this epic
    //        */
    //       ofType(ActiveProjectActions.LOAD_CHUNK),
    //       mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
    //         /**
    //          * Emit the global action that activates the loading bar
    //          */
    //         globalStore.next(this.loadingBarActions.startLoading());
    //         /**
    //          * Do some api call
    //          */
    //         this.chunkApi.findById(action.meta.pk_entity)
    //           /**
    //          * Subscribe to the api call
    //          */
    //           .subscribe((data: DatChunk) => {
    //             /**
    //              * Emit the global action that completes the loading bar
    //              */
    //             globalStore.next(this.loadingBarActions.completeLoading());
    //             /**
    //              * Emit the local action on loading succeeded
    //              */
    //             globalStore.next(this.actions.loadChunkSucceeded(data));
    //           }, error => {
    //             /**
    //             * Emit the global action that shows some loading error message
    //             */
    //             globalStore.next(this.loadingBarActions.completeLoading());
    //             globalStore.next(this.notificationActions.addToast({
    //               type: 'error',
    //               options: {
    //                 title: error.message
    //               }
    //             }));
    //             /**
    //              * Emit the local action on loading failed
    //              */
    //             globalStore.next(this.actions.loadChunkFailed({ status: '' + error.status }))
    //           })
    //       }))
    //     )
    //   }
    // }
    // private createLoadPeItGraphEpic(): Epic {
    //   return (action$, store) => {
    //     return action$.pipe(
    //       /**
    //        * Filter the actions that triggers this epic
    //        */
    //       ofType(ActiveProjectActions.LOAD_PEIT_GRAPHS),
    //       mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
    //         /**
    //          * Emit the global action that activates the loading bar
    //          */
    //         globalStore.next(this.loadingBarActions.startLoading());
    //         /**
    //          * Do some api call
    //          */
    //         this.peItApi.graphsOfProject(action.meta.pk_project, action.meta.pk_entities)
    //           /**
    //          * Subscribe to the api call
    //          */
    //           .subscribe((data: InfPersistentItem[]) => {
    //             /**
    //              * Emit the global action that completes the loading bar
    //              */
    //             globalStore.next(this.loadingBarActions.completeLoading());
    //             /**
    //              * Emit the local action on loading succeeded
    //              */
    //             globalStore.next(this.actions.loadPeItGraphsSucceeded(data));
    //           }, error => {
    //             /**
    //             * Emit the global action that shows some loading error message
    //             */
    //             globalStore.next(this.loadingBarActions.completeLoading());
    //             globalStore.next(this.notificationActions.addToast({
    //               type: 'error',
    //               options: {
    //                 title: error.message
    //               }
    //             }));
    //             /**
    //              * Emit the local action on loading failed
    //              */
    //             globalStore.next(this.actions.loadEntityPreviewFailed({ status: '' + error.status }))
    //           })
    //       }))
    //     )
    //   }
    // }
    // private createLoadTeEnGraphEpic(): Epic {
    //   return (action$, store) => {
    //     return action$.pipe(
    //       /**
    //        * Filter the actions that triggers this epic
    //        */
    //       ofType(ActiveProjectActions.LOAD_TEEN_GRAPHS),
    //       mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
    //         /**
    //          * Emit the global action that activates the loading bar
    //          */
    //         globalStore.next(this.loadingBarActions.startLoading());
    //         /**
    //          * Do some api call
    //          */
    //         this.teEnApi.graphsOfProject(action.meta.pk_project, action.meta.pk_entities)
    //           /**
    //          * Subscribe to the api call
    //          */
    //           .subscribe((data: InfTemporalEntity[]) => {
    //             /**
    //              * Emit the global action that completes the loading bar
    //              */
    //             globalStore.next(this.loadingBarActions.completeLoading());
    //             /**
    //              * Emit the local action on loading succeeded
    //              */
    //             globalStore.next(this.actions.loadTeEnGraphsSucceeded(data));
    //           }, error => {
    //             /**
    //             * Emit the global action that shows some loading error message
    //             */
    //             globalStore.next(this.loadingBarActions.completeLoading());
    //             globalStore.next(this.notificationActions.addToast({
    //               type: 'error',
    //               options: {
    //                 title: error.message
    //               }
    //             }));
    //             /**
    //              * Emit the local action on loading failed
    //              */
    //             globalStore.next(this.actions.loadEntityPreviewFailed({ status: '' + error.status }))
    //           })
    //       }))
    //     )
    //   }
    // }
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
    // private createSplitPanelActivateTabEpic(): Epic {
    //   return (action$, store) => {
    //     return action$.pipe(
    //       ofType(ActiveProjectActions.SPLIT_PANEL),
    //       map(action => this.actions.activateTab(action.meta.currentPanelIndex, 0))
    //     )
    //   }
    // }
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