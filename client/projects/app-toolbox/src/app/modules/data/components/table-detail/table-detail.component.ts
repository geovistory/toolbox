import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PageEvent } from '@angular/material/paginator';
import { DfhConfig, SysConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService } from '@kleiolab/lib-queries';
import { SchemaService } from '@kleiolab/lib-redux';
import { DatColumn } from '@kleiolab/lib-sdk-lb3';
import { InfLanguage, TabCell, TabCells, TableConfig, TableRow, TableService, TColFilter } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { ActiveAccountService } from 'projects/app-toolbox/src/app/core/active-account';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { TabLayoutComponentInterface } from 'projects/app-toolbox/src/app/modules/projects/containers/project-edit/project-edit.component';
import { Cell, Header, Row, TableMode } from 'projects/app-toolbox/src/app/shared/components/digital-table/components/table/table.component';
import { TabLayout } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout';
import { equals, indexBy, values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, first, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TColFilters } from '../../../../../../../../../server/src/lb3/server/table/interfaces';
import { TableConfigDialogComponent, TableConfigDialogData, TableConfigDialogResult } from '../table-config-dialog/table-config-dialog.component';

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

  readonly dtText = SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_TEXT;
  readonly dtNumeric = SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_NUMERIC;

  t: TabLayout;

  // fetched rows
  rows$: Observable<TableRow[]>

  // config params, trigger api calls (need to generate sql on backend). Updated BEFORE api calls
  pageSize$ = new BehaviorSubject(20)
  pageIndex$ = new BehaviorSubject(0)
  sortBy$ = new BehaviorSubject<string>('index')
  sortDirection$ = new BehaviorSubject<'ASC' | 'DESC'>('ASC');
  filters$ = new BehaviorSubject<TColFilters>({});

  // biggest number in pagination UI (found in db, according to filters). Updated AFTER api call
  length$: Observable<number>;

  // only displayed column (based on table config)
  columns$: Observable<Array<DatColumn>>
  columns: Array<DatColumn>

  // for table config
  tableConfig$: Observable<TableConfig>;
  tableConfig: TableConfig = { columns: [] };
  defaultLanguage: InfLanguage;

  // for table.component:
  loading = true;
  colFiltersEnabled = false;
  lineBrakeInCells = false;
  tableMode: TableMode = TableMode.view;
  headers$: Observable<Array<Header>>;
  table$: Observable<Array<Array<Cell>>>;
  sortByIndex$ = new BehaviorSubject({ pkColumn: -1, direction: 'ASC' });
  currentSortIndex: { colNb: number, direction: string, colName: string };

  // for creating new rows
  reload$ = new BehaviorSubject<number>(0);
  newRowTemp: Row = { position: -1, cells: [] };
  headers: Array<Header>;

  pkProject: number;
  accountId: number;

  constructor(
    public ref: ChangeDetectorRef,
    private p: ActiveProjectService,
    private tableAPI: TableService,
    private s: SchemaService,
    private c: ConfigurationPipesService,
    private a: ActiveAccountService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);
    this.t.setTabTitle('Table ' + this.pkEntity)

    // get the table columns and the table config and put everything in the store
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.s.storeGv(this.tableAPI.tableControllerGetTableColumns(pkProject, this.pkEntity), pkProject);
      this.s.modifyGvSchema(this.tableAPI.tableControllerGetTableConfig(pkProject, this.pkEntity, this.a.account.id), pkProject)
      this.pkProject = pkProject
    })

    // listen to config changes
    this.tableConfig$ = this.p.pro$.table_config$.by_fk_digital$.key(this.pkEntity + '').pipe(
      filter(x => x !== undefined),
      map(ptc => values(ptc)),
      map(ptc => ptc[0] ? ptc[0].config : undefined)
    );
    this.tableConfig$.subscribe(config => {
      this.tableConfig = config
    });

    // witness any change of the table
    const settings$ = combineLatest([
      this.pageSize$,
      this.pageIndex$,
      this.p.pkProject$,
      this.sortBy$,
      this.sortDirection$,
      this.filters$,
      this.tableConfig$,
      this.reload$
    ]).pipe(shareReplay({ refCount: true, bufferSize: 1 }))

    // get the table according to the settings
    const res$ = settings$.pipe(
      distinctUntilChanged(equals),
      tap(() => { this.loading = true }),
      switchMap(([
        pageSize,
        pageIndex,
        pkProject,
        sortBy,
        sortDirection,
        filters,
        config,
        reload
      ]) => this.tableAPI.tableControllerGetTablePage(pkProject, this.pkEntity, {
        limit: pageSize,
        offset: pageSize * pageIndex,
        columns: config.columns.map(tc => tc.fkColumn + ''),
        sortBy,
        sortDirection,
        filters: this.filters$.value
      }).pipe(
        tap((res) => { this.s.storeSchemaObjectGv(res.schemaObject, pkProject) })
      )),
      tap((res) => { this.loading = false; }),
      shareReplay({ bufferSize: 1, refCount: true })
    )

    // get max rows of a 'table fetch'
    this.length$ = res$.pipe(map(res => res.length))

    // get only the DatColumn that will be displayed (in the right order)
    this.columns$ = combineLatest([
      this.tableConfig$,
      this.p.dat$.column$.by_fk_digital$.key(this.pkEntity)
    ]).pipe(
      // only forward if we have the datColumns AND the config
      // (avoid timing issue when first this.columns$ fires and not yet textProperties)
      // filter(([config, datColumns]) => {
      //   const cols1 = config.columns.filter(col => col.visible).map(col => col.fkColumn);
      //   const cols2 = values(datColumns).map(col => col.pk_entity);
      //   return !cols1.some(pk1 => !cols2.some(pk2 => pk2 === pk1)); // Do we have at least one pk that misses in one of the two tables?
      // }),
      map(([config, datColumns]) => {
        const datColsByPk = indexBy(col => col.pk_entity.toString(), values(datColumns))
        return config.columns.filter(col => col.visible && datColsByPk[col.fkColumn]).map(col => datColsByPk[col.fkColumn]);
      })
    )
    this.columns$.subscribe(c => this.columns = c);

    // set the headers: for table.component
    this.headers$ = this.columns$.pipe(
      switchMap(columns => combineLatestOrEmpty(
        columns.map(
          col => combineLatest([
            this.p.dat$.text_property$.by_fk_entity__fk_system_type$.key(col.pk_entity + '_' + 3295),
            this.p.dat$.class_column_mapping$.by_fk_column$.key(col.pk_entity),
          ]).pipe(
            map(([textProperties, classColumnMappings]) => {
              const textProps = values(textProperties)
              const label = textProps.length ? textProps[0].string || '' : '';
              const header: Header = {
                colLabel: label,
                comment: col.fk_data_type == this.dtText ? 'string' : 'number',
                type: col.fk_data_type == this.dtText ? 'string' : 'number',
                pk_column: col.pk_entity,
              }
              const mappings = values(classColumnMappings)
              const mapping = mappings.length ? mappings[0] : undefined

              // if the column is mapped to a class:
              if (mapping) {
                header.mapping = {
                  fkClass: mapping.fk_class,
                  className: this.c.pipeClassLabel(mapping.fk_class),
                  icon: this.p.dfh$.class$.by_pk_class$.key(mapping.fk_class).pipe(
                    map(dfhClass => dfhClass ?
                      dfhClass.basic_type == DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM || dfhClass.basic_type == 30 ? 'peIt' : 'teEn'
                      : 'peIt')
                    // if there is no dfhClass, for now we display it as a PeIt later we should
                    // put a warn icon of inform the user that he has not this class in his profile
                  ),
                  pkEntity: mapping.pk_entity,
                  pkColumn: col.pk_entity
                }
              }

              return header
            })
          )
        ))
      )
    )

    // set the table: for table.component
    this.table$ = combineLatest([this.headers$, res$]).pipe(
      map(([headers, res]) => {
        const table: Array<Array<{ text: string, pkCell: number, pkColumn: number, pkRow: number }>> = [];
        for (let i = 0; i < res.rows.length; i++) {
          const row = res.rows[i];
          const keys = Object.keys(row);
          table[i] = [];
          table[i][0] = { text: row.index.toString(), pkCell: -1, pkColumn: -1, pkRow: row.pk_row };
          for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            const str: string = row[key].string_value ?
              row[key].string_value :
              row[key].numeric_value == 0 || row[key].numeric_value ? row[key].numeric_value : '';
            const theCol = headers.find(h => h.pk_column == parseInt(key, 10));
            const indexToPut = headers.findIndex(h => h.pk_column + '' === key); // because keys may not be in the same order than headers
            if (!headers.some(h => h.pk_column == parseInt(key, 10))) continue; // the key is actually a column that should not be displayed
            else {
              table[i][indexToPut] = {
                text: str,
                pkCell: row[key].pk_cell as number,
                pkColumn: theCol.pk_column,
                pkRow: row.pk_row
              };
            }
          }
        }
        return table;
      })
    );

    // get the default language
    this.p.defaultLanguage$.subscribe(lang => this.defaultLanguage = lang);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onPageChange(e: PageEvent) {
    this.pageIndex$.next(e.pageIndex)
    this.pageSize$.next(e.pageSize)
  }

  onFilterChange(allFilters: Array<{ pkColumn: number, filter: TColFilter }>) {
    const filters: TColFilters = {};
    allFilters.forEach(incFilter => filters[incFilter.pkColumn] = incFilter.filter);

    this.pageIndex$.next(0);
    this.filters$.next(filters);
  }

  onSortChange(sortOpt: { pkColumn: number, direction: 'ASC' | 'DESC' }) {
    this.sortDirection$.next(sortOpt.direction);
    this.sortBy$.next(sortOpt.pkColumn == - 1 ? 'index' : sortOpt.pkColumn + '');
  }

  changeTableMode(checked: boolean) {
    this.tableMode = checked ? TableMode.edit : TableMode.view;
  }

  tableConfiguration() {
    this.dialog.open<TableConfigDialogComponent,
      TableConfigDialogData, TableConfigDialogResult>(TableConfigDialogComponent, {
        height: 'calc(80% - 30px)',
        width: '500px',
        data: {
          pkDigital: this.pkEntity
        }
      })
      .afterClosed().pipe(takeUntil(this.destroy$)).subscribe((result) => {
        if (!result) return;
        this.s.modifyGvSchema(this.tableAPI.tableControllerUpdateColumn(
          this.pkProject, this.pkEntity, this.a.account.id, this.defaultLanguage.pk_entity, result.cols)
          , this.pkProject);
      });
  }

  preNewRow(newPosition: number) {
    this.newRowTemp.position = newPosition;
    this.newRowTemp.cells = this.headers.map(h => ({ text: '', pkCell: -1, pkRow: -1, pkColumn: h.pk_column }))
    this.newRowTemp.cells[0].text = newPosition + '';
  }

  newRow(row: Row) {
    this.tableAPI.tableControllerNewRow(this.pkProject, this.pkEntity, row.position).subscribe(newRow => {
      const cells = row.cells
        .slice(1)
        .filter(cell => cell.text != '')
        .map(cell => {
          const toReturn: TabCell = {
            fk_digital: this.pkEntity,
            fk_row: parseInt(newRow.pk_row + '', 10),
            fk_column: cell.pkColumn
          }
          const type = this.headers.find(h => h.pk_column == cell.pkColumn).type;
          if (type == 'number') toReturn.numeric_value = parseFloat(cell.text);
          else toReturn.string_value = cell.text;
          return toReturn;
        })
        .filter(c => c.string_value != undefined || !isNaN(c.numeric_value))


      this.createCells(cells).subscribe(newCells => {
        this.newRowTemp = { position: -1, cells: [] };
        this.reload$.next(this.reload$.value + 1) // trick to reload the content
      })
    })
  }

  cancelNewRow() {
    this.newRowTemp = { position: -1, cells: [] };
  }

  createCells(cells: Array<TabCell>): Observable<TabCells> {
    return this.tableAPI.tableControllerInsertOrUpdateCells(this.pkProject, this.pkEntity, { cells })
  }

  deleteRow(pkRow: number) {
    this.tableAPI.tableControllerDeleteRow(this.pkProject, this.pkEntity, pkRow).subscribe(x => {
      this.reload$.next(this.reload$.value + 1);
    })
  }

  moveRow(pkRow: number, newPosition: number) {
    this.tableAPI.tableControllerMoveRow(this.pkProject, this.pkEntity, pkRow, newPosition).subscribe(x => {
      this.reload$.next(this.reload$.value + 1);
    })
  }

}
