/* eslint-disable @typescript-eslint/camelcase */
import {DatDigital} from '../../../models';
import {DatChunkRepository, DatDigitalRepository, DatNamespaceRepository, InfStatementRepository} from '../../../repositories';
import {testdb} from '../testdb';
import {dealWithPkEntity} from './_sequences.helper';
function createDatChunkRepo() {
    let infStatementRepo: InfStatementRepository;
    let datDigitalRepo: DatDigitalRepository;
    let datNamespaceRepo: DatNamespaceRepository;
    return new DatChunkRepository(
        testdb,
        async () => infStatementRepo,
        async () => datDigitalRepo,
        async () => datNamespaceRepo,
    )
}
export async function createDatChunk(item: Partial<DatDigital>) {
    return createDatChunkRepo().create(await dealWithPkEntity(item, 'data'));
}

export async function updateDatChunk(id: number, item: Partial<DatDigital>) {
    return createDatChunkRepo().updateById(id, item);
}

export async function deleteDatChunk(id: number) {
    return createDatChunkRepo().deleteById(id);
}
