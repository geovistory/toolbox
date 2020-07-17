import * as AtmAccount from '../atomic/pub-account.helper';
import * as AtmCredential from '../atomic/pub-credential.helper';
import * as AtmAccProjRel from '../atomic/pub-account_project_rel.helper';
import {PubAccount, ProProject} from '../../../models';

export async function createAccountVerified(email: string, username: string, password: string) {
    const account = await AtmAccount.createVerified(email, username);
    await AtmCredential.create(account.id, password);
    return account;
}

export async function createAccount(email: string, username: string, password: string, token: string) {
    const account = await AtmAccount.create(email, username, token);
    await AtmCredential.create(account.id, password);
    return account;
}

export async function addAccountToProject(account: PubAccount, project: ProProject) {
    await AtmAccProjRel.linkAccountProject(account, project);
}
