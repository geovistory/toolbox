import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SysConfig } from 'app/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TColFilter } from '../../../../../../../../src/server/table/interfaces';

@Component({
  selector: 'gv-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  @Input() loading = false;
  @Input() headers$: Observable<{ colLabel: string, comment: string, type: 'number' | 'string' }[]>;
  @Input() table$: Observable<string[][]>;
  @Input() filteringEnabled = false; //optional
  @Input() sortingEnabled = false; //optional
  @Input() lineBreak = false; //optional
  @Input() sortBy$: Observable<{ colNb: number, direction: string }>; //optional

  @Output() sortDemanded = new EventEmitter<{ colNb: number, direction: string }>();
  @Output() filterDemanded = new EventEmitter<Array<{ col: number, filter: TColFilter }>>();
  @Output() cellClicked = new EventEmitter<{ col: number, row: number }>();

  headers: { colLabel: string, comment: string, type: 'number' | 'string' }[];
  table: string[][];
  curSort: { colNb: number, direction: string };
  filters: Array<{ col: number, value: string }>;
  constructor() { }

  ngOnInit() {
    this.headers = [];
    this.table = [];
    this.curSort = { colNb: -1, direction: '' };
    this.filters = [];

    //listen to input headers (from parent)
    this.headers$.pipe(takeUntil(this.destroy$))
      .subscribe(headers => this.headers = headers);

    //listen to input table (from parent)
    this.table$.pipe(takeUntil(this.destroy$))
      .subscribe(table => this.table = table);

    //listen to sortBy option (from parent or from html)
    if (this.sortBy$) this.sortBy$.pipe(takeUntil(this.destroy$))
      .subscribe(sort => this.curSort = sort);
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
    this.cellClicked.emit({ col: col, row: row });
  }
}
