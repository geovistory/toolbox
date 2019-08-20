import { Component, Input, OnInit } from '@angular/core';
import { NestedTreeControl } from '../../../../../../node_modules/@angular/cdk/tree';
import { Observable, Subject } from '../../../../../../node_modules/rxjs';
import { takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { ActiveProjectService } from '../../../../core';
import { InfActions } from '../../../../core/inf/inf.actions';
import { EntityPreviewItem, Item, ItemList, ListDefinition, PropertyListComponentInterface, RoleItemBasics, TextPropertyItem } from '../properties-tree/properties-tree.models';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { InformationPipesService } from '../../new-services/information-pipes.service';

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

  constructor(
    public p: ActiveProjectService,
    public t: PropertiesTreeService,
    public i: InformationPipesService,
    public inf: InfActions
  ) { }

  ngOnInit() {
    this.items$ = this.i.pipeList(this.listDefinition, this.pkEntity)
    this.itemsCount$ = this.items$.map(i => (i || []).length)
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

          const role = (item as RoleItemBasics).role;
          this.inf.role.remove([role], pkProject)

        }
      })
    }
  }

  openInNewTab(item: EntityPreviewItem) {
    this.p.addEntityTab(item.preview)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
