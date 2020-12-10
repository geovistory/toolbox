/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/camelcase */
import { genSalt, hash } from 'bcrypt';
import { PubCredentialRepository } from '../../../repositories/pub-credential.repository';
import { createPubAccount } from '../atomic/pub-account.helper';
import { PubAccountMock } from '../data/gvDB/PubAccountMock';
import { PubCredentialMock } from '../data/gvDB/PubCredentialMock';
import { testdb } from "../testdb";

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
