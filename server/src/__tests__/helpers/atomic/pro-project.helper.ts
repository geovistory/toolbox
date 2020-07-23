import {testdb} from '../../../datasources/testdb.datasource';
import {ProProjectRepository} from '../../../repositories';
import * as AtmLanguage from '../atomic/inf-language.helper';

export async function createProject(language: string, fromProject?: number) {
  const lang = await AtmLanguage.getLanguage(language);
  const repo = new ProProjectRepository(testdb);
  if (fromProject) return repo.create({fk_language: lang.pk_entity, fk_cloned_from_project: fromProject});
  else return repo.create({fk_language: lang.pk_entity});
}

export async function createProjectAtId(id: number, language: string) {
  const lang = await AtmLanguage.getLanguage(language);
  await testdb.execute("SELECT setval('projects.entity_pk_entity_seq', " + (id - 1) + ", true);");
  return new ProProjectRepository(testdb).create({fk_language: lang.pk_entity});
}
