import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PageEvent } from '@angular/material/paginator';
import { ActiveProjectPipesService, InformationPipesService, StatementTargetTimeSpan, StatementWithTarget, Subfield } from '@kleiolab/lib-queries';
import { InfActions, SchemaService } from '@kleiolab/lib-redux';
import { GvSubfieldPageScope, InfStatement } from '@kleiolab/lib-sdk-lb4';
import { ConfirmDialogComponent, ConfirmDialogData } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { equals, values } from 'ramda';
import { BehaviorSubject, combineLatest, merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, first, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { subfieldToSubfieldPage, temporalEntityListDefaultLimit, temporalEntityListDefaultPageIndex } from '../../base.helpers';
import { PaginationService } from '../../services/pagination.service';
import { TimeSpanService } from '../../services/time-span.service';

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

  constructor(
    private p: ActiveProjectPipesService,
    private dialog: MatDialog,
    private pag: PaginationService,
    private inf: InfActions,
    private i: InformationPipesService,
    private timeSpan: TimeSpanService,
    private s: SchemaService
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


    const pagination$ = combineLatest(this.limit$, this.offset$, this.p.pkProject$)
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
      map(s => s.source.selected.length)
    )

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
      this.p.pkProject$.pipe(takeUntil(this.destroy$)).subscribe(pkProject => {

        const statement = item.statement;
        this.inf.statement.remove([statement], pkProject)

      })
    }
  }

  openTimespanModal(x: StatementTargetTimeSpan) {
    this.timeSpan.openModal(x, this.pkEntity)
  }


  add() {
    // collect selected statements
    const statements: InfStatement[] = values(this.selected)
    this.p.pkProject$.pipe(first()).subscribe(
      // upsert them in db
      pkProject => this.inf.statement.upsert(statements, pkProject).resolved$
        .pipe(first(x => !!x), takeUntil(this.destroy$)).subscribe(pending => {
          // put them in store
          this.s.storeSchemaObjectGv({ inf: { statement: statements } }, undefined)
          this.close.emit()
        })
    )
  }
  toggle(stmtWT: StatementWithTarget) {
    const id = stmtWT.statement.pk_entity
    if (this.selected[id]) {
      delete this.selected[id]
    } else {
      this.selected[id] = stmtWT.statement;
    }
    this.selection.toggle(stmtWT.statement.pk_entity)

  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
