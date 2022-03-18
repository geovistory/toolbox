import {ProDfhClassProjRel} from '../../../models';
import {ProDfhClassProjRelRepository} from '../../../repositories';
import {testdb} from "../testdb";
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

export async function addProDfhClassToProject(pkClass = -1, fkProject = -1) {
  const item: Partial<ProDfhClassProjRel> = {
    fk_project: fkProject,
    fk_class: pkClass,
    enabled_in_entities: true
  }
  return createProDfhClassProjRel(item);
}
