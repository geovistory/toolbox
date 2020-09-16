import {testdb} from "../testdb";
import {WarEntityPreview, WarEntityPreviewId} from '../../../models';
import {WarEntityPreviewRepository} from '../../../repositories';

export function createWarEntityPreviewRepo() {
  return new WarEntityPreviewRepository(
    testdb,
  )
}

export async function createWarEntityPreview(entityPreview: Partial<WarEntityPreview>) {
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


export async function updateWarEntityPreview(id: WarEntityPreviewId, item: Partial<WarEntityPreview>) {
  const where = WarEntityPreview.buildWhereForId(id)
  return createWarEntityPreviewRepo().updateAll(item, where);
}

export async function deleteWarEntityPreview(id: WarEntityPreviewId) {
  const where = WarEntityPreview.buildWhereForId(id)
  return createWarEntityPreviewRepo().deleteAll(where);
}
