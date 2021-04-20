import {PubRole} from '../../../models';
import {PubRoleRepository} from '../../../repositories';
import {testdb} from "../testdb";
import {dealWithId} from './_sequences.helper';

function createPubRoleRepo() {
    return new PubRoleRepository(
        testdb,
    )
}

export async function createPubRole(item: Partial<PubRole>) {
    return createPubRoleRepo().create(await dealWithId(item, 'public.role_id_seq'))
  }
