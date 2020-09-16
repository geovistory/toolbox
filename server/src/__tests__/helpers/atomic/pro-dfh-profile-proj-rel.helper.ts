import { testdb } from "../testdb";
import {ProDfhProfileProjRel} from '../../../models';
import {ProDfhProfileProjRelRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';

function createProDfhProfileProjRelRepo() {
  return new ProDfhProfileProjRelRepository(
    testdb,
  )
}

export async function createProDfhProfileProjRel(item: Partial<ProDfhProfileProjRel>) {
  return createProDfhProfileProjRelRepo().create(await dealWithPkEntity(item, 'projects'));
}

export async function updateProDfhProfileProjRel(id: number, item: Partial<ProDfhProfileProjRel>) {
  return createProDfhProfileProjRelRepo().updateById(id, item);
}
