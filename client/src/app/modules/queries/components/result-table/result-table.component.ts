import { Component, Input, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectService, ProQueryApi } from 'app/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { first, takeUntil, map } from 'rxjs/operators';
import { QueryFilter } from '../../containers/query-detail/FilterTree';
import { ColDef } from '../col-def-editor/ColDef';
import { ResultingEntitiesDialogComponent } from '../resulting-entities-dialog/resulting-entities-dialog.component';
import { Table } from 'primeng/table';

export interface Example {
  id: number;
  name: string;
}

export interface ResultTableDefinition {
  queryFilter: QueryFilter;
  colDefs: ColDef[];
}


@Component({
  selector: 'gv-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject();
  @Input() definition$: Observable<ResultTableDefinition>;
  @ViewChild('table', { static: false }) table: Table;

  displayedColumns$: Observable<string[]>;
  items: any[];
  pending: boolean;
  limit = 50;
  lazyLoadState: {
    first: number,    // First row offset
    rows: number // Number of rows per page
  }
  pkProject: number;
  get totalRecords(): number {
    if (!this.items || !this.items.length) return 0;
    else return parseInt(this.items[0].full_count, 10)
  }

  constructor(
    public dialog: MatDialog,
    public p: ActiveProjectService,
    private queryApi: ProQueryApi
  ) {

  }
  ngOnInit() {
    this.displayedColumns$ = this.definition$.pipe(
      map(def => def.colDefs.map(colDef => colDef.label))
    );

  }

  ngAfterViewInit() {
    let count = 0;
    this.definition$.pipe(takeUntil(this.destroy$)).subscribe(definition => {
      if (count > 0) {
        this.table.reset();
        const body = this.table.containerViewChild.nativeElement.getElementsByClassName('ui-table-scrollable-body')[0];
        body.scrollTop = 0;
      }
      count++;
    })
  }

  loadDataOnScroll(event: {
    first: number,    // First row offset
    rows: number // Number of rows per page
  }) {
    this.lazyLoadState = event;

    combineLatest([this.p.pkProject$, this.definition$]).pipe(first(), takeUntil(this.destroy$))
      .subscribe(([pkProject, definition]) => {
        this.load(definition, event.first, event.rows, pkProject);
      })

  }
  private load(definition, offset: number, rows: number, pkProject: number) {
    this.pending = true;
    const q = {
      filter: definition.queryFilter,
      columns: definition.colDefs,
      offset: offset || 0,
      limit: rows
    };
    this.queryApi.run(pkProject, q).pipe(first())
      .subscribe(result => {
        this.items = result;
        this.pending = false;
      });
  }



  // onInit() {
  //   this.set([]);

  //   let dataRefreshs = 0;
  //   this.data$.pipe(
  //     tap(() => dataRefreshs++),
  //     takeUntil(this.$destroy)
  //   ).subscribe(data => {

  //     this.dataSource.allData = data;

  //     if (data.length === 0) {
  //       this.viewport.scrollTo({ top: 0, left: 0 })
  //     }
  //   })


  //   this.headerTop$ = this.viewport.renderedRangeStream.pipe(
  //     map(() => -this.viewport.getOffsetToRenderedContentStart())
  //   );

  //   // fake infinite scroll

  //   this.viewport.renderedRangeStream.subscribe(({ start, end }) => {
  //     this.rangeChange.emit({ start, end })
  //   });
  // }

  // afterViewInit() {
  //   this.sticky = true;
  //   this.ref.detectChanges()
  // }

  openDialog(entityPreviews): void {
    const dialogRef = this.dialog.open(ResultingEntitiesDialogComponent, {
      width: '390px',
      data: { entityPreviews }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }



  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
