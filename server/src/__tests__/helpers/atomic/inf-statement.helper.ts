import {InfStatement} from '../../../models';
import {InfStatementRepository, ProInfoProjRelRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createInfStatementRepo() {
  let proInfoProjRelRepo: ProInfoProjRelRepository;
  return new InfStatementRepository(
    TestDbFactory.datasource,
    async () => proInfoProjRelRepo,
  )
}

export async function createInfStatement(item: Partial<InfStatement>) {
  return createInfStatementRepo().create(await dealWithPkEntity(item, 'information'));
}
