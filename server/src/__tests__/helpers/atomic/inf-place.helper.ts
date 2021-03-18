import { InfPlace } from '../../../models';
import { InfPlaceRepository } from '../../../repositories';
import { testdb } from "../testdb";
import { dealWithPkEntity } from './_sequences.helper';

function createInfPlaceRepo() {
    return new InfPlaceRepository(testdb)
}

export async function createInfPlace(item: Partial<InfPlace>) {
    return createInfPlaceRepo().create(await dealWithPkEntity(item, 'information'));
}
