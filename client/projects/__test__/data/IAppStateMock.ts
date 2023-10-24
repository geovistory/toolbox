import { IAppState } from '@kleiolab/lib-redux';
import { ProjectDetailMock } from './ProjectDetailMock';

export namespace IAppStateMock {
  export const stateProject1: IAppState = {
    ui: { activeProject: ProjectDetailMock.project1 },
    data: {}
  }
  export const stateDefaultConfigProject: IAppState = {
    ui: { activeProject: ProjectDetailMock.defaultConfigProject },
    data: {}
  }

}
