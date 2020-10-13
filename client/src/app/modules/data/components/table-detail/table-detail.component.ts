import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, DatDigitalApi, DatColumn, SysConfig, InfStatement } from 'app/core';
import { TabLayoutComponentInterface } from 'app/modules/projects/containers/project-edit/project-edit.component';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { Observable, Subject, BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { first, map, takeUntil, shareReplay, distinctUntilChanged, switchMap, tap, filter, debounceTime, auditTime } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { equals, values, without, indexBy, pick, keys, omit } from 'ramda';
import { FormControl } from '@angular/forms';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';
import { TColFilters, TColFilter } from '../../../../../../../server/src/lb3/server/table/interfaces'
import { WorkerWrapperService } from '../../services/worker-wrapper.service';
import { ConfigurationPipesService } from 'app/modules/base/services/configuration-pipes.service';
import { TableService, TableRow } from 'app/core/sdk-lb4';
import { SchemaObjectService } from 'app/core/store/schema-object.service';
import { CellMapping, ColumnMapping } from 'app/shared/components/digital-table/components/table/table.component';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { InfActions } from 'app/core/inf/inf.actions';

// TODO import this interface from backend
interface TabCell {
  pk_cell: number;
  string_value?: string;
  numeric_value?: number;
}
// TODO import this interface from backend
// interface TableRow {
//   pk_row: number,
//   [key: number]: TabCell
// }

@Component({
  selector: 'gv-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements OnInit, OnDestroy, TabLayoutComponentInterface {
  destroy$ = new Subject<boolean>();

  @Input() basePath: string[]; // path to the substore
  @Input() pkEntity: number; // Primary key of the text digital to be viewed or edited

  t: TabLayout;

  readonly dtText = SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_TEXT;
  readonly dtNumeric = SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_NUMERIC;

  // fetched rows
  rows$: Observable<TableRow[]>

  // total count of records found in database according to the filters
  // (biggest number in pagination UI)
  // Value of length$ is updated AFTER Api call
  length$: Observable<number>;

  /**
   * configuration parameters that trigger new api call and
   * are needed to generate a SQL query (backend side)
   * Values are updated BEFORW Api call
   */
  pageSize$ = new BehaviorSubject(20)
  pageIndex$ = new BehaviorSubject(0)
  sortBy$ = new BehaviorSubject<string | number>('pk_row')
  sortDirection$ = new BehaviorSubject<'ASC' | 'DESC'>('ASC');
  filters$ = new BehaviorSubject<TColFilters>({});

  // options passed to 'column toggle UI' allowing users to ahow/hide columns
  colToggleOptions$: Observable<{
    display: string,
    value: number,
    datColumn: DatColumn
  }[]>

  // control managing the selction of the colToggleOptions, for:
  // a) listening to changes in 'column toggle UI'
  // b) to set the initial value of selected columns to show
  colToggleCtrl = new FormControl([])

  // value of this observable is an array contiaing the items
  // of colToggleOptions that are checked / selected (by colToggleCtrl)
  columns$: Observable<{
    display: string,
    value: number,
    datColumn: DatColumn
  }[]>

  // used to tell stupid table component to show spinner
  loading = true;

  // for stupid table component:
  headers$: ReplaySubject<{ colLabel: string, comment: string, type: 'number' | 'string', mapping?: ColumnMapping }[]>;
  table$: ReplaySubject<string[][]>;
  entityMappings$: ReplaySubject<CellMapping[]>;
  colFiltersEnabled = false;
  lineBrakeInCells = false;

  // to target data on event of the stupid table component
  dataMapping: { pk_row: number, pk_col?: number, pk_cell?: number, refersTo?: number }[][];
  colMapping: (number | string)[];

  // Array of pk_entity of columns that have been queried
  // Value is updated after the API call
  // (for optimisation)
  queriedCols: number[] = [];

  // flag that indicates if the api is called the first time
  // (set to false after the first api call)
  // (for optimisation)
  firstApiCall = true;

  pkProject: number;

  constructor(
    public ref: ChangeDetectorRef,
    private digitalApi: DatDigitalApi,
    private p: ActiveProjectService,
    private worker: WorkerWrapperService,
    private tableAPI: TableService,
    private s: SchemaObjectService,
    private c: ConfigurationPipesService,
    private inf: InfActions
  ) { }

  ngOnInit() {
    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);
    this.t.setTabTitle('Table ' + this.pkEntity)

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      // this.p.dat$.column.loadColumnsOfTable(this.pkEntity, pkProject);
      this.s.storeGv(this.tableAPI.tableControllerGetTableColumns(pkProject, this.pkEntity), pkProject);
      this.pkProject = pkProject
    })

    const loadConfig$ = combineLatest(
      this.pageSize$,
      this.pageIndex$,
      this.p.pkProject$,
      this.sortBy$,
      this.sortDirection$,
      this.filters$.pipe(
        auditTime(10)
      ),
      this.columnsLoadTrigger$(),
    ).pipe(shareReplay({ refCount: true, bufferSize: 1 }))


    const res$ = loadConfig$.pipe(
      distinctUntilChanged(equals),
      tap(() => {
        this.loading = true
      }),
      switchMap(([
        pageSize,
        pageIndex,
        pkProject,
        sortBy,
        sortDirection,
        filters

      ]) => this.tableAPI.tableControllerGetTablePage(pkProject, this.pkEntity, {
        // ]) => this.digitalApi.getTablePage(pkProject, this.pkEntity, {
        limit: pageSize,
        offset: pageSize * pageIndex,
        columns: this.colToggleCtrl.value.map((i: number) => i.toString()),
        sortBy,
        sortDirection,
        filters: this.filters$.value
      }).pipe(
        tap((res) => {
          this.s.storeSchemaObjectGv(res.schemaObject, pkProject)
        })
      )),
      tap((res) => {
        this.loading = false;
        // this.firstApiCall = false; TODO: check if this would work
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    )

    // creating the table and the data mapping
    this.table$ = new ReplaySubject();
    res$.pipe(
      map(res => {
        this.colMapping = ['pk_row', ...res.columns.map(pk => parseInt(pk, 10))];

        this.dataMapping = [];
        const rows: TableRow[] = res.rows;
        const table: string[][] = [];

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const keys = Object.keys(row);
          table[i] = [];
          this.dataMapping[i] = [];

          table[i][0] = row.pk_row.toString();
          this.dataMapping[i][0] = { pk_row: row.pk_row };
          for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            if (key == 'pk_row') continue;
            table[i].push(row[key].string_value || (row[key].numeric_value || '').toString());
            this.dataMapping[i].push({
              pk_row: row.pk_row,
              pk_col: parseInt(res.columns[j], 10),
              pk_cell: row[key].pk_cell,
              refersTo: -1
            })
          }
        }

        return table;
      }),
      takeUntil(this.destroy$)
    ).subscribe(table => {
      this.emitEntityMappings();
      this.table$.next(table);
    });

    this.length$ = res$.pipe(
      map(res => res.length)
    )

    // Update this.queriedCols with columns returned by rest api
    res$.pipe(
      map(res => res.columns),
      distinctUntilChanged(equals),
      takeUntil(this.destroy$)
    ).subscribe((columns: string[]) => {
      this.queriedCols = columns.map(pk => parseInt(pk, 10));
    })

    /**
     * Get all columns and add them to the column toggle
     */
    this.colToggleOptions$ = this.p.dat$.column$.by_fk_digital$.key(this.pkEntity).pipe(
      map(indexedCols => values(indexedCols).map(col => col)),
      tap(cols => {
        // make all checkboxes as checked
        this.colToggleCtrl.setValue(cols.map(col => col.pk_entity))
      }),
      switchMap(cols => combineLatestOrEmpty(
        cols.map(datColumn => this.p.dat$.text_property$.by_fk_entity__fk_system_type$
          .key(datColumn.pk_entity + '_' + 3295)
          .pipe(
            map(textProp => {
              const display = (values(textProp)[0] || { string: '' }).string
              return { display, value: datColumn.pk_entity, datColumn }
            })
          )
        )
      )),
      shareReplay({ refCount: true, bufferSize: 1 })
    )

    this.columns$ = combineLatest(
      this.colToggleCtrl.valueChanges,
      this.colToggleOptions$
    ).pipe(
      map(([cols, colToggleOptions]) => {
        const colInd = indexBy(c => c.toString(), cols);
        return colToggleOptions.filter(o => !!colInd[o.value])
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // set the headers
    this.headers$ = new ReplaySubject();
    this.entityMappings$ = new ReplaySubject();

    combineLatest([this.columns$, this.p.dfh$.class$.by_pk_class$.all$, this.p.dat$.class_column_mapping$.by_fk_column$.all$])
      .pipe(takeUntil(this.destroy$)).subscribe(([cols, classNames, mappings]) => {

        const columns: { colLabel: string, comment: string, type: 'number' | 'string', mapping?: ColumnMapping }[] = [];
        let column: { colLabel: string, comment: string, type: 'number' | 'string', mapping?: ColumnMapping };
        columns.push({ colLabel: 'Row ID', comment: 'number', type: 'number' });

        for (let i = 0; i < cols.length; i++) {
          column = {
            colLabel: cols[i].display,
            comment: cols[i].datColumn.fk_data_type == this.dtText ? 'string' : 'number',
            type: cols[i].datColumn.fk_data_type == this.dtText ? 'string' : 'number',
          };

          if (mappings && mappings[cols[i].datColumn.pk_entity]) {
            const fkClass = mappings[cols[i].datColumn.pk_entity].fk_class
            column.mapping = {
              fkClass: fkClass,
              className: '', // classNames[fkClass].label,
              icon: classNames[fkClass].basic_type == DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM || classNames[fkClass].basic_type == 30 ? 'peIt' : 'teEn'
            }
          }
          columns.push(column);
        }

        this.headers$.next(columns)
      });
  }

  /**
   * Returns an Observable that emits an array with the columns to load
   * only when a rest api call is needed.
   * This is to prevent from unnessecary rest api call, e.g. when user
   * hides a column that has been loaded before.
   */
  private columnsLoadTrigger$() {

    return this.colToggleCtrl.valueChanges.pipe(
      filter((current) => {
        let passes = true

        if (this.firstApiCall === true) {
          // lets pass the first time
          passes = true
          this.firstApiCall = false;
        }
        else if (this.queriedCols.length === 0) {
          // Blocks the stream if the this.queriedCols  value was empty
          // Remember: calling rest api with options.columns = [], all columns are loaded
          passes = false;
        }
        else if (without(this.queriedCols, current).length === 0) {
          // Blocks the stream, if current has no additional column compared to this.queriedCols
          // (prevents from loading just less than before)
          passes = false;
        }

        return passes;
      }));
  }

  emitEntityMappings() {
    const entityMappings = [];
    for (let i = 0; i < this.dataMapping.length; i++) {
      for (let j = 0; j < this.dataMapping[i].length; j++) {
        if (this.dataMapping[i][j].refersTo) entityMappings.push({ colIndex: j, rowIndex: i, pkEntity: this.dataMapping[i][j].refersTo });
      }
    }
    this.entityMappings$.next(entityMappings);
  }

  onPageChange(e: PageEvent) {
    this.pageIndex$.next(e.pageIndex)
    this.pageSize$.next(e.pageSize)
  }

  onFilterChange(allFilters: { col: number, filter: TColFilter }[]) {
    const filters: TColFilters = {};

    allFilters.forEach(incFilter => {
      const colName = this.colMapping[incFilter.col];
      filters[colName] = incFilter.filter;
    });

    this.pageIndex$.next(0);
    this.filters$.next(filters);
  }

  onSortChangesort(sortOpt: { colNb: number, direction: string }) {
    const colName = this.colMapping[sortOpt.colNb]

    if (this.sortBy$.value === colName) {
      this.sortDirection$.next(this.sortDirection$.value === 'ASC' ? 'DESC' : 'ASC')
    } else {
      this.sortBy$.next(colName);
      this.sortDirection$.next('ASC')
    }

  }

  click(cell: { col: number, row: number }) { }

  mappingChanged(col: number, row: number, pkEntity: number) {
    const cell = this.dataMapping[row][col];

    // GMU TODO  remove hard coded property

    if (pkEntity) {
      // create
      if (pkEntity != -1 && !cell.refersTo) {
        cell.refersTo = pkEntity;
        this.inf.statement.upsert([{
          fk_subject_tables_cell: cell.pk_cell,
          fk_property: 1334,
          fk_object_info: pkEntity
        } as InfStatement], this.pkProject);
      }

      // update
      if (pkEntity != -1 && cell.refersTo) {
        this.inf.statement.remove([{
          fk_subject_tables_cell: cell.pk_cell,
          fk_property: 1334,
          fk_object_info: pkEntity
        } as InfStatement], this.pkProject)
        cell.refersTo = pkEntity;
        this.inf.statement.upsert([{
          fk_subject_tables_cell: cell.pk_cell,
          fk_property: 1334,
          fk_object_info: pkEntity
        } as InfStatement], this.pkProject);
      }

      // delete
      if (pkEntity == -1) {
        this.inf.statement.remove([{
          fk_subject_tables_cell: cell.pk_cell,
          fk_property: 1334,
          fk_object_info: pkEntity
        } as InfStatement], this.pkProject)
      }

      this.emitEntityMappings();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
