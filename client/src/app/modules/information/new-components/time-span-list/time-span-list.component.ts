import { Component, OnInit, Input } from '@angular/core';
import { PropertyListComponentInterface, ListDefinition, TimeSpanItem } from '../properties-tree/properties-tree.models';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Observable, of } from 'rxjs';
import { ActiveProjectService } from 'app/core';
import { PropertyTreeService } from '../properties-tree/properties-tree.service';

@Component({
  selector: 'gv-time-span-list',
  templateUrl: './time-span-list.component.html',
  styleUrls: ['./time-span-list.component.scss']
})
export class TimeSpanListComponent implements OnInit {

  @Input() pkEntity: number;

  @Input() listDefinition: ListDefinition;
  @Input() treeControl: NestedTreeControl<ListDefinition[]>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() addButtonVisible;
  @Input() toggleButtonVisible;


  item$: Observable<TimeSpanItem>
  itemsCount$: Observable<number>

  constructor(
    public p: ActiveProjectService,
    public t: PropertyTreeService
  ) { }

  ngOnInit() {
    this.item$ = this.t.pipeTimeSpan(this.pkEntity)
    this.itemsCount$ = of(1)
  }

}
