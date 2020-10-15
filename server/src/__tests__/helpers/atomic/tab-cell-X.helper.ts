/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import {DatDigital, TabRow} from "../../../models";
import {testdb} from '../testdb';
import {TabCell} from '../../../models/tab-cell.model';


export async function createCellTable(digital: DatDigital) {
    await testdb.execute("SELECT tables.create_cell_table_for_digital(" + digital.pk_entity + ");");
}

export async function createTabCell(cell: Partial<TabCell>, row: TabRow) {
    if (cell.pk_cell) {
        await testdb.execute(`SELECT setval('tables.cell_pk_cell_seq', ${parseInt(cell.pk_cell) - 1}, true);`);
    }
    const sql = `
    INSERT INTO tables.cell_${cell.fk_digital} (
        fk_digital,
        fk_column,
        fk_row,
        string_value,
        numeric_value
    )
    VALUES (
        $1,
        $2,
        $3,
        $4,
        $5
    );`
    await testdb.execute(sql, [
        cell.fk_digital,
        cell.fk_column,
        cell.fk_row,
        cell.string_value ?? null,
        cell.numeric_value ?? null
    ])
}
