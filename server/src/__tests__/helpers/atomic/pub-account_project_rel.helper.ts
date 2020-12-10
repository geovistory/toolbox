/* eslint-disable @typescript-eslint/camelcase */
import { testdb } from "../testdb";
import { ProProject, PubAccount } from '../../../models';
import { PubAccountProjectRelRepository } from '../../../repositories';

export async function linkAccountProject(account: Partial<PubAccount>, project: Partial<ProProject>) {
  return new PubAccountProjectRelRepository(testdb)
    .create({ account_id: account.id, fk_project: project.pk_entity });
}

export async function linkAccountToProject(accountId: number, projectId: number) {
  await new PubAccountProjectRelRepository(testdb)
    .create({ account_id: accountId, fk_project: projectId });
}