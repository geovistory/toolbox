import {testdb} from '../../../datasources/testdb.datasource';
import {PubAccountProjectRelRepository} from '../../../repositories';
import {PubAccount, ProProject} from '../../../models';

export async function linkAccountProject(account: PubAccount, project: ProProject) {
  return new PubAccountProjectRelRepository(testdb)
    .create({account_id: account.id, fk_project: project.pk_entity});
}
