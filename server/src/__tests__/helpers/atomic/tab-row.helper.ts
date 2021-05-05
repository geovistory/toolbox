/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/camelcase */
import { TabRow } from '../../../models';
import { TabRowRepository } from '../../../repositories/tab-row.repository';
import { testdb } from '../../helpers/testdb';


function createTabRowRepo() {
    return new TabRowRepository(testdb)
}


export async function updateTabRow(id: number, item: Partial<TabRow>) {
    return createTabRowRepo().updateById(id, item);
}

export async function deleteTabRow(id: number) {
    return createTabRowRepo().deleteById(id);
}

export async function createRowTable(digital: number) {
    await testdb.execute("SELECT tables.create_row_table_for_digital(" + digital + ");");
}

export async function createTabRow(row: Partial<TabRow>): Promise<TabRow> {
    if (row.pk_row) {
        await testdb.execute(`SELECT setval('tables.row_pk_row_seq', ${row.pk_row - 1}, true);`);
    }
    const sql = `
    INSERT INTO tables.row_` + row.fk_digital + ` (
        fk_digital,
        position
    )
    VALUES (
        $1,
        $2
    );`
    return await testdb.execute(sql, [
        row.fk_digital,
        row.position ?? row.pk_row
    ]) as TabRow
}
