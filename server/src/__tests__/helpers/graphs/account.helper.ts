import { genSalt, hash } from 'bcrypt';
import { ProProject, PubAccount } from '../../../models';
import { PubCredentialRepository } from '../../../repositories/pub-credential.repository';
import * as AtmAccount from '../atomic/pub-account.helper';
import { createPubAccount } from '../atomic/pub-account.helper';
import * as AtmAccProjRel from '../atomic/pub-account_project_rel.helper';
import * as AtmCredential from '../atomic/pub-credential.helper';
import { PubAccountMock } from '../data/gvDB/PubAccountMock';
import { PubCredentialMock } from '../data/gvDB/PubCredentialMock';
import { testdb } from "../testdb";

export async function createAccountVerified(email: string, username: string, password: string) {
    const account = await AtmAccount.createVerified(email, username);
    await AtmCredential.create(account, password);
    return account;
}

export async function createAccount(email: string, username: string, password: string, token: string) {
    const account = await AtmAccount.create(email, username, token);
    await AtmCredential.create(account, password);
    return account;
}

export async function addAccountToProject(account: PubAccount, project: ProProject) {
    await AtmAccProjRel.linkAccountProject(account, project);
}

export async function createGaetanMuck() {
    await createPubAccount(PubAccountMock.GAETAN_VERIFIED);
    const hashed = await hash(PubCredentialMock.GAETAN_PASSWORD.password, await genSalt());
    return new PubCredentialRepository(testdb)
        .create({ accountId: PubAccountMock.GAETAN_VERIFIED.id, password: hashed });
}

export async function createJonasSchneider() {
    await createPubAccount(PubAccountMock.JONAS);
    const hashed = await hash(PubCredentialMock.JONAS_PASSWORD.password, await genSalt());
    return new PubCredentialRepository(testdb)
        .create({ accountId: PubAccountMock.JONAS.id, password: hashed });
}

