/* eslint-disable @typescript-eslint/camelcase */
import {DatColumn} from '../../../models';
import {DatColumnRepository, DatNamespaceRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createDatColumnRepo() {
    let datNamespaceRepository: DatNamespaceRepository;
    return new DatColumnRepository(TestDbFactory.datasource, async () => datNamespaceRepository)
}

export async function createDatColumn(item: Partial<DatColumn>) {
    return createDatColumnRepo().create(await dealWithPkEntity(item, 'data'));
}

export async function updateDatColumn(id: number, item: Partial<DatColumn>) {
    return createDatColumnRepo().updateById(id, item);
}

export async function deleteDatColumn(id: number) {
    return createDatColumnRepo().deleteById(id);
}
