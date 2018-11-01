import { Injectable } from '@angular/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { fieldKey, propertyFieldKeyFromParams } from 'app/core/state/services/state-creator';
import { FluxStandardAction } from 'flux-standard-action';
import { indexBy, sort } from 'ramda';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { combineLatest, Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { propSetKeyFromFk } from '../../modules/information/information.helpers';
import { LoadingBarActions } from '../loading-bar/api/loading-bar.actions';
import { ComClassField, ComClassFieldApi, ComUiContext, ComUiContextApi, ComUiContextConfig, DfhClass, DfhProperty, DfhPropertyApi, ProjectApi } from '../sdk';
import { U } from '../util/util';
import { ActiveProjectAction, ActiveProjectActions } from './active-project.action';
import { ClassConfig, ProjectCrm, UiElement } from './active-project.models';



@Injectable()
export class ActiveProjectEpics {
  constructor(
    private uiContextApi: ComUiContextApi,
    private projectApi: ProjectApi,
    private dfhPropertyApi: DfhPropertyApi,
    private comClassFieldApi: ComClassFieldApi,
    private actions: ActiveProjectActions,
    private notificationActions: NotificationsAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return combineEpics(
      this.createLoadProjectEpic(),
      this.createLoadClassListEpic(),
      this.createLoadProjectUpdatedEpic()
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

        this.projectApi.findComplex({
          'where': ['pk_project', '=', action.meta.pk_project],
          'include': {
            'labels': {
              '$relation': {
                'name': 'labels',
                'joinType': 'inner join',
                'orderBy': [{ 'pk_entity': 'asc' }]
              }
            },
            'default_language': {
              '$relation': {
                'name': 'default_language',
                'joinType': 'inner join',
                'orderBy': [{ 'pk_language': 'asc' }]
              },
              'inf_language': {
                '$relation': {
                  'name': 'inf_language',
                  'joinType': 'inner join',
                  'orderBy': [{ 'pk_language': 'asc' }]
                }
              }
            }
          }
        })
          .subscribe(
            data => {
              globalStore.next(this.actions.activeProjectUpdated(data[0]))
            },
            error => {
              globalStore.next(this.notificationActions.addToast({
                type: 'error',
                options: { title: error }
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

  private createLoadClassListEpic(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
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


            const crm: ProjectCrm = {
              classes: {},
              propertyFields: {},
              fieldList: {}
            }
            classes.forEach((cla: DfhClass) => {
              crm.classes[cla.dfh_pk_class] = U.classConfigFromDfhClass(cla);

              // add propertyFields
              U.obj2KeyValueArr(crm.classes[cla.dfh_pk_class].propertyFields).forEach(propField => {
                crm.propertyFields[propField.key] = propField.value;
              })

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
        propSetKey: uiConf.fk_class_field ? propSetKeyFromFk(uiConf.fk_class_field) : undefined
      })

      // sort the array of uiElements by the ordNum
      cUiCtxt.uiElements = sort(ordNum, cUiCtxt.uiElements)
    }
  }
}
