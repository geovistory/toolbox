/* eslint-disable @typescript-eslint/camelcase */
import {DatTextProperty} from '../../../models';
import {DatTextPropertyRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntity} from './_sequences.helper';

function createDatTextPropertyRepo() {
    return new DatTextPropertyRepository(TestDbFactory.datasource)
}

export async function createDatTextProperty(item: Partial<DatTextProperty>) {
    return createDatTextPropertyRepo().create(await dealWithPkEntity(item, 'data'));
}

export async function updateDatTextProperty(id: number, item: Partial<DatTextProperty>) {
    return createDatTextPropertyRepo().updateById(id, item);
}

export async function deleteDatTextProperty(id: number) {
    return createDatTextPropertyRepo().deleteById(id);
}
