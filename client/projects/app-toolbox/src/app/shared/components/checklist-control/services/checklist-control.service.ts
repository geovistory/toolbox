import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { indexBy } from 'ramda';
import { Subject } from 'rxjs';



/**
 * Node for to-do item
 */
export class NestedNode<D> {
  children: NestedNode<D>[];
  data: D;
}

/** Flat to-do item node with expandable and level information */
export class FlatNode<D> {
  id: string;
  level: number;
  expandable: boolean;
  data: D;
}

@Injectable()
export class ChecklistControlService<TreeNodeData> {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<FlatNode<TreeNodeData>, NestedNode<TreeNodeData>>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<NestedNode<TreeNodeData>, FlatNode<TreeNodeData>>();

  /** Map from id to flattened node. This helps us to keep selection and expansion after tree change */
  idNodeMap = new Map<string, FlatNode<TreeNodeData>>();

  /** A selected parent node to be inserted */
  selectedParent: FlatNode<TreeNodeData> | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<FlatNode<TreeNodeData>>;

  treeFlattener: MatTreeFlattener<NestedNode<TreeNodeData>, FlatNode<TreeNodeData>>;

  dataSource: MatTreeFlatDataSource<NestedNode<TreeNodeData>, FlatNode<TreeNodeData>>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<FlatNode<TreeNodeData>>(true /* multiple */);

  selectionChange$ = new Subject<TreeNodeData[]>();

  // chache for selected ids, mapped to flat node, if available
  selectedIdCache = new Map<string, FlatNode<TreeNodeData> | undefined>();

  // chache for expanded ids, mapped to flat node, if available
  expandedIdCache = new Map<string, FlatNode<TreeNodeData> | undefined>();

  /**
   * TODO: This function needs to be injectable somehow
   * Returns a unique string for the node
   * useful for comparing the identity of nodes
   */
  getNodeId: (data: TreeNodeData) => string;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<FlatNode<TreeNodeData>>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    // this.dataSource._flattenedData.pipe(delay(0)).subscribe(nodes => {
    // initialize selection from selectedIdCache

    // });
  }

  private manageSelection() {


    this.checklistSelection.clear();
    const byId = this.getTreeNodeIndexById();

    this.treeControl.dataNodes.forEach(node => {
      const nodeToSelect = byId[node.id];
      if (nodeToSelect) {
        if (this.selectedIdCache.has(node.id)) {
          this.todoItemSelectionSelect(nodeToSelect);
        }
      }
    });

    // update selection output
    this.emitTreeNodeDataArray();
    // initialize expansion from expandedIdCache
    this.expandedIdCache.forEach((val, key) => {
      const nodeToExpand = this.idNodeMap.get(key);
      if (nodeToExpand) {
        this.treeControl.expand(nodeToExpand);
      }
    });

  }

  setData(d: NestedNode<TreeNodeData>[]) {
    this.dataSource.data = d
    setTimeout(() => { this.manageSelection(); })

  }


  isEmpty(): boolean {
    return this.checklistSelection.selected.length < 1;
  }

  getLevel = (node: FlatNode<TreeNodeData>) => node.level;

  isExpandable = (node: FlatNode<TreeNodeData>) => node.expandable;

  getChildren = (node: NestedNode<TreeNodeData>): NestedNode<TreeNodeData>[] => node.children;

  hasChild = (_: number, _nodeData: FlatNode<TreeNodeData>) => _nodeData.expandable;

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: NestedNode<TreeNodeData>, level: number) => {
    if (!this.getNodeId) throw new Error('you must set a getNodeId function.');
    const existingNode = this.nestedNodeMap.get(node);
    const id = this.getNodeId(node.data);
    const flatNode =
      existingNode && existingNode.id === id ? existingNode : new FlatNode<TreeNodeData>();
    flatNode.id = id;
    flatNode.data = node.data;
    flatNode.level = level;
    flatNode.expandable = !!node.children && node.children.length > 0;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    this.idNodeMap.set(id, flatNode);
    return flatNode;
  };

  compareFn(d1: TreeNodeData, d2: TreeNodeData): boolean {
    return this.getNodeId(d1) === this.getNodeId(d2);
  }

  selectNodesByData(dataArray: TreeNodeData[]) {
    this.checklistSelection.clear();
    this.selectedIdCache.clear();
    const nodesById = this.getTreeNodeIndexById();
    dataArray.forEach(d => {
      const idToSelect = this.getNodeId(d);
      const nodeToSelect = nodesById[idToSelect];
      if (nodeToSelect) {
        const descendants = this.treeControl.getDescendants(nodeToSelect);
        this.checklistSelection.select(...[nodeToSelect, ...descendants]);
        this.addNodesToSelectionCache([nodeToSelect, ...descendants]);
        // Force update for the parent
        descendants.every(child => this.checklistSelection.isSelected(child));
        this.checkAllParentsSelection(nodeToSelect);
      }
      // Add node to selection id cache, no matter if the node exists
      this.selectedIdCache.set(idToSelect, nodeToSelect);
    });
    this.emitTreeNodeDataArray()
  }

  addNodesToSelectionCache(nodes: FlatNode<TreeNodeData>[]) {
    if (nodes && nodes.length) {
      nodes.forEach(node => {
        this.selectedIdCache.set(node.id, node);
      });
    }
  }

  removeNodesFromSelectionCache(nodes: FlatNode<TreeNodeData>[]) {
    if (nodes && nodes.length) {
      nodes.forEach(node => {
        this.selectedIdCache.delete(node.id);
      });
    }
  }

  getTreeNodeIndexById(): { [id: string]: FlatNode<TreeNodeData> } {
    return indexBy(node => node.id, this.treeControl.dataNodes || []);
  }

  addNodesToExpantionCache(nodes: FlatNode<TreeNodeData>[]) {
    if (nodes && nodes.length) {
      nodes.forEach(node => {
        this.expandedIdCache.set(node.id, node);
      });
    }
  }

  removeNodesFromExpantionCache(nodes: FlatNode<TreeNodeData>[]) {
    if (nodes && nodes.length) {
      nodes.forEach(node => {
        this.expandedIdCache.delete(node.id);
      });
    }
  }

  toggleExpansion(node: FlatNode<TreeNodeData>) {
    if (this.treeControl.isExpanded(node)) {
      this.treeControl.collapse(node);
      this.removeNodesFromExpantionCache([node]);
    } else {
      this.treeControl.expand(node);
      this.addNodesToExpantionCache([node]);
    }
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: FlatNode<TreeNodeData>): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: FlatNode<TreeNodeData>): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: FlatNode<TreeNodeData>): void {
    if (this.checklistSelection.isSelected(node)) {
      this.todoItemSelectionDeselect(node);
    } else {
      this.todoItemSelectionSelect(node);
    }
  }
  todoItemSelectionSelect(node: FlatNode<TreeNodeData>): void {
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.select(...[node, ...descendants]);
    this.addNodesToSelectionCache([node, ...descendants]);
    // Force update for the parent
    descendants.every(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
    // update selection output
    this.emitTreeNodeDataArray()
  }
  todoItemSelectionDeselect(node: FlatNode<TreeNodeData>): void {
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.deselect(...[node, ...descendants]);
    this.removeNodesFromSelectionCache([node, ...descendants]);
    // Force update for the parent
    descendants.every(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
    // update selection output
    this.emitTreeNodeDataArray()
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: FlatNode<TreeNodeData>): void {
    this.checklistSelection.toggle(node);

    if (this.checklistSelection.isSelected(node)) {
      this.addNodesToSelectionCache([node]);
    } else {
      this.removeNodesFromSelectionCache([node]);
    }

    this.checkAllParentsSelection(node);
    // update selection output
    this.emitTreeNodeDataArray()
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: FlatNode<TreeNodeData>): void {
    let parent: FlatNode<TreeNodeData> | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: FlatNode<TreeNodeData>): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
      this.removeNodesFromSelectionCache([node]);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
      this.addNodesToSelectionCache([node]);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: FlatNode<TreeNodeData>): FlatNode<TreeNodeData> | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  emitTreeNodeDataArray() {
    this.selectionChange$.next(this.checklistSelection.selected.map(node => node.data));
  }
}
