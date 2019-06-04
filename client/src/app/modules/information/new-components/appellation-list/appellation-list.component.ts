import { Component, OnInit, Input } from '@angular/core';
import { PropertyListComponentInterface, ListDefinition, AppellationItem } from '../properties-tree/properties-tree.models';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Observable } from 'rxjs';
import { ActiveProjectService } from 'app/core';
import { PropertyTreeService } from '../properties-tree/properties-tree.service';

@Component({
  selector: 'gv-appellation-list',
  templateUrl: './appellation-list.component.html',
  styleUrls: ['./appellation-list.component.scss']
})
export class AppellationListComponent implements OnInit, PropertyListComponentInterface {

  @Input() pkEntity: number;

  @Input() listDefinition: ListDefinition;
  @Input() treeControl: NestedTreeControl<ListDefinition[]>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;

  items$: Observable<AppellationItem[]>
  itemsCount$: Observable<number>

  constructor(
    public p: ActiveProjectService,
    public t: PropertyTreeService
  ) { }

  ngOnInit() {
    this.items$ = this.t.pipeAppellationList(this.listDefinition, this.pkEntity)
    this.itemsCount$ = this.items$.map(i => (i ||  []).length)
  }

}
