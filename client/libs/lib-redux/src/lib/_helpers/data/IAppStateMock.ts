import { IAppState } from '../../redux-store/state.model';
import { ProjectDetailMock } from './ProjectDetailMock';

const stateProject1: IAppState = {
  ui: { activeProject: ProjectDetailMock.project1 },
  data: {}
}
const stateDefaultConfigProject: IAppState = {
  ui: { activeProject: ProjectDetailMock.defaultConfigProject },
  data: {}
}
export const IAppStateMock = {
  stateProject1,
  stateDefaultConfigProject
}
