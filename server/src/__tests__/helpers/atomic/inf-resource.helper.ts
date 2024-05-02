import {InfResource} from '../../../models';
import {InfResourceRepository, InfStatementRepository, ProInfoProjRelRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';


function createInfResourceRepo() {
  let infStatementRepo: InfStatementRepository;
  let proInfoProjRelRepo: ProInfoProjRelRepository;
  return new InfResourceRepository(
    TestDbFactory.datasource,
    async () => infStatementRepo,
    async () => proInfoProjRelRepo,
  )
}

export async function createInfResource(item: Partial<InfResource>) {
  return createInfResourceRepo().create(await dealWithPkEntity(item, 'information'));
}
export async function updateInfResource(id: number, item: Partial<InfResource>) {
  return createInfResourceRepo().updateById(id, item);
}

export async function deleteInfResource(id: number) {
  return createInfResourceRepo().deleteById(id);
}
