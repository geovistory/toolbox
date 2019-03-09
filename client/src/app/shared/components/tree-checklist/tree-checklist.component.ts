import { CollectionViewer, DataSource, SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output, OnInit } from '@angular/core';
import { MatTreeFlattener } from '@angular/material';
import { indexBy, difference } from 'ramda';
import { BehaviorSubject, Observable, Subject, zip, combineLatest, merge } from 'rxjs';
import { distinct, first, map, takeUntil } from 'rxjs/operators';
/**
 * Node for tree
 */
export class TreeNode<D> {
  children: BehaviorSubject<TreeNode<D>[]>;
  constructor(public data: D, children?: TreeNode<D>[]) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}


/**
 * Data source for flat tree with stream of data
 * The data source need to handle expansion/collapsion of the tree node and change the data feed
 * to `MatTree`.
 * The nested tree nodes of type `T` are flattened through `MatTreeFlattener`, and converted
 * to type `F` for `MatTree` to consume.
 */
export class TreeDataSource<T, F> extends DataSource<F> {
  _flattenedData = new BehaviorSubject<F[]>([]);

  _expandedData = new BehaviorSubject<F[]>([]);

  _data: BehaviorSubject<T[]>;
  get data() { return this._data.value; }
  set data(value: T[]) {
    this._data.next(value);
    this._flattenedData.next(this.treeFlattener.flattenNodes(this.data));
    this.treeControl.dataNodes = this._flattenedData.value;
  }

  constructor(private treeControl: FlatTreeControl<F>,
    private treeFlattener: MatTreeFlattener<T, F>,
    private dataStream$: Observable<T[]>,
    initialData: T[] = []) {
    super();
    this._data = new BehaviorSubject<T[]>(initialData);

  }

  connect(collectionViewer: CollectionViewer): Observable<F[]> {

    return merge(
      collectionViewer.viewChange,
      this.treeControl.expansionModel.onChange,
      this._flattenedData,
    ).pipe(map(() => {
      this._expandedData.next(
        this.treeFlattener.expandFlattenedNodes(this._flattenedData.value, this.treeControl)
      );
      return this._expandedData.value;
    }));
  }

  disconnect() {
    // no op
  }



}



@Component({
  selector: 'gv-tree-checklist',
  templateUrl: './tree-checklist.component.html',
  styleUrls: ['./tree-checklist.component.scss']
})
export class TreeChecklistComponent implements OnInit, OnDestroy, AfterViewInit {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  @Input() public treeData$: Subject<TreeNode<any>[]>;
  @Output() selectionChange = new EventEmitter<TreeNode<any>[]>();
  @Output() optionsChange = new EventEmitter<TreeNode<any>[]>();

  selected$ = new BehaviorSubject<TreeNode<any>[]>([]);

  set selected(val: TreeNode<any>[]) {
    this.selected$.next(val);
  }
  get selected(): TreeNode<any>[] {
    return this.selected$.value;
  }

  treeDataInitialized$ = new Subject<TreeNode<any>[]>();
  treeDataInitialized = false;

  levels = new Map<TreeNode<any>, number>();
  treeControl: FlatTreeControl<TreeNode<any>>;

  treeFlattener: MatTreeFlattener<TreeNode<any>, TreeNode<any>>;

  dataSource: TreeDataSource<TreeNode<any>, TreeNode<any>>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TreeNode<any>>(true /* multiple */);


  constructor(private changeDetectorRef: ChangeDetectorRef) {

    this.selected$.pipe(distinct(), takeUntil(this.destroy$)).subscribe(selected => {
      this.selectionChange.emit(selected)
    })

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TreeNode<any>>(this.getLevel, this.isExpandable);

  }

  trackByFn(index, item) {
    return item.data.id;
  }

  ngOnInit() {
    if (!this.treeData$) throw new Error('please provide a treeData$ input');

    this.dataSource = new TreeDataSource(this.treeControl, this.treeFlattener, this.treeData$);
  }

  ngAfterViewInit() {
    this.treeData$.pipe(takeUntil(this.destroy$)).subscribe(d => {
      this.dataSource.data = d;

      this.reselect(d);
      if (!this.treeDataInitialized) {
        this.treeDataInitialized = true;
        this.treeDataInitialized$.next();
      }
    })
  }

  reselect(nodes: TreeNode<any>[]) {
    const dataNodes = this.treeControl.dataNodes;
    const availableNodes = indexBy((id) => id, this.extractNodeIds(dataNodes));
    const selectedNodeIds = indexBy((id) => id, this.extractNodeIds(this.selected));
    let hasChanges = false;

    // delete selection
    this.checklistSelection.selected.forEach(node => this.checklistSelection.deselect(node));

    dataNodes.forEach(node => {
      const id = this.extractNodeId(node);
      // deselect removed
      if (!availableNodes[id]) {
        this.checklistSelection.deselect(node);
        hasChanges = true
        // reselect replaced
      } else if (selectedNodeIds[id]) {
        this.checklistSelection.select(node);
        hasChanges = true
      }
    })
    this.changeDetectorRef.detectChanges();
    if (hasChanges) this.selected = this.checklistSelection.selected;
  }

  setSelection(nodes: TreeNode<any>[]) {

    // wait for treeDataInitialized
    this.treeDataInitialized$.pipe(takeUntil(this.destroy$)).subscribe(() => {

      const dataNodes = this.treeControl.dataNodes;

      let hasChanges = false;
      const oldSelectedIds = indexBy((id) => id, this.extractNodeIds(this.selected));
      const newSelectedIds = indexBy((id) => id, this.extractNodeIds(nodes));

      dataNodes.forEach(node => {
        const id = this.extractNodeId(node);
        // deselect
        if (!newSelectedIds[id] && oldSelectedIds[id]) {
          this.checklistSelection.deselect(node);
          hasChanges = true
          // select
        } else if (!oldSelectedIds[id] && newSelectedIds[id]) {
          this.checklistSelection.select(node);
          hasChanges = true
        }
      })

      if (hasChanges) this.selected = this.checklistSelection.selected;
    })

  }

  // recursivlyMergeNodes(oldVal: TreeNode<any>[], newVal: TreeNode<any>[]): TreeNode<any>[] {

  //   const oldNodeIds = this.extractNodeIds(oldVal)
  //   const newNodeIds = this.extractNodeIds(newVal)
  //   const nodeIdsToAdd = indexBy((id) => id, difference(newNodeIds, oldNodeIds));
  //   const nodeIdsToRemove = indexBy((id) => id, difference(oldNodeIds, newNodeIds));

  //   [...newVal].forEach((node, index) => {
  //     // if needs to be added
  //     if (nodeIdsToAdd[this.extractNodeId(node)]) {
  //       oldVal.splice(index, 1)
  //     }
  //   });

  //   [...oldVal].forEach((node, index) => {
  //     // if needs to be removed
  //     if (nodeIdsToRemove[this.extractNodeId(node)]) {
  //       oldVal.splice(index, 1)
  //     }
  //   });


  //   return;
  // }


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



  private extractNodeId(node: TreeNode<any>): any {
    return node.data.id;
  }

  private extractNodeIds(nodes: TreeNode<any>[]): any[] {
    if (!nodes) return [];
    return nodes.map(node => this.extractNodeId(node));
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
      this.selected = this.checklistSelection.selected;
      this.changeDetectorRef.markForCheck();
    }
    const noneSelected = descendants.every(child => !this.checklistSelection.isSelected(child));
    if (selected && noneSelected) {
      this.checklistSelection.deselect(node);
      this.selected = this.checklistSelection.selected;
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

    this.selected = this.checklistSelection.selected;

    this.changeDetectorRef.markForCheck();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
