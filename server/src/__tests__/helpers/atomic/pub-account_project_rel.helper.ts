/* eslint-disable @typescript-eslint/camelcase */
import {ProProject, PubAccount} from '../../../models';
import {PubAccountProjectRelRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';

export async function linkAccountProject(account: Partial<PubAccount>, project: Partial<ProProject>) {
  return new PubAccountProjectRelRepository(TestDbFactory.datasource)
    .create({account_id: account.id, fk_project: project.pk_entity});
}

export async function linkAccountToProject(accountId: number, projectId: number) {
  await new PubAccountProjectRelRepository(TestDbFactory.datasource)
    .create({account_id: accountId, fk_project: projectId});
}
