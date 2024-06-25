import { ActiveProjectState } from '../../redux-store/ui/active-project/active-project.models';
import { ProProjectMock } from './auto-gen/gvDB/ProProjectMock';

const project1: ActiveProjectState = {
  pk_project: ProProjectMock.PROJECT_1.pk_entity,
}

const defaultConfigProject: ActiveProjectState = {
  pk_project: ProProjectMock.DEFAULT_PROJECT.pk_entity,
}
export const ProjectDetailMock = {
  project1,
  defaultConfigProject
}
