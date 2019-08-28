import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService } from 'app/core';
import { equals } from 'ramda';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { PageEvent } from '../../../../../../node_modules/@angular/material';
import { distinctUntilChanged, first, map, shareReplay, switchMap, takeUntil, tap } from '../../../../../../node_modules/rxjs/operators';
import { InfActions, LoadPaginatedTeEnListMeta } from '../../../../core/inf/inf.actions';
import { PaginateByParam } from '../../../../core/store/actions';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { FieldDefinition, ListDefinition, PropertyListComponentInterface, TemporalEntityItem, TemporalEntityTableI } from '../properties-tree/properties-tree.models';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { TemporalEntityTable } from './TemporalEntityTable';



export const temporalEntityListDefaultLimit = 5;
export const temporalEntityListDefaultPageIndex = 0;

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

  rows$: Observable<TemporalEntityItem[]>
  items$;
  itemsCount$: Observable<number>


  table: TemporalEntityTable;
  limit$ = new BehaviorSubject(temporalEntityListDefaultLimit)
  pageIndex$ = new BehaviorSubject(temporalEntityListDefaultPageIndex);
  offset$: Observable<number>;

  constructor(
    public p: ActiveProjectService,
    public c: ConfigurationPipesService,
    public t: PropertiesTreeService,
    public i: InformationPipesService,
    public inf: InfActions,

  ) {
    this.offset$ = combineLatest(this.limit$, this.pageIndex$).pipe(
      map(([limit, pageIndex]) => limit * pageIndex)
    )
  }

  ngOnInit() {

    // custom temporal entity table columns
    let customCols = {
      columnsBefore: ['_classInfo_'],
      columnsAfter: ['_actions_']
    }

    // table loading ect
    const pagination$ = combineLatest(
      this.limit$.pipe(),
      this.offset$.pipe(),
      this.p.pkProject$
    ).pipe(shareReplay({ refCount: true, bufferSize: 1 }))

    const paginateBy: PaginateByParam[] = createPaginateBy(this.listDefinition, this.pkEntity)

    pagination$.pipe(
      switchMap(([limit, offset]) => {
        return this.p.inf$.role$.pagination$.pipePageLoadNeeded(paginateBy, limit, offset)
      }, ([limit, offset, pkProject], loadNeeded) => {
        if (loadNeeded) {
          this.inf.temporal_entity.loadPaginatedList(pkProject, this.pkEntity, this.listDefinition.pkProperty, this.listDefinition.isOutgoing, limit, offset)
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe()

    const columns$ = this.c.pipeFieldDefinitions(this.listDefinition.targetClass, this.appContext)

    this.rows$ = combineLatest(pagination$, columns$).pipe(
      distinctUntilChanged(equals),
      switchMap(([[limit, offset, pkProject], columns]) => this.i.pipeTemporalEntityTableRows(
        paginateBy,
        limit,
        offset,
        pkProject,
        this.listDefinition,
        columns
      )),
      shareReplay({ refCount: true, bufferSize: 1 }),
    )

    this.table = new TemporalEntityTable(this.rows$, columns$, this.destroy$, this.listDefinition, customCols);

    this.itemsCount$ = this.p.inf$.role$.pagination$.pipeCount(paginateBy)

  }

  onPageChange(e: PageEvent) {
    this.pageIndex$.next(e.pageIndex)
    this.limit$.next(e.pageSize)
  }


  remove(item: TemporalEntityItem) {
    // remove the temporal entity and all the roles, text-properties loaded in app cache
    // so that they are removed from project's app cache
    combineLatest(
      this.i.pipeTemporalEntityRemoveProperties(item.pkEntity),
      this.p.pkProject$
    ).pipe(first(), takeUntil(this.destroy$)).subscribe(([d, pkProject]) => {

      this.inf.temporal_entity.remove([d.temporalEntity], pkProject);
      if (d.roles.length) this.inf.role.remove(d.roles, pkProject);
      if (d.textProperties.length) this.inf.text_property.remove(d.textProperties, pkProject)

    })

    // remove the temporal entity using a backend-function that removes all related roles,
    // text-properties, even if not loaded in app cache
  }

  openInNewTab(item: TemporalEntityItem) {
    this.p.addEntityTeEnTab(item.pkEntity)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}


export function createPaginateBy(listDefinition: ListDefinition, pkEntity: number): PaginateByParam[] {
  if (listDefinition.listType === 'temporal-entity') {
    return [
      { fk_property: listDefinition.pkProperty },
      { [listDefinition.isOutgoing ? 'fk_temporal_entity' : 'fk_entity']: pkEntity }
    ];
  }
}
