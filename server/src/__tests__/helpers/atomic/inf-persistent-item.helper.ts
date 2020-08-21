import {testdb} from '../../../datasources/testdb.datasource';
import {InfPersistentItem} from '../../../models';
import {DfhClassRepository, InfPersistentItemRepository, InfStatementRepository, InfTextPropertyRepository, ProInfoProjRelRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';

function createInfPersistentItemRepo() {
  let infStatementRepo: InfStatementRepository;
  let infTextPropertyRepo: InfTextPropertyRepository;
  let dfhClassRepository: DfhClassRepository;
  let proInfoProjRelRepo: ProInfoProjRelRepository;
  return new InfPersistentItemRepository(
    testdb,
    async () => infStatementRepo,
    async () => infTextPropertyRepo,
    async () => dfhClassRepository,
    async () => proInfoProjRelRepo,
  )
}

export async function createInfPersistentItem(item: Partial<InfPersistentItem>) {
  return createInfPersistentItemRepo().create(await dealWithPkEntity(item, 'information'));
}

export async function updateInfPersistentItem(id: number, item: Partial<InfPersistentItem>) {
  return createInfPersistentItemRepo().updateById(id, item);
}

export async function deleteInfPersistentItem(id: number) {
  return createInfPersistentItemRepo().deleteById(id);
}
