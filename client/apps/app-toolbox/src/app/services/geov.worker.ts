/// <reference lib="webworker" />

import { TColFilter } from '@kleiolab/lib-sdk-lb4';
import * as d3 from 'd3-dsv';
import { sort } from 'ramda';
import * as XLSX from 'xlsx';
import { ImporterColFilter } from '../components/table-editor/importer/importer.component';

addEventListener('message', ({ data }) => {
  if (data.task == 'csvIntoTable') postMessage(csvIntoTable(data.params.binaries, data.params.separator));
  if (data.task == 'parseWorkbook') postMessage(parseWorkbook(data.params.binaries));
  if (data.task == 'workbookIntoTable') postMessage(workbookIntoTable(data.params.wb, data.params.sheetName));
  if (data.task == 'sortTable') postMessage(sortTable(data.params.table, data.params.colNb, data.params.direction));
  if (data.task == 'filterTable') postMessage(filterTable(data.params.table, data.params.filters));
});

/**
 * Parse a raw binary string into a 2 dimensions array of strings
 *
 * @param binaries binaries of the file to transform into a CSV
 * @param separator separator used in the file
 * @returns the 2 dimensions array of strings correcponding to the binaries
 */
function csvIntoTable(binaries: string, separator: string): string[][] {
  if (separator == 'TAB') separator = String.fromCharCode(9);
  return removeEmptyCol(removeEmptyRow(d3.dsvFormat(separator).parseRows(binaries)));
}


/**
 * Parse a raw binary string into a XLSX.Workbook (external lib) in order to exploit the workbook
 *
 * @param binaries binaries of the file to transform into a workbook
 * @returns the workbook corresponding to the binaries
 */
function parseWorkbook(binaries: string): XLSX.WorkBook {
  return XLSX.read(binaries, { type: 'binary' });
}

/**
 * Transform a XLSX.Workbook object into a 2 dimensions array of strings
 *
 * @param wb the Workbook to transform
 * @param sheetName Which sheet we need to transform.
 * @returns the 2 dimensions array of strings correcponding to the workbook
 */
function workbookIntoTable(wb: XLSX.WorkBook, sheetName: string): string[][] {
  const table: string[][] = [];
  const sheet: XLSX.WorkSheet = wb.Sheets[sheetName];

  if (!sheet['!ref']) return table;

  const range: XLSX.Range = XLSX.utils.decode_range(sheet['!ref']);

  // because first cell is not necessarily [0 ; 0]]
  const rowNb = range.e.r - range.s.r;
  const colNb = range.e.c - range.s.c;

  // the parsing
  for (let i = 0; i <= rowNb; i++) {
    table[i] = new Array(colNb);
  }
  for (let i = range.s.r; i <= range.e.r; ++i) {
    for (let j = range.s.c; j <= range.e.c; ++j) {
      const cellref: string = XLSX.utils.encode_cell({ c: j, r: i });
      // empty cells has to be empty string in our case
      if (!sheet[cellref]) table[i - range.s.r][j - range.s.c] = '';
      else table[i - range.s.r][j - range.s.c] = sheet[cellref].w;
    }
  }

  return removeEmptyCol(removeEmptyRow(table));
}

/**
 * Sort a 2 dimensions array of string on a column
 *
 * @param table The table to sort
 * @param col The master column to sort on
 * @param direction Ascending or descending
 * @returns The sorted table
 */
function sortTable(table: string[][], col: number, direction: string): string[][] {
  const way1 = direction == 'ASC' ? -1 : 1;
  const way2 = direction == 'ASC' ? 1 : -1;

  return sort((a, b) => {
    if (!a[col]) return way1;
    if (!b[col]) return way2;
    if (a[col] < b[col]) return way2;
    if (a[col] > b[col]) return way1;
    return 0;
  }, table);
}

/**
 * Giving a filter, filters a 2 dimensions array of string
 *
 * @param table The table to filter
 * @param filters To what column and how should the table be filtered
 * @returns The filtered table
 */
function filterTable(table: string[][], filters: ImporterColFilter[]): string[][] {
  const result = table;
  for (let i = table.length - 1; i >= 0; i--) {
    for (let j = 0; j < filters.length; j++) {
      if (!filterKeep(table[i][filters[j].colNb], filters[j].filter)) {
        table.splice(i, 1);
        j = filters.length;
      }
    }
  }
  return result;
}


///////////////////////////////////////////////////////////////////////////////

/**
 * Remove all the empty columns from a 2 dimensions array of strings
 *
 * @param table The table to remove the empty columns from
 * @returns the clean table
 */
function removeEmptyCol(table: string[][]): string[][] {
  // remove empty cols: iterate by column and not by rows like just above.
  // could be done in the same iteration, but it will much complicate the code
  // since it does not take long to process, better for maintenance
  for (let j = table[0].length - 1; j >= 0; j--) {
    let colEmpty = true;
    for (let i = 0; i < table.length; i++) {
      const content = table[i][j];
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

/**
 * Remove all the empty rows from a 2 dimensions array of strings
 *
 * @param table The table to remove the empty rows from
 * @returns the clean table
 */
function removeEmptyRow(table: string[][]): string[][] {
  // remove empty row: iterate by column and not by rows like just above.
  // could be done in the same iteration, but it will much complicate the code
  // since it does not take long to process, better for maintenance
  for (let i = table.length - 1; i >= 0; i--) {
    let rowEmpty = true;
    for (let j = 0; j < table[i].length; j++) {
      const content = table[i][j];
      if (content) {
        rowEmpty = false;
        j = table[i].length;
      }
    }
    if (rowEmpty) table.splice(i, 1);
  }
  return table;
}

/**
 * According to the content, should we keep the content or not?
 *
 * @param content The content to apply the filter to
 * @param filter The Filter
 * @returns the response to 'Should we keep this content?'
 */
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
