import { testdb } from "../testdb";
import {ProDfhClassProjRel} from '../../../models';
import {ProDfhClassProjRelRepository} from '../../../repositories';
import {dealWithPkEntity} from './_sequences.helper';

function createProDfhClassProjRelRepo() {
  return new ProDfhClassProjRelRepository(
    testdb,
  )
}

export async function createProDfhClassProjRel(item: Partial<ProDfhClassProjRel>) {
  return createProDfhClassProjRelRepo().create(await dealWithPkEntity(item, 'projects'));
}

export async function updateProDfhClassProjRel(id: number, item: Partial<ProDfhClassProjRel>) {
  return createProDfhClassProjRelRepo().updateById(id, item);
}
