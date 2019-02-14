import { Component, OnInit, ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
/**
 * Node for tree
 */
export class TreeNode<T> {
  children: BehaviorSubject<TreeNode<T>[]>;
  constructor(public item: T, children?: TreeNode<T>[]) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}

export class TreeDataSource<T> {
  children: BehaviorSubject<TreeNode<T>[]>;
  constructor(public item: T, children?: TreeNode<T>[]) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}


@Component({
  selector: 'gv-tree-checklist',
  templateUrl: './tree-checklist.component.html',
  styleUrls: ['./tree-checklist.component.scss']
})
export class TreeChecklistComponent implements OnDestroy, OnInit {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  @Input() treeData$: Observable<TreeNode<any>[]>;

  levels = new Map<TreeNode<any>, number>();
  treeControl: FlatTreeControl<TreeNode<any>>;

  treeFlattener: MatTreeFlattener<TreeNode<any>, TreeNode<any>>;

  dataSource: MatTreeFlatDataSource<TreeNode<any>, TreeNode<any>>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TreeNode<any>>(true /* multiple */);

  selected: TreeNode<any>[];

  constructor(private changeDetectorRef: ChangeDetectorRef) {

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TreeNode<any>>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  }

  ngOnInit() {
    if (!this.treeData$) throw new Error('please provide a treeData$ input');
    this.treeData$.takeUntil(this.destroy$).subscribe(d => {
      this.dataSource.data = d;
    })
  }

  getLevel = (node: TreeNode<any>): number => {
    return this.levels.get(node) || 0;
  };

  isExpandable = (node: TreeNode<any>): boolean => {
    return node.children.value.length > 0;
  };

  getChildren = (node: TreeNode<any>) => {
    return node.children;
  };

  transformer = (node: TreeNode<any>, level: number) => {
    this.levels.set(node, level);
    return node;
  }

  hasChildren = (index: number, node: TreeNode<any>) => {
    return this.isExpandable(node);
  }



  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: TreeNode<any>): boolean {
    const descendants = this.treeControl.getDescendants(node);
    if (!descendants.length) {
      return this.checklistSelection.isSelected(node);
    }
    const selected = this.checklistSelection.isSelected(node);
    const allSelected = descendants.every(child => this.checklistSelection.isSelected(child));
    if (!selected && allSelected) {
      this.checklistSelection.select(node);
      this.changeDetectorRef.markForCheck();
    }
    return allSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TreeNode<any>): boolean {
    const descendants = this.treeControl.getDescendants(node);
    if (!descendants.length) {
      return false;
    }
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the game selection. Select/deselect all the descendants node */
  nodeSelectionToggle(node: TreeNode<any>): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants, node)
      : this.checklistSelection.deselect(...descendants, node);

    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
