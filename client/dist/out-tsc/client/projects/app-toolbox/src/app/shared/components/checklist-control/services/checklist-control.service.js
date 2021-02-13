import * as tslib_1 from "tslib";
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { indexBy } from 'ramda';
import { Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
/**
 * Node for to-do item
 */
export class NestedNode {
}
/** Flat to-do item node with expandable and level information */
export class FlatNode {
}
let ChecklistControlService = class ChecklistControlService {
    constructor() {
        /** Map from flat node to nested node. This helps us finding the nested node to be modified */
        this.flatNodeMap = new Map();
        /** Map from nested node to flattened node. This helps us to keep the same object for selection */
        this.nestedNodeMap = new Map();
        /** Map from id to flattened node. This helps us to keep selection and expansion after tree change */
        this.idNodeMap = new Map();
        /** A selected parent node to be inserted */
        this.selectedParent = null;
        /** The new item's name */
        this.newItemName = '';
        /** The selection for checklist */
        this.checklistSelection = new SelectionModel(true /* multiple */);
        this.selectionChange$ = new Subject();
        this.getLevel = (node) => node.level;
        this.isExpandable = (node) => node.expandable;
        this.getChildren = (node) => node.children;
        this.hasChild = (_, _nodeData) => _nodeData.expandable;
        // chache for selected ids, mapped to flat node, if available
        this.selectedIdCache = new Map();
        // chache for expanded ids, mapped to flat node, if available
        this.expandedIdCache = new Map();
        /**
         * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
         */
        this.transformer = (node, level) => {
            if (!this.getNodeId)
                throw new Error('you must set a getNodeId function.');
            const existingNode = this.nestedNodeMap.get(node);
            const id = this.getNodeId(node.data);
            const flatNode = existingNode && existingNode.id === id ? existingNode : new FlatNode();
            flatNode.id = id;
            flatNode.data = node.data;
            flatNode.level = level;
            flatNode.expandable = !!node.children && node.children.length > 0;
            this.flatNodeMap.set(flatNode, node);
            this.nestedNodeMap.set(node, flatNode);
            this.idNodeMap.set(id, flatNode);
            return flatNode;
        };
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.dataSource._flattenedData.pipe(delay(0)).subscribe(nodes => {
            // initialize selection from selectedIdCache
            this.checklistSelection.clear();
            const byId = this.getTreeNodeIndexById();
            nodes.forEach(node => {
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
        });
    }
    isEmpty() {
        return this.checklistSelection.selected.length < 1;
    }
    compareFn(d1, d2) {
        return this.getNodeId(d1) === this.getNodeId(d2);
    }
    selectNodesByData(dataArray) {
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
        this.emitTreeNodeDataArray();
    }
    addNodesToSelectionCache(nodes) {
        if (nodes && nodes.length) {
            nodes.forEach(node => {
                this.selectedIdCache.set(node.id, node);
            });
        }
    }
    removeNodesFromSelectionCache(nodes) {
        if (nodes && nodes.length) {
            nodes.forEach(node => {
                this.selectedIdCache.delete(node.id);
            });
        }
    }
    getTreeNodeIndexById() {
        return indexBy(node => node.id, this.treeControl.dataNodes || []);
    }
    addNodesToExpantionCache(nodes) {
        if (nodes && nodes.length) {
            nodes.forEach(node => {
                this.expandedIdCache.set(node.id, node);
            });
        }
    }
    removeNodesFromExpantionCache(nodes) {
        if (nodes && nodes.length) {
            nodes.forEach(node => {
                this.expandedIdCache.delete(node.id);
            });
        }
    }
    toggleExpansion(node) {
        if (this.treeControl.isExpanded(node)) {
            this.treeControl.collapse(node);
            this.removeNodesFromExpantionCache([node]);
        }
        else {
            this.treeControl.expand(node);
            this.addNodesToExpantionCache([node]);
        }
    }
    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node) {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child => this.checklistSelection.isSelected(child));
        return descAllSelected;
    }
    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node) {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }
    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node) {
        if (this.checklistSelection.isSelected(node)) {
            this.todoItemSelectionDeselect(node);
        }
        else {
            this.todoItemSelectionSelect(node);
        }
    }
    todoItemSelectionSelect(node) {
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.select(...[node, ...descendants]);
        this.addNodesToSelectionCache([node, ...descendants]);
        // Force update for the parent
        descendants.every(child => this.checklistSelection.isSelected(child));
        this.checkAllParentsSelection(node);
        // update selection output
        this.emitTreeNodeDataArray();
    }
    todoItemSelectionDeselect(node) {
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.deselect(...[node, ...descendants]);
        this.removeNodesFromSelectionCache([node, ...descendants]);
        // Force update for the parent
        descendants.every(child => this.checklistSelection.isSelected(child));
        this.checkAllParentsSelection(node);
        // update selection output
        this.emitTreeNodeDataArray();
    }
    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node) {
        this.checklistSelection.toggle(node);
        if (this.checklistSelection.isSelected(node)) {
            this.addNodesToSelectionCache([node]);
        }
        else {
            this.removeNodesFromSelectionCache([node]);
        }
        this.checkAllParentsSelection(node);
        // update selection output
        this.emitTreeNodeDataArray();
    }
    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node) {
        let parent = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }
    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node) {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child => this.checklistSelection.isSelected(child));
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
            this.removeNodesFromSelectionCache([node]);
        }
        else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
            this.addNodesToSelectionCache([node]);
        }
    }
    /* Get the parent node of a node */
    getParentNode(node) {
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
};
ChecklistControlService = tslib_1.__decorate([
    Injectable()
], ChecklistControlService);
export { ChecklistControlService };
//# sourceMappingURL=checklist-control.service.js.map