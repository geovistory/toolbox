import { IAppState } from '@kleiolab/lib-redux';
import { ProjectDetailMock } from './ProjectDetailMock';

export namespace IAppStateMock {
  export const stateProject1: IAppState = {
    activeProject: ProjectDetailMock.project1,
  }
  export const stateDefaultConfigProject: IAppState = {
    activeProject: ProjectDetailMock.defaultConfigProject,
  }

}
