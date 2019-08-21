import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { PropertyListComponentInterface, ListDefinition, TemporalEntityItem, FieldDefinition, TemporalEntityCellValue } from '../properties-tree/properties-tree.models';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { ActiveProjectService, EntityPreview, InfRole } from 'app/core';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { MatTableDataSource, MatPaginator, PageEvent } from '../../../../../../node_modules/@angular/material';
import { first, map, switchMap, takeUntil, startWith, distinct } from '../../../../../../node_modules/rxjs/operators';
import { clone, indexBy, mapObjIndexed, sum, omit } from 'ramda';
import { InfActions } from '../../../../core/inf/inf.actions';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';


export interface Row {
  _pkEntity_: number
  _role_: InfRole
  [colName: string]: TemporalEntityCellValue | number | InfRole
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


  table: TemporalEntityTable;
  limit$ = new BehaviorSubject(5)
  offset$ = new BehaviorSubject(0);

  constructor(
    public p: ActiveProjectService,
    public c: ConfigurationPipesService,
    public t: PropertiesTreeService,
    public i: InformationPipesService,
    public inf: InfActions

  ) { }

  ngOnInit() {

    this.items$ = combineLatest(
      this.limit$.pipe(),
      this.offset$.pipe()
    ).pipe(
      switchMap(([limit, offset]) => this.i.pipeListTemporalEntity(this.listDefinition, this.pkEntity, this.appContext, limit, offset)
      )
    )

    // get columns of this temporal entity
    const columDefs$ = this.c.pipeFieldDefinitions(this.listDefinition.targetClass, this.appContext)
    this.table = new TemporalEntityTable(this.items$, columDefs$, this.destroy$, this.listDefinition, {
      columnsBefore: ['_classInfo_'],
      columnsAfter: ['_actions_']
    });

    // get length of items
    this.itemsCount$ = this.i.pipeListLength(this.listDefinition, this.pkEntity)

  }

  onPageChange(e: PageEvent) {
    this.offset$.next(e.pageIndex)
    this.limit$.next(e.pageSize)
  }


  remove(item: Row) {
    // remove the temporal entity and all the roles, text-properties loaded in app cache
    // so that they are removed from project's app cache
    combineLatest(
      this.i.pipeTemporalEntityRemoveProperties(item._pkEntity_),
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



export class TemporalEntityTable {

  public dataSource = new MatTableDataSource<Row>();

  // table view
  dataColumnsMap$ = new BehaviorSubject<{ [key: string]: boolean }>({});

  dataColumns$: Observable<string[]>;
  displayedColumns$: Observable<string[]>;

  constructor(
    public items$: Observable<TemporalEntityItem[]>,
    public columDefs$: Observable<FieldDefinition[]>,
    public destroy$,
    public listDefinition,
    customColumns: { columnsBefore: string[], columnsAfter: string[] }
  ) {

    // get array of data column names
    this.dataColumns$ = this.dataColumnsMap$.pipe(first(), map(d => Object.keys(d)))

    this.displayedColumns$ = combineLatest(this.dataColumnsMap$).pipe(
      map(([dataColumnsMap]) => {

        let checked = []
        for (const key in dataColumnsMap) {
          if (dataColumnsMap[key]) checked.push(key);
        }
        checked = [...customColumns.columnsBefore, ...checked, ...customColumns.columnsAfter]
        if (checked.length === 0) checked.push('_empty_')

        return checked

      })
    )

    this.columDefs$.pipe(first(fs => fs.length > 0), takeUntil(destroy$)).subscribe((fieldDefinitions) => {
      const dataColumnsMap = mapObjIndexed((val, key, obj) => true, indexBy((l) => l.label, fieldDefinitions))
      const circularField = fieldDefinitions.find(f => f.pkProperty === listDefinition.fkPropertyOfOrigin);
      if (circularField) {
        // hideCircularField
        const circularCol = circularField.label;
        dataColumnsMap[circularCol] = false;
      }
      this.dataColumnsMap$.next(dataColumnsMap)
    })


    this.items$.pipe(
      map((items) => items.map(item => {
        const _pkEntity_ = this.listDefinition.isOutgoing ? item.role.fk_entity : item.role.fk_temporal_entity;
        const _role_ = item.role;

        const row: Row = { _pkEntity_, _role_ };
        item.cellDefinitions.forEach((cellDefinition) => {
          row[cellDefinition.fieldDefinition.label] = cellDefinition.cellValue
        })
        return row;
      }))
    ).pipe(takeUntil(this.destroy$)).subscribe((rows) => {
      this.dataSource.data = rows;
    })

  }

  toggleCol(x: string) {
    this.dataColumnsMap$.pipe(first()).subscribe(map => {
      map[x] = !map[x];
      this.dataColumnsMap$.next(map)
    })
  }


}
