import {genSalt, hash} from 'bcryptjs';
import {PubAccount} from '../../../models';
import {PubCredentialRepository} from '../../../repositories/pub-credential.repository';
import {TestDbFactory} from '../TestDbFactory';

export async function create(account: PubAccount, password: string) {
    const hashed = await hash(password, await genSalt());
    return new PubCredentialRepository(TestDbFactory.datasource)
        .create({accountId: account.id, password: hashed});
}
