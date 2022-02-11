import {addProfilesToProject} from '../atomic/pro-dfh-profile-proj-rel.helper';
import {linkAccountToProject} from '../atomic/pub-account_project_rel.helper';
import {PROFILE_12_BIOGRAPHICAL_BA_2022_02_09} from '../data/ontome-profiles/profile-12-biographical-ba-2022-02-09';
import {PROFILE_4_GEOVISTORY_GENE_2022_02_09} from '../data/ontome-profiles/profile-4-geovistory-gene-2022-02-09';
import {PROFILE_5_GEOVISTORY_BASI_2022_01_18} from '../data/ontome-profiles/profile-5-geovistory-basi-2022-01-18';
import {createAccountVerified} from '../generic/account.helper';
import {createOntomeProfileMock} from '../generic/ontomeprofile.helper';
import {createProject} from '../generic/project.helper';
import {createLanguages, createModel, createTypes} from '../meta/model.helper';
import {createDefaultNamespace} from './namespace.helper';

export async function initDB() {
  const model = await createModel();

  const projectID = await createProject('Default project', 18889);
  await addProfilesToProject(projectID, model.profiles.map(p => p.dfh_pk_profile));
  const namespaceID = await createDefaultNamespace(projectID);

  return {projectID, namespaceID}
}

export async function initDBWithGaetan(): Promise<{projectID: number, namespaceID: number, accountID: number}> {
  // const model = await createModel();

  await createTypes();
  const languages = await createLanguages();
  const profiles = await createOntomeProfileMock(PROFILE_4_GEOVISTORY_GENE_2022_02_09)
  const profiles2 = await createOntomeProfileMock(PROFILE_5_GEOVISTORY_BASI_2022_01_18)
  const profiles3 = await createOntomeProfileMock(PROFILE_12_BIOGRAPHICAL_BA_2022_02_09)

  const projectID = await createProject('Default project', 18889);
  await addProfilesToProject(projectID, [profiles.profile.dfh_pk_profile, profiles2.profile.dfh_pk_profile, profiles3.profile.dfh_pk_profile]);
  const namespaceID = await createDefaultNamespace(projectID);
  const accountID = await createAccountVerified('gaetan.muck@kleiolab.ch', 'test1234');
  await linkAccountToProject(accountID, projectID);

  return {projectID, namespaceID, accountID}
}
