import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DatColumn } from "app/core/sdk";
import { ActiveProjectService } from 'app/core/active-project';
import { ConfigurationPipesService } from 'app/core/redux-queries/services/configuration-pipes.service';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { TColFilter } from '../../../../../../../../server/src/lb3/server/table/interfaces';

export interface ColumnMapping {
  fkClass: number,
  className: string,
  icon: 'teEn' | 'peIt',
}

export interface Header {
  colLabel: string,
  comment: string,
  type: 'number' | 'string',
  mapping?: ColumnMapping,
  pk_column?: number
}

@Component({
  selector: 'gv-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
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

  // outputs
  @Output() sortDemanded = new EventEmitter<{ colNb: number, direction: string }>();
  @Output() filterDemanded = new EventEmitter<Array<{ col: number, filter: TColFilter }>>();
  @Output() cellClicked = new EventEmitter<{ col: number, row: number }>();

  // private parameters
  isThereMappings$: Observable<boolean>;
  headers: { colLabel: string, comment: string, type: 'number' | 'string', mapping?: ColumnMapping }[];
  table: Array<Array<string | { text: string, pkCell: number }>>;
  curSort: { colNb: number, direction: string };
  filters: Array<{ col: number, value: string }>;

  constructor(
    public p: ActiveProjectService
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
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
}
