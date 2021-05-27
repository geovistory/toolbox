import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PageEvent } from '@angular/material/paginator';
import { DfhConfig } from '@kleiolab/lib-config';
import { ActiveProjectPipesService, Field, InformationPipesService, StatementTargetEntity, StatementTargetTimeSpan, StatementWithTarget } from '@kleiolab/lib-queries';
import { InfActions, ReduxMainService, SchemaService } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity, ProInfoProjRel, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { ConfirmDialogComponent, ConfirmDialogData } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { equals, values } from 'ramda';
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, first, map, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fieldToFieldPage, fieldToGvFieldTargets, temporalEntityListDefaultLimit, temporalEntityListDefaultPageIndex } from '../../base.helpers';
import { PaginationService } from '../../services/pagination.service';
import { TimeSpanService } from '../../services/time-span.service';

// interface DataCol {
//   name: string;
//   id: string;
//   pkProperty: number;
//   subfieldType: GvTargetType;
// }

@Component({
  selector: 'gv-subfield',
  templateUrl: './subfield.component.html',
  styleUrls: ['./subfield.component.scss']
})
export class SubfieldComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() field: Field
  @Input() source: GvFieldSourceEntity;
  @Input() scope: GvFieldPageScope
  @Input() showOntoInfo$: Observable<boolean>
  @Input() addMode$: Observable<boolean>

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

  // dataColumnsVisibility$ = new BehaviorSubject<{ [key: string]: boolean; }>({});
  // dataColumns$: Observable<DataCol[]>
  // visibleDataColumns$: Observable<DataCol[]>
  // subfieldMap: { [key: string]: GvSubentitySubfieldType; }
  targetIsUnique: boolean;

  constructor(
    private p: ActiveProjectService,
    private ap: ActiveProjectPipesService,
    private dialog: MatDialog,
    private pag: PaginationService,
    private inf: InfActions,
    private i: InformationPipesService,
    private timeSpan: TimeSpanService,
    private s: SchemaService,
    private dataService: ReduxMainService,
  ) {
    this.offset$ = combineLatest(this.limit$, this.pageIndex$).pipe(
      map(([limit, pageIndex]) => limit * pageIndex)
    )

  }

  ngOnInit() {
    const errors: string[] = []
    if (!this.field) errors.push('@Input() subfield is required.');
    if (!this.source) errors.push('@Input() pkEntity is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));
    if (!this.addMode$) this.addMode$ = new BehaviorSubject(false);

    this.targetIsUnique = this.field.identityDefiningForTarget && this.field.targetMaxQuantity == 1;

    const pagination$ = combineLatest(this.limit$, this.offset$, this.ap.pkProject$)
      .pipe(shareReplay({ refCount: true, bufferSize: 1 }));
    const nextPage$ = new Subject();
    const until$ = merge(nextPage$, this.destroy$);

    const page$ = pagination$.pipe(
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
                    listType: { timePrimitive: 'true' },
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

    // if (this.subfield.listType.temporalEntity) {
    //   this.subfieldMap = mapObjIndexed<GvSubentitFieldPageReq, GvSubentitySubfieldType>(
    //     (val, key, obj) => val.subfieldType,
    //     indexBy((l) => this.getColId(l.page), this.subfield.listType.temporalEntity)
    //   );
    //   const dataColMap = mapObjIndexed<GvSubentitFieldPageReq, boolean>(
    //     (val, key, obj) => {
    //       // hideCircularField on init
    //       if (val.page.isCircular) return false
    //       return true
    //     },
    //     indexBy((l) => this.getColId(l.page), this.subfield.listType.temporalEntity)
    //   );
    //   this.dataColumnsVisibility$.next(dataColMap)
    //   this.dataColumns$ = combineLatest(
    //     this.subfield.listType.temporalEntity.map(subentityField => {
    //       const page = subentityField.page;
    //       const domain = page.isOutgoing ? this.subfield.targetClass : null
    //       const range = page.isOutgoing ? null : this.subfield.targetClass
    //       return this.c.pipeFieldLabel(page.fkProperty, domain, range)
    //         .pipe(
    //           map(fieldLabel => {
    //             return {
    //               id: this.getColId(page),
    //               name: fieldLabel,
    //               pkProperty: page.fkProperty,
    //               subfieldType: subentityField.subfieldType
    //             }
    //           })
    //         )
    //     })
    //   )
    //   this.visibleDataColumns$ = combineLatest(this.dataColumnsVisibility$, this.dataColumns$).pipe(
    //     map(
    //       ([colMap, all]) => all.filter(column => colMap[column.id])
    //     )
    //   )
    // }

  }

  onPageChange(e: PageEvent) {
    this.pageIndex$.next(e.pageIndex)
    this.limit$.next(e.pageSize)
  }

  // openInNewTab(item: EntityPreviewItem) {
  //   this.p.addEntityTab(item.preview.pk_entity, item.preview.fk_class)
  // }

  openPopup(item: StatementWithTarget) {
    const data: ConfirmDialogData = {
      hideNoButton: true,
      noBtnText: '',
      yesBtnText: 'Ok',
      title: 'Details',
      paragraphs: [item.targetLabel]
    }
    this.dialog.open(ConfirmDialogComponent, { data })
  }

  remove(item: StatementWithTarget) {
    if (this.field.identityDefiningForSource && this.field.isOutgoing) {
      alert('Item can not be removed, since it is defining the identity of the connected temporal entity. You might want to replace the entire temporal entity.')
    } else {
      this.ap.pkProject$.pipe(takeUntil(this.destroy$)).subscribe(pkProject => {

        const statement = item.statement;
        this.dataService.removeInfEntitiesFromProject([statement.pk_entity], pkProject)

      })
    }
  }

  openTimespanModal(x: StatementTargetTimeSpan) {
    this.timeSpan.openModal(x, this.source.fkInfo)
  }
  openInNewTabFromEntity(e: StatementTargetEntity) {
    this.p.addEntityTab(e.pkEntity, e.fkClass)
  }
  openInNewTabFromPreview(e: WarEntityPreview) {
    this.p.addEntityTab(e.pk_entity, e.fk_class)
  }

  addAndOpenInNewTabFromEntity(e: StatementTargetEntity) {
    this.addAndOpenInNewTab(e.pkEntity, e.fkClass)
  }
  addAndOpenInNewTabFromPreview(e: WarEntityPreview) {
    this.addAndOpenInNewTab(e.pk_entity, e.fk_class)
  }
  private addAndOpenInNewTab(pkEntity: number, fkClass: number) {
    this.p.addEntityToProject(pkEntity, () => {
      this.p.addEntityTab(pkEntity, fkClass)
    })
  }


  // add() {
  //   if (this.field.listType.temporalEntity) {
  //     this.addTeEn()
  //   } else {

  //     // collect selected statements
  //     const statements: InfStatement[] = values(this.selected)
  //     this.ap.pkProject$.pipe(first()).subscribe(
  //       // upsert them in db
  //       pkProject => this.inf.statement.upsert(statements, pkProject).resolved$
  //         .pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {
  //           // put them in store
  //           this.s.storeSchemaObjectGv({ inf: { statement: statements } }, undefined)
  //           this.close.emit()
  //         })
  //     )
  //   }

  // }
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
   * For TemporalEntity view
   */

  // toggleCol(colId: string) {
  //   // this.dataColumnsVisibility$.pipe(first()).subscribe(colMap => {

  //   // });
  //   setTimeout(() => {

  //     const colMap = this.dataColumnsVisibility$.value
  //     this.dataColumnsVisibility$.next({
  //       ...colMap,
  //       [colId]: !colMap[colId]
  //     });
  //   })
  // }
  // openList(subentityPage: SubentitySubfieldPage) {
  //   const data: SubfieldDialogData = {
  //     sourceClass: this.subfield.targetClass,
  //     fkProperty: subentityPage.subfield.fkProperty,
  //     targetClass: subentityPage.subfield.targetClass,
  //     isOutgoing: subentityPage.subfield.isOutgoing,
  //     sourceEntity: subentityPage.subfield.fkSourceEntity,
  //     scope: this.scope,
  //     showOntoInfo$: this.showOntoInfo$,
  //   }
  //   // const pkEntities = cell.items.map(i => cell.isOutgoing ? i.statement.fk_object_info : i.statement.fk_subject_info)
  //   // this.listDialog.open(true, pkEntities, 'Items')
  //   this.dialog.open(SubfieldDialogComponent, {
  //     data
  //   })
  //   // throw new Error('TODO');
  // }
  markAsFavorite(item: StatementWithTarget) {
    this.p.pkProject$.pipe(first()).subscribe(pkProject => {
      this.p.pro$.info_proj_rel.markStatementAsFavorite(pkProject, item.statement.pk_entity, item.isOutgoing)
    })
  }
  removeEntity(item: StatementWithTarget) {
    this.p.pkProject$.pipe(first()).subscribe(pkProject => {
      // remove the related temporal entity
      this.p.removeEntityFromProject(item.target.entity.pkEntity, () => {
        // remove the statement
        this.dataService.removeInfEntitiesFromProject([item.statement.pk_entity], pkProject)
      })
    })

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
          const pkEntity = s.target.entity.pkEntity

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


  /**
  * End of TemporalEntity view
  */

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  // getColId(page: GvSubentityFieldPage | GvFieldId): string {
  //   return page.fkProperty + '_' + page.isOutgoing + '_' + page.targetClass
  // }
}


