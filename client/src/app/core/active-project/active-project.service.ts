import { NgRedux } from '@angular-redux/store';
import { EventEmitter, Injectable } from '@angular/core';
import { IAppState, ComConfig } from 'app/core';
import { environment } from '../../../environments/environment';
import { LoopBackConfig } from '../sdk/lb.config';
import { Project } from '../sdk/models/Project';
import { ProjectApi } from '../sdk/services/custom/Project';
import { ActiveProjectActions } from './active-project.action';


@Injectable()
export class ActiveProjectService {
  private changeProjectEventEmitter = new EventEmitter<Project>();
  project: Project;

  constructor(
    private projectApi: ProjectApi,
    private ngRedux: NgRedux<IAppState>,
    private actions: ActiveProjectActions
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

  }

  /**
   * Initialize the project in state, if the activeProject is not yet
   * in state or if the pk_project of the activeProject in state
   * is not the one provided
   *
   * @param id pk_project
   */
  initProject(id) {
    const state = this.ngRedux.getState();
    if (!state.activeProject || state.activeProject.pk_project != id) {
      this.ngRedux.dispatch(this.actions.loadProject(id))
    }
  }

  /**
   * Initialize the project crm
   *
   * @param id pk_project
   */
  initProjectCrm(id) {
    const state = this.ngRedux.getState();
    if (!state.activeProject || state.activeProject.pk_project != id || !state.activeProject.crm) {
      this.ngRedux.dispatch(this.actions.activeProjectLoadCrm(id))
    }
  }

  loadDataUnitPreview(pkEntity: number) {
    const state = this.ngRedux.getState();
    const pkUiContext = ComConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
    this.ngRedux.dispatch(this.actions.loadDataUnitPreview(state.activeProject.pk_project, pkEntity, pkUiContext))
  }

}
