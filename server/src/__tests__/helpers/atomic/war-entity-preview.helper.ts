import {WarEntityPreviewId, WarEntityPreviewWithFulltext} from '../../../models';
import {WarEntityPreviewRepository} from '../../../repositories';
import {testdb} from "../testdb";

export function createWarEntityPreviewRepo() {
  return new WarEntityPreviewRepository(
    testdb,
  )
}

export async function createWarEntityPreview(entityPreview: Partial<WarEntityPreviewWithFulltext>) {
  return createWarEntityPreviewRepo().create(entityPreview);
}

export async function getWarEntityPreview(pkEntity: number, fkProject = 0) {
  return createWarEntityPreviewRepo().find({
    where: {
      and: [
        {project: {eq: fkProject}},
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
