import { Injectable } from '@angular/core';
import { ProjectPreview } from '@kleiolab/lib-redux';
import { FluxStandardAction } from 'flux-standard-action';

interface MetaData { };
export type ProjectsAction = FluxStandardAction<ProjectPreview[], MetaData>;


@Injectable()
export class ProjectsActions {
  static LOAD_PROJECTS_SUCCEEDED = 'LOAD_PROJECTS_SUCCEEDED';

  loadProjectsSucceeded(payload: ProjectPreview[]): ProjectsAction {
    return {
      type: ProjectsActions.LOAD_PROJECTS_SUCCEEDED,
      payload,
      meta: null
    };
  }

}
