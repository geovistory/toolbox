import { ProjectDetail } from '@kleiolab/lib-redux';
import { ProProjectMock } from './auto-gen/gvDB/ProProjectMock';

export namespace ProjectDetailMock {
  export const project1: ProjectDetail = {
    pk_project: ProProjectMock.PROJECT_1.pk_entity,
  }

  export const defaultConfigProject: ProjectDetail = {
    pk_project: ProProjectMock.DEFAULT_PROJECT.pk_entity,
  }
}
