import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActiveProjectService } from "app/core/active-project";
import { ProInfoProjRel } from "app/core/sdk";
import { InfStatement } from "app/core/sdk";
import { PaginateByParam } from 'app/core/redux-store/actions';
import { equals } from 'ramda';
import { BehaviorSubject, combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { SelectionModel } from '@angular/cdk/collections';
import { PageEvent } from '@angular/material';
import { distinctUntilChanged, first, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { InfActions } from 'app/core/inf/inf.actions';
import { InfSelector } from 'app/core/inf/inf.service';
import { ConfigurationPipesService } from 'app/core/redux-queries/services/configuration-pipes.service';
import { InformationPipesService } from '../../services/information-pipes.service';
import { PaginationService } from '../../services/pagination.service';
import { AddListComponentInterface, Subfield, TemporalEntityItem } from '../properties-tree/properties-tree.models';
import { temporalEntityListDefaultPageIndex } from "../../base.helpers";
import { temporalEntityListDefaultLimit } from "../../base.helpers";
import { createPaginateBy } from "../../base.helpers";
import { TemporalEntityTable } from '../temporal-entity-list/TemporalEntityTable';
import { ByPk, IAppState } from 'app/core/redux-store/model';
import { SchemaObjectService } from 'app/core/redux-store/schema-object.service';

@Component({
  selector: 'gv-temporal-entity-add-list',
  templateUrl: './temporal-entity-add-list.component.html',
  styleUrls: ['./temporal-entity-add-list.component.scss']
})
export class TemporalEntityAddListComponent implements OnInit, OnDestroy, AddListComponentInterface {

  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;

  @Input() listDefinition: Subfield;
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


    const columns$ = this.c.pipeSpecificAndBasicFields(this.listDefinition.targetClass)

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
   * - one per related temporal entity
   * - one for all selected statements
   */
  add() {

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      // the selected pks
      const pkStatements: number[] = this.selection.selected;


      // prepare api calls to add target entities to project
      const entities$ = pkStatements.map(pk => {

        // get pk of target entity
        const r = this.statementsByPk[pk]
        const pkEntity = this.listDefinition.isOutgoing ? r.fk_object_info : r.fk_subject_info;

        // create api call
        return this.s.store(this.s.api.addEntityToProject(pkProject, pkEntity), pkProject)
      })

      // prepare entity project rels for the statement pointing to target entity
      const projRels: Partial<ProInfoProjRel>[] = pkStatements.map(pk => {

        // pepare entity project rel
        const proRel: Partial<ProInfoProjRel> = {
          fk_project: pkProject,
          fk_entity: pk,
          is_in_project: true
        }

        return proRel;
      })

      // wait until target entities are added to project
      combineLatest(entities$).pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {

        // add the statements pointing to these entities to project
        this.p.pro$.info_proj_rel.upsert(projRels, pkProject).resolved$
          .pipe(
            first(res => !!res),
            takeUntil(this.destroy$)
          ).subscribe(() => {

            // done!
            this.close.emit()
          })

      })


    })

  }

}
