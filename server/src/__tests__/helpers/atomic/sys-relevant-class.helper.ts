import {SysSystemRelevantClass} from '../../../models/sys-system-relevant-class.model';
import {SysSystemRelevantClassRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

// export async function createType(name: string, id: number, definition: string): Promise<void> {
//   await TestDbFactory.datasource.execute("SELECT setval('system.entity_pk_entity_seq', " + (id - 1) + ", true);");
//   await new SysSystemRelevantClassRepository(TestDbFactory.datasource).create({definition: definition});
// }

function createSysSystemRelevantClassRepo() {

  return new SysSystemRelevantClassRepository(
    TestDbFactory.datasource
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
