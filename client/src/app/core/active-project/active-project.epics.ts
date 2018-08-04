import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { sort } from 'ramda';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { Observable, combineLatest } from 'rxjs';

import { propSetKeyFromFk, roleSetKey, roleSetKeyFromParams } from '../../modules/information2/information.helpers';
import { LoadingBarActions } from '../loading-bar/api/loading-bar.actions';
import { ComUiContext, ComUiContextApi, ComUiContextConfig, DfhClass, ProjectApi } from '../sdk';
import { IAppState } from '../store/model';
import { U } from '../util/util';
import { ActiveProjectActions } from './active-project.action';
import { ClassConfig, ProjectCrm, UiElement } from './active-project.models';
import { Action } from 'redux';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class ActiveProjectEpics {
  constructor(
    private uiContextApi: ComUiContextApi,
    private projectApi: ProjectApi,
    private actions: ActiveProjectActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return combineEpics(
      this.createLoadClassListEpic()
    );
  }

  private createLoadClassListEpic(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return (action$, store) => action$.pipe(

      ofType(ActiveProjectActions.PROJECT_LOAD_CRM),
      switchMap((action) => new Observable<Action>((globalStore) => {
        globalStore.next(this.loadingBarActions.startLoading());

        combineLatest(
          this.projectApi.getReferenceModel(action.meta.pk_project),
          this.uiContextApi.uiConfig(null, action.meta.pk_project)
        )
          .subscribe((res) => {
            const classes: DfhClass[] = res[0];

            const crm: ProjectCrm = {
              classes: {},
              roleSets: {}
            }
            classes.forEach((cla: DfhClass) => {
              crm.classes[cla.dfh_pk_class] = U.classConfigFromDfhClass(cla);

              // add roleSets
              U.obj2KeyValueArr(crm.classes[cla.dfh_pk_class].roleSets).forEach(rs => {
                crm.roleSets[rs.key] = rs.value;
              })
            })

            const uiContexts: ComUiContext[] = res[1];

            uiContexts.forEach(uiCtxt => {
              if (uiCtxt.ui_context_config) {
                uiCtxt.ui_context_config.forEach(uiConf => {

                  // add roleSet configs to crm
                  if (uiConf.fk_property) {
                    // retrieve the classConfig
                    const cConf = crm.classes[uiConf.property_is_outgoing ? uiConf.property.dfh_has_domain : uiConf.property.dfh_has_range];
                    this.addUiConfToClassConfig(cConf, uiCtxt, uiConf);
                  } else if (uiConf.fk_property_set) {
                    // add propSet configs to crm
                    // retrieve the classConfig
                    const cConf = crm.classes[uiConf.fk_class_for_property_set];
                    this.addUiConfToClassConfig(cConf, uiCtxt, uiConf);
                  }

                })
              }
            })



            globalStore.next(this.actions.projectCrmLoaded(crm));
            globalStore.next(this.loadingBarActions.completeLoading());


          }, error => {
            // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
          }
          );



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
        roleSetKey: uiConf.fk_property ? roleSetKeyFromParams(uiConf.fk_property, uiConf.property_is_outgoing) : undefined,
        fk_property_set: uiConf.fk_property_set,
        property_set: uiConf.fk_property_set ? uiConf.property_set : undefined,
        propSetKey: uiConf.fk_property_set ? propSetKeyFromFk(uiConf.fk_property_set) : undefined
      })

      // sort the array of uiElements by the ordNum
      cUiCtxt.uiElements = sort(ordNum, cUiCtxt.uiElements)
    }
  }
}
