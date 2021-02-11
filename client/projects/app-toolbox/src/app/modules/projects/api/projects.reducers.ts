import { IProjectList } from '../projects.model';
import { ProjectsAction, ProjectsActions } from './projects.actions';
import { ProjectPreview } from 'projects/app-toolbox/src/app/core';

const INITIAL_STATE: IProjectList = {
  records: []
};

const projectListReducer = (lastState: IProjectList = INITIAL_STATE, action: ProjectsAction): IProjectList => {
  switch (action.type) {
    case ProjectsActions.LOAD_PROJECTS_SUCCEEDED: return {
      ...lastState, records: action.payload.map((record: ProjectPreview) => ({ record: record }))
    };
  }

  return lastState;
}

export const createProjectsReducer = () => {
  return projectListReducer;
}
