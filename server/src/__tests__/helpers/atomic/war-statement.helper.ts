import {testdb} from "../testdb";
import {WarStatement, WarStatementId} from '../../../models';
import {WarStatementRepository} from '../../../repositories';

export function createWarStatementRepo() {
  return new WarStatementRepository(
    testdb,
  )
}

export async function createWarStatement(stmt: Partial<WarStatement>) {
  return createWarStatementRepo().create(stmt);
}

export async function getWarStatement(pkEntity: number, fkProject?: number) {
  return createWarStatementRepo().find({
    where: {
      and: [
        {project: {eq: fkProject}},
        {pk_entity: {eq: pkEntity}},
      ]
    }
  });
}


export async function updateWarStatement(id: WarStatementId, item: Partial<WarStatement>) {
  const where = WarStatement.buildWhereForId(id)
  return createWarStatementRepo().updateAll(item, where);
}

export async function deleteWarStatement(id: WarStatementId) {
  const where = WarStatement.buildWhereForId(id)
  return createWarStatementRepo().deleteAll(where);
}
