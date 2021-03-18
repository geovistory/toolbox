import { InfDimension } from '../../../models';
import { InfDimensionRepository } from '../../../repositories';
import { testdb } from "../testdb";
import { dealWithPkEntity } from './_sequences.helper';

function createInfDimensionRepo() {
    return new InfDimensionRepository(testdb)
}

export async function createInfDimension(item: Partial<InfDimension>) {
    return createInfDimensionRepo().create(await dealWithPkEntity(item, 'information'));
}
