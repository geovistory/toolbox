import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActiveProjectService, SysConfig } from 'app/core';
import { AnalysisDefinition, AnalysisTableExportRequest, AnalysisTableRequest, AnalysisTableResponse, ColDef, QueryDefinition } from 'app/core/sdk-lb4/model/models';
import { GvAnalysisService } from 'app/modules/analysis/services/analysis.service';
import { saveAs } from 'file-saver';
import { Table } from 'primeng/table';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { EntitiesDialogData, ResultingEntitiesDialogComponent } from '../resulting-entities-dialog/resulting-entities-dialog.component';

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
    public a: GvAnalysisService<AnalysisTableRequest, AnalysisTableResponse>,
    private ref: ChangeDetectorRef
  ) {

  }
  ngOnInit() {

    this.a.fkAnalysisType = SysConfig.PK_ANALYSIS_TYPE__TABLE;

    this.displayedColumns$ = this.definition$.pipe(
      map(def => def.columns.map(colDef => colDef.label))
    );

    let count = 0;
    this.a.results$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.items = (res || { rows: [] }).rows;

      // Hack for updating height of table on first load
      if (res && count === 0) {
        setTimeout(() => { this.ref.detectChanges() }, 100)
        count++;
      }
    })

  }

  ngAfterViewInit() {
    this.definition$.pipe(takeUntil(this.destroy$)).subscribe(definition => {
      this.definition = definition;
      this.colDefs = definition.columns
      const body = this.table.containerViewChild.nativeElement.getElementsByClassName('ui-table-scrollable-body')[0];
      body.scrollTop = 0;
      this.table.reset();

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
    const analysisDefinition: AnalysisDefinition = {
      queryDefinition: {
        filter: definition.filter,
        columns: definition.columns,
        offset: offset || 0,
        limit: rows
      }
    }

    this.a.callRunApi((fkProject => this.a.analysisApi.analysisControllerTableRun({
      fkProject,
      analysisDefinition
    })))
  }

  download(fileType: AnalysisTableExportRequest.FileTypeEnum) {
    this.a.callDownloadApi((fkProject => this.a.analysisApi.analysisControllerTableExport(
      {
        fkProject,
        fileType,
        analysisDefinition: { queryDefinition: this.definition },
      })
    ))
      .subscribe((data) => {

        if (fileType === 'json') {
          const blob = new Blob([data.res], {
            type: 'text/json'
          });
          saveAs(blob, `table-export-${new Date().getTime()}.json`)

        } else if (fileType === 'csv') {
          const blob = new Blob([data.res], {
            type: 'text/comma-separated-values'
          });
          saveAs(blob, `table-export-${new Date().getTime()}.csv`)
        }
      })
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
    const data: EntitiesDialogData = { entityPreviews }
    const dialogRef = this.dialog.open(ResultingEntitiesDialogComponent, {
      width: '390px',
      data
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
