/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/camelcase */
import { DatClassColumnMappingRepository } from '../../../repositories';
import { testdb } from '../testdb';
import { DatClassColumnMapping } from '../../../models';
import { dealWithPkEntity } from './_sequences.helper';

function createDatClassColumnMappingRepo() {
    return new DatClassColumnMappingRepository(testdb)
}

export async function createDatClassColumnMapping(item: Partial<DatClassColumnMapping>) {
    return createDatClassColumnMappingRepo().create(await dealWithPkEntity(item, 'data'));
}

export async function updateDatClassColumnMapping(id: number, item: Partial<DatClassColumnMapping>) {
    return createDatClassColumnMappingRepo().updateById(id, item);
}

export async function deleteDatClassColumnMapping(id: number) {
    return createDatClassColumnMappingRepo().deleteById(id);
}
