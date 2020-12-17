import { addProfilesToProject } from '../atomic/pro-dfh-profile-proj-rel.helper';
import { linkAccountToProject } from '../atomic/pub-account_project_rel.helper';
import { createAccountVerified } from '../generic/account.helper';
import { createProject } from '../generic/project.helper';
import { createModel } from '../meta/model.helper';
import { createDefaultNamespace } from './namespace.helper';

export async function initDB() {
  const model = await createModel();

  const projectID = await createProject('Default project', 18889);
  await addProfilesToProject(projectID, model.profiles.map(p => p.dfh_pk_profile));
  const namespaceID = await createDefaultNamespace(projectID);

  return { projectID, namespaceID }
}

export async function initDBWithGaetan(): Promise<{ projectID: number, namespaceID: number, accountID: number }> {
  const model = await createModel();

  const projectID = await createProject('Default project', 18889);
  await addProfilesToProject(projectID, model.profiles.map(p => p.dfh_pk_profile));
  const namespaceID = await createDefaultNamespace(projectID);
  const accountID = await createAccountVerified('gaetan.muck@kleiolab.ch', 'test1234');
  await linkAccountToProject(accountID, projectID);

  return { projectID, namespaceID, accountID }
}
