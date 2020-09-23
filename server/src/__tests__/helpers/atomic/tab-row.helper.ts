/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/camelcase */
import { DatDigital } from '../../../models';
import { testdb } from '../../helpers/testdb';


export class TabRow {
    pk_entity: number;
    fk_digital: number;

    constructor(fk_digital: number, pk_entity: number) {
        this.pk_entity = pk_entity
        this.fk_digital = fk_digital;
    }
}

export async function createRow(digital: DatDigital): Promise<TabRow> {
    return new TabRow(digital.pk_entity as number,
        (await testdb.execute('INSERT INTO tables.row (fk_digital) VALUES (' + digital.pk_entity + ');')).pk_entity
    )
}