import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { PropertyListComponentInterface, ListDefinition, TemporalEntityItem } from '../properties-tree/properties-tree.models';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Observable, Subject } from 'rxjs';
import { ActiveProjectService } from 'app/core';
import { PropertyTreeService } from '../properties-tree/properties-tree.service';
import { MatTableDataSource, MatPaginator } from '../../../../../../node_modules/@angular/material';
import { first, map, switchMap, takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { clone, indexBy, mapObjIndexed } from 'ramda';
interface Cell {
  listDefinition: ListDefinition,
  items: any[],
  label: string
}

interface Row {
  [colName: string]: Cell
}

@Component({
  selector: 'gv-temporal-entity-list',
  templateUrl: './temporal-entity-list.component.html',
  styleUrls: ['./temporal-entity-list.component.scss']
})
export class TemporalEntityListComponent implements OnInit, OnDestroy, PropertyListComponentInterface {

  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;

  @Input() listDefinition: ListDefinition;
  @Input() treeControl: NestedTreeControl<ListDefinition>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;

  @Input() appContext: number;

  items$: Observable<TemporalEntityItem[]>
  itemsCount$: Observable<number>

  // table view
  dataColumnsMap: { [key: string]: boolean };
  checkedDataColumns: string[];
  dataColumns: string[];
  displayedColumns: string[];

  dataSource = new MatTableDataSource<Row>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public p: ActiveProjectService,
    public t: PropertyTreeService
  ) { }

  ngOnInit() {
    this.items$ = this.t.pipeTemporalEntityList(this.listDefinition, this.pkEntity, this.appContext)

    // get columns of this temporal entity
    const listDefs$ = this.p.crm$.pipe(
      first(c => !!c),
      map(crm => {
        const p = crm.properties[this.listDefinition.pkProperty];
        return this.listDefinition.isOutgoing ? p.dfh_has_range : p.dfh_has_domain;
      }),
      switchMap(targetClass => this.t.pipeListDefinitions(targetClass, this.appContext))
    )

    listDefs$.pipe(first(listDefinitions => listDefinitions.length > 0), takeUntil(this.destroy$)).subscribe((listDefinitions) => {

      this.dataColumnsMap = mapObjIndexed((val, key, obj) => true, indexBy((l) => l.label, listDefinitions))
      this.dataColumns = Object.keys(this.dataColumnsMap)
      this.updateColumnParams();
      this.itemsCount$ = this.items$.map(i => (i || []).length)

      this.items$.pipe(
        map((items) => items.map(item => {
          const row: Row = {};
          item.properties.forEach((p) => {
            row[p.listDefinition.label] = {
              items: p.items,
              label: p.items.length ? p.items[0].label : '',
              listDefinition: p.listDefinition
            }
          })
          return row;
        }))

      ).pipe(takeUntil(this.destroy$)).subscribe((rows) => {
        this.dataSource.data = rows;
      })
    })

  }


  toggleCol(x: string) {
    this.dataColumnsMap[x] = !this.dataColumnsMap[x];
    this.updateColumnParams()
  }

  updateColumnParams() {
    this.checkedDataColumns = []
    for (const key in this.dataColumnsMap) {
      if (this.dataColumnsMap[key]) {
        this.checkedDataColumns.push(key);
      }
    }
    if (this.checkedDataColumns.length === 0) this.checkedDataColumns.push('empty')
    this.displayedColumns = [...this.checkedDataColumns, 'actions'];
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
