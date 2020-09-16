import { testdb } from "../testdb";
import {ProEntityLabelConfig} from '../../../models';
import {ProEntityLabelConfigRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';
function createProEntityLabelConfigRepo() {
  return new ProEntityLabelConfigRepository(
    testdb
  )
}

export async function createProEntityLabelConfig(item: Partial<ProEntityLabelConfig>) {
  return createProEntityLabelConfigRepo().create(await dealWithPkEntity(item, 'projects'));
}


export async function updateProEntityLabelConfig(id: number, item: Partial<ProEntityLabelConfig>) {
  return createProEntityLabelConfigRepo().updateById(id, item);
}


export async function deleteProEntityLabelConfig(pkEntity: number) {
  return new ProEntityLabelConfigRepository(testdb).deleteById(pkEntity);
}
