import { DatNamespace, ProProject } from '../../../models';
import * as AtmNamespace from '../atomic/dat-namespace.helper';
import { createDatNamespace } from '../atomic/dat-namespace.helper';
import * as AtmProject from '../atomic/pro-project.helper';
import { createProProject } from '../atomic/pro-project.helper';
import { createProTextProperty } from '../atomic/pro-text-property.helper';
import { DatNamespaceMock } from '../data/gvDB/DatNamespaceMock';
import { ProProjectMock } from '../data/gvDB/ProProjectMock';
import { ProTextPropertyMock } from '../data/gvDB/ProTextPropertyMock';
import { getIndex } from '../meta/index.helper';

export async function createProjectAndNamespace(language: number): Promise<{ project: ProProject, namespace: DatNamespace }> {
  const project = await AtmProject.createProject(language);
  const namespace = await AtmNamespace.createDatNamespace({
    pk_entity: getIndex(),
    fk_project: project.pk_entity,
    standard_label: 'Default Namespace'
  });
  return { project, namespace };
}

export async function createSandBoxProject() {
  await createProProject(ProProjectMock.SANDBOX_PROJECT);
  await createProTextProperty(ProTextPropertyMock.SANDBOX_PROJECT_NAME);
  await createDatNamespace(DatNamespaceMock.SANDBOX_NAMESPACE);
}

export async function createProject1() {
  const project1 = await createProProject(ProProjectMock.PROJECT_1);
  return { project1 };
}

export async function createProject2() {
  const project2 = await createProProject(ProProjectMock.PROJECT_2);
  return { project2 };
}

export async function createProject3() {
  const project3 = await createProProject(ProProjectMock.PROJECT_3);
  return { project3 };
}
