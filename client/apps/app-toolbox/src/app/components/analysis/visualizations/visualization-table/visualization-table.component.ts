import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SysConfig } from '@kleiolab/lib-config';
import { AnalysisDefinition, AnalysisTableCellValue, AnalysisTableExportRequest, AnalysisTableRequest, AnalysisTableResponse, ColDef, QueryDefinition, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { saveAs } from 'file-saver';
import { SharedModule } from 'primeng/api';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ActiveProjectService } from '../../../../services/active-project.service';
import { GvAnalysisService } from '../../../../services/analysis.service';
import { EntityPreviewComponent } from '../../../misc/entity-preview/entity-preview.component';
import { EntitiesDialogData, VisualizationTableEntitiesDialogComponent } from '../visualization-table-entities-dialog/visualization-table-entities-dialog.component';
import { ValuesDialogData, VisualizationTableValuesDialogComponent } from '../visualization-table-values-dialog/visualization-table-values-dialog.component';

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

interface PageLoadRes {
  limit: number,
  offset: number,
  res: AnalysisTableResponse
}
@Component({
  selector: 'gv-visualization-table',
  templateUrl: './visualization-table.component.html',
  styleUrls: ['./visualization-table.component.scss'],
  standalone: true,
  imports: [NgIf, TableModule, SharedModule, MatDividerModule, MatButtonModule, MatMenuModule, MatIconModule, NgFor, MatProgressBarModule, EntityPreviewComponent, AsyncPipe]
})
export class VisualizationTableComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  @Input() definition$: Observable<QueryDefinition>;
  @ViewChild('table') table: Table;
  displayedColumns$: Observable<string[]>;

  definition: QueryDefinition;
  colDefs: ColDef[] = [];

  limit = 100;
  lazyLoadState: TableLazyLoadEvent
  pkProject: number;
  items: ResultTableRow[];

  get totalRecords(): number {
    const result = this.a.results$.value
    return result?.res?.full_count ?? 0
  }

  constructor(
    public dialog: MatDialog,
    public p: ActiveProjectService,
    public a: GvAnalysisService<AnalysisTableRequest, PageLoadRes>,
  ) {

  }
  ngOnInit() {

    this.a.fkAnalysisType = SysConfig.PK_ANALYSIS_TYPE__TABLE;

    this.displayedColumns$ = this.definition$.pipe(
      map(def => def.columns.map(colDef => colDef.label))
    );

    this.definition$.pipe(takeUntil(this.destroy$)).subscribe(definition => {
      this.definition = definition;
      this.colDefs = definition.columns
      if (this.table) {
        this.table.resetScrollTop()
        this.table.reset()
      } else {
        this.load(this.definition, 0, this.limit)
      }
    })
    // let count = 0;
    this.items = []
    this.a.results$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      const fullcount = res?.res?.full_count ?? 0
      if (this.items.length !== fullcount) {
        this.items = Array.from({ length: fullcount });
      }

      if (res?.res.rows.length) {

        const loadedItems = this.transformResults(res.res);

        // populate page of items
        Array.prototype.splice.apply(this.items, [...[res?.offset, res?.limit], ...loadedItems]);
      }

      // trigger change detection
      this.items = [...this.items];
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
    else if (v.cell) return { ...res, label: `${v.cell.stringValue !== undefined ? v.cell.stringValue : v.cell.numericValue}` }
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


  loadDataOnScroll(event: TableLazyLoadEvent) {
    this.lazyLoadState = event;
    if (this.definition) this.load(this.definition, event.first, event.rows);
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
    }).pipe(map(res => ({
      limit: rows,
      offset,
      res
    })))
    ))
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

  openEntitiesDialog(entityPreviews): void {
    const data: EntitiesDialogData = { entityPreviews }
    this.dialog.open(VisualizationTableEntitiesDialogComponent, {
      width: '390px',
      data
    });
  }

  openValuesDialog(values: ResultTableValue[]): void {
    const data: ValuesDialogData = { values }
    this.dialog.open(VisualizationTableValuesDialogComponent, {
      width: '390px',
      data
    });
  }



  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
