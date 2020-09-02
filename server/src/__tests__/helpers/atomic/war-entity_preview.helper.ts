import {testdb} from '../../../datasources/testdb.datasource';
import {WarEntityPreview} from '../../../models';
import {WarEntityPreviewRepository} from '../../../repositories';

export function createWarEntityPreviewRepo() {
  return new WarEntityPreviewRepository(
    testdb,
  )
}

export async function createWarEntityPreview(entityPreview: WarEntityPreview) {
  return createWarEntityPreviewRepo().create(entityPreview);
}

export async function getWarEntityPreview(pkEntity: number, fkProject?: number) {
  return createWarEntityPreviewRepo().find({
    where: {
      and: [
        {project: {eq: fkProject}},
        {pk_entity: {eq: pkEntity}},
      ]
    }
  });
}
