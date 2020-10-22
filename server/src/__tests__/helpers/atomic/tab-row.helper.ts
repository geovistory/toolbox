/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/camelcase */
import {TabRow} from '../../../models';
import {TabRowRepository} from '../../../repositories/tab-row.repository';
import {testdb} from '../../helpers/testdb';
import {dealWithPkRow} from './_sequences.helper';


function createTabRowRepo() {
    return new TabRowRepository(testdb)
}

export async function createTabRow(item: Partial<TabRow>) {
    return createTabRowRepo().create(await dealWithPkRow(item));
}

export async function updateTabRow(id: number, item: Partial<TabRow>) {
    return createTabRowRepo().updateById(id, item);
}

export async function deleteTabRow(id: number) {
    return createTabRowRepo().deleteById(id);
}
