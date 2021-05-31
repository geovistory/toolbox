import { Postgres1DataSource } from "../../../datasources";
import { TabRow } from "../../../models";
import { SqlBuilderLb4Models } from "../../../utils/sql-builders/sql-builder-lb4-models";

export class TabRowExtended extends TabRow {
    index: number;
}



export class QTablesRow extends SqlBuilderLb4Models {

    // these parameters assure us a repositionning every 57 "bad repositionning" (typically inverting 2 rows this number of time, or inserting a row at a the same place)
    // here is the function that gives us the number:
    /*
    function test(multiplier, step) {
        let current = multiplier;
        let nb = 0;
        while(current >= step) {
            nb ++
            current /= 2;
        }
        console.log('nb:', nb)
    }
    */
    repositionThreshold = 0.0000001;
    multiplier = 10000000000;



    constructor(dataSource: Postgres1DataSource) {
        super(dataSource);
    }

    async getRow(fkDigital: number, pkRow: number): Promise<TabRowExtended> {
        this.sql = `
            SELECT row_number() OVER (ORDER BY position ASC) as index, * FROM tables.row_` + fkDigital + `
        `
        this.getBuiltQuery();
        return (await this.execute<Array<TabRowExtended>>()).find(row => parseInt(row.pk_row + '') === parseInt(pkRow + '')) as TabRowExtended
    }

    async getRowAtIndex(fkDigital: number, index: number): Promise<TabRowExtended> {
        this.sql = `
            SELECT row_number() OVER (ORDER BY position ASC) as index, * FROM tables.row_` + fkDigital + `
            ORDER BY position
            OFFSET ${Math.max(index - 1, 0)} LIMIT 1;
        `
        this.getBuiltQuery();
        return (await this.execute<Array<TabRowExtended>>())[0];
    }

    async createNewRow(fkDigital: number, index: number): Promise<TabRowExtended> {
        const { range, position } = await this.getRangeAndPosFromIndex(fkDigital, index);
        this.sql = `
            INSERT INTO tables.row_` + fkDigital + `
            (fk_digital, position)
            VALUES(${fkDigital}, ${position})
            RETURNING pk_row;
        `;
        this.getBuiltQuery();
        const pkRow = (await this.execute<Array<TabRow>>())[0].pk_row;
        this.rowNb = -1;

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        if (range < this.repositionThreshold) this.repositioning(fkDigital); //async
        return this.getRow(fkDigital, pkRow)
    }

    async updateRow(fkDigital: number, row: TabRow): Promise<TabRowExtended> {
        this.sql = `
            UPDATE tables.row_` + fkDigital + `
            SET position = ${row.position}
            WHERE pk_row = ${row.pk_row}
        `;
        this.getBuiltQuery();
        await this.execute<void>();
        return this.getRow(fkDigital, row.pk_row) as Promise<TabRowExtended>;
    }

    async moveRow(fkDigital: number, pkRow: number, index: number): Promise<TabRowExtended> {
        const currentPosition = (await this.getRow(fkDigital, pkRow)).index;
        if(currentPosition < index) index++;
        const { range, position } = await this.getRangeAndPosFromIndex(fkDigital, index);

        const row = await this.getRow(fkDigital, pkRow);
        row.position = position;
        const newRow = await this.updateRow(fkDigital, row);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        if (range < this.repositionThreshold) this.repositioning(fkDigital); //async
        return newRow;
    }

    async deleteRow(fkDigital: number, pkRow: number): Promise<number> {
        this.sql = `
            DELETE FROM tables.row_` + fkDigital + `
            WHERE pk_row = ${pkRow}
        `;
        this.getBuiltQuery();
        await this.execute();
        this.rowNb = -1;
        return pkRow;
    }

    async repositioning(fkDigital: number): Promise<void> {
        //fetch rows
        this.sql = `
            SELECT row_number() OVER (ORDER BY position ASC) as index, * FROM tables.row_` + fkDigital + `
            ORDER BY position;
        `
        this.getBuiltQuery();
        const rowsWithIndex = await this.execute<Array<TabRowExtended>>();

        //update position
        for (const row of rowsWithIndex) {
            row.position = row.index * this.multiplier;
            await this.updateRow(fkDigital, row);
        }
    }

    rowNb = -1;
    async getRowNumber(fkDigital: number): Promise<number> {
        if (this.rowNb === -1) {
            this.sql = `SELECT COUNT(*) FROM tables.row_` + fkDigital + `;`
            this.getBuiltQuery();
            this.rowNb = parseInt((await this.execute<Array<{ count: number }>>())[0].count + '', 10)
        }
        return this.rowNb;
    }

    //giving an index, return the position that WOULD HAVE this NEW index (inserting/moving at this index)
    async getRangeAndPosFromIndex(fkDigital: number, index: number): Promise<{ range: number, position: number }> {
        await this.getRowNumber(fkDigital);

        index = Math.max(Math.round(index), 0);
        const precIndex = Math.min(index - 1, this.rowNb); // should be positive and below last row
        const prec = precIndex > 0 ? parseFloat((await this.getRowAtIndex(fkDigital, precIndex))?.position + '') : undefined;
        const suiv = index >= 0 && index <= this.rowNb ? parseFloat((await this.getRowAtIndex(fkDigital, index))?.position + '') : undefined;

        let position: number;
        let range: number;

        if (!prec && suiv) { // if no prec and a suiv: put at begining
            position = suiv / 2;
            range = this.multiplier;
        } else if (prec && !suiv) { // if no suiv and a prec: put at end
            const lastRow = await this.getRowAtIndex(fkDigital, await this.getRowNumber(fkDigital));
            position = parseFloat(lastRow.position + '') + this.multiplier;
            range = this.multiplier;
        } else if (prec && suiv) { // if suiv and prec: put inbetween
            range = suiv - prec;
            position = prec + range / 2;
        } else { // if table empty: put at pos 1
            range = this.multiplier
            position = this.multiplier
        }

        return { range, position };
    }


}
