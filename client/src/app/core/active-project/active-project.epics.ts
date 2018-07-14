import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';

import { Injectable } from '@angular/core';
import { DfhClass, IAppState, LoadingBarActions, U } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { sort } from 'ramda';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { Observable } from 'rxjs';

import { ComUiContext, ComUiContextApi, ComUiContextConfig, ProjectApi } from '../sdk';
import { ActiveProjectActions } from './active-project.action';
import { ClassConfig, ProjectCrm, UiElement } from './active-project.models';
import { roleSetKey, roleSetKeyFromParams } from '../../modules/information2/information.helpers';

@Injectable()
export class ActiveProjectEpics {
  constructor(
    private uiContextApi: ComUiContextApi,
    private projectApi: ProjectApi,
    private actions: ActiveProjectActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics() {
    return [
      createEpicMiddleware(this.createLoadClassListEpic())
    ];
  }

  private createLoadClassListEpic(): Epic<FluxStandardAction<any, any>, IAppState> {
    return (action$, store) => action$
      .ofType(ActiveProjectActions.PROJECT_LOAD_CRM)
      .switchMap((action) => new Observable<FluxStandardAction<any, any>>((globalStore) => {
        globalStore.next(this.loadingBarActions.startLoading());

        Observable.combineLatest(
          this.projectApi.getReferenceModel(action.meta.pk_project),
          this.uiContextApi.uiConfig(undefined, action.meta.pk_project)
        )
          .subscribe((res) => {
            const classes: DfhClass[] = res[0];

            let crm: ProjectCrm = {}
            classes.map((cla: DfhClass) => {
              crm[cla.dfh_pk_class] = U.classConfigFromDfhClass(cla);
            })

            const uiContexts: ComUiContext[] = res[1];

            uiContexts.forEach(uiCtxt => {
              if (uiCtxt.ui_context_config)
                uiCtxt.ui_context_config.forEach(uiConf => {

                  // add roleSet configs to crm
                  if (uiConf.fk_property) {
                    // retrieve the classConfig
                    const cConf = crm[uiConf.property_is_outgoing ? uiConf.property.dfh_has_domain : uiConf.property.dfh_has_range];
                    this.addUiConfToClassConfig(cConf, uiCtxt, uiConf);
                  }

                  // add propSet configs to crm
                  else if (uiConf.fk_property_set) {
                    const propSet = uiConf.property_set
                    if (propSet.property_set_class_rels) {
                      const cRels = propSet.property_set_class_rels;
                      cRels.forEach(cRel => {
                        // retrieve the classConfig
                        const cConf = crm[cRel.fk_class];
                        this.addUiConfToClassConfig(cConf, uiCtxt, uiConf);
                      })
                    }
                  }

                })
            })



            globalStore.next(this.actions.projectCrmLoaded(crm));
            globalStore.next(this.loadingBarActions.completeLoading());


          }, error => {
            // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
          }
          );



      }))
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
    let cUiCtxt = cConf.uiContexts[uiCtxt.pk_entity];

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
        property_set: uiConf.fk_property_set ? uiConf.property_set : undefined
      })

      // sort the array of uiElements by the ordNum
      cUiCtxt.uiElements = sort(ordNum, cUiCtxt.uiElements)
    }
  }
}
