import { testdb } from "../testdb";
import {InfTemporalEntity} from '../../../models';
import {InfStatementRepository, InfTemporalEntityRepository, InfTextPropertyRepository, ProInfoProjRelRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';


function createInfTemporalEntityRepo() {
  let infStatementRepo: InfStatementRepository;
  let infTextPropertyRepo: InfTextPropertyRepository;
  let proInfoProjRelRepo: ProInfoProjRelRepository;
  return new InfTemporalEntityRepository(
    testdb,
    async () => infStatementRepo,
    async () => infTextPropertyRepo,
    async () => proInfoProjRelRepo,
  )
}

export async function createInfTemporalEntity(item: Partial<InfTemporalEntity>) {
  return createInfTemporalEntityRepo().create(await dealWithPkEntity(item, 'information'));
}
