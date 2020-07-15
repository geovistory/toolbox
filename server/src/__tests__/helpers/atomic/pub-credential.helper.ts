import { testdb } from '../../../datasources/testdb.datasource';
import { PubCredentialRepository } from '../../../repositories/pub-credential.repository';

export async function create(accountId: number, password: string) {
    return new PubCredentialRepository(testdb)
        .create({ accountId, password });
}
