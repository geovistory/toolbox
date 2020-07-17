import {testdb} from '../../../datasources/testdb.datasource';
import {ProProjectRepository} from '../../../repositories';

export async function createProject(language: number) {
  // 19703: italian
  return new ProProjectRepository(testdb)
    .create({fk_language: language});
}
