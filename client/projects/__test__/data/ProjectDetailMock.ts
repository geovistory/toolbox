import { ActiveProjectState } from '@kleiolab/lib-redux/lib/redux-store/ui/active-project/active-project.models';
import { ProProjectMock } from './auto-gen/gvDB/ProProjectMock';

export namespace ProjectDetailMock {
  export const project1: ActiveProjectState = {
    pk_project: ProProjectMock.PROJECT_1.pk_entity,
  }

  export const defaultConfigProject: ActiveProjectState = {
    pk_project: ProProjectMock.DEFAULT_PROJECT.pk_entity,
  }
}
