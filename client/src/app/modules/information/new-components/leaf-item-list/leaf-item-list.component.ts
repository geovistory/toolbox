
import { map, shareReplay, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { NestedTreeControl } from '../../../../../../node_modules/@angular/cdk/tree';
import { Observable, Subject, BehaviorSubject, combineLatest, merge } from '../../../../../../node_modules/rxjs';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { ActiveProjectService } from '../../../../core';
import { InfActions } from '../../../../core/inf/inf.actions';
import { EntityPreviewItem, Item, ItemList, ListDefinition, PropertyListComponentInterface, BasicRoleItem, TextPropertyItem } from '../properties-tree/properties-tree.models';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { PaginationService } from '../../new-services/pagination.service';
import { temporalEntityListDefaultLimit, temporalEntityListDefaultPageIndex, createPaginateBy } from '../temporal-entity-list/temporal-entity-list.component';
import { equals } from 'ramda';
import { PaginateByParam } from 'app/core/store/actions';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'gv-leaf-item-list',
  templateUrl: './leaf-item-list.component.html',
  styleUrls: ['./leaf-item-list.component.scss']
})
export class LeafItemListComponent implements OnInit, PropertyListComponentInterface {

  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;

  @Input() listDefinition: ListDefinition;
  @Input() treeControl: NestedTreeControl<ListDefinition>;
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
    public pag: PaginationService
  ) {
    this.offset$ = combineLatest(this.limit$, this.pageIndex$).pipe(
      map(([limit, pageIndex]) => limit * pageIndex)
    )
  }

  ngOnInit() {


    if (this.listDefinition.listType === 'entity-preview') {

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
        this.pag.roles.addPageLoader(
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
        switchMap(([limit, offset, pkProject]) => this.i.pipeRoleListPage(
          paginateBy,
          limit,
          offset,
          pkProject,
          this.listDefinition,
          false
        )),
        shareReplay({ refCount: true, bufferSize: 1 }),
      )

      this.itemsCount$ = this.p.inf$.role$.pagination$.pipeCount(paginateBy)


    } else {
      this.items$ = this.i.pipeList(this.listDefinition, this.pkEntity)
      this.itemsCount$ = this.items$.pipe(map(i => (i || []).length))
    }
  }


  remove(item: Item) {
    if (this.listDefinition.isIdentityDefining && this.listDefinition.isOutgoing) {
      alert('Item can not be removed, since it is defining the identity of the connected temporal entity. You might want to replace the entire temporal entity.')
    } else {
      this.p.pkProject$.pipe(takeUntil(this.destroy$)).subscribe(pkProject => {

        if (this.listDefinition.listType == 'text-property') {

          const txtProp = (item as TextPropertyItem).textProperty;
          this.inf.text_property.remove([txtProp], pkProject)

        } else {

          const role = (item as BasicRoleItem).role;
          this.inf.role.remove([role], pkProject)

        }
      })
    }
  }

  openInNewTab(item: EntityPreviewItem) {
    this.p.addEntityTab(item.preview)
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
