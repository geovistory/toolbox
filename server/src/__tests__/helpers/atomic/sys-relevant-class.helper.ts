import {testdb} from "../testdb";
import {SysSystemRelevantClassRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';
import {SysSystemRelevantClass} from '../../../models/sys-system-relevant-class.model';

// export async function createType(name: string, id: number, definition: string): Promise<void> {
//   await testdb.execute("SELECT setval('system.entity_pk_entity_seq', " + (id - 1) + ", true);");
//   await new SysSystemRelevantClassRepository(testdb).create({definition: definition});
// }

function createSysSystemRelevantClassRepo() {

  return new SysSystemRelevantClassRepository(
    testdb
  )
}

export async function createSysSystemRelevantClass(item: Partial<SysSystemRelevantClass>) {
  return createSysSystemRelevantClassRepo().create(await dealWithPkEntity(item, 'system'));
}

export async function updateSysSystemRelevantClass(id: number, item: Partial<SysSystemRelevantClass>) {
  return createSysSystemRelevantClassRepo().updateById(id, item);
}

export async function deleteSysSystemRelevantClass(id: number) {
  return createSysSystemRelevantClassRepo().deleteById(id);
}
