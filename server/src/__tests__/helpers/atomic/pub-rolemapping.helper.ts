import {PubRoleMapping} from '../../../models';
import {PubRoleMappingRepository, PubRoleRepository} from '../../../repositories';
import {testdb} from "../testdb";
import {dealWithId} from './_sequences.helper';

function createPubRoleMappingRepo() {
    let pubRoleRepository: PubRoleRepository
    return new PubRoleMappingRepository(
        testdb,
        async () => pubRoleRepository
    )
}


export async function createPubRoleMapping(item: Partial<PubRoleMapping>) {
    return createPubRoleMappingRepo().create(await dealWithId(item, 'public.rolemapping_id_seq'))
}
