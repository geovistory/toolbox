import {InfTimePrimitive} from '../../../models';
import {InfTimePrimitiveRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';


function createInfTimePrimitiveRepo() {
  return new InfTimePrimitiveRepository(TestDbFactory.datasource)
}

export async function createInfTimePrimitive(item: Partial<InfTimePrimitive>) {
  return createInfTimePrimitiveRepo().create(await dealWithPkEntity(item, 'information'));
}
