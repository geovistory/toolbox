import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { of, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { TreeNodeData } from '../class-and-type-select/class-and-type-select.component';
import { FilterTree, FilterTreeData } from '../../containers/query-detail/query-detail.component';
import { ActiveProjectService } from 'app/core';
import { filter, distinct, tap, mergeMap, map } from 'rxjs/operators';
import { TreeNode } from 'app/shared/components/tree-checklist/tree-checklist.component';

@Component({
  selector: 'gv-class-and-type-filter',
  templateUrl: './class-and-type-filter.component.html',
  styleUrls: ['./class-and-type-filter.component.scss']
})
export class ClassAndTypeFilterComponent implements OnInit {
  @HostBinding('class.d-flex') dflex = true;
  @HostBinding('class.flex-column') flexcolumn = true;

  /**
   * The tree data
   */
  selectOptionsTree$ = of([]);
  options: TreeNode<TreeNodeData>[] = [];

  @Input() pkClasses$: Observable<number[]>;
  @Input() qtree: FilterTree;
  @Input() showRemoveBtn = true;

  @Output() remove = new EventEmitter<void>();
  @Output() validChanged = new EventEmitter<boolean>();

  data$ = new BehaviorSubject<FilterTreeData>({});
  valid = false;

  selected: TreeNode<TreeNodeData>[]
  constructor(private p: ActiveProjectService) {
  }

  ngOnInit() {

  }


  addChild() {
    this.qtree.children.push(new FilterTree({
      subgroup: 'property'
    }))
  }

  removeChild(i) {
    this.qtree.children.splice(i, 1)
  }

  setValid() {
    this.valid = [
      ...(this.qtree.data.classes || []),
    ].length > 0;
    this.validChanged.emit(this.valid)
  }


}
