import * as AtmProject from '../atomic/pro-project.helper';
import * as AtmNamespace from '../atomic/dat-namespace.helper';

export async function createRawProject(language: number) {
  return await AtmProject.createProject(language);
}

export async function createProjectAndNamespace(language: number) {
  let project = await AtmProject.createProject(language);
  let namespace = await AtmNamespace.createNamespace(project.pk_entity);
  return {project, namespace};
}
