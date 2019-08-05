import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { PropertyListComponentInterface, ListDefinition, TemporalEntityItem, FieldDefinition, TemporalEntityCellValue } from '../properties-tree/properties-tree.models';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { ActiveProjectService, EntityPreview } from 'app/core';
import { PropertyTreeService } from '../properties-tree/properties-tree.service';
import { MatTableDataSource, MatPaginator } from '../../../../../../node_modules/@angular/material';
import { first, map, switchMap, takeUntil, startWith } from '../../../../../../node_modules/rxjs/operators';
import { clone, indexBy, mapObjIndexed, sum, omit } from 'ramda';
import { InfActions } from '../../../../core/inf/inf.actions';


interface Row {
  _pkEntity_: number
  [colName: string]: TemporalEntityCellValue | number
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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  table: TemporalEntityTable;

  constructor(
    public p: ActiveProjectService,
    public t: PropertyTreeService,
    public inf: InfActions

  ) { }

  ngOnInit() {
    this.items$ = this.t.pipeTemporalEntityList(this.listDefinition, this.pkEntity, this.appContext)

    // get columns of this temporal entity
    const columDefs$ = this.t.pipeFieldDefinitions(this.listDefinition.targetClass, this.appContext)
    this.table = new TemporalEntityTable(this.items$, columDefs$, this.showOntoInfo$, this.destroy$, this.listDefinition);

    // get length of items
    this.itemsCount$ = this.items$.map(i => (i || []).length)

  }

  ngAfterViewInit() {

    this.table.afterViewInit(this.paginator)

  }



  remove(item: Row) {
    // remove the temporal entity and all the roles, text-properties loaded in app cache
    // so that they are removed from project's app cache
    combineLatest(
      this.t.pipeTemporalEntityRemoveProperties(item._pkEntity_),
      this.p.pkProject$
    ).pipe(first(), takeUntil(this.destroy$)).subscribe(([d, pkProject]) => {

      this.inf.temporal_entity.remove([d.temporalEntity], pkProject);
      if (d.roles.length) this.inf.role.remove(d.roles, pkProject);
      if (d.textProperties.length) this.inf.text_property.remove(d.textProperties, pkProject)

    })

    // remove the temporal entity using a backend-function that removes all related roles,
    // text-properties, even if not loaded in app cache
  }

  openInNewTab(item: Row) {
    this.p.addEntityTeEnTab(item._pkEntity_)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}



class TemporalEntityTable {

  public dataSource = new MatTableDataSource<Row>();

  // table view
  dataColumnsMap$ = new BehaviorSubject<{ [key: string]: boolean }>({});

  dataColumns$: Observable<string[]>;
  displayedColumns$: Observable<string[]>;

  constructor(public items$: Observable<TemporalEntityItem[]>, public columDefs$: Observable<FieldDefinition[]>, public  showOntoInfo$, public destroy$, public listDefinition) {

    // get array of data column names
    this.dataColumns$ = this.dataColumnsMap$.pipe(first(), map(d => Object.keys(d)))

    this.displayedColumns$ = combineLatest(showOntoInfo$, this.dataColumnsMap$).pipe(
      map(([showOntoInfo, dataColumnsMap]) => {

        let checked = []
        for (const key in dataColumnsMap) {
          if (dataColumnsMap[key]) checked.push(key);
        }

        if (showOntoInfo) checked = ['_ontoInfo_', ...checked]
        if (checked.length === 0) checked.push('_empty_')

        return [...checked, '_actions_'];

      })
    )

    this.columDefs$.pipe(first(fs => fs.length > 0), takeUntil(destroy$)).subscribe((fieldDefinitions) => {
      const dataColumnsMap = mapObjIndexed((val, key, obj) => true, indexBy((l) => l.label, fieldDefinitions))
      // hideCircularField
      const circularCol = fieldDefinitions.find(f => f.pkProperty === listDefinition.fkPropertyOfOrigin).label;
      dataColumnsMap[circularCol] = false;
      this.dataColumnsMap$.next(dataColumnsMap)
    })

  }

  toggleCol(x: string) {
    this.dataColumnsMap$.pipe(first()).subscribe(map => {
      map[x] = !map[x];
      this.dataColumnsMap$.next(map)
    })
  }

  afterViewInit(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;

    this.items$.pipe(
      map((items) => items.map(item => {
        const _pkEntity_ = this.listDefinition.isOutgoing ? item.role.fk_entity : item.role.fk_temporal_entity;

        const row: Row = { _pkEntity_ };
        item.cellDefinitions.forEach((cellDefinition) => {
          row[cellDefinition.fieldDefinition.label] = cellDefinition.cellValue
        })
        return row;
      }))
    ).pipe(takeUntil(this.destroy$)).subscribe((rows) => {
      this.dataSource.data = rows;
    })
  }


}
