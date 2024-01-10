/* eslint-disable @typescript-eslint/camelcase */
import {DatDigital} from '../../../models';
import {DatDigitalRepository} from '../../../repositories';
import {TestDbFactory} from '../TestDbFactory';
import {dealWithPkEntityAndPkText} from './_sequences.helper';


function createDatDigitalRepo() {
    return new DatDigitalRepository(TestDbFactory.datasource)
}

export async function createDatDigital(item: Partial<DatDigital>) {
    return createDatDigitalRepo().create(await dealWithPkEntityAndPkText(item, 'data'));
}

export async function updateDatDigital(id: number, item: Partial<DatDigital>) {
    return createDatDigitalRepo().updateById(id, item);
}

export async function deleteDatDigital(id: number) {
    return createDatDigitalRepo().deleteById(id);
}
