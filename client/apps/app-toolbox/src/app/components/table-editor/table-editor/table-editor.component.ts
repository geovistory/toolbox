import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DfhConfig, SysConfig } from '@kleiolab/lib-config';
import { ConfigurationPipesService, StateFacade } from '@kleiolab/lib-redux';
import { DatColumn, FactoidMapping, GetTablePageOptions, InfLanguage, TColFilter, TabCell, TabCells, TableConfig, TableRow, TableService } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { equals, indexBy, values } from 'ramda';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ActiveAccountService } from '../../../services/active-account.service';
import { EditModeService } from '../../../services/edit-mode.service';
import { TableDetailComponent } from '../../layout/tab-bodies/table-detail/table-detail.component';
import { InfoDialogComponent, InfoDialogData, InfoDialogReturn } from '../../misc/info-dialog/info-dialog.component';
import { FactoidMappingsDialogComponent, FactoidMappingsDialogData } from '../factoids/factoid-mappings-dialog/factoid-mappings-dialog.component';
import { TableConfigDialogComponent, TableConfigDialogData, TableConfigDialogResult } from '../table-config-dialog/table-config-dialog.component';
import { Cell, Header, Row, TableComponent, TableSort } from '../table/table.component';

export interface TColFilters {
  [pkColumn: string]: TColFilter
}

@Component({
  selector: 'gv-table-editor',
  templateUrl: './table-editor.component.html',
  styleUrls: ['./table-editor.component.scss'],
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, MatPaginatorModule, MatButtonModule, MatMenuModule, MatIconModule, MatSlideToggleModule, TableComponent, NgIf, MatCardModule, AsyncPipe]
})
export class TableEditorComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number; // Primary key of the table digital to be viewed or edited
  filterOnRow: number; // the row on which to filter on
  showIds$ = new BehaviorSubject(false);

  readonly dtText = SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_TEXT;
  readonly dtNumeric = SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_NUMERIC;

  // fetched rows
  rows$: Observable<TableRow[]>

  // config params, trigger api calls (need to generate sql on backend). Updated BEFORE api calls
  pageSize$ = new BehaviorSubject(20)
  pageIndex$ = new BehaviorSubject(0)
  sortBy$ = new BehaviorSubject<string>('index')
  sortDirection$ = new BehaviorSubject<GetTablePageOptions.SortDirectionEnum>('ASC');
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
  headers$: Observable<Array<Header>>;
  table$: Observable<Array<Array<Cell>>>;
  sortByIndex$ = new BehaviorSubject<TableSort>({ pkColumn: -1, colNb: -1, direction: 'ASC' });
  currentSortIndex: { colNb: number, direction: string, colName: string };

  // for creating new rows
  reload$ = new BehaviorSubject<number>(0);
  newRowTemp: Row = { position: -1, cells: [] };
  headers: Array<Header>;

  pkProject: number;
  accountId: number;
  constructor(
    public ref: ChangeDetectorRef,
    private tableAPI: TableService,
    private state: StateFacade,
    private c: ConfigurationPipesService,
    private a: ActiveAccountService,
    private dialog: MatDialog,
    @Optional() private tableDetailComponenent: TableDetailComponent,
    public editMode: EditModeService
  ) { }

  ngOnInit(): void {
    this.filterOnRow = this?.tableDetailComponenent?.tab.data.filterOnRow;
    this.pkProject = this.state.pkProject;
    // get the table columns and the table config and put everything in the store
    this.state.data.getTableColumns(this.pkProject, this.pkEntity)
    this.state.data.getTableConfig(this.pkProject, this.pkEntity)

    // listen to config changes
    this.tableConfig$ = this.state.data.pro.tableConfig.getTableConfig.byFkDigital$(this.pkEntity).pipe(
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
        sortBy,
        sortDirection,
        filters,
        config,
        reload
      ]) => this.tableAPI.tableControllerGetTablePage(this.pkProject, this.pkEntity, {
        limit: pageSize,
        offset: pageSize * pageIndex,
        columns: config.columns.map(tc => tc.fkColumn + ''),
        sortBy,
        sortDirection,
        filters: filters,
        filterOnRow: this.filterOnRow
      })),
      tap((res) => { this.loading = false; }),
      shareReplay({ bufferSize: 1, refCount: true })
    )

    // get max rows of a 'table fetch'
    this.length$ = res$.pipe(map(res => res.length))

    // get only the DatColumn that will be displayed (in the right order)
    this.columns$ = combineLatest([
      this.tableConfig$,
      this.state.data.dat.column.getColumn.byFkDigital$(this.pkEntity)
    ]).pipe(
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
            this.state.data.dat.textProperty.getTextProperty.byFkEntityAndSysType$(col.pk_entity, 3295),
            this.state.data.dat.classColumnMapping.getClassColumnMapping.byFkColumn$(col.pk_entity),
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
                  icon: this.state.data.dfh.klass.select.byPkClass(mapping.fk_class).pipe(
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
    ).pipe(
      map(c => [{ colLabel: 'Index', comment: 'number', type: 'number', pk_column: -1 } as Header].concat(c))
      // we add the first column: Indexes
    )
    this.headers$.subscribe(hs => this.headers = hs);

    // set the table: for table.component
    this.table$ = combineLatest([this.headers$, res$]).pipe(
      map(([headers, res]) => {
        const table: Array<Array<{ text: string, pkCell: number, pkColumn: number, pkRow: number }>> = [];
        for (let i = 0; i < res.rows.length; i++) {
          const row = res.rows[i];
          const keys = Object.keys(row);
          table[i] = [];
          table[i][0] = { text: row['index'].toString(), pkCell: -1, pkColumn: -1, pkRow: row.pk_row };
          for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            // if (key == 'index') continue;
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
    this.state.data.getProjectLanguage(this.pkProject).subscribe(lang => this.defaultLanguage = lang);
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

  onSortChange(sortOpt: TableSort) {
    this.sortDirection$.next(sortOpt.direction);
    this.sortBy$.next(sortOpt.pkColumn == - 1 ? 'index' : sortOpt.pkColumn + '');
  }


  tableConfiguration() {
    this.editMode.setValue(false)
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
        this.state.data.updateTableColumn(this.pkProject, this.pkEntity, this.a.account.id, this.defaultLanguage.pk_entity, result.cols)
      });
  }
  factoidMapping() {
    this.editMode.setValue(false)
    this.dialog.open<FactoidMappingsDialogComponent, FactoidMappingsDialogData, Array<FactoidMapping>>(
      FactoidMappingsDialogComponent, {
      height: 'calc(100% - 30px)',
      width: '1000px',
      maxWidth: '100%',
      data: { pkTable: this.pkEntity }
    }).afterClosed()
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

      if (row.position < this.pageIndex$.value * this.pageSize$.value
        || row.position > (this.pageIndex$.value + 1) * this.pageSize$.value) {
        this.dialog.open<InfoDialogComponent,
          InfoDialogData, InfoDialogReturn>(InfoDialogComponent, {
            maxWidth: '500px',
            data: {
              title: 'New row created',
              infos: 'Because you are displaying rows from ' + (this.pageIndex$.value * this.pageSize$.value + 1)
                + ' to ' + ((this.pageIndex$.value + 1) * this.pageSize$.value)
                + ', and the new row is at position ' + row.position
                + ', you will not see the new entry on this page. You have to navigate to the right page to display it.'
            }
          });
      }
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

  toggleIds() {
    this.newRowTemp = { position: -1, cells: [] };

    this.showIds$.next(!this.showIds$.value)
    if (this.showIds$.value && this.editMode.value$.value) {
      this.editMode.setValue(false)
    }
  }


  removeFilterOnRow() {
    this.filterOnRow = undefined;
    this.reload$.next(this.reload$.value + 1) // trick to reload the content
  }

}
