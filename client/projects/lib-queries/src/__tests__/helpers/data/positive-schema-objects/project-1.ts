import { GvSchemaObject } from '@kleiolab/lib-sdk-lb4';
import { InfLanguageMock } from '../auto-gen/InfLanguageMock';
import { ProProjectMock } from '../auto-gen/ProProjectMock';

export const project1: GvSchemaObject = {
  inf: {
    language: [
      InfLanguageMock.GERMAN
    ]
  },
  pro: {
    project: [
      ProProjectMock.PROJECT_1
    ]
  }
}
