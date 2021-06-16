import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { ProProject, ProProjectApi, ProTextProperty } from '@kleiolab/lib-sdk-lb3';
import { FluxStandardAction } from 'flux-standard-action';
import { omit } from 'ramda';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { first, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { IAppState } from '../../root/models/model';
import { ActiveProjectAction, ActiveProjectActions } from '../../state-gui/actions/active-project.action';
import { LoadingBarActions } from '../../state-gui/actions/loading-bar.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { SchemaService } from '../../state-schema/services/schema.service';
import { ProjectPreview } from '../models/active-project.models';

function firstProTextPropStringOfType(textProperties: ProTextProperty[], fkSystemType): string {
  return (textProperties.find(t => t.fk_system_type === fkSystemType) || { string: '' }).string
}
/**
 * Transform ProProject to ProjectPreview
 */
function proProjectToProjectPreview(project: ProProject): ProjectPreview {
  return {
    label: firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL),
    description: firstProTextPropStringOfType(project.text_properties, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION),
    default_language: project.default_language,
    pk_project: project.pk_entity
  }
}


@Injectable({
  providedIn: 'root'
})
export class ActiveProjectEpics {
  constructor(
    private projectApi: ProProjectApi,
    private actions: ActiveProjectActions,
    private notificationActions: NotificationsAPIActions,
    private loadingBarActions: LoadingBarActions,
    private ngRedux: NgRedux<IAppState>,
    private schemaObj: SchemaService
  ) { }

  public createEpics(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return combineEpics(
      this.createLoadProjectBasicsEpic(),
      this.createClosePanelEpic(),
      this.createActivateTabFocusPanelEpic(),
      this.createMoveTabFocusPanelEpic(),
      this.createClosePanelFocusPanelEpic(),
      this.createSplitPanelActivateTabEpic(),
      this.createAddTabCloseListEpic(),
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
        globalStore.next(this.loadingBarActions.addJob());

        this.projectApi.getBasics(action.meta.pk_project)
          .pipe(first())

          .subscribe(
            (data: ProProject[]) => {
              globalStore.next(this.actions.loadProjectBasiscsSucceded(proProjectToProjectPreview(data[0])))
              globalStore.next(this.loadingBarActions.removeJob());
              this.schemaObj.storeSchemaObject({
                inf: { language: [data[0].default_language] },
                pro: { project: [omit(['default_language'], data[0])] }
              }, action.meta.pk_project)
            },
            error => {
              globalStore.next(this.loadingBarActions.removeJob());
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
  // private createLoadProjectUpdatedEpic(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
  //   return (action$, store) => action$.pipe(
  //     ofType(ActiveProjectActions.LOAD_PROJECT_BASICS_SUCCEEDED),
  //     mapTo(this.loadingBarActions.completeLoading())
  //   )
  // }

  // private createLoadProjectConfigEpic(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
  //   return (action$, store) => action$.pipe(

  //     ofType(ActiveProjectActions.LOAD_PROJECT_CONFIG),
  //     switchMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
  //       globalStore.next(this.loadingBarActions.startLoading());

  //       combineLatest(
  //         this.dataService.loadDfhProfilesOfProject(action.meta.pk_project),

  //         this.dataService.loadDfhClassesOfProject(action.meta.pk_project),
  //         this.dataService.loadDfhPropertiesOfProject(action.meta.pk_project),
  //         this.dataService.loadDfhLabelsOfProject(action.meta.pk_project),

  //         this.sys.system_relevant_class.load().resolved$.pipe(filter(x => !!x)),
  //         this.sys.config.load().resolved$.pipe(filter(x => !!x)),
  //         this.dat.namespace.load('', action.meta.pk_project).resolved$.pipe(filter(x => !!x)),

  //         this.pro.text_property.loadOfProject(action.meta.pk_project).resolved$.pipe(filter(x => !!x)),
  //         this.pro.dfh_class_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(filter(x => !!x)),
  //         this.pro.dfh_profile_proj_rel.loadOfProject(action.meta.pk_project).resolved$.pipe(filter(x => !!x)),
  //         this.pro.class_field_config.loadOfProject(action.meta.pk_project).resolved$.pipe(filter(x => !!x)),
  //         this.schemaActions.loadGvSchemaObject(this.projectData.findProjectDataControllerGetTypesOfProject(action.meta.pk_project))
  //       )
  //         .pipe(filter((res: any[]) => !res.includes(undefined)))
  //         .subscribe((res) => {

  //           globalStore.next(this.actions.loadProjectConfigSucceeded());
  //           globalStore.next(this.loadingBarActions.completeLoading());

  //         }, error => {
  //           // subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
  //         });

  //     }))

  //   )
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

}
