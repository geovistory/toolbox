import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DatSelector } from 'app/core/dat/dat.service';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { createPeItDetail, fieldKey, propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';
import { PeItService } from 'app/modules/information/shared/pe-it.service';
import { FluxStandardAction } from 'flux-standard-action';
import { indexBy, sort } from 'ramda';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { LoadingBarActions } from '../loading-bar/api/loading-bar.actions';
import { DatChunk, DatChunkApi, DfhClass, DfhProperty, DfhPropertyApi, InfPersistentItem, InfPersistentItemApi, InfTemporalEntity, InfTemporalEntityApi, ProClassFieldConfig, ProDfhClassProjRelApi, ProInfoProjRelApi, ProProject, ProProjectApi, ProQueryApi, ProVisualApi, SysAppContext, SysAppContextApi, SysClassField, SysClassFieldApi, SysClassHasTypePropertyApi } from '../sdk';
import { SysSystemRelevantClass } from '../sdk/models/SysSystemRelevantClass';
import { HasTypePropertyReadable, PeItDetail } from '../state/models';
import { ByPk, IAppState } from '../store/model';
import { SysClassHasTypePropertySlice } from '../sys/sys.models';
import { SystemSelector } from '../sys/sys.service';
import { U } from '../util/util';
import { ActiveProjectAction, ActiveProjectActions, ComQueryV, ComVisualV } from './active-project.action';
import { ClassConfig, ProjectCrm, UiElement } from './active-project.models';
import { DfhSelector } from '../dfh/dfh.service';
import { ProSelector } from '../pro/pro.service';



@Injectable()
export class ActiveProjectEpics {
  constructor(
    private sys: SystemSelector,
    private dat: DatSelector,
    private dfh: DfhSelector,
    private pro: ProSelector,
    private peItService: PeItService,
    private peItApi: InfPersistentItemApi,
    private teEnApi: InfTemporalEntityApi,
    private infProjRelApi: ProInfoProjRelApi,
    private chunkApi: DatChunkApi,
    private uiContextApi: SysAppContextApi,
    private projectApi: ProProjectApi,
    private projRelApi: ProDfhClassProjRelApi,
    private comQuery: ProQueryApi,
    private comVisual: ProVisualApi,
    private dfhPropertyApi: DfhPropertyApi,
    private comClassFieldApi: SysClassFieldApi,
    private sysHasTypePropsApi: SysClassHasTypePropertyApi,
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
      this.createLoadEntityDetailForModalEpic(),
      this.createLoadChunkEpic(),
      this.createLoadPeItGraphEpic(),
      this.createLoadTeEnGraphEpic(),
      this.createLoadTypesEpic(),
      this.createLoadQueriesEpic(),
      this.createLoadQueryVersionEpic(),
      this.createLoadVisualsEpic(),
      this.createLoadVisualVersionEpic(),
      this.createClosePanelEpic(),
      this.createActivateTabFocusPanelEpic(),
      this.createMoveTabFocusPanelEpic(),
      this.createClosePanelFocusPanelEpic(),
      // this.createEnableCreatingMentioningEpic(),
      // this.createDisableCreatingMentioningEpic(),
      this.createSplitPanelActivateTabEpic(),
      this.createAddTabCloseListEpic(),
      this.createChangeClassProjRelEpic(),
      this.createUpsertEntityProjRelEpic()
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
            (data: ProProject[]) => {
              globalStore.next(this.actions.activeProjectUpdated(U.proProjectToProjectPreview(data[0])))
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

        this.sys.system_relevant_class.load();
        this.sys.class_has_type_property.load();
        this.dat.namespace.load('', action.meta.pk_project);
        this.dfh.property_view.load()
        this.dfh.klass.loadClassesOfProjectProfiles(action.meta.pk_project);
        this.pro.class_field_config.load('', action.meta.pk_project)
        this.pro.dfh_class_proj_rel.load('', action.meta.pk_project)
        this.dfh.label.loadLabelesOfClasses(null);
        this.dfh.label.loadLabelesOfProperties(null);


        combineLatest(
          this.projectApi.getReferenceModel(action.meta.pk_project),
          this.uiContextApi.appContext(null, action.meta.pk_project),
          this.dfhPropertyApi.propertyFieldInfo(true),
          this.dfhPropertyApi.propertyFieldInfo(false),
          this.comClassFieldApi.find(),
          this.sysHasTypePropsApi.find(),
          this.sys.system_relevant_class$.by_fk_class$.all$,
          this.sys.class_has_type_property$.slice$,
          this.dat.namespace$.by_fk_project$.key(action.meta.pk_project),
          this.dfh.property_view$.by_dfh_pk_property$.all$,
          this.pro.class_field_config$.by_fk_class__fk_app_context$.all$,
          this.dfh.class$.by_dfh_pk_class$.all$
        )
          .pipe(filter((res) => !res.includes(undefined)))
          .subscribe((res) => {
            const classes: DfhClass[] = res[0],
              outgoingProperties: DfhProperty[] = res[2],
              ingoingProperties: DfhProperty[] = res[3],
              classFields = res[4] as SysClassField[],
              hasTypeProps: HasTypePropertyReadable[] = res[5],
              systemRelevantClasses: ByPk<ByPk<SysSystemRelevantClass>> = res[6],
              classHasTypeProperty: SysClassHasTypePropertySlice = res[7];


            const properties = {
              ...indexBy((prop) => prop.dfh_pk_property.toString(), ingoingProperties),
              ...indexBy((prop) => prop.dfh_pk_property.toString(), outgoingProperties)
            }

            const crm: ProjectCrm = {
              classes: {},
              fieldList: {},
              properties,
              hasTypeProperties: indexBy((prop) => prop.dfh_pk_property.toString(), hasTypeProps),
              classHasTypeProperty
            }

            const hasTypePropertiesByTypeClass = indexBy((prop) => prop.pk_type_class.toString(), hasTypeProps)

            classes.forEach((cla: DfhClass) => {
              crm.classes[cla.dfh_pk_class] = {
                ...U.classConfigFromDfhClass(
                  cla,
                  U.firstItemInIndexedGroup(systemRelevantClasses, cla.dfh_pk_class)
                ),
                subclassOfType: hasTypePropertiesByTypeClass[cla.dfh_pk_class] ? true : false
              }
              // create fieldList
              crm.fieldList = {
                ...indexBy(fieldKey, [
                  ...U.infProperties2PropertyFields(false, ingoingProperties),
                  ...U.infProperties2PropertyFields(true, outgoingProperties),
                  ...U.comClassFields2Fields(classFields)
                ])
              }
            })

            const uiContexts: SysAppContext[] = res[1];

            uiContexts.forEach(uiCtxt => {
              if (uiCtxt.class_field_config) {
                uiCtxt.class_field_config.forEach(uiConf => {

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

  private addUiConfToClassConfig(cConf: ClassConfig, uiCtxt: SysAppContext, uiConf: ProClassFieldConfig) {

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

  private createLoadEntityDetailForModalEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ActiveProjectActions.LOAD_ENTITY_DETAIL_FOR_MODAL),
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
                    showRightArea: false,

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
              globalStore.next(this.actions.loaEntitytDetailsForModalFailed({ status: '' + error.status }))
            })
        }))
      )
    }
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

  private createLoadQueryVersionEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ActiveProjectActions.LOAD_QUERY_VERSION),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.comQuery.findByIdAndVersionAndProject(action.meta.pk_project, action.meta.pk_entity, action.meta.entity_version)
            /**
           * Subscribe to the api call
           */
            .subscribe((data) => {
              /**
                 * Emit the global action that completes the loading bar
                 */
              globalStore.next(this.loadingBarActions.completeLoading());

              /**
               * Emit the local action on loading succeeded
               */
              globalStore.next(this.actions.loadQueryVersionSucceeded(data[0]));

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
              globalStore.next(this.actions.loadQueryVersionFailed({ status: '' + error.status }))
            })
        }))
      )
    }
  }

  private createLoadQueriesEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ActiveProjectActions.LOAD_QUERIES),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.comQuery.findPerProject(action.meta.pk_project, 10000, 0)
            /**
           * Subscribe to the api call
           */
            .subscribe((data: ComQueryV[]) => {
              /**
                 * Emit the global action that completes the loading bar
                 */
              globalStore.next(this.loadingBarActions.completeLoading());

              /**
               * Emit the local action on loading succeeded
               */
              globalStore.next(this.actions.loadQueriesSucceeded(data));

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
              globalStore.next(this.actions.loadQueriesFailed({ status: '' + error.status }))
            })
        }))
      )
    }
  }

  private createLoadVisualsEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ActiveProjectActions.LOAD_VISUALS),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.comVisual.findPerIdAndVersionAndProject(action.meta.pk_project, null, null)
            /**
           * Subscribe to the api call
           */
            .subscribe((data: ComVisualV[]) => {
              /**
                 * Emit the global action that completes the loading bar
                 */
              globalStore.next(this.loadingBarActions.completeLoading());

              /**
               * Emit the local action on loading succeeded
               */
              globalStore.next(this.actions.loadVisualsSucceeded(data));

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
              globalStore.next(this.actions.loadVisualsFailed({ status: '' + error.status }))
            })
        }))
      )
    }
  }


  private createLoadVisualVersionEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ActiveProjectActions.LOAD_VISUAL_VERSION),
        mergeMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.comVisual.findPerIdAndVersionAndProject(action.meta.pk_project, action.meta.pk_entity, action.meta.entity_version)
            /**
           * Subscribe to the api call
           */
            .subscribe((data: ComVisualV[]) => {
              /**
                 * Emit the global action that completes the loading bar
                 */
              globalStore.next(this.loadingBarActions.completeLoading());

              /**
               * Emit the local action on loading succeeded
               */
              globalStore.next(this.actions.loadVisualVersionSucceeded(data))

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
              globalStore.next(this.actions.loadVisualVersionFailed({ status: '' + error.status }))
            })
        }))
      )
    }
  }


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


  /**
   * Epic to handle enabling and disabling of a class for project
   * @param c
   */
  private createChangeClassProjRelEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ActiveProjectActions.UPSERT_CLASS_PROJ_REL),
        switchMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());

          /**
           * Prepare api call
           */
          let apiCall;
          // update existing projRel
          if (action.meta.projRel.pk_entity) apiCall = this.projRelApi.patchAttributes(action.meta.projRel.pk_entity, action.meta.projRel);
          // create new projRel
          else apiCall = this.projRelApi.create(action.meta.projRel);

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
            globalStore.next(this.actions.upsertClassProjRelSucceeded(data, action.meta.dfh_pk_class));

          }, error => {
            /**
             * Emit the global action that shows some loading error message
             */
            // globalStore.next(this.loadingBarActions.completeLoading());
            /**
            * Emit the local action on loading failed
            */
            globalStore.next(this.actions.upsertClassProjRelFailed({ status: '' + error.status }, action.meta.dfh_pk_class))
          })
        }))
      )
    }
  }




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
