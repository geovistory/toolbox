import { Component, OnInit, Input, Query, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { TreeNode } from 'app/shared/components/tree-checklist/tree-checklist.component';
import { QueryTree } from '../../containers/query-detail/query-detail.component';

@Component({
  selector: 'gv-class-and-type-select',
  templateUrl: './class-and-type-select.component.html',
  styleUrls: ['./class-and-type-select.component.scss']
})
export class ClassAndTypeSelectComponent implements OnInit {
  /**
   * The tree data
   */
  treeData = of([
    new TreeNode('Person'),
    new TreeNode('Geographical Place', [
      new TreeNode(`City`, [
        new TreeNode(`Megacity`),
        new TreeNode(`Small city`)
      ]),
      new TreeNode('Village'),
      new TreeNode('Country')
    ]),
    new TreeNode('Birth')
  ]);
  options = [];


  @Input() qtree: QueryTree;
  @Input() showRemoveBtn = true;

  @Output() remove = new EventEmitter<void>();


  constructor() { }

  ngOnInit() {
    this.qtree.item = 'types'
  }

  optionsChange(e: TreeNode<any>[]) {
    this.options = e;
  }

  addChild() {
    this.qtree.children.push(new QueryTree())
  }

  removeChild(i) {
    this.qtree.children.splice(i, 1)
  }

}
