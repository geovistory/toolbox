import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, Field, InformationPipesService } from '@kleiolab/lib-queries';
import { ReduxMainService, SchemaService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, ProInfoProjRel, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { equals, values } from 'ramda';
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { delay, distinctUntilChanged, first, map, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { openClose } from '../../../information/shared/animations';
import { fieldToFieldPage, fieldToGvFieldTargets, temporalEntityListDefaultLimit, temporalEntityListDefaultPageIndex } from '../../base.helpers';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'gv-view-field-body',
  templateUrl: './view-field-body.component.html',
  styleUrls: ['./view-field-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [openClose],
})
export class ViewFieldBodyComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() field: Field
  @Input() source: GvFieldSourceEntity;
  @Input() scope: GvFieldPageScope
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  @Input() addMode$: Observable<boolean>
  @Input() showBodyOnInit: boolean


  items$: Observable<StatementWithTarget[]>
  itemsCount$: Observable<number>

  limit$ = new BehaviorSubject(temporalEntityListDefaultLimit)
  pageIndex$ = new BehaviorSubject(temporalEntityListDefaultPageIndex);
  offset$: Observable<number>;


  selectedCount$: Observable<number>
  selection: SelectionModel<number>;
  selected: { [pk_stmt: number]: StatementWithTarget } = {}
  allowMultiSelect: boolean
  @Output() close = new EventEmitter()
  @Output() next = new EventEmitter()
  adding$ = new BehaviorSubject(false)
  showBody$ = new BehaviorSubject(false)
  targetIsUnique: boolean;

  constructor(
    private p: ActiveProjectService,
    private pag: PaginationService,
    private i: InformationPipesService,
    private s: SchemaService,
    private ap: ActiveProjectPipesService,
    private dataService: ReduxMainService,
  ) {
    this.offset$ = combineLatest(this.limit$, this.pageIndex$).pipe(
      map(([limit, pageIndex]) => limit * pageIndex)
    )

  }

  ngOnInit() {
    // const d = new Date()
    // console.log(`SubfieldComponent Init: ${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`)
    const errors: string[] = []
    if (!this.field) errors.push('@Input() field is required.');
    if (!this.source) errors.push('@Input() pkEntity is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.readonly$) errors.push('@Input() readonly$ is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));
    if (!this.addMode$) this.addMode$ = new BehaviorSubject(false);

    this.targetIsUnique = this.field.identityDefiningForTarget && this.field.targetMaxQuantity == 1;

    const pagination$ = combineLatest([
      this.limit$,
      this.offset$,
      this.ap.pkProject$
    ]).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
    const nextPage$ = new Subject();
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
        nextPage$.next();

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
      switchMap(([limit, offset]) => this.i.pipeFieldPage(
        fieldToFieldPage(this.field, this.source, this.scope, limit, offset),
        fieldToGvFieldTargets(this.field),
        this.field.isTimeSpanShortCutField
      )),
      shareReplay({ refCount: true, bufferSize: 1 }),

    )

    this.items$ = page$.pipe(map(page => page.statements))
    this.itemsCount$ = page$.pipe(map(page => page.count))

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

    if (this.showBodyOnInit) this.showBody$.next(true)
  }

  private loadFieldCount(until$: Observable<unknown>) {
    this.ap.pkProject$.pipe(first()).subscribe(pkProject => {
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
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
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
      combineLatestOrEmpty(entities$)
        .pipe(first(x => !!x), takeUntil(this.destroy$))
        .subscribe(pending => {

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


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}


