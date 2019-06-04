import { Component, OnInit, Input } from '@angular/core';
import { PropertyListComponentInterface, ListDefinition, EntityPreviewItem } from '../properties-tree/properties-tree.models';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Observable } from 'rxjs';
import { ActiveProjectService } from 'app/core';
import { PropertyTreeService } from '../properties-tree/properties-tree.service';

@Component({
  selector: 'gv-entity-preview-list',
  templateUrl: './entity-preview-list.component.html',
  styleUrls: ['./entity-preview-list.component.scss']
})
export class EntityPreviewListComponent implements OnInit, PropertyListComponentInterface {

  @Input() pkEntity: number;

  @Input() listDefinition: ListDefinition;
  @Input() treeControl: NestedTreeControl<ListDefinition>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;

  items$: Observable<EntityPreviewItem[]>
  itemsCount$: Observable<number>

  constructor(
    public p: ActiveProjectService,
    public t: PropertyTreeService
  ) { }

  ngOnInit() {
    this.items$ = this.t.pipeEntityPreviewList(this.listDefinition, this.pkEntity)
  }

}
