import { ProjectsAction, ProjectsActions } from '../actions/projects.actions';
import { IProjectList } from '../models/projects.model';
import { ProjectPreview } from '../models/active-project.models';

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
