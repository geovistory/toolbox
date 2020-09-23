/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { DatDigital, DatColumn } from "../../../models";
import { TabRow } from './tab-row.helper';
import { testdb } from '../testdb';
import { findKey } from 'lodash';


export class TabCell {
    pk_entity: number;
    fk_digital: number;
    fk_column: number;
    fk_row: number;
    content: string | number;

    constructor(pk_entity: number, fk_digital: number, fk_column: number, fk_row: number, content: string | number) {
        this.pk_entity = pk_entity;
        this.fk_digital = fk_digital;
        this.fk_column = fk_column;
        this.fk_row = fk_row;
        this.content = content;
    }
}

export async function createCell(digital: DatDigital, columns: DatColumn, row: TabRow, content: number | string) {
    return new TabCell(
        (await testdb.execute('INSERT INTO tables.cell_' + digital.pk_entity + ' (fk_digital, fk_column, fk_row, string_value, numeric_value) VALUES (' + digital.pk_entity + ', ' + columns.pk_entity + ', ' + row.pk_entity + ', ' + (typeof content == 'string' ? content : '') + ', ' + (typeof content == 'number' ? content : ''))).pk_entity,
        digital.pk_entity as number,
        columns.pk_entity as number,
        row.pk_entity,
        content,
    )
}
