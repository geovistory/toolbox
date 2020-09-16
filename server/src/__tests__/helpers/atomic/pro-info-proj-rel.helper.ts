import { testdb } from "../testdb";
import {ProInfoProjRel} from '../../../models';
import {ProInfoProjRelRepository} from '../../../repositories';
import {PubAccountMock} from '../data/gvDB/PubAccountMock';
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
/**
 * Creates a ProInfoProjRel between entity and project with is_in_project = true
 * @param fkEntity the entity to relate to project (teEn, peIt, statement)
 * @param fkProject the project
 */
export async function addEntityToProject(fkEntity = -1, fkProject = -1) {
  const item: Partial<ProInfoProjRel> = {
    fk_project: fkProject,
    fk_entity: fkEntity,
    fk_last_modifier: PubAccountMock.GAETAN_VERIFIED.id,
    is_in_project: true
  }
  return createProInfoProjRelRepo().create(item);
}
/**
 * Creates a ProInfoProjRels between entityies and project with is_in_project = true
 * @param fkEntities the entities to relate to project (teEn, peIt, statement)
 * @param fkProject the project
 */
export async function addEntitiesToProject(fkProject: (number | undefined), fkEntities: (number | undefined)[]) {
  return Promise.all(fkEntities.map(fkEntity => addEntityToProject(fkEntity, fkProject)))
}


export async function removeEntityFromProject(fkProject = -1, fkEntity = -1) {
  const existing = await createProInfoProjRelRepo().find({
    where: {
      and: [
        {fk_project: {eq: fkProject}},
        {fk_entity: {eq: fkEntity}},
      ]
    }
  })
  if (existing?.length && existing[0].pk_entity) {
    return updateProInfoProjRel(existing[0].pk_entity ?? -1, {is_in_project: false})
  }
}
