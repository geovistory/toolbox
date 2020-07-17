import {testdb} from '../../../datasources/testdb.datasource';
import {PubCredentialRepository} from '../../../repositories/pub-credential.repository';
import {PubAccountRepository} from '../../../repositories';
import {PubCredential} from '../../../models/pub-credential.model';

export async function createVerified(email: string, username: string) {
    let pubCredentialRepository: PubCredentialRepository;
    return new PubAccountRepository(testdb, async () => pubCredentialRepository)
        .create({username, email, emailVerified: true});
}

export async function create(email: string, username: string, verificationTolen: string) {
    let pubCredentialRepository: PubCredentialRepository;
    return new PubAccountRepository(testdb, async () => pubCredentialRepository)
        .create({username, email, emailVerified: false, verificationTolen});
}
