import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActiveProjectService } from 'app/core/active-project/active-project.service';
import { PaginateByParam } from 'app/core/store/actions';
import { IAppState } from 'app/core/store/model';
import { equals } from 'ramda';
import { BehaviorSubject, combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { NgRedux } from '../../../../../../node_modules/@angular-redux/store';
import { SelectionModel } from '../../../../../../node_modules/@angular/cdk/collections';
import { distinctUntilChanged, first, map, shareReplay, switchMap, takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { InfActions } from '../../../../core/inf/inf.actions';
import { InfSelector } from '../../../../core/inf/inf.service';
import { ConfigurationPipesService } from '../../new-services/configuration-pipes.service';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { PaginationService } from '../../new-services/pagination.service';
import { AddListComponentInterface, ListDefinition, TemporalEntityItem } from '../properties-tree/properties-tree.models';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { temporalEntityListDefaultLimit, temporalEntityListDefaultPageIndex } from '../temporal-entity-list/temporal-entity-list.component';
import { createPaginateBy } from "../temporal-entity-list/createPaginateBy";
import { TemporalEntityTable } from '../temporal-entity-list/TemporalEntityTable';

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

  @Input() appContext: number

  rows$: Observable<TemporalEntityItem[]>
  items$;
  itemsCount$: Observable<number>



  table: TemporalEntityTable;
  limit$ = new BehaviorSubject(temporalEntityListDefaultLimit)
  pageIndex$ = new BehaviorSubject(temporalEntityListDefaultPageIndex);
  offset$: Observable<number>;

  selectedCount$: Observable<number>
  selection: SelectionModel<number>;


  constructor(
    public p: ActiveProjectService,
    public c: ConfigurationPipesService,
    public i: InformationPipesService,
    public t: PropertiesTreeService,
    public inf: InfActions,
    private ngRedux: NgRedux<IAppState>,
    private paginationService: PaginationService
  ) {
    this.offset$ = combineLatest(this.limit$, this.pageIndex$).pipe(
      map(([limit, pageIndex]) => limit * pageIndex)
    )
  }

  ngOnInit() {
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

    const paginateBy: PaginateByParam[] = createPaginateBy(this.listDefinition, this.pkEntity)

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
        merge(nextPage$, this.destroy$)
      )
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
    )

    this.table = new TemporalEntityTable(this.rows$, columns$, this.destroy$, this.listDefinition, customCols);

    this.itemsCount$ = infRepo.role$.pagination$.pipeCount(paginateBy)
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
        this.t.showControl$.next(null)
      })
    )

  }

}
