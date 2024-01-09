import {PubRole} from '../../../models';
import {PubRoleRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithId} from './_sequences.helper';

function createPubRoleRepo() {
    return new PubRoleRepository(
        TestDbFactory.datasource,
    )
}

export async function createPubRole(item: Partial<PubRole>) {
    return createPubRoleRepo().create(await dealWithId(item, 'public.role_id_seq'))
}
