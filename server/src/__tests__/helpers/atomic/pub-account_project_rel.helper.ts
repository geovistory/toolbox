import { testdb } from "../testdb";
import {ProProject, PubAccount} from '../../../models';
import {PubAccountProjectRelRepository} from '../../../repositories';

export async function linkAccountProject(account: PubAccount, project: ProProject) {
  return new PubAccountProjectRelRepository(testdb)
    .create({account_id: account.id, fk_project: project.pk_entity});
}
