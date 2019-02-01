import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { createPeItDetail, fieldKey, propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';
import { PeItService } from 'app/modules/information/shared/pe-it.service';
import { FluxStandardAction } from 'flux-standard-action';
import { indexBy, sort } from 'ramda';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { combineLatest, Observable } from 'rxjs';
import { mapTo, mergeMap, switchMap, filter } from 'rxjs/operators';
import { LoadingBarActions } from '../loading-bar/api/loading-bar.actions';
import { ComClassField, ComClassFieldApi, ComUiContext, ComUiContextApi, ComUiContextConfig, DfhClass, DfhProperty, DfhPropertyApi, InfChunk, InfChunkApi, InfPersistentItem, InfPersistentItemApi, InfTemporalEntity, InfTemporalEntityApi, ComProjectApi } from '../sdk';
import { PeItDetail } from '../state/models';
import { IAppState } from '../store/model';
import { U } from '../util/util';
import { ActiveProjectAction, ActiveProjectActions } from './active-project.action';
import { ClassConfig, ProjectCrm, UiElement } from './active-project.models';



@Injectable()
export class ActiveProjectEpics {
  constructor(
    private peItService: PeItService,
    private peItApi: InfPersistentItemApi,
    private teEnApi: InfTemporalEntityApi,
    private chunkApi: InfChunkApi,
    private uiContextApi: ComUiContextApi,
    private projectApi: ComProjectApi,
    private dfhPropertyApi: DfhPropertyApi,
    private comClassFieldApi: ComClassFieldApi,
    private actions: ActiveProjectActions,
    private notificationActions: NotificationsAPIActions,
    private loadingBarActions: LoadingBarActions,
    private ngRedux: NgRedux<IAppState>,
  ) { }

  public createEpics(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return combineEpics(
      this.createLoadProjectEpic(),
      this.createLoadCrmEpic(),
      this.createLoadProjectUpdatedEpic(),
      // this.createLoadDataUnitPreviewEpic(),
      this.createLoadDataUnitDetailForModalEpic(),
      this.createLoadChunkEpic(),
      this.createLoadPeItGraphEpic(),
      this.createLoadTeEnGraphEpic(),
      this.createClosePanelEpic(),
      this.createActivateTabFocusPanelEpic(),
      this.createMoveTabFocusPanelEpic(),
      this.createClosePanelFocusPanelEpic()
    );
  }

  /**
   * This epic listenes to an action that wants to load tha active project (by id)
   * It loads the project info and
   * - on loaded dispaches an action that reduces the project into the store
   * - on fail dispaches an action that shows an error notification
   */
  private createLoadProjectEpic(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return (action$, store) => action$.pipe(

      ofType(ActiveProjectActions.LOAD_PROJECT),
      switchMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
        /**
       * Emit the global action that activates the loading bar
       */
        globalStore.next(this.loadingBarActions.startLoading());

        this.projectApi.getBasics(action.meta.pk_project)
          .subscribe(
            data => {
              globalStore.next(this.actions.activeProjectUpdated(data[0]))
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
      ofType(ActiveProjectActions.ACTIVE_PROJECT_UPDATED),
      mapTo(this.loadingBarActions.completeLoading())
    )
  }

  private createLoadCrmEpic(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return (action$, store) => action$.pipe(

      ofType(ActiveProjectActions.PROJECT_LOAD_CRM),
      switchMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
        globalStore.next(this.loadingBarActions.startLoading());


        combineLatest(
          this.projectApi.getReferenceModel(action.meta.pk_project),
          this.uiContextApi.uiConfig(null, action.meta.pk_project),
          this.dfhPropertyApi.propertyFieldInfo(true),
          this.dfhPropertyApi.propertyFieldInfo(false),
          this.comClassFieldApi.find()
        )
          .subscribe(res => {
            const classes: DfhClass[] = res[0],
              outgoingProperties: DfhProperty[] = res[2],
              ingoingProperties: DfhProperty[] = res[3],
              classFields = res[4] as ComClassField[];

            const properties = {
              ...indexBy((prop: DfhProperty) => prop.dfh_pk_property.toString(), ingoingProperties),
              ...indexBy((prop: DfhProperty) => prop.dfh_pk_property.toString(), outgoingProperties)
            }

            const crm: ProjectCrm = {
              classes: {},
              fieldList: {},
              properties
            }

            classes.forEach((cla: DfhClass) => {
              crm.classes[cla.dfh_pk_class] = U.classConfigFromDfhClass(cla);

              // create fieldList
              crm.fieldList = {
                ...indexBy(fieldKey, [
                  ...U.infProperties2PropertyFields(false, ingoingProperties),
                  ...U.infProperties2PropertyFields(true, outgoingProperties),
                  ...U.comCLassFields2Fields(classFields)
                ])
              }
            })

            const uiContexts: ComUiContext[] = res[1];

            uiContexts.forEach(uiCtxt => {
              if (uiCtxt.ui_context_config) {
                uiCtxt.ui_context_config.forEach(uiConf => {

                  // add propertyField configs to crm
                  if (uiConf.fk_property) {
                    // retrieve the classConfig
                    const cConf = crm.classes[uiConf.property_is_outgoing ? uiConf.property.dfh_has_domain : uiConf.property.dfh_has_range];
                    this.addUiConfToClassConfig(cConf, uiCtxt, uiConf);
                  } else if (uiConf.fk_class_field) {
                    // add propSet configs to crm
                    // retrieve the classConfig
                    const cConf = crm.classes[uiConf.fk_class_for_class_field];
                    this.addUiConfToClassConfig(cConf, uiCtxt, uiConf);
                  }

                })
              }
            })



            globalStore.next(this.actions.projectCrmLoaded(crm));
            globalStore.next(this.loadingBarActions.completeLoading());


          }, error => {
            // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
          });

      }))

    )
  }

  private addUiConfToClassConfig(cConf: ClassConfig, uiCtxt: ComUiContext, uiConf: ComUiContextConfig) {

    if (!cConf || !uiCtxt || !uiConf) return;

    // if this class has no ui Context object yet, add empty object
    if (!cConf.uiContexts) cConf.uiContexts = {};

    // add the ui-context to the class in ProjectCrm
    cConf.uiContexts[uiCtxt.pk_entity] = {
      ...cConf.uiContexts[uiCtxt.pk_entity],
      label: uiCtxt.label
    }

    // ui-context of this class
    const cUiCtxt = cConf.uiContexts[uiCtxt.pk_entity];

    // if this ui-context has no uiElements object yet, add empty array
    if (!cUiCtxt.uiElements) cUiCtxt.uiElements = [];

    const ordNum = (a: UiElement, b: UiElement) => {
      if (!a || !b) return 0;
      return a.ord_num - b.ord_num
    };

    // if this uiConf is enabled (has a ordNum)
    if (uiConf.ord_num !== null) {
      // add the ui-context-config to the uiElements
      cUiCtxt.uiElements.push({
        ord_num: uiConf.ord_num,
        fk_property: uiConf.fk_property,
        property_is_outgoing: uiConf.property_is_outgoing,
        propertyFieldKey: uiConf.fk_property ? propertyFieldKeyFromParams(uiConf.fk_property, uiConf.property_is_outgoing) : undefined,
        fk_class_field: uiConf.fk_class_field,
        class_field: uiConf.fk_class_field ? uiConf.class_field : undefined,
        propSetKey: uiConf.fk_class_field ? ('_field_' + uiConf.fk_class_field) : undefined
      })

      // sort the array of uiElements by the ordNum
      cUiCtxt.uiElements = sort(ordNum, cUiCtxt.uiElements)
    }
  }

  // private createLoadDataUnitPreviewEpic(): Epic {
  //   return (action$, store) => {
  //     return action$.pipe(
  //       /**
  //        * Filter the actions that triggers this epic
  //        */
  //       ofType(ActiveProjectActions.LOAD_DATA_UNIT_PREVIEW),
  //       mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
  //         /**
  //          * Emit the global action that activates the loading bar
  //          */
  //         globalStore.next(this.loadingBarActions.startLoading());

  //         /**
  //          * Do some api call
  //          */
  //         this.duApi.findComplex({
  //           where: ['fk_project', '=', action.meta.pk_project, 'AND', 'pk_entity', '=', action.meta.pk_entity]
  //         })
  //           /**
  //          * Subscribe to the api call
  //          */
  //           .subscribe((data: InfDataUnitPreview[]) => {
  //             /**
  //              * Emit the global action that completes the loading bar
  //              */
  //             globalStore.next(this.loadingBarActions.completeLoading());

  //             /**
  //              * Emit the local action on loading succeeded
  //              */
  //             globalStore.next(this.actions.loadDataUnitPreviewSucceeded(data[0] as DataUnitPreview));

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
  //             globalStore.next(this.actions.loadDataUnitPreviewFailed({ status: '' + error.status }))
  //           })
  //       }))
  //     )
  //   }
  // }

  private createLoadDataUnitDetailForModalEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ActiveProjectActions.LOAD_DATA_UNIT_DETAIL_FOR_MODAL),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());

          const p = this.ngRedux.getState().activeProject;

          /**
           * TODO: change this to something generic for PeIt and TeEn
           */
          this.peItService.getNestedObject(action.meta.pk_entity, action.meta.pk_project)
            /**
           * Subscribe to the api call
           */
            .subscribe((data) => {
              if (data) {
                const peItDetail: PeItDetail = createPeItDetail(
                  {
                    showProperties: true,
                    showMapToggle: true
                  },
                  data,
                  p.crm,
                  { isViewMode: true, pkUiContext: action.meta.pk_ui_context }
                )
                /**
                 * Emit the global action that completes the loading bar
                 */
                globalStore.next(this.loadingBarActions.completeLoading());
                /**
                 * Emit the local action on loading succeeded
                 */
                globalStore.next(this.actions.loadPeItDetailsForModalSucceeded(peItDetail));
              } else {
                globalStore.next(this.loadingBarActions.completeLoading());
                globalStore.next(this.notificationActions.addToast({
                  type: 'error',
                  options: {
                    title: 'Failed loading related item ' + action.meta.pk_entity
                  }
                }));
              }

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
              globalStore.next(this.actions.loadDataUnitDetailsForModalFailed({ status: '' + error.status }))
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
            .subscribe((data: InfChunk) => {
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
}
