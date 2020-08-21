import {testdb} from '../../../datasources/testdb.datasource';
import {InfAppellation} from '../../../models';
import {InfAppellationRepository, InfStatementRepository, ProInfoProjRelRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';

function createInfAppellationRepo() {
  let infStatementRepo: InfStatementRepository;
  let proInfoProjRelRepo: ProInfoProjRelRepository;
  return new InfAppellationRepository(
    testdb,
    async () => infStatementRepo,
    async () => proInfoProjRelRepo,
  )
}

export async function createInfAppellation(item: Partial<InfAppellation>) {
  return createInfAppellationRepo().create(await dealWithPkEntity(item, 'information'));
}
