/* eslint-disable @typescript-eslint/camelcase */
import {testdb} from '../../../datasources/testdb.datasource';
import {ProClassFieldConfig} from '../../../models';
import {ProClassFieldConfigRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';

function createProClassFieldConfigRepo() {
  return new ProClassFieldConfigRepository(
    testdb
  )
}

export async function createProClassFieldConfig(item: Partial<ProClassFieldConfig>) {
  return createProClassFieldConfigRepo().create(await dealWithPkEntity(item, 'projects'));
}

export async function updateProClassFieldConfig(id: number, item: Partial<ProClassFieldConfig>) {
  return createProClassFieldConfigRepo().updateById(id, item);
}
