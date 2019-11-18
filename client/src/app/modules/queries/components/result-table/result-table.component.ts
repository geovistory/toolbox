import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectService } from 'app/core';
import { AnalysisService } from 'app/modules/analysis/services/analysis.service';
import { Table } from 'primeng/table';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ColDef, QueryDefinition, TableInput, TableOutput } from '../../../../../../../src/common/interfaces';
import { ResultingEntitiesDialogComponent } from '../resulting-entities-dialog/resulting-entities-dialog.component';

export interface Example {
  id: number;
  name: string;
}


@Component({
  selector: 'gv-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject();
  @Input() definition$: Observable<QueryDefinition>;
  @ViewChild('table', { static: false }) table: Table;

  displayedColumns$: Observable<string[]>;

  definition: QueryDefinition;
  colDefs: ColDef[] = [];

  limit = 50;
  lazyLoadState: {
    first: number,    // First row offset
    rows: number // Number of rows per page
  }
  pkProject: number;
  items: any[];

  get totalRecords(): number {
    const result = this.a.results$.value
    if (!result || !result.rows.length) return 0;
    else return result.full_count
  }

  constructor(
    public dialog: MatDialog,
    public p: ActiveProjectService,
    public a: AnalysisService<TableInput, TableOutput>
  ) {

  }
  ngOnInit() {
    this.displayedColumns$ = this.definition$.pipe(
      map(def => def.columns.map(colDef => colDef.label))
    );

    this.a.results$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.items = (res || { rows: [] }).rows;
    })

  }

  ngAfterViewInit() {
    // let count = 0;
    this.definition$.pipe(takeUntil(this.destroy$)).subscribe(definition => {
      this.definition = definition;
      this.colDefs = definition.columns
      // if (count > 0) {
      const body = this.table.containerViewChild.nativeElement.getElementsByClassName('ui-table-scrollable-body')[0];
      body.scrollTop = 0;
      this.table.reset();
      // }
      // count++;
    })
  }

  loadDataOnScroll(event: {
    first: number,    // First row offset
    rows: number // Number of rows per page
  }) {
    this.lazyLoadState = event;
    if (this.definition) this.load(this.definition, event.first, event.rows);
    // combineLatest([this.p.pkProject$, this.definition$]).pipe(first(), takeUntil(this.destroy$))
    //   .subscribe(([pkProject, definition]) => {
    //   })

  }
  private load(definition: QueryDefinition, offset: number, rows: number) {

    const queryDefinition = {
      filter: definition.filter,
      columns: definition.columns,
      offset: offset || 0,
      limit: rows
    };
    this.a.callRunApi({ queryDefinition })
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
