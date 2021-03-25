import { AfterViewChecked, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SysConfigValue, SysConfigValueObjectType } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TColFilter } from '../../../../../../../../../../server/src/lb3/server/table/interfaces';
import { ColMappingComponent } from './col-mapping/col-mapping.component';

export interface ColumnMapping {
  fkClass: number,
  className: string,
  icon: 'teEn' | 'peIt',
  pkEntity?: number,
  pkColumn?: number
}

export interface Header {
  colLabel: string,
  comment: string,
  type: 'number' | 'string',
  mapping?: ColumnMapping,
  pk_column?: number
}

export enum ValueObjectTypeName {
  appellation = 'appellation',
  place = 'place',
  dimension = 'dimension',
  timePrimitive = 'time_primitive',
  langString = 'lang_string'
}

@Component({
  selector: 'gv-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy, AfterViewChecked {
  destroy$ = new Subject<boolean>();

  // mandatory inputs
  @Input() loading = false;
  @Input() headers$: Observable<Header[]>;
  @Input() table$: Observable<Array<Array<string | { text: string, pkCell: number }>>>;

  // optionnal inputs
  @Input() filteringEnabled = false;
  @Input() sortingEnabled = false;
  @Input() lineBreak = false;
  @Input() sortBy$: Observable<{ colNb: number, direction: string }>;
  @Input() origin: 'classic';
  @Input() changingColumns = false;

  // outputs
  @Output() sortDemanded = new EventEmitter<{ colNb: number, direction: string }>();
  @Output() filterDemanded = new EventEmitter<Array<{ col: number, filter: TColFilter }>>();
  @Output() cellClicked = new EventEmitter<{ col: number, row: number }>();
  @Output() changeColumn = new EventEmitter<{ col: number, direction: 'right' | 'left' }>();

  // config
  config: SysConfigValue;

  // private parameters
  isThereMappings$: Observable<boolean>;
  headers: Header[];
  table: Array<Array<string | { text: string, pkCell: number }>>;
  curSort: { colNb: number, direction: string };
  filters: Array<{ col: number, value: string }>;

  // mapping options
  valuesObjectTypes: Array<{ pkClass: number, label: string }> = [];
  classes: Array<{ pkClass: number, label: string }> = [];

  // to manage scrolling...
  scrollTop = 0;
  scrollLeft = 0;
  subs = null;
  target: any;
  scrolling = false;

  constructor(
    public p: ActiveProjectService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.headers = [];
    this.table = [];
    this.curSort = { colNb: -1, direction: '' };
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
      this.target = pTableContainer.getElementsByClassName('ui-table-scrollable-body')[0];

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

  sort(col: number) {
    if (!this.sortingEnabled) return;

    if (col == this.curSort.colNb) this.curSort.direction = this.curSort.direction == 'ASC' ? 'DESC' : 'ASC'
    else this.curSort = { colNb: col, direction: 'ASC' }

    this.sortDemanded.emit(this.curSort);
  }

  filter(col: number, event: any) {
    if (!this.filteringEnabled) return;

    if (event) {
      if (event.numeric) event.numeric.value = parseFloat(event.numeric.value);
      this.filters[col + ''] = { col: col, filter: event };
    } else this.filters.splice(col, 1);

    this.filterDemanded.emit(Object.keys(this.filters).map(f => this.filters[f]));
  }

  cellClick(row: number, col: number) {
    this.cellClicked.emit({ col, row });
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

  changeColumnClick(col: number, direction: 'right' | 'left') {
    this.changeColumn.emit({ col, direction })
  }

  isClassValueObjectType(fkClass: number): boolean {
    return !!this.getVOT(fkClass);
  }


  getVOT(fkClass: number): SysConfigValueObjectType | undefined {
    if (Object.keys(this.config.classes).some(k => k === fkClass + '')) return this.config.classes[fkClass].valueObjectType
    return undefined;
  }

}
