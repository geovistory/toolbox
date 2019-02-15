import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QueryTree } from '../../containers/query-detail/query-detail.component';

@Component({
  selector: 'gv-operator-select',
  templateUrl: './operator-select.component.html',
  styleUrls: ['./operator-select.component.scss']
})
export class OperatorSelectComponent implements OnInit {

  @Input() qtree: QueryTree;

  @Output() remove = new EventEmitter<void>();

  selected;
  constructor() { }

  ngOnInit() {
    this.qtree.item = {
      ...this.qtree.item,
      operator: 'operator',
    }
  }

  addChild() {
    this.qtree.children.push(new QueryTree());
  }

  removeChild(i) {
    this.qtree.children.splice(i, 1)
  }

}
