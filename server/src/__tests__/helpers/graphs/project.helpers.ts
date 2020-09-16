import {DatNamespace, ProProject} from '../../../models';
import * as AtmNamespace from '../atomic/dat-namespace.helper';
import {createLanguages} from '../atomic/inf-language.helper';
import * as AtmProject from '../atomic/pro-project.helper';

export async function createRawProject(language: string): Promise<ProProject> {
  return AtmProject.createProject(language);
}

export async function createProjectAndNamespace(language: string): Promise<{project: ProProject, namespace: DatNamespace}> {
  const project = await AtmProject.createProject(language);
  const namespace = await AtmNamespace.createNamespace(project);
  return {project, namespace};
}

export async function createSandBoxProject() {
  await createLanguages();
  await AtmProject.createProjectAtId(375232, 'English');
  await AtmProject.createProject('English', 375232);
}
