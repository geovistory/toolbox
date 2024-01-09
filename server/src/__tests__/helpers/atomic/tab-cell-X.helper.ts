/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import {DatDigital, TabRow} from "../../../models";
import {TabCell} from '../../../models/tab-cell.model';
import {TestDbFactory} from '../TestDbFactory';


export async function createCellTable_old(digital: Partial<DatDigital>) {
    await TestDbFactory.datasource.execute("SELECT tables.create_cell_table_for_digital(" + digital.pk_entity + ");");
}

export async function createCellTable(digital: number) {
    await TestDbFactory.datasource.execute("SELECT tables.create_cell_table_for_digital(" + digital + ");");
}


export async function createTabCell(cell: Partial<TabCell>, row?: TabRow) {
    if (cell.pk_cell) {
        await TestDbFactory.datasource.execute(`SELECT setval('tables.cell_pk_cell_seq', ${cell.pk_cell - 1}, true);`);
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
    await TestDbFactory.datasource.execute(sql, [
        cell.fk_digital,
        cell.fk_column,
        cell.fk_row,
        cell.string_value ?? null,
        cell.numeric_value ?? null
    ])
}
