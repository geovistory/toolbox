import {testdb} from '../../helpers/testdb';
import {PubAccountRepository} from '../../../repositories';
import {PubCredentialRepository} from '../../../repositories/pub-credential.repository';

export async function createVerified(email: string, username: string) {
    let pubCredentialRepository: PubCredentialRepository;
    return new PubAccountRepository(testdb, async () => pubCredentialRepository)
        .create({username, email, emailVerified: true});
}

export async function create(email: string, username: string, verificationToken: string) {
    let pubCredentialRepository: PubCredentialRepository;
    return new PubAccountRepository(testdb, async () => pubCredentialRepository)
        .create({username, email, emailVerified: false, verificationToken});
}
