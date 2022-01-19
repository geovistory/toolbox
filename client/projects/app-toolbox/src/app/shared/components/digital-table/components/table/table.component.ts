import { AfterViewChecked, Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetTablePageOptions, SysConfigValue, SysConfigValueObjectType, TabCell, TableService, TColFilter } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { values } from 'ramda';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { NumberDialogComponent, NumberDialogData, NumberDialogReturn } from '../../../number-dialog/number-dialog.component';
import { ColMappingComponent } from './col-mapping/col-mapping.component';

export interface TableSort {
  // pkColumn of column to sort by. In case the col has no pk (yet), use colNb.
  pkColumn: number,
  // column index, from left to right, staring with 0,
  colNb: number; // if === -1, sorting is not by col but by index of the roe
  direction: GetTablePageOptions.SortDirectionEnum
}
export enum TableMode {
  edit = 'edit',
  view = 'view',
  ids = 'ids'
}

export interface ColumnMapping {
  fkClass: number,
  className: Observable<string>,
  icon: Observable<'teEn' | 'peIt'>,
  pkEntity?: number,
  pkColumn?: number
}

export interface Header {
  colLabel: string,
  comment: string,
  type: 'number' | 'string',
  pk_column?: number
  mapping?: ColumnMapping,
}

export enum ValueObjectTypeName {
  appellation = 'appellation',
  place = 'place',
  dimension = 'dimension',
  timePrimitive = 'time_primitive',
  langString = 'lang_string',
  language = 'language'
}

export interface Cell {
  text: string;
  pkCell?: number;
  pkRow?: number;
  pkColumn?: number;
}

export interface Row { // used to make the new temp row
  position: number,
  cells: Array<Cell>
}

export interface TableColFilter {
  pkColumn: number;
  colNb: number;
  filter: TColFilter;
}

@Component({
  selector: 'gv-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy, AfterViewChecked {
  destroy$ = new Subject<boolean>();

  // mandatory inputs
  @Input() pkProject: number;
  @Input() pkDigital: number;
  @Input() loading = false;
  @Input() headers$: Observable<Header[]>;
  @Input() table$: Observable<Array<Array<Cell>>>;

  // optionnal inputs
  @Input() filteringEnabled = false;
  @Input() sortingEnabled = false;
  @Input() lineBreak = false;
  @Input() sortBy$: Observable<TableSort>;
  @Input() origin = 'classic';
  @Input() mode: TableMode = TableMode.view;
  @Input() newRow: Row;

  // outputs
  @Output() sortDemanded = new EventEmitter<TableSort>();
  @Output() filterDemanded = new EventEmitter<Array<TableColFilter>>();
  @Output() cellClicked = new EventEmitter<{ pkColumn: number, pkRow: number }>();
  @Output() changeColumn = new EventEmitter<{ pkColumn: number, direction: 'right' | 'left' }>();
  @Output() createRowDemanded = new EventEmitter<{ position: number }>();
  @Output() moveRowDemanded = new EventEmitter<{ pkRow: number, position: number }>();
  @Output() deleteRowDemanded = new EventEmitter<{ pkRow: number }>();
  @Output() validateNewRowDemanded = new EventEmitter<Row>();
  @Output() cancelNewRowDemanded = new EventEmitter<void>();

  // config
  config: SysConfigValue;

  // private parameters
  isThereMappings$: Observable<boolean>;
  headers: Header[];
  table: Array<Array<Cell>>;
  curSort: TableSort;
  filters: { [key: number]: TableColFilter };
  rowCreationLoading = false;

  // mapping options
  valuesObjectTypes: Array<{ pkClass: number, label: string }> = [];
  classes: Array<{ pkClass: number, label: string }> = [];

  // to manage scrolling...
  scrollTop = 0;
  scrollLeft = 0;
  subs = null;
  target: any;
  scrolling = false;

  // edit variables
  precCellValue = '';

  @ViewChildren('cells') cells: QueryList<Input>;

  constructor(
    public p: ActiveProjectService,
    private dialog: MatDialog,
    private tableAPI: TableService,
  ) { }

  ngOnInit() {
    this.headers = [];
    this.table = [];
    this.curSort = { pkColumn: -1, colNb: -1, direction: 'ASC' };
    this.filters = [];

    // listen to input headers (from parent)
    this.headers$.pipe(takeUntil(this.destroy$)).subscribe(headers => {
      this.headers = headers;
    })

    this.isThereMappings$ = this.headers$.pipe(
      map((headers) => headers.some(h => h.mapping))
    );

    // listen to input table (from parent)
    this.table$.pipe(takeUntil(this.destroy$)).subscribe(table => {
      this.table = table;
    });

    // listen to sortBy option (from parent or from html)
    if (this.sortBy$) this.sortBy$.pipe(takeUntil(this.destroy$)).subscribe(sort => this.curSort = sort);

    // fetch the config
    this.p.sys$.config$.main$.subscribe(config => this.config = config)
  }


  ngAfterViewChecked(): void {
    if (!this.target) {
      const pTableContainer = document.getElementById('scrollAccess') as HTMLElement;
      if (!pTableContainer) return;
      this.target = pTableContainer.getElementsByClassName('p-datatable-scrollable-body')[0];

      let timeout;
      this.target.addEventListener('scroll', () => {
        this.scrolling = true;
        window.clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.scrollTop = this.target.scrollTop;
          this.scrollLeft = this.target.scrollLeft;
          this.scrolling = false;
        }, 66);
      });
    } else if (!this.scrolling) {
      this.target.scrollTop = this.scrollTop;
      this.target.scrollLeft = this.scrollLeft;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

    if (this.subs) this.subs.unsubscribe();
  }

  sort(colNb: number) {
    if (!this.sortingEnabled) return;

    const pkCol = this.getPkColumnByColNb(colNb);
    if (pkCol == this.curSort.pkColumn) this.curSort.direction = this.curSort.direction == 'ASC' ? 'DESC' : 'ASC'
    else this.curSort = { pkColumn: pkCol, colNb, direction: 'ASC' }

    this.sortDemanded.emit(this.curSort);
  }

  private getPkColumnByColNb(colNb: number) {
    return colNb != 0 ? this.headers[colNb].pk_column : -1;
  }

  filter(colNb: number, filter?: TColFilter) {
    if (!this.filteringEnabled) {
      this.filterDemanded.emit([]);
      return;
    }
    const pkColumn = this.getPkColumnByColNb(colNb);

    // if columns have pkColumn, use pkColumn to identify filter, else colNb
    const key = pkColumn > -2 ? pkColumn : colNb;

    if (filter) {
      this.filters[key] = { pkColumn, colNb, filter };
    } else {
      delete this.filters[key];
    }


    this.filterDemanded.emit(values(this.filters));
  }

  cellClick(pkRow: number, pkColumn: number) {
    this.cellClicked.emit({ pkColumn, pkRow });
  }

  openMappingDialog(colLabel: string, pkColumn: number, mapping: ColumnMapping) {

    const indexOfCol = this.headers.map(h => h.pk_column).indexOf(pkColumn) - 1;
    const pkCells: Array<number> = this.table
      .map(row => { if (typeof row[indexOfCol] !== 'string') return (row[indexOfCol] as any).pkCell });

    this.dialog.open<ColMappingComponent, { colLabel: string, pkColumn: number, mapping: ColumnMapping, pkCells: Array<number> }>
      (ColMappingComponent, {
        height: 'calc(100% - 100px)',
        width: '40%',
        data: { colLabel, pkColumn, mapping, pkCells }
      });
  }

  isClassValueObjectType(fkClass: number): boolean {
    return !!this.getVOT(fkClass);
  }

  getVOT(fkClass: number): SysConfigValueObjectType | undefined {
    if (Object.keys(this.config.classes).some(k => k === fkClass + '')) return this.config.classes[fkClass].valueObjectType
    return undefined;
  }

  // to keep in cache the precedent value of the cell (in case parsing goes wrong)
  focusCell(precValue: string) {
    this.precCellValue = precValue + '';
  }

  cellBlur(pkCell: number, pkRow: number, pkColumn: number, i: number, j: number, newContent: string) {

    const header = this.headers.find(h => h.pk_column == pkColumn);
    let content = header.type == 'number' ? parseFloat(newContent) : newContent.trim();
    if (header.type == 'number' && isNaN(content as number)) content = this.precCellValue;
    const cell: TabCell = {
      fk_digital: this.pkDigital,
      fk_row: pkRow,
      fk_column: pkColumn
    }
    if (pkCell) cell.pk_cell = pkCell; // only if it exists, else it send pkCell = null to the server
    if (header.type == 'number') cell.numeric_value = content as number;
    else cell.string_value = content + '';

    this.table[i][j].text = content + '';
    if (this.precCellValue !== content + '') {
      this.tableAPI.tableControllerInsertOrUpdateCells(this.pkProject, this.pkDigital, { cells: [cell] })
        .subscribe(nv => {
          this.table[i][j].text = header.type == 'number' ? nv.cells[0].numeric_value + '' : nv.cells[0].string_value
          this.table[i][j].pkCell = nv.cells[0].pk_cell;
        });
    }
  }

  createRow(cell: Cell, place: 'above' | 'below') {
    this.rowCreationLoading = false
    const position = place == 'above' ? parseInt(cell.text, 10) : parseInt(cell.text, 10) + 1;
    this.createRowDemanded.emit({ position })
  }

  moveToIndex(cell: Cell) {
    this.dialog.open<NumberDialogComponent,
      NumberDialogData, NumberDialogReturn>(NumberDialogComponent, {
        data: { title: 'Where do you want to put the actual row ' + cell.text + '?' }
      })
      .afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
        if (result == undefined) return;
        this.moveRowDemanded.emit({ pkRow: cell.pkRow, position: result });
      })
  }

  deleteRow(cell: Cell) {
    this.deleteRowDemanded.emit({ pkRow: cell.pkRow });
  }

  getTypeOfColumn(index: number) {
    return this.headers[index].type == 'number' ? 'number' : 'text';
  }

  doesColumnHasMapping(pkColumn): boolean {
    return !!this.headers.find(h => h.pk_column == pkColumn).mapping
  }

  getUIcolumnNumber(): number {
    return this.table.length + this.headers.filter(h => !!h.mapping).length
  }

  validateCreateNewRow(newRow) {
    this.rowCreationLoading = true
    this.validateNewRowDemanded.emit(newRow)
  }

}

