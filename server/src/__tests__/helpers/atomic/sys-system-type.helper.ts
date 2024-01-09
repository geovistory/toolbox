import {SysSystemType} from '../../../models/sys-system-type.model';
import {SysSystemTypeRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

// export async function createType(name: string, id: number, definition: string): Promise<void> {
//   await TestDbFactory.datasource.execute("SELECT setval('system.entity_pk_entity_seq', " + (id - 1) + ", true);");
//   await new SysSystemTypeRepository(TestDbFactory.datasource).create({definition: definition});
// }

function createSysSystemTypeRepo() {

  return new SysSystemTypeRepository(
    TestDbFactory.datasource
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
