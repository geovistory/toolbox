import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SysConfig } from '@kleiolab/lib-config';
import { AnalysisDefinition, AnalysisTableCellValue, AnalysisTableExportRequest, AnalysisTableRequest, AnalysisTableResponse, ColDef, QueryDefinition, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { saveAs } from 'file-saver';
import { Table } from 'primeng/table';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { GvAnalysisService } from 'projects/app-toolbox/src/app/modules/analysis/services/analysis.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { EntitiesDialogData, ResultingEntitiesDialogComponent } from '../resulting-entities-dialog/resulting-entities-dialog.component';
import { ResultingValuesDialogComponent, ValuesDialogData } from '../resulting-values-dialog/resulting-values-dialog.component';

export interface Example {
  id: number;
  name: string;
}
export interface ResultTableValue { label: string, fkSubjectInfo: number }
interface ResultTableCell {
  entities?: WarEntityPreview[]
  values?: ResultTableValue[]

  entity?: WarEntityPreview
  value?: ResultTableValue
  label?: string
}
interface ResultTableRow {
  [colId: string]: ResultTableCell
}
@Component({
  selector: 'gv-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnInit, AfterViewInit, OnDestroy {
  destroy$ = new Subject();
  @Input() definition$: Observable<QueryDefinition>;
  @ViewChild('table') table: Table;

  displayedColumns$: Observable<string[]>;

  definition: QueryDefinition;
  colDefs: ColDef[] = [];

  limit = 50;
  lazyLoadState: {
    first: number,    // First row offset
    rows: number // Number of rows per page
  }
  pkProject: number;
  items: ResultTableRow[];

  get totalRecords(): number {
    const result = this.a.results$.value
    if (!result || !result.rows.length) return 0;
    else return result.full_count
  }

  constructor(
    public dialog: MatDialog,
    public p: ActiveProjectService,
    public a: GvAnalysisService<AnalysisTableRequest, AnalysisTableResponse>,
    private ref: ChangeDetectorRef,
  ) {

  }
  ngOnInit() {

    this.a.fkAnalysisType = SysConfig.PK_ANALYSIS_TYPE__TABLE;

    this.displayedColumns$ = this.definition$.pipe(
      map(def => def.columns.map(colDef => colDef.label))
    );

    let count = 0;
    this.a.results$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.items = this.transformResults(res);

      // Hack for updating height of table on first load
      if (res && count === 0) {
        setTimeout(() => { this.ref.detectChanges() }, 100)
        count++;
      }
    })

  }

  private transformResults(res: AnalysisTableResponse): ResultTableRow[] {
    const rows = (res || { rows: [] }).rows
    return rows.map(inputRow => {
      const outputRow: ResultTableRow = {}
      for (const colId in inputRow) {
        if (Object.prototype.hasOwnProperty.call(inputRow, colId)) {
          const inputCell = inputRow[colId];
          let outputCell: ResultTableCell = {}
          if (inputCell.entities) outputCell = this.transformEntities(inputCell.entities)
          if (inputCell.values) outputCell = this.transformValues(inputCell.values)

          if (inputCell.entity) outputCell = this.transformEntity(inputCell.entity)
          if (inputCell.entityId) outputCell = this.transformLabel(inputCell.entityId)
          if (inputCell.entityLabel) outputCell = this.transformLabel(inputCell.entityLabel)
          if (inputCell.entityClassLabel) outputCell = this.transformLabel(inputCell.entityClassLabel)
          if (inputCell.entityTypeLabel) outputCell = this.transformLabel(inputCell.entityTypeLabel)
          if (inputCell.entityTypeId) outputCell = this.transformLabel(inputCell.entityTypeId)

          if (inputCell.value) outputCell = this.transformValue(inputCell.value)
          outputRow[colId] = outputCell
        }
      }
      return outputRow;
    })
  }
  transformEntities(x: WarEntityPreview[]): ResultTableCell {
    if (x.length === 1) {
      return { entity: x[0], }
    } else {
      return { entities: x }
    }
  }

  transformValues(x: AnalysisTableCellValue[]): ResultTableCell {
    if (x.length === 1) {
      return this.transformValue(x[0])
    } else {
      return { values: x.map(val => this.transformValueToValue(val)) }
    }
  }
  transformValueToValue(x?: AnalysisTableCellValue): ResultTableValue {
    const v = x.value
    const res = { fkSubjectInfo: x.fkSubjectInfo }
    if (!v) return { ...res, label: '' }
    else if (v.dimension) return { ...res, label: v.dimension.numericValue.toString() }
    else if (v.geometry) return { ...res, label: v.geometry.geoJSON.coordinates.join(', ') }
    else if (v.language) return { ...res, label: v.language.label }
    else if (v.string) return { ...res, label: v.string.string }
    else if (v.langString) return { ...res, label: v.langString.string }
    else if (v.timePrimitive) return { ...res, label: v.timePrimitive.label }
    else return { ...res, label: '' }
  }
  transformEntity(x: WarEntityPreview): ResultTableCell {
    return { entity: x }
  }
  transformValue(x: AnalysisTableCellValue): ResultTableCell {
    return { value: this.transformValueToValue(x) }
  }
  transformLabel(label: string | number): ResultTableCell {
    if (typeof label === 'number') return { label: label.toString() }
    return { label }
  }



  ngAfterViewInit() {
    this.definition$.pipe(takeUntil(this.destroy$)).subscribe(definition => {
      this.definition = definition;
      this.colDefs = definition.columns
      // const body = this.table.containerViewChild.nativeElement.getElementsByClassName('ui-table-scrollable-body')[0];
      //  body.scrollTop = 0;
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
        const parts: string[] = []
        parts.push('table')
        if (this.a.pkEntity) parts.push(this.a.pkEntity.toString())
        parts.push('export')
        const filename = parts.join('-')

        if (fileType === 'json') {
          const blob = new Blob([data.res], {
            type: 'text/json'
          });
          saveAs(blob, `${filename}.json`)

        } else if (fileType === 'csv') {
          const blob = new Blob([data.res], {
            type: 'text/comma-separated-values'
          });
          saveAs(blob, `${filename}.csv`)
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

  openEntitiesDialog(entityPreviews): void {
    const data: EntitiesDialogData = { entityPreviews }
    this.dialog.open(ResultingEntitiesDialogComponent, {
      width: '390px',
      data
    });
  }

  openValuesDialog(values: ResultTableValue[]): void {
    const data: ValuesDialogData = { values }
    this.dialog.open(ResultingValuesDialogComponent, {
      width: '390px',
      data
    });
  }



  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.unsubscribe()
  }
}
