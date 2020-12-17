/* eslint-disable @typescript-eslint/camelcase */
import * as accounts from '../atomic/pub-account.helper';
import * as credentials from '../atomic/pub-credential.helper';
import * as accProjRel from '../atomic/pub-account_project_rel.helper';

export async function createAccountVerified(email: string, password: string): Promise<number> {
    const account = await accounts.createVerified(email, email);
    await credentials.create(account, password);
    return account.id;
}

export async function createAccountNotVerified(email: string, password: string, verificationToken: string): Promise<number> {
    const account = await accounts.create(email, email, verificationToken);
    await credentials.create(account, password);
    return account.id;
}

export async function addAccountToProject(account: number, project: number) {
    await accProjRel.linkAccountProject({ id: account }, { pk_entity: project });
}
