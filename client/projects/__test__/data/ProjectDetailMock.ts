import { ProProjectMock } from './auto-gen/ProProjectMock';
import { InfLanguageMock } from './auto-gen/InfLanguageMock';
import { ProjectDetail } from '@kleiolab/lib-redux';

export namespace ProjectDetailMock {
  export const project1: ProjectDetail = {
    pk_project: ProProjectMock.PROJECT_1.pk_entity,
    default_language: InfLanguageMock.GERMAN
  }

  export const defaultConfigProject: ProjectDetail = {
    pk_project: ProProjectMock.DEFAULT_PROJECT.pk_entity,
    default_language: InfLanguageMock.ENGLISH
  }
}
