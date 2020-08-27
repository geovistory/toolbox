import {testdb} from '../../../datasources/testdb.datasource';
import {InfTimePrimitive} from '../../../models';
import {InfTimePrimitiveRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';


function createInfTimePrimitiveRepo() {
  return new InfTimePrimitiveRepository(testdb)
}

export async function createInfTimePrimitive(item: Partial<InfTimePrimitive>) {
  return createInfTimePrimitiveRepo().create(await dealWithPkEntity(item, 'information'));
}
