import {InfPlace} from '../../../models';
import {InfPlaceRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createInfPlaceRepo() {

  return new InfPlaceRepository(
    TestDbFactory.datasource,

  )
}

export async function createInfPlace(item: Partial<InfPlace>) {
  return createInfPlaceRepo().create(await dealWithPkEntity(item, 'information'));
}

export async function updateInfPlace(id: number, item: Partial<InfPlace>) {
  return createInfPlaceRepo().updateById(id, item);
}

export async function deleteInfPlace(id: number) {
  return createInfPlaceRepo().deleteById(id);
}
