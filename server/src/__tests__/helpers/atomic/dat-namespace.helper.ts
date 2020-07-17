import {testdb} from '../../../datasources/testdb.datasource';
import {DatNamespaceRepository} from '../../../repositories';

export async function createNamespace(fkProject?: number) {
  return new DatNamespaceRepository(testdb)
    .create({fk_project: fkProject});
}
