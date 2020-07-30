import {testdb} from '../../../datasources/testdb.datasource';
import {WarEntityPreview} from '../../../models';
import {WarEntityPreviewRepository} from '../../../repositories';

export async function createWarEntityPreview(entityPreview: WarEntityPreview) {
  const repo = new WarEntityPreviewRepository(testdb);
  return repo.create(entityPreview);
}
