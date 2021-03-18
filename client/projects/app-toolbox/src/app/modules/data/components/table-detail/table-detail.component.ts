import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { DfhConfig, SysConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { InfActions, SchemaService } from '@kleiolab/lib-redux';
import { DatColumn, DatDigitalApi } from '@kleiolab/lib-sdk-lb3';
import { TableConfig, TableRow, TableService } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { ActiveAccountService } from 'projects/app-toolbox/src/app/core/active-account';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { TabLayoutComponentInterface } from 'projects/app-toolbox/src/app/modules/projects/containers/project-edit/project-edit.component';
import { Header } from 'projects/app-toolbox/src/app/shared/components/digital-table/components/table/table.component';
import { TabLayout } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout';
import { equals, indexBy, values, without } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { auditTime, distinctUntilChanged, filter, first, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TColFilter, TColFilters } from '../../../../../../../../../server/src/lb3/server/table/interfaces';
import { WorkerWrapperService } from '../../services/worker-wrapper.service';

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
  @Input() filterOnRow: number; // the row on which to filter on

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
  sortBy$ = new BehaviorSubject<string>('pk_row')
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
  headers$: Observable<Header[]>;
  table$: Observable<Array<Array<string | { text: string, pkCell: number }>>>;
  // sortByIndex$: Observable<{ colNb: number, direction: string }>;
  sortByIndex$ = new BehaviorSubject({ colNb: -1, direction: 'ASC' });
  currentSortIndex: { colNb: number, direction: string, colName: string };
  colFiltersEnabled = false;
  lineBrakeInCells = false;

  // for table config
  order$ = new BehaviorSubject<{ col: number, direction: 'right' | 'left' }>({ col: -1, direction: 'right' });
  tableConfig$: Observable<TableConfig>;


  tableConfig: TableConfig = { columns: [] };
  changingColumns = false;
  configLoaded = false;

  // to target data on event of the stupid table component
  dataMapping: { pk_row: number, pk_col?: number, pk_cell?: number, refersTo?: number }[][];
  colMapping: (string)[];

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
    private s: SchemaService,
    private c: ConfigurationPipesService,
    private inf: InfActions,
    private a: ActiveAccountService,
  ) { }

  ngOnInit() {
    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);
    this.t.setTabTitle('Table ' + this.pkEntity)

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      // this.p.dat$.column.loadColumnsOfTable(this.pkEntity, pkProject);
      this.s.storeGv(this.tableAPI.tableControllerGetTableColumns(pkProject, this.pkEntity), pkProject);
      this.s.modifyGvSchema(this.tableAPI.tableControllerGetTableConfig(pkProject, this.pkEntity, this.a.account.id), pkProject)
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
    // this.colToggleOptions$ = this.p.dat$.column$.by_fk_digital$.key(this.pkEntity).pipe(
    //   map(indexedCols => values(indexedCols).map(col => col)),
    //   tap(cols => {
    //     // make all checkboxes as checked
    //     this.colToggleCtrl.setValue(cols.map(col => col.pk_entity))
    //   }),
    //   switchMap(cols => combineLatestOrEmpty(
    //     cols.map(datColumn => this.p.dat$.text_property$.by_fk_entity__fk_system_type$
    //       .key(datColumn.pk_entity + '_' + 3295)
    //       .pipe(
    //         map(textProp => {
    //           const display = (values(textProp)[0] || { string: '' }).string
    //           return { display, value: datColumn.pk_entity, datColumn }
    //         })
    //       )
    //     )
    //   )),
    //   shareReplay({ refCount: true, bufferSize: 1 })
    // )

    this.tableConfig$ = this.p.pro$.table_config$.by_fk_digital$.key(this.pkEntity + '').pipe(
      map(ptc => values(ptc)),
      map(ptc => ptc[0] ? ptc[0].config : undefined)
    );



    this.colToggleOptions$ = combineLatest([this.p.dat$.column$.by_fk_digital$.key(this.pkEntity), this.tableConfig$]).pipe(
      map(([indexedCols, config]) => {
        return { cols: values(indexedCols).map(col => col), config };
      }),
      tap(obj => {
        if (!this.configLoaded) this.colToggleCtrl.setValue(obj.cols.filter(col => obj.config ? obj.config.columns.some(conf => col.pk_entity === conf.fkColumn && conf.visible) : true).map(col => col.pk_entity))
        if (obj.config) this.configLoaded = true;
      }),
      switchMap(obj => combineLatestOrEmpty(
        obj.cols.map(datColumn => this.p.dat$.text_property$.by_fk_entity__fk_system_type$
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

    // on activation/desactivation of a column: reset the sorting
    // these lines of code are necessary, because act/desact a colum does not fire res$
    this.colToggleCtrl.valueChanges.subscribe(() => {
      this.sortBy$.next('');
      this.sortByIndex$.next({ colNb: -1, direction: 'ASC' })
    })

    this.columns$ = combineLatest(
      this.colToggleCtrl.valueChanges,
      this.colToggleOptions$,
      this.tableConfig$
    ).pipe(
      map(([cols, colToggleOptions, config]) => {
        const colInd = indexBy(c => c.toString(), cols);
        this.colMapping = ['pk_row'];
        const result: {
          display: string;
          value: number;
          datColumn: DatColumn;
        }[] = []
        for (const option of colToggleOptions) {
          if (!!colInd[option.value]) {
            result.push(option)
            this.colMapping.push(option.value.toString())
          }
        }
        // if (this.pkProject && config && config.columns.length != 0) {
        //   config.columns.forEach(col => col.visible = result.some(r => r.datColumn.pk_entity == col.fkColumn))
        //   this.s.modifyGvSchema(this.tableAPI.tableControllerSetTableConfig(this.pkProject, this.pkEntity, this.a.account.id, config), this.pkProject);
        // }
        return result
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // set the headers
    this.headers$ = combineLatest([this.tableConfig$, this.columns$.pipe(
      switchMap((cols) => {
        const obs$ = cols.map(col => this.p.dat$.class_column_mapping$.by_fk_column$.key(col.datColumn.pk_entity).pipe(
          // format the mappings
          map((indexedMappings) => values(indexedMappings)),
          // create the header for that column
          switchMap((mappings) => {
            const header: Header = {
              colLabel: col.display,
              comment: col.datColumn.fk_data_type == this.dtText ? 'string' : 'number',
              type: col.datColumn.fk_data_type == this.dtText ? 'string' : 'number',
              pk_column: col.datColumn.pk_entity,
            };
            if (!mappings[0]) return of(header);
            // get the class and the class label
            return combineLatest([
              this.p.dfh$.class$.by_pk_class$.key(mappings[0].fk_class),
              this.c.pipeClassLabel(mappings[0].fk_class)
            ]).pipe(
              map(([dfhClass, classLabels]) => {
                header.mapping = {
                  fkClass: mappings[0].fk_class,
                  className: classLabels,
                  icon: dfhClass.basic_type == DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM || dfhClass.basic_type == 30 ? 'peIt' : 'teEn',
                  pkEntity: mappings[0].pk_entity,
                  pkColumn: col.datColumn.pk_entity
                }
                return header;
              }
              )
            )
          }),
        )
        );
        return combineLatestOrEmpty(obs$);
      }),
      map((cols) => {
        const firstHeader: Header = { colLabel: 'Row ID', comment: 'number', type: 'number' };
        return [firstHeader, ...cols]
      })
    )]).pipe(
      map(([config, headers]) => {
        if (!config || config.columns.length == 0) this.tableConfig = { columns: headers.slice(1).map(h => ({ fkColumn: h.pk_column, visible: true })) }
        else this.tableConfig = JSON.parse(JSON.stringify(config));

        const headersInOrder: Array<Header> = [headers[0]];
        this.tableConfig.columns.forEach(c => {
          const target = headers.find(h => h.pk_column == c.fkColumn)
          if (target) headersInOrder.push(target)
        });

        return headersInOrder;
      })
    )

    // creating the table and the data mapping
    this.table$ = combineLatest([res$, this.headers$]).pipe(
      map(([res, headers]) => {
        const colsToKeep: Array<number> = headers.slice(1).map(h => h.pk_column);
        const rows: TableRow[] = res.rows;
        this.colMapping = ['pk_row'].concat(colsToKeep.map(c => c + ''));
        this.dataMapping = [];
        const table: Array<Array<string | { text: string, pkCell: number }>> = [];

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const keys = Object.keys(row);
          table[i] = [];
          this.dataMapping[i] = [];
          table[i][0] = row.pk_row.toString();
          this.dataMapping[i][0] = { pk_row: row.pk_row };
          for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            if (this.colMapping.indexOf(key) == -1) continue;
            const str: string = row[key].string_value ? row[key].string_value : row[key].numeric_value == 0 || row[key].numeric_value ? row[key].numeric_value : '';
            const theCol = headers.filter(h => h.pk_column == parseInt(key, 10))[0];
            const indexToPut = headers.findIndex(h => h.pk_column + '' === key);
            if (!theCol) continue;
            if (!theCol.mapping) table[i][indexToPut] = str;
            else table[i][indexToPut] = { text: str, pkCell: row[key].pk_cell as number };

            this.dataMapping[i][indexToPut] = {
              pk_row: row.pk_row,
              pk_col: parseInt(res.columns[j], 10),
              pk_cell: row[key].pk_cell,
              refersTo: -1
            }
          }
        }
        if (table.length == 0) {
          const mappingNb = colsToKeep.filter(c => {
            const header = headers.find(h => h.pk_column == c);
            return header && header.mapping;
          }).length;
          table.push(new Array(1).fill({ type: 'no records', size: 1 + colsToKeep.length + mappingNb }));
        }
        return table;
      }),
      takeUntil(this.destroy$)
    );


    if (this.filterOnRow) {
      // this.colFiltersEnabled = true;
      this.filters$.next({
        'pk_row': {
          numeric: {
            operator: '=',
            value: this.filterOnRow
          }
        }
      })
    }


    combineLatest([this.colToggleCtrl.valueChanges, this.order$]).pipe(
      map(([cols, order]) => {
        if (!this.tableConfig || this.tableConfig.columns.length == 0) return;

        const configBefore = JSON.stringify(this.tableConfig); // keep in memory the previous config

        // first set all column to visible = false
        this.tableConfig.columns.forEach(c => c.visible = false);

        // set to visible = true the ones that are checked
        cols.forEach(c => this.tableConfig.columns.find(tc => tc.fkColumn == c).visible = true);

        // if the order changed
        if (order.col != -1) {
          let oldIndex = order.col - 1; // because first col is 'Row id', and has not to be moved

          // correct index: there might be visible:false in between
          let correction = 0;
          for (let i = 0; i <= oldIndex; i++) {
            if (!this.tableConfig.columns[i].visible) correction++;
          }
          oldIndex += correction;

          // look around until there is a visible one
          let newIndex = order.direction == 'right' ? oldIndex + 1 : oldIndex - 1;
          if (order.direction === 'right') while (!this.tableConfig.columns[newIndex].visible) newIndex++;
          else if (order.direction === 'left') while (!this.tableConfig.columns[newIndex].visible) newIndex--;

          // do the switch
          this.tableConfig.columns.splice(newIndex, 0, this.tableConfig.columns.splice(oldIndex, 1)[0]);

          // avoid infinite loop: otherwise on next emission of cols, order will still be at previous one, and then starts to loop because of that
          this.order$.next({ col: -1, direction: 'right' });
        }

        // update the db in accordance of modifications only if there is modifications
        if (configBefore !== JSON.stringify(this.tableConfig)) {
          this.s.modifyGvSchema(this.tableAPI.tableControllerSetTableConfig(this.pkProject, this.pkEntity, this.a.account.id, this.tableConfig), this.pkProject);
        }

      })
    ).subscribe();
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
    this.currentSortIndex = { colNb: sortOpt.colNb, direction: sortOpt.direction, colName };

    if (this.sortBy$.value === colName) {
      this.sortDirection$.next(this.sortDirection$.value === 'ASC' ? 'DESC' : 'ASC')
    } else {
      this.sortBy$.next(colName);
      this.sortDirection$.next('ASC')
    }
  }

  click(cell: { col: number, row: number }) { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  changingColumnsOrder(checked: boolean) {
    this.changingColumns = checked;
  }

  onColumnOrderChange(change: { col: number, direction: 'right' | 'left' }) {
    this.order$.next(change)

    // let oldIndex = change.col - 1;

    // let correction = 0; // correct index: there might be visible:false in between
    // for (let i = 0; i <= oldIndex; i++) {
    //   if (!this.tableConfig.columns[i].visible) correction++;
    // }
    // oldIndex += correction;

    // let newIndex = change.direction == 'right' ? oldIndex + 1 : oldIndex - 1;
    // if (change.direction === 'right') while (!this.tableConfig.columns[newIndex].visible) newIndex++;
    // else if (change.direction === 'left') while (!this.tableConfig.columns[newIndex].visible) newIndex--;

    // this.tableConfig.columns.splice(newIndex, 0, this.tableConfig.columns.splice(oldIndex, 1)[0]);

    // this.s.modifyGvSchema(this.tableAPI.tableControllerSetTableConfig(this.pkProject, this.pkEntity, this.a.account.id, this.tableConfig), this.pkProject);
  }
}
