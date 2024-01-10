import {InfDimension} from '../../../models';
import {InfDimensionRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createInfDimensionRepo() {
  return new InfDimensionRepository(
    TestDbFactory.datasource,
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
