/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/camelcase */
import {TabRow} from '../../../models';
import {TabRowRepository} from '../../../repositories/tab-row.repository';
import {testdb} from '../../helpers/testdb';


function createTabRowRepo() {
    return new TabRowRepository(testdb)
}

export async function createTabRow(item: Partial<TabRow>) {
    //can not deals with the pk_entity because in schema tables, there is a sequence for cell and an other for column, this would imply another parameter. I assume it is easier to spit an error from pg in case the parameter item does not contain a valid private key
    return createTabRowRepo().create(item);
}

export async function updateTabRow(id: number, item: Partial<TabRow>) {
    return createTabRowRepo().updateById(id, item);
}

export async function deleteTabRow(id: number) {
    return createTabRowRepo().deleteById(id);
}
