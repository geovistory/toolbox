import {testdb} from '../../../datasources/testdb.datasource';
import {PubCredentialRepository} from '../../../repositories/pub-credential.repository';
import {hash, genSalt} from 'bcrypt';

export async function create(accountId: number, password: string) {
    let hashed = await hash(password, await genSalt());

    return new PubCredentialRepository(testdb)
        .create({accountId, password: hashed});
}
