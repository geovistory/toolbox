/// <reference lib="webworker" />

import * as XLSX from "xlsx";
import { sort } from 'ramda';
import { TColFilter } from '../../../../../../server/lb3app/src/server/table/interfaces';

addEventListener('message', ({ data }) => {
    if (data.task == 'csvIntoTable') postMessage(csvIntoTable(data.params.binaries, data.params.separator));
    if (data.task == 'parseWorkbook') postMessage(parseWorkbook(data.params.binaries));
    if (data.task == 'workbookIntoTable') postMessage(workbookIntoTable(data.params.wb, data.params.sheetName));
    if (data.task == 'sortTable') postMessage(sortTable(data.params.table, data.params.colNb, data.params.type, data.params.direction));
    if (data.task == 'filterTable') postMessage(filterTable(data.params.table, data.params.filters));
});

function csvIntoTable(binaries: string, separator: string): string[][] {
    if (separator == 'TAB') separator = String.fromCharCode(9);
    return removeEmptyCol(removeEmptyRow(binaries.replace(/\r/g, '').split("\n").map(row => row.split(separator))));
}

function parseWorkbook(binaries: string): XLSX.WorkBook {
    return XLSX.read(binaries, { type: 'binary' });
}

function workbookIntoTable(wb: XLSX.WorkBook, sheetName: string): string[][] {
    const table: string[][] = [];
    const sheet: XLSX.WorkSheet = wb.Sheets[sheetName];

    if (!sheet["!ref"]) return table;

    const range: XLSX.Range = XLSX.utils.decode_range(sheet["!ref"]);

    //because first cell is not necessarily [0 ; 0]]
    const rowNb = range.e.r - range.s.r;
    const colNb = range.e.c - range.s.c;

    //the parsing
    for (let i = 0; i <= rowNb; i++) {
        table[i] = new Array(colNb);
    }
    for (let i = range.s.r; i <= range.e.r; ++i) {
        for (let j = range.s.c; j <= range.e.c; ++j) {
            const cellref: string = XLSX.utils.encode_cell({ c: j, r: i });
            //empty cells has to be empty string in our case
            if (!sheet[cellref]) table[i - range.s.r][j - range.s.c] = "";
            else table[i - range.s.r][j - range.s.c] = sheet[cellref].v + '';
        }
    }

    return removeEmptyCol(removeEmptyRow(table));
}

function sortTable(table: string[][], col: number, type: string, direction: string) {
    let way1 = direction == 'ASC' ? -1 : 1;
    let way2 = direction == 'ASC' ? 1 : -1;

    return sort((a, b) => {
        if (!a[col]) return way1;
        if (!b[col]) return way2;
        if (a[col] < b[col]) return way2;
        if (a[col] > b[col]) return way1;
        return 0;
    }, table);
}

function filterTable(table: string[][], filters: { col: number, filter: TColFilter }[]) {
    let result = table;
    for (let i = table.length - 1; i >= 0; i--) {
        for (let j = 0; j < filters.length; j++) {
            if (!filterKeep(table[i][filters[j].col], filters[j].filter)) {
                table.splice(i, 1);
                j = filters.length;
            }
        }
    }
    return result;
}


///////////////////////////////////////////////////////////////////////////////
function removeEmptyCol(table: string[][]): string[][] {
    //remove empty cols: iterate by column and not by rows like just above.
    //could be done in the same iteration, but it will much complicate the code
    //since it does not take long to process, better for maintenance
    for (let j = table[0].length - 1; j >= 0; j--) {
        let colEmpty = true;
        for (let i = 0; i < table.length; i++) {
            let content = table[i][j];
            if (content) {
                colEmpty = false;
                i = table.length;
            }
        }
        if (colEmpty) {
            for (let i = 0; i < table.length; i++) {
                table[i].splice(j, 1);
            }
        }
    }
    return table;
}

function removeEmptyRow(table: string[][]): string[][] {
    //remove empty row: iterate by column and not by rows like just above.
    //could be done in the same iteration, but it will much complicate the code
    //since it does not take long to process, better for maintenance
    for (let i = table.length - 1; i >= 0; i--) {
        let rowEmpty = true;
        for (let j = 0; j < table[i].length; j++) {
            let content = table[i][j];
            if (content) {
                rowEmpty = false;
                j = table[i].length;
            }
        }
        if (rowEmpty) table.splice(i, 1);
    }
    return table;
}

function filterKeep(content: string, filter: TColFilter): boolean {
    if (filter.numeric) {
        if (filter.numeric.operator == '=') return parseFloat(content) == filter.numeric.value;
        if (filter.numeric.operator == '>') return parseFloat(content) >= filter.numeric.value;
        if (filter.numeric.operator == '<') return parseFloat(content) <= filter.numeric.value;
    }
    if (filter.text) {
        if (filter.text.operator == '%iLike%') return content.indexOf(filter.text.value) != -1;
    }
}