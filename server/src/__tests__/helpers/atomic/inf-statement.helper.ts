import {testdb} from '../../../datasources/testdb.datasource';
import {InfStatement} from '../../../models';
import {InfStatementRepository, ProInfoProjRelRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';

function createInfStatementRepo() {
  let proInfoProjRelRepo: ProInfoProjRelRepository;
  return new InfStatementRepository(
    testdb,
    async () => proInfoProjRelRepo,
  )
}

export async function createInfStatement(item: Partial<InfStatement>) {
  return createInfStatementRepo().create(await dealWithPkEntity(item, 'information'));
}
