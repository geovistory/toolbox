import {WarEntityPreviewWithFulltext} from '../../../models';
import {WarEntityPreviewId} from '../../../models/entity-preview/WarEntityPreviewId';
import {WarEntityPreviewRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';

export function createWarEntityPreviewRepo() {
  return new WarEntityPreviewRepository(
    TestDbFactory.datasource,
  )
}

export async function createWarEntityPreview(entityPreview: Partial<WarEntityPreviewWithFulltext>) {
  return createWarEntityPreviewRepo().create(entityPreview);
}

export async function getWarEntityPreview(pkEntity: number, fkProject = 0) {
  return createWarEntityPreviewRepo().find({
    where: {
      and: [
        {fk_project: {eq: fkProject}},
        {pk_entity: {eq: pkEntity}},
      ]
    }
  });
}


export async function updateWarEntityPreview(id: WarEntityPreviewId, item: Partial<WarEntityPreviewWithFulltext>) {
  const where = WarEntityPreviewWithFulltext.buildWhereForId(id)
  return createWarEntityPreviewRepo().updateAll(item, where);
}

export async function deleteWarEntityPreview(id: WarEntityPreviewId) {
  const where = WarEntityPreviewWithFulltext.buildWhereForId(id)
  return createWarEntityPreviewRepo().deleteAll(where);
}
