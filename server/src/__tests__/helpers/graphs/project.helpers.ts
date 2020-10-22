import {DatNamespace, ProProject} from '../../../models';
import * as AtmNamespace from '../atomic/dat-namespace.helper';
import {createDatNamespace} from '../atomic/dat-namespace.helper';
import {createInfLanguage} from '../atomic/inf-language.helper';
import * as AtmProject from '../atomic/pro-project.helper';
import {createProProject} from '../atomic/pro-project.helper';
import {createProTextProperty} from '../atomic/pro-text-property.helper';
import {DatNamespaceMock} from '../data/gvDB/DatNamespaceMock';
import {InfLanguageMock} from '../data/gvDB/InfLanguageMock';
import {ProProjectMock} from '../data/gvDB/ProProjectMock';
import {ProTextPropertyMock} from '../data/gvDB/ProTextPropertyMock';

export async function createRawProject(language: string): Promise<ProProject> {
  return AtmProject.createProject(language);
}

export async function createProjectAndNamespace(language: string): Promise<{project: ProProject, namespace: DatNamespace}> {
  const project = await AtmProject.createProject(language);
  const namespace = await AtmNamespace.createDatNamespace(project);
  return {project, namespace};
}

export async function createSandBoxProject() {
  await createInfLanguage(InfLanguageMock.GERMAN)
  await createInfLanguage(InfLanguageMock.ENGLISH)
  await createProProject(ProProjectMock.SANDBOX_PROJECT);
  await createProTextProperty(ProTextPropertyMock.SANDBOX_PROJECT_NAME);
  await createDatNamespace(DatNamespaceMock.SANDBOX_NAMESPACE);
}
