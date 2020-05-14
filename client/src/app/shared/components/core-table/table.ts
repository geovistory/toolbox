import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { coerceBoolean } from './coerce-boolean';
import { CoreTableDataSource } from './data-source';
import { CoreTableFilterComponent } from './filter/filter.component';
import { CoreTableMenuComponent } from './menu/menu.component';

export class CoreTable<T> implements AfterViewInit, OnInit {
  @Input()
  get pending(): boolean {
    return this._pending;
  }
  set pending(pending: boolean) {
    this._pending = coerceBoolean(pending);
  }
  private _pending: boolean;

  @Output() select = new Subject<T[]>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(CdkVirtualScrollViewport, /* TODO: check static flag */ { static: true }) viewport: CdkVirtualScrollViewport;
  @ViewChild(CoreTableMenuComponent, { static: false }) tableMenu: CoreTableMenuComponent;
  @ViewChildren(CoreTableFilterComponent) filters: QueryList<CoreTableFilterComponent>;

  dataSource: CoreTableDataSource<T>;
  columns: string[];

  get indeterminate(): boolean {
    return this.dataSource.selected.length > 0 && !this.selectedAll;
  }

  get length(): number {
    return this.dataSource.data.length;
  }

  get selectedAll(): boolean {
    return this.dataSource.selectedAll;
  }

  constructor() {
  }

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    if (this.filters.length && this.tableMenu == null) {
      // this just hides the table data by introducing a bogus filter.
      // not having a clear filters button hopefully makes the error obvious.
      this.dataSource.setFilter({ key: '', predicate: () => null, valueFn: () => { } });
      // this notifies the error to the dev
      throw new Error(`<core-table-filter> usage requires a <core-table-menu> for user convenience`);
    }
    this.afterViewInit()
  }

  private init() {
    // already init'd short-circuit/guard
    if (this.dataSource) {
      return;
    }

    if (hasObservers(this.select)) {
      this.columns = ['select', ...this.columns];
    }

    this.dataSource = new CoreTableDataSource([], {
      sort: this.sort,
      paginator: this.paginator,
      viewport: this.viewport,
    });
    this.dataSource.selectionChanged.subscribe(() =>
      this.select.next(this.dataSource.selected)
    );

    this.onInit();
  }

  clearFilters(): void {
    this.dataSource.clearFilters();
    this.filters.forEach(fc => fc.filter.setValue(null));
  }

  clearSelection(): void {
    this.dataSource.clearSelection();
  }

  filter(
    key: string,
    predicate: (value: any) => boolean,
    valueFn: (item: T) => any
  ): void {
    this.dataSource.setFilter({ key, predicate, valueFn });
  }

  isSelected(item: T): boolean {
    return this.dataSource.isSelected(item);
  }

  toggle(item: T): void {
    this.dataSource.toggle(item);
  }

  toggleAll(): void {
    this.dataSource.toggleAll();
  }

  /**
   * Override this methods to execute during ngOnInit
   */
  protected onInit() { }
  protected afterViewInit() { }

  /**
   * Sets the data for dataSource usage
   */
  protected set(data: T[]): void {
    this.init();
    this.dataSource.allData = data;
  }
}

function hasObservers(subject: Subject<any>): boolean {
  return subject.observers.length > 0;
}
