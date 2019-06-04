import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ListDefinition } from '../properties-tree/properties-tree.models';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'gv-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {
  @Output() addClick = new EventEmitter<void>()
  @Input() listDefinition: ListDefinition;
  @Input() treeControl: NestedTreeControl<ListDefinition[]>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$;
  @Input() showAddButton$: Observable<boolean>;
  @Input() itemsCount$: Observable<number>;
  constructor() { }

  ngOnInit() {
    this.showAddButton$ = combineLatest(this.itemsCount$, this.readonly$)
      .pipe(map(([n, r]) => {
        if (r) return true;
        if (this.listDefinition.targetMaxQuantity === -1) return true;
        if (this.listDefinition.targetMaxQuantity <= n) return false
        return false;
      }))
  }

}
