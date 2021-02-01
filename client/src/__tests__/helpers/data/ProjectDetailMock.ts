import { ProjectDetail } from 'app/core/active-project/active-project.models';
import { ProProjectMock } from './auto-gen/ProProjectMock';
import { InfLanguageMock } from './auto-gen/InfLanguageMock';

export namespace ProjectDetailMock {
  export const project1: ProjectDetail = {
    pk_project: ProProjectMock.PROJECT_1.pk_entity,
    default_language: InfLanguageMock.GERMAN
  }
}
