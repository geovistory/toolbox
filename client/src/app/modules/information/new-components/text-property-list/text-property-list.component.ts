import { Component, OnInit, Input } from '@angular/core';
import { PropertyListComponentInterface, ListDefinition, TextPropertyItem } from '../properties-tree/properties-tree.models';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Observable } from 'rxjs';
import { ActiveProjectService } from 'app/core';
import { PropertyTreeService } from '../properties-tree/properties-tree.service';

@Component({
  selector: 'gv-text-property-list',
  templateUrl: './text-property-list.component.html',
  styleUrls: ['./text-property-list.component.scss']
})
export class TextPropertyListComponent implements OnInit {

  @Input() pkEntity: number;

  @Input() listDefinition: ListDefinition;
  @Input() treeControl: NestedTreeControl<ListDefinition[]>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;


  items$: Observable<TextPropertyItem[]>
  itemsCount$: Observable<number>

  constructor(
    public p: ActiveProjectService,
    public t: PropertyTreeService
  ) { }

  ngOnInit() {
    this.items$ = this.t.pipeTextPropertyItems(this.pkEntity)
  }

}
