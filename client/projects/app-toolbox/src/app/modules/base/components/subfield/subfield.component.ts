import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PageEvent } from '@angular/material/paginator';
import { ActiveProjectPipesService, ConfigurationPipesService, InformationPipesService, StatementTargetTimeSpan, StatementWithTarget, SubentitySubfieldPage, Subfield } from '@kleiolab/lib-queries';
import { InfActions, SchemaService } from '@kleiolab/lib-redux';
import { GvLoadSubentitySubfieldPageReq, GvSubentitySubfieldPage, GvSubentitySubfieldType, GvSubfieldId, GvSubfieldPageScope, GvSubfieldType, InfStatement, ProInfoProjRel } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { ConfirmDialogComponent, ConfirmDialogData } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { equals, indexBy, mapObjIndexed, values } from 'ramda';
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, first, map, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { subfieldToSubfieldPage, temporalEntityListDefaultLimit, temporalEntityListDefaultPageIndex } from '../../base.helpers';
import { PaginationService } from '../../services/pagination.service';
import { TimeSpanService } from '../../services/time-span.service';
import { SubfieldDialogComponent, SubfieldDialogData } from '../subfield-dialog/subfield-dialog.component';

interface DataCol {
  name: string;
  id: string;
  pkProperty: number;
  subfieldType: GvSubfieldType;
}

@Component({
  selector: 'gv-subfield',
  templateUrl: './subfield.component.html',
  styleUrls: ['./subfield.component.scss']
})
export class SubfieldComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() subfield: Subfield
  @Input() pkEntity: number
  @Input() scope: GvSubfieldPageScope
  @Input() showOntoInfo$: Observable<boolean>
  @Input() addMode$: Observable<boolean>

  items$: Observable<StatementWithTarget[]>
  itemsCount$: Observable<number>

  limit$ = new BehaviorSubject(temporalEntityListDefaultLimit)
  pageIndex$ = new BehaviorSubject(temporalEntityListDefaultPageIndex);
  offset$: Observable<number>;


  selectedCount$: Observable<number>
  selection: SelectionModel<number>;
  selected: { [pk_stmt: number]: InfStatement } = {}
  allowMultiSelect: boolean
  @Output() close = new EventEmitter()
  @Output() next = new EventEmitter()

  dataColumnsVisibility$ = new BehaviorSubject<{ [key: string]: boolean; }>({});
  dataColumns$: Observable<DataCol[]>
  visibleDataColumns$: Observable<DataCol[]>
  subfieldMap: { [key: string]: GvSubentitySubfieldType; }

  constructor(
    private p: ActiveProjectService,
    private ap: ActiveProjectPipesService,
    private dialog: MatDialog,
    private pag: PaginationService,
    private inf: InfActions,
    private i: InformationPipesService,
    private timeSpan: TimeSpanService,
    private s: SchemaService,
    private c: ConfigurationPipesService,
  ) {
    this.offset$ = combineLatest(this.limit$, this.pageIndex$).pipe(
      map(([limit, pageIndex]) => limit * pageIndex)
    )
  }

  ngOnInit() {
    const errors: string[] = []
    if (!this.subfield) errors.push('@Input() subfield is required.');
    if (!this.pkEntity) errors.push('@Input() pkEntity is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (errors.length) throw new Error(errors.join('\n'));
    if (!this.addMode$) this.addMode$ = new BehaviorSubject(false);


    const pagination$ = combineLatest(this.limit$, this.offset$, this.ap.pkProject$)
      .pipe(shareReplay({ refCount: true, bufferSize: 1 }));
    const nextPage$ = new Subject();
    const until$ = merge(nextPage$, this.destroy$);

    const page$ = pagination$.pipe(
      distinctUntilChanged(equals),
      // Loading from rest api (using service that avoids reloads of the same page)
      tap(([limit, offset, pkProject]) => {
        nextPage$.next();
        this.pag.subfield.addPageLoader(pkProject, this.subfield, this.pkEntity, limit, offset, until$, this.scope);
      }),
      // Piping from store
      switchMap(([limit, offset]) => this.i.pipeSubfieldPage(
        subfieldToSubfieldPage(this.subfield, this.pkEntity, this.scope, limit, offset),
        this.subfield.listType
      )),
      shareReplay({ refCount: true, bufferSize: 1 }),

    )

    this.items$ = page$.pipe(map(page => page.statements))
    this.itemsCount$ = page$.pipe(map(page => page.count))


    this.allowMultiSelect = this.subfield.targetMaxQuantity === 1 ? false : true;

    const initialSelection = [];
    this.selection = new SelectionModel<number>(this.allowMultiSelect, initialSelection);
    this.selectedCount$ = this.selection.changed.pipe(
      map(s => s.source.selected.length),
      startWith(0)
    )

    if (this.subfield.listType.temporalEntity) {
      this.subfieldMap = mapObjIndexed<GvLoadSubentitySubfieldPageReq, GvSubentitySubfieldType>(
        (val, key, obj) => val.subfieldType,
        indexBy((l) => this.getColId(l.page), this.subfield.listType.temporalEntity)
      );
      const dataColMap = mapObjIndexed<GvLoadSubentitySubfieldPageReq, boolean>(
        (val, key, obj) => {
          // hideCircularField on init
          if (val.page.isCircular) return false
          return true
        },
        indexBy((l) => this.getColId(l.page), this.subfield.listType.temporalEntity)
      );
      this.dataColumnsVisibility$.next(dataColMap)
      this.dataColumns$ = combineLatest(
        this.subfield.listType.temporalEntity.map(subentityField => {
          const page = subentityField.page;
          const domain = page.isOutgoing ? this.subfield.targetClass : null
          const range = page.isOutgoing ? null : this.subfield.targetClass
          return this.c.pipeFieldLabel(page.fkProperty, domain, range)
            .pipe(
              map(fieldLabel => {
                return {
                  id: this.getColId(page),
                  name: fieldLabel,
                  pkProperty: page.fkProperty,
                  subfieldType: subentityField.subfieldType
                }
              })
            )
        })
      )
      this.visibleDataColumns$ = combineLatest(this.dataColumnsVisibility$, this.dataColumns$).pipe(
        map(
          ([colMap, all]) => all.filter(column => colMap[column.id])
        )
      )
    }

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
    if (this.subfield.identityDefiningForSource && this.subfield.isOutgoing) {
      alert('Item can not be removed, since it is defining the identity of the connected temporal entity. You might want to replace the entire temporal entity.')
    } else {
      this.ap.pkProject$.pipe(takeUntil(this.destroy$)).subscribe(pkProject => {

        const statement = item.statement;
        this.inf.statement.remove([statement], pkProject)

      })
    }
  }

  openTimespanModal(x: StatementTargetTimeSpan) {
    this.timeSpan.openModal(x, this.pkEntity)
  }
  openInNewTab(pkEntity: number) {
    this.p.addEntityTab(pkEntity, this.subfield.targetClass)
  }

  addAndOpenInNewTab(pkEntity: number) {
    this.p.addEntityToProject(pkEntity, () => {
      this.openInNewTab(pkEntity)
    })
  }


  add() {
    if (this.subfield.listType.temporalEntity) {
      this.addTeEn()
    } else {

      // collect selected statements
      const statements: InfStatement[] = values(this.selected)
      this.ap.pkProject$.pipe(first()).subscribe(
        // upsert them in db
        pkProject => this.inf.statement.upsert(statements, pkProject).resolved$
          .pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {
            // put them in store
            this.s.storeSchemaObjectGv({ inf: { statement: statements } }, undefined)
            this.close.emit()
          })
      )
    }

  }
  toggleSelection(stmtWT: StatementWithTarget) {
    const id = stmtWT.statement.pk_entity
    if (!this.allowMultiSelect) this.selected = {}
    if (this.selected[id]) {
      delete this.selected[id]
    } else {
      this.selected[id] = stmtWT.statement;
    }
    this.selection.toggle(stmtWT.statement.pk_entity)
  }

  /**
   * For TemporalEntity view
   */

  toggleCol(colId: string) {
    // this.dataColumnsVisibility$.pipe(first()).subscribe(colMap => {

    // });
    setTimeout(() => {

      const colMap = this.dataColumnsVisibility$.value
      this.dataColumnsVisibility$.next({
        ...colMap,
        [colId]: !colMap[colId]
      });
    })
  }
  openList(subentityPage: SubentitySubfieldPage) {
    const data: SubfieldDialogData = {
      sourceClass: this.subfield.targetClass,
      fkProperty: subentityPage.subfield.fkProperty,
      targetClass: subentityPage.subfield.targetClass,
      isOutgoing: subentityPage.subfield.isOutgoing,
      sourceEntity: subentityPage.subfield.fkSourceEntity,
      scope: this.scope,
      showOntoInfo$: this.showOntoInfo$,
    }
    // const pkEntities = cell.items.map(i => cell.isOutgoing ? i.statement.fk_object_info : i.statement.fk_subject_info)
    // this.listDialog.open(true, pkEntities, 'Items')
    this.dialog.open(SubfieldDialogComponent, {
      data
    })
    // throw new Error('TODO');
  }
  markAsFavorite(item: StatementWithTarget) {
    this.p.pkProject$.pipe(first()).subscribe(pkProject => {
      this.p.pro$.info_proj_rel.markStatementAsFavorite(pkProject, item.statement.pk_entity, item.isOutgoing)
    })
  }
  removeEntity(item: StatementWithTarget) {
    this.p.pkProject$.pipe(first()).subscribe(pkProject => {

      // remove the statement
      this.inf.statement.remove([item.statement], pkProject)

      // remove the related temporal entity
      this.p.removeEntityFromProject(item.target.entity.pkEntity)
    })

  }


  /**
   * makes separate api calls to add items to project:
   * - one per related temporal entity
   * - one for all selected statements
   */
  addTeEn() {

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      // the selected pks
      const pkStatements: number[] = this.selection.selected;
      const statements: InfStatement[] = values(this.selected)

      // prepare api calls to add target entities to project
      const entities$ = statements.map(r => {

        // get pk of target entity
        const pkEntity = this.subfield.isOutgoing ? r.fk_object_info : r.fk_subject_info;

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


  /**
  * End of TemporalEntity view
  */

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  getColId(page: GvSubentitySubfieldPage | GvSubfieldId): string {
    return page.fkProperty + '_' + page.isOutgoing + '_' + page.targetClass
  }
}


