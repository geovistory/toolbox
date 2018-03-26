import { Injectable, EventEmitter } from '@angular/core';

import { Project } from '../sdk/models/Project';
import { LoopBackAuth } from '../sdk/services/core/auth.service';
import { ProjectApi } from '../sdk/services/custom/Project';
import { environment } from '../../../environments/environment';
import { LoopBackConfig } from '../sdk/lb.config';

@Injectable()
export class ActiveProjectService {
  private changeProjectEventEmitter = new EventEmitter<Project>();
  project: Project;

  constructor(
    private projectApi: ProjectApi
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  onProjectChange():EventEmitter<Project> {
    return this.changeProjectEventEmitter;
  }

  private getProject(id:number):void {
    this.projectApi.find({
      where: {
        "pk_project": id
      },
      include: ["labels", "default_language"]
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
  setActiveProject(id):void{
    if(this.project && this.project.pk_project == id){
      this.changeProjectEventEmitter.emit(this.project);
    }
    else{
      this.getProject(id);
    }
  }

}