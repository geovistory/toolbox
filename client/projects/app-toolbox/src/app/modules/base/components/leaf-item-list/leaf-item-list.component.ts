
import { map, shareReplay, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Observable, Subject, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project";
import { InfActions } from 'projects/app-toolbox/src/app/core/inf/inf.actions';
import { EntityPreviewItem, Item, ItemList, Subfield, PropertyListComponentInterface, BasicStatementItem, TextPropertyItem } from '../properties-tree/properties-tree.models';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { InformationPipesService } from '../../../../core/redux-queries/services/information-pipes.service';
import { PaginationService } from '../../services/pagination.service';
import { createPaginateBy } from "../../base.helpers";
import { temporalEntityListDefaultPageIndex } from "../../base.helpers";
import { temporalEntityListDefaultLimit } from "../../base.helpers";
import { equals } from 'ramda';
import { PaginateByParam } from 'projects/app-toolbox/src/app/core/redux-store/schema-actions-factory';
import { PageEvent, MatDialog } from '@angular/material';
import { ConfirmDialogData, ConfirmDialogComponent } from 'projects/app-toolbox/src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'gv-leaf-item-list',
  templateUrl: './leaf-item-list.component.html',
  styleUrls: ['./leaf-item-list.component.scss']
})
export class LeafItemListComponent implements OnInit, PropertyListComponentInterface {

  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;

  @Input() listDefinition: Subfield;
  @Input() treeControl: NestedTreeControl<Subfield>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;

  items$: Observable<ItemList>
  itemsCount$: Observable<number>

  limit$ = new BehaviorSubject(temporalEntityListDefaultLimit)
  pageIndex$ = new BehaviorSubject(temporalEntityListDefaultPageIndex);
  offset$: Observable<number>;

  constructor(
    public p: ActiveProjectService,
    public t: PropertiesTreeService,
    public i: InformationPipesService,
    public inf: InfActions,
    public pag: PaginationService,
    public dialog: MatDialog
  ) {
    this.offset$ = combineLatest(this.limit$, this.pageIndex$).pipe(
      map(([limit, pageIndex]) => limit * pageIndex)
    )
  }

  ngOnInit() {


    if (this.listDefinition.listType.entityPreview) {

      const pagination$ = combineLatest(
        this.limit$.pipe(),
        this.offset$.pipe(),
        this.p.pkProject$
      ).pipe(shareReplay({ refCount: true, bufferSize: 1 }))

      // Loading from rest api
      const nextPage$ = new Subject();
      pagination$.pipe(
        distinctUntilChanged(equals),
        takeUntil(this.destroy$)
      ).subscribe(([limit, offset, pkProject]) => {
        nextPage$.next()
        this.pag.statements.addPageLoader(
          pkProject,
          this.listDefinition,
          this.pkEntity,
          limit,
          offset,
          merge(nextPage$, this.destroy$)
        )
      })

      const paginateBy: PaginateByParam[] = createPaginateBy(this.listDefinition, this.pkEntity)

      // Piping from store
      this.items$ = pagination$.pipe(
        distinctUntilChanged(equals),
        switchMap(([limit, offset, pkProject]) => this.i.pipeStatementListPage(
          paginateBy,
          limit,
          offset,
          pkProject,
          this.listDefinition,
          false
        )),
        shareReplay({ refCount: true, bufferSize: 1 }),
      )

      this.itemsCount$ = this.p.inf$.statement$.pagination$.pipeCount(paginateBy)


    } else {
      this.items$ = this.i.pipeList(this.listDefinition, this.pkEntity)
      this.itemsCount$ = this.items$.pipe(map(i => (i || []).length))
    }
  }


  remove(item: Item) {
    if (this.listDefinition.identityDefiningForSource && this.listDefinition.isOutgoing) {
      alert('Item can not be removed, since it is defining the identity of the connected temporal entity. You might want to replace the entire temporal entity.')
    } else {
      this.p.pkProject$.pipe(takeUntil(this.destroy$)).subscribe(pkProject => {

        const statement = (item as BasicStatementItem).statement;
        this.inf.statement.remove([statement], pkProject)

      })
    }
  }

  openInNewTab(item: EntityPreviewItem) {
    this.p.addEntityTab(item.preview.pk_entity, item.preview.fk_class)
  }

  openPopup(item: BasicStatementItem) {
    const data: ConfirmDialogData = {
      hideNoButton: true,
      noBtnText: '',
      yesBtnText: 'Ok',
      title: 'Details',
      paragraphs: [item.label]
    }
    this.dialog.open(ConfirmDialogComponent, { data })
  }

  onPageChange(e: PageEvent) {
    this.pageIndex$.next(e.pageIndex)
    this.limit$.next(e.pageSize)
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
