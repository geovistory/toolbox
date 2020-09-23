/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import {DatDigital} from "../../../models";
import {testdb} from '../testdb';


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


export async function createCellTable(digital: DatDigital) {
    await testdb.execute("SELECT tables.create_cell_table_for_digital(" + digital.pk_entity + ");");
}

export async function createTabCell(cell: Partial<TabCell>) {
    await testdb.execute('INSERT INTO tables.cell_' + cell.fk_digital + ' (fk_digital, fk_column, fk_row, string_value, numeric_value) VALUES (' + cell.fk_digital + ', ' + cell.fk_column + ', ' + cell.fk_row + ', ' + (typeof cell.content == 'string' ? cell.content : '') + ', ' + (typeof cell.content == 'number' ? cell.content : ''))
}
