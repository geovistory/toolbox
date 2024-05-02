/* eslint-disable @typescript-eslint/camelcase */
import {ProProject} from '../../../models';
import {ProProjectRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createProProjectRepo() {return new ProProjectRepository(TestDbFactory.datasource)}

export async function createProject(language: number, fromProject?: number): Promise<ProProject> {
  const repo = createProProjectRepo()
  if (fromProject) return repo.create({fk_language: language, fk_cloned_from_project: fromProject});
  else return repo.create({fk_language: language});
}

export async function createProjectAtId(id: number, language: number) {
  await TestDbFactory.datasource.execute("SELECT setval('projects.entity_pk_entity_seq', " + (id - 1) + ", true);");
  return createProProjectRepo().create({fk_language: language});
}

export async function updateProjectLanguage(pkProject: number, language: number) {
  const repo = createProProjectRepo();
  await repo.updateById(pkProject, {fk_language: language});
  return repo.findById(pkProject)
}

export async function deleteProject(pkProject: number) {
  const repo = createProProjectRepo();
  await repo.deleteById(pkProject);
}


export async function createProProject(item: Partial<ProProject>) {
  return createProProjectRepo().create(await dealWithPkEntity(item, 'projects'));
}
