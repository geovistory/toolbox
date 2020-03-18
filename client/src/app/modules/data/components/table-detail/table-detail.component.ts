import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, DatDigitalApi, DatColumn, SysConfig } from 'app/core';
import { TabLayoutComponentInterface } from 'app/modules/projects/containers/project-edit/project-edit.component';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { first, map, takeUntil, shareReplay, distinctUntilChanged, switchMap, tap, filter, debounceTime, auditTime } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { equals, values, without, indexBy, pick, keys, omit } from 'ramda';
import { FormControl } from '@angular/forms';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';
import { TColFilters, TColFilter } from '../../../../../../../src/server/table/interfaces'

// TODO import this interface from backend
interface TabCell {
  pk_cell: number;
  string_value?: string;
  numeric_value?: number;
}
// TODO import this interface from backend
interface TabRow {
  pk_row: number,
  [key: number]: TabCell
}



@Component({
  selector: 'gv-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements OnInit, OnDestroy, TabLayoutComponentInterface {
  destroy$ = new Subject<boolean>();

  // path to the substore
  @Input() basePath: string[];

  // Primary key of the text digital to be viewed or edited
  @Input() pkEntity: number;

  t: TabLayout;

  readonly dtText = SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_TEXT;
  readonly dtNumeric = SysConfig.PK_SYSTEM_TYPE__DATA_TYPE_NUMERIC;


  rows$: Observable<TabRow[]>

  colToggleOptions$: Observable<{
    display: string,
    value: number,
    datColumn: DatColumn
  }[]>

  // total number of records in table
  length$: Observable<number[]>;

  pageSize$ = new BehaviorSubject(20)

  pageIndex$ = new BehaviorSubject(0)

  colToggleCtrl = new FormControl([])
  queriedCols: number[] = [];
  firstApiCall = true;

  columns$: Observable<{
    display: string,
    value: number,
    datColumn: DatColumn
  }[]>
  columnLabels: { [key: number]: string } = {}

  loading = false;

  sortBy$ = new BehaviorSubject<string | number>('pk_row')
  sortDirection$ = new BehaviorSubject<'ASC' | 'DESC'>('ASC');

  filters$ = new BehaviorSubject<TColFilters>({});


  colFiltersEnabled = false;
  colMetaDataVisible = false;
  height = 300;

  constructor(
    public ref: ChangeDetectorRef,
    private digitalApi: DatDigitalApi,
    private p: ActiveProjectService
  ) {

  }

  ngOnInit() {
    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.p.dat$.column.loadColumnsOfTable(this.pkEntity, pkProject);
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
      ]) => this.digitalApi.getTablePage(pkProject, this.pkEntity, {
        limit: pageSize,
        offset: pageSize * pageIndex,
        columns: this.colToggleCtrl.value,
        sortBy,
        sortDirection,
        filters: this.filters$.value
      })),
      tap(() => {
        this.loading = false
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    )

    this.rows$ = res$.pipe(
      map(res => res.rows)
    )

    this.length$ = res$.pipe(
      map(res => res.length)
    )

    // Update this.queriedCols with columns returned by rest api
    res$.pipe(
      map(res => res.columns),
      distinctUntilChanged<number[]>(equals),
      takeUntil(this.destroy$)
    ).subscribe(columns => {
      this.queriedCols = columns;
    })

    /**
     * Get all columns and add them to the column toggle
     */
    this.colToggleOptions$ = this.p.dat$.column$.by_fk_digital$.key(this.pkEntity).pipe(
      map(indexedCols => values(indexedCols).map(col => col)),
      tap(cols => {
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

  onSortChange(colName: string) {
    if (this.sortBy$.value === colName) {
      this.sortDirection$.next(this.sortDirection$.value === 'ASC' ? 'DESC' : 'ASC')
    } else {
      this.sortBy$.next(colName);
      this.sortDirection$.next('ASC')
    }
  }

  onFilterChange(colName: string, filter: TColFilter | null) {
    let filters: TColFilters;
    if (filter) {
      filters = {
        ...this.filters$.value,
        [colName]: filter
      }
    } else {
      filters = omit([colName], this.filters$.value)
    }
    this.filters$.next(filters)
  }

  // cleanupFilters(filters) {
  //   const f = {};
  //   [... this.colToggleCtrl.value, 'pk_row']
  //     .forEach(col => {
  //       if (filters[col]) {
  //         f[col] = filters[col];
  //       }
  //     });
  //   filters = f;
  //   return filters
  // }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
