import { DatNamespace, ProProject } from '../../../models';
import * as AtmNamespace from '../atomic/dat-namespace.helper';
import * as AtmProject from '../atomic/pro-project.helper';
import { createProProject } from '../atomic/pro-project.helper';
import { createProTextProperty } from '../atomic/pro-text-property.helper';
import { ProProjectMock } from '../data/gvDB/ProProjectMock';
import { ProTextPropertyMock } from '../data/gvDB/ProTextPropertyMock';
import { createDatNamespace } from '../atomic/dat-namespace.helper';
import { DatNamespaceMock } from '../data/gvDB/DatNamespaceMock';

export async function createRawProject(language: string): Promise<ProProject> {
  return AtmProject.createProject(language);
}

export async function createProjectAndNamespace(language: string): Promise<{ project: ProProject, namespace: DatNamespace }> {
  const project = await AtmProject.createProject(language);
  const namespace = await AtmNamespace.createDatNamespace(project);
  return { project, namespace };
}

export async function createSandBoxProject() {
  await createProProject(ProProjectMock.SANDBOX_PROJECT);
  await createProTextProperty(ProTextPropertyMock.SANDBOX_PROJECT_NAME);
  await createDatNamespace(DatNamespaceMock.SANDBOX_NAMESPACE);
}