import {SysClassField} from '../../../models';
import {SysClassFieldRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createSysClassFieldRepo() {

  return new SysClassFieldRepository(TestDbFactory.datasource)
}

export async function createSysClassField(item: Partial<SysClassField>) {
  return createSysClassFieldRepo().create(await dealWithPkEntity(item, 'system'));
}

export async function updateSysClassField(id: number, item: Partial<SysClassField>) {
  return createSysClassFieldRepo().updateById(id, item);
}

export async function deleteSysClassField(id: number) {
  return createSysClassFieldRepo().deleteById(id);
}
