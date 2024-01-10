import {ProClassFieldConfig} from '../../../models';
import {ProClassFieldConfigRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createProClassFieldConfigRepo() {
  return new ProClassFieldConfigRepository(
    TestDbFactory.datasource
  )
}

export async function createProClassFieldConfig(item: Partial<ProClassFieldConfig>) {
  return createProClassFieldConfigRepo().create(await dealWithPkEntity(item, 'projects'));
}

export async function updateProClassFieldConfig(id: number, item: Partial<ProClassFieldConfig>) {
  return createProClassFieldConfigRepo().updateById(id, item);
}
