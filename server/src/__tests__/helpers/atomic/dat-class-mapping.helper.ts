/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/camelcase */
import {DatClassColumnMapping} from '../../../models';
import {DatClassColumnMappingRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createDatClassColumnMappingRepo() {
    return new DatClassColumnMappingRepository(TestDbFactory.datasource)
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
