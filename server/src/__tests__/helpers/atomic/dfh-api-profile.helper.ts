import {DfhApiProfile} from '../../../models';
import {DfhApiProfileRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createDfhApiProfileRepo() {

  return new DfhApiProfileRepository(
    TestDbFactory.datasource,
  )
}

export async function createDfhApiProfile(item: Partial<DfhApiProfile>) {
  return createDfhApiProfileRepo().create(await dealWithPkEntity(item, 'data_for_history'));
}

export async function updateDfhApiProfile(id: number, item: Partial<DfhApiProfile>) {
  return createDfhApiProfileRepo().updateById(id, item);
}

export async function deleteDfhApiProfile(id: number) {
  return createDfhApiProfileRepo().deleteById(id);
}
