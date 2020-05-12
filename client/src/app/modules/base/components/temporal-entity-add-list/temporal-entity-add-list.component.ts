import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActiveProjectService, IAppState, InfStatement, ProInfoProjRel } from 'app/core';
import { PaginateByParam } from 'app/core/store/actions';
import { equals } from 'ramda';
import { BehaviorSubject, combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { NgRedux } from '../../../../../../node_modules/@angular-redux/store';
import { SelectionModel } from '../../../../../../node_modules/@angular/cdk/collections';
import { PageEvent } from '../../../../../../node_modules/@angular/material';
import { distinctUntilChanged, first, map, shareReplay, switchMap, takeUntil, tap } from '../../../../../../node_modules/rxjs/operators';
import { InfActions } from '../../../../core/inf/inf.actions';
import { InfSelector } from '../../../../core/inf/inf.service';
import { ConfigurationPipesService } from '../../services/configuration-pipes.service';
import { InformationPipesService } from '../../services/information-pipes.service';
import { PaginationService } from '../../services/pagination.service';
import { AddListComponentInterface, ListDefinition, TemporalEntityItem } from '../properties-tree/properties-tree.models';
import { createPaginateBy, temporalEntityListDefaultLimit, temporalEntityListDefaultPageIndex } from '../temporal-entity-list/temporal-entity-list.component';
import { TemporalEntityTable } from '../temporal-entity-list/TemporalEntityTable';
import { ByPk } from 'app/core/store/model';
import { SchemaObjectService } from 'app/core/store/schema-object.service';

@Component({
  selector: 'gv-temporal-entity-add-list',
  templateUrl: './temporal-entity-add-list.component.html',
  styleUrls: ['./temporal-entity-add-list.component.scss']
})
export class TemporalEntityAddListComponent implements OnInit, OnDestroy, AddListComponentInterface {

  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;

  @Input() listDefinition: ListDefinition;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;

  @Output() close = new EventEmitter()
  @Output() next = new EventEmitter()

  rows$: Observable<TemporalEntityItem[]>
  items$;
  itemsCount$: Observable<number>
  itemsCount: number


  table: TemporalEntityTable;
  limit$ = new BehaviorSubject(temporalEntityListDefaultLimit)
  pageIndex$ = new BehaviorSubject(temporalEntityListDefaultPageIndex);
  offset$: Observable<number>;

  selectedCount$: Observable<number>
  selection: SelectionModel<number>;

  loading;

  targetIsUnique: boolean;

  statementsByPk: ByPk<InfStatement> = {}

  constructor(
    public p: ActiveProjectService,
    public c: ConfigurationPipesService,
    public i: InformationPipesService,
    private s: SchemaObjectService,
    public inf: InfActions,
    private ngRedux: NgRedux<IAppState>,
    private paginationService: PaginationService
  ) {
    this.offset$ = combineLatest(this.limit$, this.pageIndex$).pipe(
      map(([limit, pageIndex]) => limit * pageIndex)
    )
  }

  ngOnInit() {

    // stop initialization if this is not a temporal entity list
    if (this.listDefinition.listType !== 'temporal-entity') return;

    this.targetIsUnique = this.listDefinition.identityDefiningForTarget && this.listDefinition.targetMaxQuantity == 1;

    const infRepo = new InfSelector(this.ngRedux, of('repo'))

    // selection stuff
    const allowMultiSelect = this.listDefinition.targetMaxQuantity === 1 ? false : true;
    const initialSelection = [];
    this.selection = new SelectionModel<number>(allowMultiSelect, initialSelection);
    this.selectedCount$ = this.selection.changed.pipe(
      map(s => s.source.selected.length)
    )

    // custom temporal entity table columns
    let customCols;
    allowMultiSelect ?
      customCols = { columnsBefore: ['_checkbox_', '_classInfo_'], columnsAfter: ['_projects_', '_actions_'] } :
      customCols = { columnsBefore: ['_radiobutton_', '_classInfo_'], columnsAfter: ['_projects_', '_actions_'] };

    // table loading ect
    const pagination$ = combineLatest(
      this.limit$.pipe(),
      this.offset$.pipe(),
      this.p.pkProject$
    ).pipe(shareReplay({ refCount: true, bufferSize: 1 }))

    const paginateBy: PaginateByParam[] = createPaginateBy(this.listDefinition, this.pkEntity, true)

    this.itemsCount$ = infRepo.statement$.pagination$.pipeCount(paginateBy)

    const nextPage$ = new Subject();
    pagination$.pipe(
      distinctUntilChanged(equals),
      takeUntil(this.destroy$)
    ).subscribe(([limit, offset, pkProject]) => {
      nextPage$.next()
      this.paginationService.temporalEntityAlternative.addPageLoader(
        pkProject,
        this.listDefinition,
        this.pkEntity,
        limit,
        offset,
        merge(nextPage$, this.destroy$),
        true
      ).loadEvent$.pipe(first()).subscribe((res) => {
        this.itemsCount$.pipe(takeUntil(this.destroy$)).subscribe(c => {
          this.itemsCount = c;
          if (c === 0) {
            this.next.emit()
          }
        })
      })
    })


    const columns$ = this.c.pipeFieldDefinitionsSpecificFirst(this.listDefinition.targetClass)

    const alternative = true;

    this.rows$ = combineLatest(pagination$, columns$).pipe(
      distinctUntilChanged(equals),
      switchMap(([[limit, offset, pkProject], columns]) => this.i.pipeTemporalEntityTableRows(
        paginateBy,
        limit,
        offset,
        pkProject,
        this.listDefinition,
        columns,
        alternative
      )),
      shareReplay({ refCount: true, bufferSize: 1 }),
      tap((rows) => {
        if (!allowMultiSelect && rows.length === 1) {
          setTimeout(() => this.selection.select(rows[0].statement.pk_entity))
        }
        rows.forEach(row => {
          this.statementsByPk[row.statement.pk_entity] = row.statement;
        })
      })
    )

    this.table = new TemporalEntityTable(this.rows$, columns$, this.destroy$, this.listDefinition, customCols);

  }

  onPageChange(e: PageEvent) {
    this.pageIndex$.next(e.pageIndex)
    this.limit$.next(e.pageSize)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  /**
   * makes separate api calls to add items to project:
   * - one for all selected statements
   * - one per related temporal entity
   */
  add() {

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      // the selected pks
      const pkStatements: number[] = this.selection.selected;

      // array of entity project rels
      const projRels: Partial<ProInfoProjRel>[] = []

      // array of observables
      const obs$: Observable<any>[] = [];

      pkStatements.forEach(pk => {
        // pepare entity project rel
        const proRel: Partial<ProInfoProjRel> = {
          fk_project: pkProject,
          fk_entity: pk,
          is_in_project: true
        }
        // add entity project rel to array
        projRels.push(proRel)

        // prepare api call to add related temporal entity
        const r = this.statementsByPk[pk]
        const entityToAdd = this.listDefinition.isOutgoing ? r.fk_object_info : r.fk_subject_info;

        // add api call to array
        obs$.push(this.s.store(this.s.api.addEntityToProject(pkProject, entityToAdd), pkProject))
      })

      // add a bulk upsert api call for array of entity project rels
      const bulkUpsert = this.p.pro$.info_proj_rel.upsert(projRels, pkProject).resolved$.pipe(first(res => !!res))
      obs$.push(bulkUpsert)

      combineLatest(obs$).pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {
        // this.t.showControl$.next(null)
        this.close.emit()
      })


    })

  }

}
