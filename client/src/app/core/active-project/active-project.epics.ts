import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DatSelector } from 'app/core/dat/dat.service';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { FluxStandardAction } from 'flux-standard-action';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { DfhSelector } from '../dfh/dfh.service';
import { InfActions } from '../inf/inf.actions';
import { LoadingBarActions } from '../loading-bar/api/loading-bar.actions';
import { ProSelector } from '../pro/pro.service';
import { DatChunk, DatChunkApi, InfPersistentItem, InfPersistentItemApi, InfTemporalEntity, InfTemporalEntityApi, ProInfoProjRelApi, ProProject, ProProjectApi, SysClassFieldApi, SysClassHasTypePropertyApi } from '../sdk';
import { IAppState } from '../store/model';
import { SystemSelector } from '../sys/sys.service';
import { U } from '../util/util';
import { ActiveProjectAction, ActiveProjectActions } from './active-project.action';



@Injectable()
export class ActiveProjectEpics {
  constructor(
    private sys: SystemSelector,
    private dat: DatSelector,
    private dfh: DfhSelector,
    private pro: ProSelector,
    private inf: InfActions,
    // private peItService: PeItService,
    private peItApi: InfPersistentItemApi,
    private teEnApi: InfTemporalEntityApi,
    private infProjRelApi: ProInfoProjRelApi,
    private chunkApi: DatChunkApi,
    private projectApi: ProProjectApi,
    // private projRelApi: ProDfhClassProjRelApi,
    // private comQuery: ProQueryApi,
    // private comVisual: ProVisualApi,
    // private dfhPropertyApi: DfhPropertyApi,
    private comClassFieldApi: SysClassFieldApi,
    private sysHasTypePropsApi: SysClassHasTypePropertyApi,
    private actions: ActiveProjectActions,
    private notificationActions: NotificationsAPIActions,
    private loadingBarActions: LoadingBarActions,
    private ngRedux: NgRedux<IAppState>,
  ) { }

  public createEpics(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return combineEpics(
      this.createLoadProjectBasicsEpic(),
      this.createLoadProjectConfigEpic(),
      this.createLoadProjectUpdatedEpic(),
      // this.createLoadEntityDetailForModalEpic(),
      this.createLoadChunkEpic(),
      this.createLoadPeItGraphEpic(),
      this.createLoadTeEnGraphEpic(),
      this.createLoadTypesEpic(),
      // this.createLoadQueriesEpic(),
      // this.createLoadQueryVersionEpic(),
      // this.createLoadVisualsEpic(),
      // this.createLoadVisualVersionEpic(),
      this.createClosePanelEpic(),
      this.createActivateTabFocusPanelEpic(),
      this.createMoveTabFocusPanelEpic(),
      this.createClosePanelFocusPanelEpic(),
      // this.createEnableCreatingMentioningEpic(),
      // this.createDisableCreatingMentioningEpic(),
      this.createSplitPanelActivateTabEpic(),
      this.createAddTabCloseListEpic(),
      // this.createChangeClassProjRelEpic(),
      this.createUpsertEntityProjRelEpic()
    );
  }

  /**
   * This epic listenes to an action that wants to load tha active project (by id)
   * It loads the project info and
   * - on loaded dispaches an action that reduces the project into the store
   * - on fail dispaches an action that shows an error notification
   */
  private createLoadProjectBasicsEpic(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return (action$, store) => action$.pipe(

      ofType(ActiveProjectActions.LOAD_PROJECT_BASICS),
      switchMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
        /**
       * Emit the global action that activates the loading bar
       */
        globalStore.next(this.loadingBarActions.startLoading());

        this.projectApi.getBasics(action.meta.pk_project)
          .subscribe(
            (data: ProProject[]) => {
              globalStore.next(this.actions.loadProjectBasiscsSucceded(U.proProjectToProjectPreview(data[0])))
            },
            error => {
              globalStore.next(this.notificationActions.addToast({
                type: 'error',
                options: { title: error.message }
              }))
            })
      }))

    )
  }

  /**
  * This epic listenes to an action that is dispached when loading projcect succeeded
  *
  * It dispaches an action that completes the loading bar
  */
  private createLoadProjectUpdatedEpic(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return (action$, store) => action$.pipe(
      ofType(ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED),
      mapTo(this.loadingBarActions.completeLoading())
    )
  }

  private createLoadProjectConfigEpic(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return (action$, store) => action$.pipe(

      ofType(ActiveProjectActions.LOAD_PROJECT_CONFIG),
      switchMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
        globalStore.next(this.loadingBarActions.startLoading());

        this.dfh.profile.loadOfProject(action.meta.pk_project);
        this.dfh.klass.loadOfProject(action.meta.pk_project);
        this.dfh.property.loadOfProject(action.meta.pk_project);
        this.dfh.label.loadOfProject(action.meta.pk_project);

        this.sys.system_relevant_class.load();
        this.sys.class_has_type_property.load();
        this.sys.analysis_type.load();

        this.dat.namespace.load('', action.meta.pk_project);

        this.pro.text_property.loadOfProject(action.meta.pk_project)
        this.pro.dfh_class_proj_rel.loadOfProject(action.meta.pk_project);
        this.pro.class_field_config.loadOfProject(action.meta.pk_project);

        this.inf.persistent_item.typesOfProject(action.meta.pk_project)


        combineLatest(
          this.dfh.profile$.by_pk_profile$.noPause.all$,
          this.dfh.class$.by_pk_class$.noPause.all$,
          this.dfh.property$.pk_property__has_domain__has_range$.noPause.all$,
          this.dfh.label$.by_fks$.noPause.all$,


          // this.sysAppCtxApi.appContext(null, action.meta.pk_project),
          this.comClassFieldApi.find(),

          this.sysHasTypePropsApi.find(),
          this.sys.system_relevant_class$.by_fk_class$.all$,
          this.sys.class_has_type_property$.slice$,
          this.sys.analysis_type$.slice$,

          this.dat.namespace$.by_fk_project$.key(action.meta.pk_project),


          this.pro.project.loadBasics(action.meta.pk_project).resolved$.pipe(filter(x => !!x)),
          this.pro.class_field_config$.by_fk_class__fk_app_context$.all$,
          this.pro.dfh_class_proj_rel$.by_fk_project$.all$
        )
          .pipe(filter((res: any[]) => !res.includes(undefined)))
          .subscribe((res) => {

            globalStore.next(this.actions.loadProjectConfigSucceeded());
            globalStore.next(this.loadingBarActions.completeLoading());

          }, error => {
            // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
          });

      }))

    )
  }

  private createLoadTypesEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ActiveProjectActions.LOAD_TYPES),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());

          this.peItApi.typesOfClassesAndProject(action.meta.pk_project, action.meta.pk_classes)
            .subscribe((data) => {
              globalStore.next(this.actions.loadTypesSucceeded(data, action.meta.pk_classes));
              globalStore.next(this.loadingBarActions.completeLoading());
            }, error => {
              globalStore.next(this.loadingBarActions.completeLoading());
              globalStore.next(this.notificationActions.addToast({
                type: 'error',
                options: {
                  title: error.message
                }
              }));

              globalStore.next(this.actions.loadTypesFailed({ status: '' + error.status }))
            })
        }))
      )
    }
  }
  private createLoadChunkEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ActiveProjectActions.LOAD_CHUNK),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.chunkApi.findById(action.meta.pk_entity)
            /**
           * Subscribe to the api call
           */
            .subscribe((data: DatChunk) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());

              /**
               * Emit the local action on loading succeeded
               */
              globalStore.next(this.actions.loadChunkSucceeded(data));

            }, error => {
              /**
              * Emit the global action that shows some loading error message
              */
              globalStore.next(this.loadingBarActions.completeLoading());
              globalStore.next(this.notificationActions.addToast({
                type: 'error',
                options: {
                  title: error.message
                }
              }));
              /**
               * Emit the local action on loading failed
               */
              globalStore.next(this.actions.loadChunkFailed({ status: '' + error.status }))
            })
        }))
      )
    }
  }

  private createLoadPeItGraphEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ActiveProjectActions.LOAD_PEIT_GRAPHS),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.peItApi.graphsOfProject(action.meta.pk_project, action.meta.pk_entities)
            /**
           * Subscribe to the api call
           */
            .subscribe((data: InfPersistentItem[]) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());

              /**
               * Emit the local action on loading succeeded
               */
              globalStore.next(this.actions.loadPeItGraphsSucceeded(data));

            }, error => {
              /**
              * Emit the global action that shows some loading error message
              */
              globalStore.next(this.loadingBarActions.completeLoading());
              globalStore.next(this.notificationActions.addToast({
                type: 'error',
                options: {
                  title: error.message
                }
              }));
              /**
               * Emit the local action on loading failed
               */
              globalStore.next(this.actions.loadEntityPreviewFailed({ status: '' + error.status }))
            })
        }))
      )
    }
  }

  private createLoadTeEnGraphEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ActiveProjectActions.LOAD_TEEN_GRAPHS),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.teEnApi.graphsOfProject(action.meta.pk_project, action.meta.pk_entities)
            /**
           * Subscribe to the api call
           */
            .subscribe((data: InfTemporalEntity[]) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());

              /**
               * Emit the local action on loading succeeded
               */
              globalStore.next(this.actions.loadTeEnGraphsSucceeded(data));

            }, error => {
              /**
              * Emit the global action that shows some loading error message
              */
              globalStore.next(this.loadingBarActions.completeLoading());
              globalStore.next(this.notificationActions.addToast({
                type: 'error',
                options: {
                  title: error.message
                }
              }));
              /**
               * Emit the local action on loading failed
               */
              globalStore.next(this.actions.loadEntityPreviewFailed({ status: '' + error.status }))
            })
        }))
      )
    }
  }

  // private createLoadQueryVersionEpic(): Epic {
  //   return (action$, store) => {
  //     return action$.pipe(
  //       /**
  //        * Filter the actions that triggers this epic
  //        */
  //       ofType(ActiveProjectActions.LOAD_QUERY_VERSION),
  //       mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
  //         /**
  //          * Emit the global action that activates the loading bar
  //          */
  //         globalStore.next(this.loadingBarActions.startLoading());
  //         /**
  //          * Do some api call
  //          */
  //         this.comQuery.findByIdAndVersionAndProject(action.meta.pk_project, action.meta.pk_entity, action.meta.entity_version)
  //           /**
  //          * Subscribe to the api call
  //          */
  //           .subscribe((data) => {
  //             /**
  //                * Emit the global action that completes the loading bar
  //                */
  //             globalStore.next(this.loadingBarActions.completeLoading());

  //             /**
  //              * Emit the local action on loading succeeded
  //              */
  //             globalStore.next(this.actions.loadQueryVersionSucceeded(data[0]));

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
  //             globalStore.next(this.actions.loadQueryVersionFailed({ status: '' + error.status }))
  //           })
  //       }))
  //     )
  //   }
  // }

  // private createLoadQueriesEpic(): Epic {
  //   return (action$, store) => {
  //     return action$.pipe(
  //       /**
  //        * Filter the actions that triggers this epic
  //        */
  //       ofType(ActiveProjectActions.LOAD_QUERIES),
  //       mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
  //         /**
  //          * Emit the global action that activates the loading bar
  //          */
  //         globalStore.next(this.loadingBarActions.startLoading());
  //         /**
  //          * Do some api call
  //          */
  //         this.comQuery.findPerProject(action.meta.pk_project, 10000, 0)
  //           /**
  //          * Subscribe to the api call
  //          */
  //           .subscribe((data: ComQueryV[]) => {
  //             /**
  //                * Emit the global action that completes the loading bar
  //                */
  //             globalStore.next(this.loadingBarActions.completeLoading());

  //             /**
  //              * Emit the local action on loading succeeded
  //              */
  //             globalStore.next(this.actions.loadQueriesSucceeded(data));

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
  //             globalStore.next(this.actions.loadQueriesFailed({ status: '' + error.status }))
  //           })
  //       }))
  //     )
  //   }
  // }

  // private createLoadVisualsEpic(): Epic {
  //   return (action$, store) => {
  //     return action$.pipe(
  //       /**
  //        * Filter the actions that triggers this epic
  //        */
  //       ofType(ActiveProjectActions.LOAD_VISUALS),
  //       mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
  //         /**
  //          * Emit the global action that activates the loading bar
  //          */
  //         globalStore.next(this.loadingBarActions.startLoading());
  //         /**
  //          * Do some api call
  //          */
  //         this.comVisual.findPerIdAndVersionAndProject(action.meta.pk_project, null, null)
  //           /**
  //          * Subscribe to the api call
  //          */
  //           .subscribe((data: ComVisualV[]) => {
  //             /**
  //                * Emit the global action that completes the loading bar
  //                */
  //             globalStore.next(this.loadingBarActions.completeLoading());

  //             /**
  //              * Emit the local action on loading succeeded
  //              */
  //             globalStore.next(this.actions.loadVisualsSucceeded(data));

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
  //             globalStore.next(this.actions.loadVisualsFailed({ status: '' + error.status }))
  //           })
  //       }))
  //     )
  //   }
  // }


  // private createLoadVisualVersionEpic(): Epic {
  //   return (action$, store) => {
  //     return action$.pipe(
  //       /**
  //        * Filter the actions that triggers this epic
  //        */
  //       ofType(ActiveProjectActions.LOAD_VISUAL_VERSION),
  //       mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
  //         /**
  //          * Emit the global action that activates the loading bar
  //          */
  //         globalStore.next(this.loadingBarActions.startLoading());
  //         /**
  //          * Do some api call
  //          */
  //         this.comVisual.findPerIdAndVersionAndProject(action.meta.pk_project, action.meta.pk_entity, action.meta.entity_version)
  //           /**
  //          * Subscribe to the api call
  //          */
  //           .subscribe((data: ComVisualV[]) => {
  //             /**
  //                * Emit the global action that completes the loading bar
  //                */
  //             globalStore.next(this.loadingBarActions.completeLoading());

  //             /**
  //              * Emit the local action on loading succeeded
  //              */
  //             globalStore.next(this.actions.loadVisualVersionSucceeded(data))

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
  //             globalStore.next(this.actions.loadVisualVersionFailed({ status: '' + error.status }))
  //           })
  //       }))
  //     )
  //   }
  // }


  /**
   * LAYOUT
   */
  private createClosePanelEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(ActiveProjectActions.CLOSE_TAB, ActiveProjectActions.MOVE_TAB, ActiveProjectActions.SPLIT_PANEL),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          this.ngRedux.getState().activeProject.panels.forEach((panel, panelIndex) => {
            if (panel.tabs.length === 0) globalStore.next(this.actions.closePanel(panelIndex));
          })
        }))
      )
    }
  }
  private createSplitPanelActivateTabEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(ActiveProjectActions.SPLIT_PANEL),
        map((action: ActiveProjectAction) => {
          const p = this.ngRedux.getState().activeProject;
          const c = action.meta.currentPanelIndex;
          const panelIndex = p.panels.length < (c + 1) ? c - 1 : c;
          return this.actions.activateTab(panelIndex, 0)
        })
      )
    }
  }
  // private createSplitPanelActivateTabEpic(): Epic {
  //   return (action$, store) => {
  //     return action$.pipe(
  //       ofType(ActiveProjectActions.SPLIT_PANEL),
  //       map(action => this.actions.activateTab(action.meta.currentPanelIndex, 0))
  //     )
  //   }
  // }
  private createActivateTabFocusPanelEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(ActiveProjectActions.ACTIVATE_TAB),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          if (this.ngRedux.getState().activeProject.focusedPanel !== action.meta.panelIndex) {
            globalStore.next(this.actions.focusPanel(action.meta.panelIndex));
          }
        }))
      )
    }
  }
  private createMoveTabFocusPanelEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(ActiveProjectActions.MOVE_TAB),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          if (this.ngRedux.getState().activeProject.focusedPanel !== action.meta.currentPanelIndex) {
            globalStore.next(this.actions.focusPanel(action.meta.currentPanelIndex));
          }
        }))
      )
    }
  }
  private createClosePanelFocusPanelEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(ActiveProjectActions.CLOSE_PANEL),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          if (this.ngRedux.getState().activeProject.focusedPanel > (this.ngRedux.getState().activeProject.panels.length - 1)) {
            globalStore.next(this.actions.focusPanel(0));
          }
        }))
      )
    }
  }
  private createAddTabCloseListEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(ActiveProjectActions.ADD_TAB),
        mapTo(this.actions.setListType(''))
      )
    }
  }

  /**
   * MENTIONING
   */
  // private createEnableCreatingMentioningEpic(): Epic {
  //   return (action$, store) => action$.pipe(
  //     ofType(MentioningListAPIActions.START_CREATE, PeItActions.START_CREATE_MENTIONING),
  //     mapTo(this.actions.setCreatingMentioning(true))
  //   )
  // }
  // private createDisableCreatingMentioningEpic(): Epic {
  //   return (action$, store) => action$.pipe(
  //     ofType(MentioningListAPIActions.STOP_CREATE, MentioningListAPIActions.CREATE_SUCCEEDED, MentioningListAPIActions.CREATE_FAILED),
  //     mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
  //       globalStore.next(this.actions.setCreatingMentioning(false));
  //       globalStore.next(this.actions.updateSelectedChunk(null));
  //     }))
  //   )
  // }

  /**
   * CRM
   */


  // /**
  //  * Epic to handle enabling and disabling of a class for project
  //  * @param c
  //  */
  // private createChangeClassProjRelEpic(): Epic {
  //   return (action$, store) => {
  //     return action$.pipe(
  //       /**
  //        * Filter the actions that triggers this epic
  //        */
  //       ofType(ActiveProjectActions.UPSERT_CLASS_PROJ_REL),
  //       switchMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
  //         /**
  //          * Emit the global action that activates the loading bar
  //          */
  //         globalStore.next(this.loadingBarActions.startLoading());

  //         /**
  //          * Prepare api call
  //          */
  //         let apiCall;
  //         // update existing projRel
  //         if (action.meta.projRel.pk_entity) apiCall = this.projRelApi.patchAttributes(action.meta.projRel.pk_entity, action.meta.projRel);
  //         // create new projRel
  //         else apiCall = this.projRelApi.create(action.meta.projRel);

  //         /**
  //          * Subscribe to the api call
  //          */
  //         apiCall.subscribe((data) => {
  //           /**
  //            * Emit the global action that completes the loading bar
  //            */
  //           globalStore.next(this.loadingBarActions.completeLoading());
  //           /**
  //            * Emit the local action on loading succeeded
  //            */
  //           globalStore.next(this.actions.upsertClassProjRelSucceeded(data, action.meta.dfh_pk_class));

  //         }, error => {
  //           /**
  //            * Emit the global action that shows some loading error message
  //            */
  //           // globalStore.next(this.loadingBarActions.completeLoading());
  //           /**
  //           * Emit the local action on loading failed
  //           */
  //           globalStore.next(this.actions.upsertClassProjRelFailed({ status: '' + error.status }, action.meta.dfh_pk_class))
  //         })
  //       }))
  //     )
  //   }
  // }




  /**
   * Update Entity Project Relation
   * @param c
   */
  private createUpsertEntityProjRelEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ActiveProjectActions.UPSERT_ENTITY_PROJ_REL),
        switchMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());

          /**
           * Prepare api call
           */
          let apiCall;
          // update existing infProjRel
          if (action.meta.infProjRel.fk_entity) apiCall = this.infProjRelApi.updateEprAttributes(
            action.meta.infProjRel.fk_project,
            action.meta.infProjRel.fk_entity,
            action.meta.infProjRel
          );
          // create new infProjRel
          else apiCall = this.infProjRelApi.create(action.meta.infProjRel);

          /**
           * Subscribe to the api call
           */
          apiCall.subscribe((data) => {
            /**
             * Emit the global action that completes the loading bar
             */
            globalStore.next(this.loadingBarActions.completeLoading());
            /**
             * Emit the local action on loading succeeded
             */
            globalStore.next(this.actions.upsertEntityProjRelSucceeded(data));

          }, error => {
            /**
             * Emit the global action that shows some loading error message
             */
            // globalStore.next(this.loadingBarActions.completeLoading());
            /**
            * Emit the local action on loading failed
            */
            globalStore.next(this.actions.upsertEntityProjRelFailed({ status: '' + error.status }))
          })
        }))
      )
    }
  }
}
