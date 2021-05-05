import { Postgres1DataSource } from '../../../datasources';
import { TabCell } from '../../../models';
import { SqlBuilderLb4Models } from '../../../utils/sql-builders/sql-builder-lb4-models';

export class QTablesCell extends SqlBuilderLb4Models {

    constructor(dataSource: Postgres1DataSource) {
        super(dataSource);
    }

    async getCellFromPkCell(pkCell: number): Promise<TabCell> {
        this.params = [];
        this.sql = `SELECT * FROM tables.cell WHERE pk_cell = ${this.addParam(pkCell)}`;
        this.getBuiltQuery();
        return (await this.execute<Array<TabCell>>())[0];
    }

    async getCellFromColRow(fkColumn: number, fkRow: number): Promise<TabCell> {
        this.params = [];
        this.sql = `SELECT * FROM tables.cell WHERE fk_column = ${this.addParam(fkColumn)} AND fk_row = ${this.addParam(fkRow)};`
        this.getBuiltQuery();
        return (await this.execute<Array<TabCell>>())[0];
    }

    async updateCell(cell: Partial<TabCell>): Promise<TabCell> {
        let whereClause = "WHERE ";
        if (cell.pk_cell) whereClause += `pk_cell = ${cell.pk_cell};`
        else whereClause += `fk_column = ${cell.fk_column} AND fk_row = ${cell.fk_row};`

        const stringValue = `string_value = ${cell.string_value ? "'" + cell.string_value + "'" : "NULL"}`;
        const numericValue = `numeric_value = ${cell.numeric_value ? cell.numeric_value : "NULL"}`;

        this.params = [];
        this.sql = `UPDATE tables.cell_${cell.fk_digital} SET ${stringValue}, ${numericValue} ${whereClause};`
        this.getBuiltQuery();
        return (await this.execute<Array<TabCell>>())[0];
    }

    async createCell(cell: Partial<TabCell>): Promise<TabCell> {
        this.params = [];
        const stringValue = cell.string_value ? "'" + cell.string_value + "'" : "NULL";
        const numericValue = cell.numeric_value ? cell.numeric_value : "NULL";
        this.sql = `INSERT INTO tables.cell_${cell.fk_digital}
                    (fk_column, fk_row, fk_digital, string_value, numeric_value)
                    VALUES (${cell.fk_column}, ${cell.fk_row}, ${cell.fk_digital}, ${stringValue}, ${numericValue})`
        this.getBuiltQuery();
        return (await this.execute<Array<TabCell>>())[0];
    }

    async deleteCell(pkDigital: number, pkCell: number) {
        this.params = [];
        this.sql = `
            DELETE FROM tables.cell_` + pkDigital + `
            WHERE pk_cell = ${pkCell}
        `;
        this.getBuiltQuery();
        await this.execute();
        return pkCell;
    }

    async getAllCellsInRow(pkDigital: number, pkRow: number): Promise<Array<TabCell>> {
        this.params = [];
        this.sql = `SELECT * FROM tables.cell_` + pkDigital + `  WHERE fk_row = ${this.addParam(pkRow)}`;
        this.getBuiltQuery();
        return this.execute<Array<TabCell>>();
    }
}
