import { IProjectList } from '../projects.model';
import { ProjectsAction, ProjectsActions } from './projects.actions';
import { Project } from 'app/core';

const INITIAL_STATE: IProjectList = {
  records: []
};

const projectListReducer = (lastState: IProjectList = INITIAL_STATE, action: ProjectsAction): IProjectList => {
  switch (action.type) {
    case ProjectsActions.LOAD_PROJECTS_SUCCEEDED: return {
      ...lastState, records: action.payload.map((record: Project) => ({ record: record }))
    };
  }

  return lastState;
}

export const createProjectsReducer = () => {
  return projectListReducer;
}
