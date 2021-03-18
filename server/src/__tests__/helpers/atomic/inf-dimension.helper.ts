import {InfDimension} from '../../../models';
import {testdb} from "../testdb";
import {dealWithPkEntity} from './_sequences.helper';
import {InfDimensionRepository} from '../../../repositories';

function createInfDimensionRepo() {
  return new InfDimensionRepository(
    testdb,
  )
}

export async function createInfDimension(item: Partial<InfDimension>) {
  return createInfDimensionRepo().create(await dealWithPkEntity(item, 'information'));
}

export async function updateInfDimension(id: number, item: Partial<InfDimension>) {
  return createInfDimensionRepo().updateById(id, item);
}

export async function deleteInfDimension(id: number) {
  return createInfDimensionRepo().deleteById(id);
}
