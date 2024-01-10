import {ProEntityLabelConfig} from '../../../models';
import {ProEntityLabelConfigRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';
function createProEntityLabelConfigRepo() {
  return new ProEntityLabelConfigRepository(
    TestDbFactory.datasource
  )
}

export async function createProEntityLabelConfig(item: Partial<ProEntityLabelConfig>) {
  return createProEntityLabelConfigRepo().create(await dealWithPkEntity(item, 'projects'));
}


export async function updateProEntityLabelConfig(id: number, item: Partial<ProEntityLabelConfig>) {
  return createProEntityLabelConfigRepo().updateById(id, item);
}


export async function deleteProEntityLabelConfig(pkEntity: number) {
  return new ProEntityLabelConfigRepository(TestDbFactory.datasource).deleteById(pkEntity);
}
