import { Component, OnInit, Input } from '@angular/core';
import { PropertyListComponentInterface, ListDefinition, TemporalEntityItem } from '../properties-tree/properties-tree.models';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Observable } from 'rxjs';
import { ActiveProjectService } from 'app/core';
import { PropertyTreeService } from '../properties-tree/properties-tree.service';

@Component({
  selector: 'gv-temporal-entity-list',
  templateUrl: './temporal-entity-list.component.html',
  styleUrls: ['./temporal-entity-list.component.scss']
})
export class TemporalEntityListComponent implements OnInit, PropertyListComponentInterface {

  @Input() pkEntity: number;

  @Input() listDefinition: ListDefinition;
  @Input() treeControl: NestedTreeControl<ListDefinition>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;

  @Input() appContext: number;

  items$: Observable<TemporalEntityItem[]>
  itemsCount$: Observable<number>

  constructor(
    public p: ActiveProjectService,
    public t: PropertyTreeService
  ) { }

  ngOnInit() {
    this.items$ = this.t.pipeTemporalEntityList(this.listDefinition, this.pkEntity, this.appContext)
    this.itemsCount$ = this.items$.map(i => (i ||  []).length)
  }

}
