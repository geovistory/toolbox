import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { QueryTree, QueryTreeData } from '../../containers/query-detail/query-detail.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'gv-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.scss']
})
export class SubgroupComponent implements OnInit {

  @Input() qtree: QueryTree;
  @Input() parentData$: Observable<QueryTreeData>;
  @Output() remove = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    this.qtree.data = {
      subgroup: 'AND',
    }
    if (this.qtree.children.length === 0) {
      this.qtree.children.push(new QueryTree())
    }
  }

  addChild() {
    this.qtree.children.push(new QueryTree())
  }

  removeChild(i) {
    this.qtree.children.splice(i, 1)

    if (this.qtree.children.length === 0) this.remove.emit();
  }


}
