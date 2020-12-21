import {testdb} from "../testdb";
import {SysSystemTypeRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';
import {SysSystemType} from '../../../models/sys-system-type.model';

// export async function createType(name: string, id: number, definition: string): Promise<void> {
//   await testdb.execute("SELECT setval('system.entity_pk_entity_seq', " + (id - 1) + ", true);");
//   await new SysSystemTypeRepository(testdb).create({definition: definition});
// }

function createSysSystemTypeRepo() {

  return new SysSystemTypeRepository(
    testdb
  )
}

export async function createSysSystemType(item: Partial<SysSystemType>) {
  return createSysSystemTypeRepo().create(await dealWithPkEntity(item, 'system'));
}

export async function updateSysSystemType(id: number, item: Partial<SysSystemType>) {
  return createSysSystemTypeRepo().updateById(id, item);
}

export async function deleteSysSystemType(id: number) {
  return createSysSystemTypeRepo().deleteById(id);
}
