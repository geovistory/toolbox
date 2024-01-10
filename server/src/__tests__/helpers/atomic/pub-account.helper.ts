import {PubAccount} from '../../../models';
import {PubAccountRepository} from '../../../repositories';
import {PubCredentialRepository} from '../../../repositories/pub-credential.repository';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithId} from './_sequences.helper';

function createPubAccountRepo() {
    let pubCredentialRepository: PubCredentialRepository;
    return new PubAccountRepository(
        TestDbFactory.datasource,
        async () => pubCredentialRepository
    )
}

export async function createVerified(email: string, username: string) {
    return createPubAccountRepo().create({username, email, emailVerified: true});
}

export async function create(email: string, username: string, verificationToken: string) {
    return createPubAccountRepo().create({username, email, emailVerified: false, verificationToken});
}

export async function createPubAccount(item: Partial<PubAccount>) {
    return createPubAccountRepo().create(await dealWithId(item, 'public.account_id_seq'))
}
