import {testdb} from '../../../datasources/testdb.datasource';
import {ProInfoProjRel} from '../../../models';
import {ProInfoProjRelRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';

function createProInfoProjRelRepo() {
  return new ProInfoProjRelRepository(
    testdb,
  )
}

export async function createProInfoProjRel(item: Partial<ProInfoProjRel>) {
  return createProInfoProjRelRepo().create(await dealWithPkEntity(item, 'projects'));
}

export async function updateProInfoProjRel(id: number, item: Partial<ProInfoProjRel>) {
  return createProInfoProjRelRepo().updateById(id, item);
}
