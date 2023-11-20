import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, ViewChild, forwardRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DfhConfig } from '@kleiolab/lib-config';
import { Field, QueriesFacade, StateFacade } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, ProInfoProjRel, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { DndDraggableDirective } from 'ngx-drag-drop';
import { equals, values } from 'ramda';
import { BehaviorSubject, Observable, Subject, combineLatest, merge } from 'rxjs';
import { delay, distinctUntilChanged, first, map, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { OpenCloseModule } from '../../../../shared/directives/open-close/open-close.module';
import { openClose } from '../../../information/shared/animations';
import { fieldToFieldPage, fieldToGvFieldTargets, temporalEntityListDefaultLimit, temporalEntityListDefaultPageIndex } from '../../base.helpers';
import { GvDndSortListDirective } from '../../directives/dnd-sort-list.directive';
import { GvDndGlobalService, TreeItem } from '../../services/dnd-global.service';
import { EditModeService } from '../../services/edit-mode.service';
import { PaginationService } from '../../services/pagination.service';
import { ViewFieldDropListService } from '../../services/view-field-drop-list.service';
import { ViewFieldItemCountSumService } from '../../services/view-field-item-count-sum.service';
import { ViewFieldItemContainerComponent } from '../view-field-item-container/view-field-item-container.component';
import { ViewFieldItemComponent } from '../view-field-item/view-field-item.component';
import { ViewFieldBodyService } from './view-field-body.service';


@Component({
  selector: 'gv-view-field-body',
  templateUrl: './view-field-body.component.html',
  styleUrls: ['./view-field-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [openClose],
  providers: [
    ViewFieldBodyService,
    ViewFieldDropListService
  ],
  standalone: true,
  imports: [OpenCloseModule, NgClass, NgIf, MatPaginatorModule, MatDividerModule, forwardRef(() => GvDndSortListDirective), ViewFieldItemContainerComponent, NgFor, DndDraggableDirective, ViewFieldItemComponent, MatButtonModule, MatProgressSpinnerModule, AsyncPipe]
})
export class ViewFieldBodyComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() field: Field
  @Input() source: GvFieldSourceEntity;
  @Input() scope: GvFieldPageScope
  readmode$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  @Input() addMode$: Observable<boolean>
  @Input() showBodyOnInit: boolean
  @Input() limit = temporalEntityListDefaultLimit
  @Input() noPagination = false
  @Input() hideNoItemsInfo = false
  @Input() showBody$ = new BehaviorSubject(false)
  @Input() dividerPosition: 'top' | 'bottom' = 'bottom'



  items$: Observable<StatementWithTarget[]>
  itemsOptimisticUpdate$ = new Subject<StatementWithTarget[]>()
  itemsCount$: Observable<number>

  limit$: BehaviorSubject<number>

  pageIndex$ = new BehaviorSubject(temporalEntityListDefaultPageIndex);
  offset$: Observable<number>;


  selectedCount$: Observable<number>
  selection: SelectionModel<number>;
  selected: { [pk_stmt: number]: StatementWithTarget } = {}
  allowMultiSelect: boolean
  @Output() close = new EventEmitter<boolean>()
  @Output() next = new EventEmitter()
  adding$ = new BehaviorSubject(false)
  // dropZoneAccepts$ = new BehaviorSubject(false)
  targetIsUnique: boolean;

  pageSizeOptions: number[]

  @ViewChild(GvDndSortListDirective) gvDndSortList: GvDndSortListDirective
  sortListId: string
  constructor(
    public dndGlobal: GvDndGlobalService,
    private pag: PaginationService,
    private state: StateFacade,
    private queries: QueriesFacade,
    public viewFieldDropListService: ViewFieldDropListService,
    @Optional() private itemCountService: ViewFieldItemCountSumService,
    public editMode: EditModeService,
    viewFieldBodyService: ViewFieldBodyService
  ) {
    viewFieldBodyService.registerComponent(this);
    this.readmode$ = this.editMode.value$.pipe(map(v => !v))
    this.offset$ = combineLatest([this.limit$, this.pageIndex$]).pipe(
      map(([limit, pageIndex]) => limit * pageIndex)
    )
    this.sortListId = dndGlobal.registerAndGetId(this)
  }
  trackByFn(i, _: StatementWithTarget) {
    return `${_.statement.pk_entity}_${_.ordNum}`;
  }
  ngOnInit() {
    // const d = new Date()
    const errors: string[] = []
    if (!this.field) errors.push('@Input() field is required.');
    if (!this.source) errors.push('@Input() pkEntity is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));
    if (!this.addMode$) this.addMode$ = new BehaviorSubject(false);

    this.pageSizeOptions = [
      this.limit, this.limit * 2, this.limit * 4
    ]

    this.limit$ = new BehaviorSubject(this.limit)
    if (this.noPagination) this.limit$ = new BehaviorSubject(10000000)
    this.offset$ = combineLatest([this.limit$, this.pageIndex$]).pipe(
      map(([limit, pageIndex]) => limit * pageIndex)
    )

    this.targetIsUnique = this.field.identityDefiningForTarget && this.field.targetMaxQuantity == 1;

    const pagination$ = combineLatest([
      this.limit$,
      this.offset$,
      this.state.pkProject$
    ]).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
    const nextPage$ = new Subject()
    const until$ = merge(nextPage$, this.destroy$);

    /**
     * For UX-Performance: trigger field load with limit 0 to get the total count of statements
     * in that field (without the need to query nested fields)
     */
    this.loadFieldCount(until$);

    const page$ = pagination$.pipe(
      delay(0),
      distinctUntilChanged(equals),
      // Loading from rest api (using service that avoids reloads of the same page)
      tap(([limit, offset, pkProject]) => {
        nextPage$.next(undefined);

        let fields = [this.field]
        if (this.field.isSpecialField === 'time-span') {
          fields = DfhConfig.PROPERTY_PKS_WHERE_TIME_PRIMITIVE_IS_RANGE.map(
            fkProperty => {
              const field: Field = {
                ...this.field,
                property: { fkProperty },
                targetClasses: [DfhConfig.CLASS_PK_TIME_PRIMITIVE],
                targets: {
                  [DfhConfig.CLASS_PK_TIME_PRIMITIVE]: {
                    viewType: { timePrimitive: 'true' },
                    formControlType: { timePrimitive: 'true' },
                    removedFromAllProfiles: false,
                    targetClass: DfhConfig.CLASS_PK_TIME_PRIMITIVE,
                    targetClassLabel: ''
                  }
                }
              }
              return field
            }
          )
        }
        for (const field of fields) {
          this.pag.addPageLoaderFromField(pkProject, field, this.source, limit, offset, until$, this.scope);
        }
      }),
      // Piping from store
      switchMap(([limit, offset]) => this.queries.information.pipeFieldPage(
        fieldToFieldPage(this.field, this.source, this.scope, limit, offset),
        fieldToGvFieldTargets(this.field),
        this.field.isTimeSpanShortCutField
      )),
      shareReplay({ refCount: true, bufferSize: 1 }),

    )
    const fromPageLoader$ = page$.pipe(map(page => page.statements))
    this.items$ = merge(fromPageLoader$, this.itemsOptimisticUpdate$)

    // page$.pipe(takeUntil(this.destroy$), map(page => page.statements)).subscribe(items => {
    //   this.items$.next(items)
    // })

    this.itemsCount$ = page$.pipe(map(page => page.count))
    if (this.itemCountService) this.itemCountService.addItemCountObservable(this.itemsCount$)
    // if after removing an item, we are on the last page with no items, move one page back
    combineLatest([this.itemsCount$, this.limit$, this.pageIndex$])
      .pipe(takeUntil(this.destroy$)).subscribe(([count, limit, pageIdx]) => {
        if (pageIdx > 0 && count <= (limit * pageIdx)) this.pageIndex$.next(pageIdx - 1)
      })

    this.allowMultiSelect = this.field.targetMaxQuantity === 1 ? false : true;

    const initialSelection = [];
    this.selection = new SelectionModel<number>(this.allowMultiSelect, initialSelection);
    this.selectedCount$ = this.selection.changed.pipe(
      map(s => s.source.selected.length),
      startWith(0)
    )
    this.itemsCount$.pipe(first()).subscribe((count) => {
      if (count && this.showBodyOnInit) this.showBody$.next(true)
    })
  }


  private loadFieldCount(until$: Observable<unknown>) {
    this.state.pkProject$.pipe(first()).subscribe(pkProject => {
      this.pag.addPageLoaderFromField(pkProject, this.field, this.source, 0, 0, until$, this.scope);
    });
  }

  onPageChange(e: PageEvent) {
    this.pageIndex$.next(e.pageIndex)
    this.limit$.next(e.pageSize)
  }



  toggleSelection(stmtWT: StatementWithTarget) {
    const id = stmtWT.statement.pk_entity
    if (!this.allowMultiSelect) this.selected = {}
    if (this.selected[id]) {
      delete this.selected[id]
    } else {
      this.selected[id] = stmtWT;
    }
    this.selection.toggle(stmtWT.statement.pk_entity)
  }



  /**
   * makes separate api calls to add items to project:
   * - one per related temporal entity
   * - one for all selected statements
   */
  add() {
    this.adding$.next(true)
    this.state.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      // the selected pks
      const pkStatements: number[] = this.selection.selected;
      const statementsWT = values(this.selected)

      // prepare api calls to add target entities to project
      const entities$ = statementsWT
        // remove statements not targeting entities
        .filter(s => s.target.entity)
        .map(s => {
          // get pk of target entity
          const pkEntity = s.target.entity.resource.pk_entity

          // create api call
          return this.state.data.addEntityToProject(pkProject, pkEntity)
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
      combineLatestOrEmpty(entities$)
        .pipe(first(x => !!x), takeUntil(this.destroy$))
        .subscribe(pending => {

          // add the statements pointing to these entities to project
          this.state.data.upsertInfoProjectRelations(pkProject, projRels)
            .pipe(
              first(),
              takeUntil(this.destroy$)
            ).subscribe(() => {
              // done!
              this.close.emit(true)
            })

        })
    })

  }

  onDragStart(item: TreeItem) {
    this.dndGlobal.isDragging$.next(item)
    // console.log("drag started", JSON.stringify(event, null, 2));
  }

  onDragEnd() {
    this.dndGlobal.isDragging$.next(false)
    // console.log("drag ended", JSON.stringify(event, null, 2));
  }

  ngOnDestroy() {

    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    if (this.itemCountService) this.itemCountService.removeItemCountObservable(this.itemsCount$)
    this.dndGlobal.unregister(this.sortListId)
  }

}


