import { IAppState } from 'app/core';
import { ProjectDetailMock } from './ProjectDetailMock';

export namespace IAppStateMock {
  export const state1: IAppState = {
    activeProject: ProjectDetailMock.project1
  }

}
