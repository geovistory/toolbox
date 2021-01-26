import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, InfStatementApi } from 'app/core';
import { equals } from 'ramda';
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { PageEvent } from '../../../../../../node_modules/@angular/material';
import { distinctUntilChanged, first, map, shareReplay, switchMap, takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { InfActions } from '../../../../core/inf/inf.actions';
import { PaginateByParam } from '../../../../core/redux-store/actions';
import { ConfigurationPipesService } from '../../../../core/redux-queries/services/configuration-pipes.service';
import { InformationPipesService } from '../../services/information-pipes.service';
import { PaginationService } from '../../services/pagination.service';
import { ListDefinition, PropertyListComponentInterface, TemporalEntityItem, TemporalEntityCell } from '../properties-tree/properties-tree.models';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { TemporalEntityTable } from './TemporalEntityTable';
import { EntityPreviewsPaginatedDialogService } from 'app/shared/components/entity-previews-paginated/service/entity-previews-paginated-dialog.service';



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

  // @Input() appContext: number;

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
    public statementApi: InfStatementApi,
    private paginationService: PaginationService,
    private listDialog: EntityPreviewsPaginatedDialogService
  ) {
    this.offset$ = combineLatest(this.limit$, this.pageIndex$).pipe(
      map(([limit, pageIndex]) => limit * pageIndex)
    )
  }

  ngOnInit() {

    // custom temporal entity table columns
    const customCols = {
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

    const nextPage$ = new Subject();
    pagination$.pipe(
      distinctUntilChanged(equals),
      takeUntil(this.destroy$)
    ).subscribe(([limit, offset, pkProject]) => {
      nextPage$.next()
      this.paginationService.temporalEntity.addPageLoader(
        pkProject,
        this.listDefinition,
        this.pkEntity,
        limit,
        offset,
        merge(nextPage$, this.destroy$)
      )
    })

    const columns$ = this.c.pipeFieldDefinitionsSpecificFirst(this.listDefinition.targetClass)

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

    this.itemsCount$ = this.p.inf$.statement$.pagination$.pipeCount(paginateBy)

  }

  onPageChange(e: PageEvent) {
    this.pageIndex$.next(e.pageIndex)
    this.limit$.next(e.pageSize)
  }


  remove(item: TemporalEntityItem) {
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {

      // remove the statement
      this.inf.statement.remove([item.statement], pkProject)

      // remove the related temporal entity
      this.p.removeEntityFromProject(item.pkEntity)
    })
    // combineLatest(
    //   this.i.pipeTemporalEntityRemoveProperties(item.pkEntity),
    //   this.p.pkProject$
    // ).pipe(first(), takeUntil(this.destroy$)).subscribe(([d, pkProject]) => {

    //   this.inf.temporal_entity.remove([d.temporalEntity], pkProject);
    //   if (d.statements.length) this.inf.statement.remove(d.statements, pkProject);
    //   if (d.textProperties.length) this.inf.text_property.remove(d.textProperties, pkProject)

    // })

  }

  openList(cell: TemporalEntityCell) {
    const pkEntities = cell.items.map(i => cell.isOutgoing ? i.statement.fk_object_info : i.statement.fk_subject_info)
    this.listDialog.open(true, pkEntities, 'Items')
  }

  openInNewTab(item: TemporalEntityItem) {
    this.p.addEntityTab(item.pkEntity, this.listDefinition.targetClass, 'teEn')
  }

  addAndOpenInNewTab(item: TemporalEntityItem) {
    this.p.addEntityToProject(item.pkEntity, () => {
      this.openInNewTab(item)
    })
  }

  markAsFavorite(item: TemporalEntityItem) {
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.p.pro$.info_proj_rel.markStatementAsFavorite(pkProject, item.statement.pk_entity, item.isOutgoing)
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}


export function createPaginateBy(listDefinition: ListDefinition, pkEntity: number, alternatives = false): PaginateByParam[] {
  if (listDefinition.listType === 'temporal-entity' || listDefinition.listType === 'entity-preview') {
    return [
      { fk_property: listDefinition.property.pkProperty },
      { fk_target_class: listDefinition.targetClass },
      { [listDefinition.isOutgoing ? 'fk_subject_info' : 'fk_object_info']: pkEntity },
      { [alternatives ? 'alternatives' : 'ofProject']: alternatives }
    ]
  }
}
