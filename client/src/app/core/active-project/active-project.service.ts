import { Injectable, EventEmitter } from '@angular/core';

import { Project } from '../sdk/models/Project';
import { LoopBackAuth } from '../sdk/services/core/auth.service';
import { ProjectApi } from '../sdk/services/custom/Project';
import { environment } from '../../../environments/environment';
import { LoopBackConfig } from '../sdk/lb.config';
import { NgRedux } from '@angular-redux/store';
import { ProjectsActions } from '../../modules/projects/api/projects.actions';
import { IProject } from '../../modules/projects/projects.model';
import { ActiveProjectActions } from './active-project.action';
import { DfhClass } from '../sdk';
import { IAppState } from 'app/core';

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

    this.changeProjectEventEmitter.subscribe(project => {
      this.ngRedux.dispatch(this.actions.activeProjectUpdated(project))
    })
  }

  onProjectChange(): EventEmitter<Project> {
    return this.changeProjectEventEmitter;
  }

  private getProject(id: number): void {
    this.projectApi.find({
      where: {
        'pk_project': id
      },
      include: ['labels', 'default_language']
    }).subscribe((projects: Project[]) => {
      this.project = projects[0];
      this.changeProjectEventEmitter.emit(this.project);
    });
  }



  /**
   * setActiveProject - set the active project by providing the
   * project's id. This id can be a number or a string, e.g. 134 or "134"
   *
   * @param  {number or string} id    Project Id
   *
   */
  setActiveProject(id): void {
    if (this.project && this.project.pk_project == id) {
      this.changeProjectEventEmitter.emit(this.project);
    } else {
      this.getProject(id);
      this.ngRedux.dispatch(this.actions.activeProjectLoadCrm(id))
    }
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
}
