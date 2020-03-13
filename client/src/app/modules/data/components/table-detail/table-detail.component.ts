import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, DatDigitalApi } from 'app/core';
import { TabLayoutComponentInterface } from 'app/modules/projects/containers/project-edit/project-edit.component';
import { TabLayout } from 'app/shared/components/tab-layout/tab-layout';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { first, map, takeUntil, shareReplay, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { equals } from 'ramda';

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

  rows$: Observable<TabRow[]>

  columns$ = new BehaviorSubject([] as number[])

  // total number of records in table
  length$: Observable<number[]>;

  pageSize$ = new BehaviorSubject(20)

  pageIndex$ = new BehaviorSubject(0)


  constructor(
    public ref: ChangeDetectorRef,
    private digitalApi: DatDigitalApi,
    private p: ActiveProjectService
  ) { }

  ngOnInit() {
    this.t = new TabLayout(this.basePath[2], this.ref, this.destroy$);

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.p.dat$.column.loadColumnsOfTable(this.pkEntity, pkProject);
    })

    const loadConfig$ = combineLatest(
      this.pageSize$,
      this.pageIndex$,
      this.p.pkProject$,
      this.columns$
    ).pipe(shareReplay({ refCount: true, bufferSize: 1 }))

    const res$ = loadConfig$.pipe(
      distinctUntilChanged(equals),
      switchMap(([
        pageSize,
        pageIndex,
        pkProject,
        columns
      ]) => this.digitalApi.getTablePage(pkProject, this.pkEntity, {
        limit: pageSize,
        offset: pageSize * pageIndex,
        columns
      })),
      shareReplay({ bufferSize: 1, refCount: true })
    )

    this.rows$ = res$.pipe(
      map(res => res.rows)
    )

    this.length$ = res$.pipe(
      map(res => res.length)
    )

    res$.pipe(
      map(res => res.columns),
      distinctUntilChanged<number[]>(equals),
      takeUntil(this.destroy$)
    ).subscribe(columns => {
      this.columns$.next(columns)
    })
  }


  onPageChange(e: PageEvent) {
    this.pageIndex$.next(e.pageIndex)
    this.pageSize$.next(e.pageSize)
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
