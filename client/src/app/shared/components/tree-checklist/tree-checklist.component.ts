import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinct, takeUntil } from 'rxjs/operators';
/**
 * Node for tree
 */
export class TreeNode<T> {
  children: BehaviorSubject<TreeNode<T>[]>;
  constructor(public data: T, children?: TreeNode<T>[]) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}

export class TreeDataSource<T> {
  children: BehaviorSubject<TreeNode<T>[]>;
  constructor(public data: T, children?: TreeNode<T>[]) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}


@Component({
  selector: 'gv-tree-checklist',
  templateUrl: './tree-checklist.component.html',
  styleUrls: ['./tree-checklist.component.scss']
})
export class TreeChecklistComponent implements OnDestroy, AfterViewInit {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  @Input() treeData$: Observable<TreeNode<any>[]>;
  @Output() selectionChange = new EventEmitter<TreeNode<any>[]>();
  @Output() optionsChange = new EventEmitter<TreeNode<any>[]>();

  selected$ = new BehaviorSubject<TreeNode<any>[]>([]);

  levels = new Map<TreeNode<any>, number>();
  treeControl: FlatTreeControl<TreeNode<any>>;

  treeFlattener: MatTreeFlattener<TreeNode<any>, TreeNode<any>>;

  dataSource: MatTreeFlatDataSource<TreeNode<any>, TreeNode<any>>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TreeNode<any>>(true /* multiple */);

  selected: TreeNode<any>[];

  constructor(private changeDetectorRef: ChangeDetectorRef) {

    this.selected$.pipe(distinct(), takeUntil(this.destroy$)).subscribe(selected => {
      this.selectionChange.emit(selected)
    })

  }

  ngAfterViewInit() {
    if (!this.treeData$) throw new Error('please provide a treeData$ input');

    // TODO remove first and connect treeData$ to dataSource to make it really async
    this.treeData$.pipe(takeUntil(this.destroy$)).subscribe(d => {
      this.checklistSelection = new SelectionModel<TreeNode<any>>(true /* multiple */);
      this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
      this.treeControl = new FlatTreeControl<TreeNode<any>>(this.getLevel, this.isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.dataSource.data = d;
    this.optionsChange.emit(this.treeControl.dataNodes)
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
    const noneSelected = descendants.every(child => !this.checklistSelection.isSelected(child));
    if (selected && noneSelected) {
      this.checklistSelection.deselect(node);
      this.changeDetectorRef.markForCheck();
    }
    this.selected$.next(this.checklistSelection.selected);
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

    this.selected$.next(this.checklistSelection.selected);

    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
