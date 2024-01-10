import {ProDfhProfileProjRel} from '../../../models';
import {ProDfhProfileProjRelRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createProDfhProfileProjRelRepo() {
  return new ProDfhProfileProjRelRepository(
    TestDbFactory.datasource,
  )
}

export async function createProDfhProfileProjRel(item: Partial<ProDfhProfileProjRel>) {
  return createProDfhProfileProjRelRepo().create(await dealWithPkEntity(item, 'projects'));
}

export async function updateProDfhProfileProjRel(id: number, item: Partial<ProDfhProfileProjRel>) {
  return createProDfhProfileProjRelRepo().updateById(id, item);
}



/**
 * Creates a ProDfhProfileProjRel between DfhApiProfile and ProProject
 * @param dfhProfiles array of dfh_pk_profile
 * @param fkProject the project
 */
export async function addProfilesToProject(fkProject: (number | undefined), dfhProfiles: (number | undefined)[]) {
  return Promise.all(dfhProfiles.map(fkEntity => addProfileToProject(fkEntity, fkProject)))
}

/**
* Creates a ProDfhProfileProjRel between DfhApiProfile and ProProject
* @param dfhProfile dfh_pk_profile
* @param fkProject the project
*/
export async function addProfileToProject(dfhProfile = -1, fkProject = -1) {
  const item: Partial<ProDfhProfileProjRel> = {
    fk_project: fkProject,
    fk_profile: dfhProfile,
    enabled: true
  }
  return createProDfhProfileProjRelRepo().create(item);
}
