import {WarFieldChangeId} from '../../../models/war-field-change-id.model';
import {WarFieldChange} from '../../../models/war-field-change.model';
import {WarFieldChangeRepository} from '../../../repositories/war-field-change.repository';
import {TestDbFactory} from '../TestDbFactory';

export function createWarFieldChangeRepo() {
  return new WarFieldChangeRepository(
    TestDbFactory.datasource,
  )
}

export async function createWarFieldChange(stmt: Partial<WarFieldChange>) {
  return createWarFieldChangeRepo().create(stmt);
}


export async function updateWarFieldChange(id: WarFieldChangeId, item: Partial<WarFieldChange>) {
  const where = WarFieldChange.buildWhereForId(id)
  return createWarFieldChangeRepo().updateAll(item, where);
}

export async function deleteWarFieldChange(id: WarFieldChangeId) {
  const where = WarFieldChange.buildWhereForId(id)
  return createWarFieldChangeRepo().deleteAll(where);
}


export async function findWarFieldChange(id: WarFieldChangeId): Promise<WarFieldChange | null> {
  const where = WarFieldChange.buildWhereForId(id)
  return createWarFieldChangeRepo().findOne(where);
}
