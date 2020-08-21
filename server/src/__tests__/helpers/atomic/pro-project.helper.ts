/* eslint-disable @typescript-eslint/camelcase */
import {testdb} from '../../../datasources/testdb.datasource';
import {ProProject} from '../../../models';
import {ProProjectRepository} from '../../../repositories';
import * as AtmLanguage from '../atomic/inf-language.helper';
import {dealWithPkEntity} from './_sequences.helper';
function createProProjectRepo() {
  return new ProProjectRepository(
    testdb
  )
}

export async function createProject(language: string, fromProject?: number) {
  const lang = await AtmLanguage.getLanguage(language);
  const repo = createProProjectRepo()
  if (fromProject) return repo.create({fk_language: lang.pk_entity, fk_cloned_from_project: fromProject});
  else return repo.create({fk_language: lang.pk_entity});
}

export async function createProjectAtId(id: number, language: string) {
  const lang = await AtmLanguage.getLanguage(language);
  await testdb.execute("SELECT setval('projects.entity_pk_entity_seq', " + (id - 1) + ", true);");
  return createProProjectRepo().create({fk_language: lang.pk_entity});
}

export async function updateProjectLanguage(pkProject: number, language: string) {
  const lang = await AtmLanguage.getLanguage(language);
  const repo = createProProjectRepo();
  await repo.updateById(pkProject, {fk_language: lang.pk_entity});
  return repo.findById(pkProject)
}

export async function deleteProject(pkProject: number) {
  const repo = createProProjectRepo();
  await repo.deleteById(pkProject);
}


export async function createProProject(item: Partial<ProProject>) {
  return createProProjectRepo().create(await dealWithPkEntity(item, 'projects'));
}
