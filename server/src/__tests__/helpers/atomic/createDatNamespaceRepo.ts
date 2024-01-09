import {DatNamespaceRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';

export function createDatNamespaceRepo() {
  return new DatNamespaceRepository(TestDbFactory.datasource);
}
