import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ActiveProjectService, IAppState } from 'app/core';
import { BehaviorSubject, combineLatest, Observable, Subject, of, merge } from 'rxjs';
import { SelectionModel } from '../../../../../../node_modules/@angular/cdk/collections';
import { PageEvent } from '../../../../../../node_modules/@angular/material';
import { first, map, switchMap, takeUntil, shareReplay, tap, distinctUntilChanged } from '../../../../../../node_modules/rxjs/operators';
import { InfActions } from '../../../../core/inf/inf.actions';
import { ConfigurationPipesService } from '../../services/configuration-pipes.service';
import { InformationPipesService } from '../../services/information-pipes.service';
import { AddListComponentInterface, ListDefinition, TemporalEntityItem } from '../properties-tree/properties-tree.models';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { TemporalEntityTable } from "../temporal-entity-list/TemporalEntityTable";
import { temporalEntityListDefaultLimit, temporalEntityListDefaultPageIndex, createPaginateBy } from '../temporal-entity-list/temporal-entity-list.component';
import { PaginateByParam } from 'app/core/store/actions';
import { InfSelector } from '../../../../core/inf/inf.service';
import { NgRedux } from '../../../../../../node_modules/@angular-redux/store';
import { equals } from 'ramda';
import { PaginationService } from '../../services/pagination.service';

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

  constructor(
    public p: ActiveProjectService,
    public c: ConfigurationPipesService,
    public i: InformationPipesService,
    // public t: PropertiesTreeService,
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

    this.itemsCount$ = infRepo.role$.pagination$.pipeCount(paginateBy)

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
      ).loadEvent$.pipe(first()).subscribe(() => {
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
          this.selection.select(rows[0].role.pk_entity)
        }
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


  add() {

    const pkRoles: number[] = this.selection.selected;
    this.p.pkProject$.pipe(first()).subscribe(pkProject => this.inf.role.addToProjectWithTeEnt(pkRoles, pkProject)
      .resolved$.pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {
        // this.t.showControl$.next(null)
        this.close.emit()
      })
    )

  }

}
