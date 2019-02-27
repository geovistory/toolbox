import { AfterContentInit, ChangeDetectorRef, ContentChild, ContentChildren, Directive, EventEmitter, OnDestroy, Output, QueryList } from '@angular/core';
import { MatOption } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TreeChecklistComponent, TreeNode } from './tree-checklist.component';

@Directive({
  selector: '[gvTreeChecklistSelect]'
})
export class TreeChecklistSelectDirective implements AfterContentInit, OnDestroy {
  destroy$ = new Subject();

  @ContentChildren(MatOption) matOptions: QueryList<MatOption>;
  @ContentChild(TreeChecklistComponent) treeChecklist: TreeChecklistComponent;
  @Output() optionsChange = new EventEmitter<TreeNode<any>[]>();

  selectedIds: Array<any> = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterContentInit() {
    const matOptionsChange$ = new BehaviorSubject<void>(undefined);

    // on options change (1)
    this.treeChecklist.optionsChange.subscribe(options => {
      const availableIds = this.extractNodeIds(options);

      // deselect only the ones, that are not in options any more and that are selected
      this.matOptions.forEach(matOption => {
        const id = this.extractNodeId(matOption.value);
        if (matOption.selected && availableIds.indexOf(id) === -1) {
          matOption.deselect();
        }
      })
      // this emit will trigger the creation of new mat-options in DOM,
      // to which we listen below
      this.optionsChange.emit(options);
    })

    this.matOptions.changes.subscribe(x => { matOptionsChange$.next(undefined) })

    // On selection Change:
    // 1. select or deselect mat options
    this.treeChecklist.selectionChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((selected) => {
        this.selectedIds = this.extractNodeIds(selected)
        this.reselectMatOptions(this.selectedIds);
      })

    // On MatOptions Change:
    // 0. (in TreeChecklistComponent the treeChecklist.checklistSelection has been reset)
    // 1. deselect all existing mat options (ContentChildren)
    // 2. recreate all mat-options in Dom
    // 3. reapply selection to mat-options
    // 4. reapply selection to treeChecklist.checklistSelection
    this.matOptions.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe((options) => {

        // reapply the selection to the mat-options
        this.reselectMatOptions(this.selectedIds);

        // reapply the selection to the tree-checklist
        this.reselectChecklist(this.selectedIds);

        // update the selectedIds
        this.selectedIds = this.extractNodeIds(this.treeChecklist.checklistSelection.selected)

      })

  }

  private extractNodeId(node: TreeNode<any>): any {
    return node.data.id;
  }

  private extractNodeIds(nodes: TreeNode<any>[]): any[] {
    return nodes.map(node => this.extractNodeId(node));
  }

  private shoudBeSelected(selectedIds: any[], node: TreeNode<any>) {
    return selectedIds.indexOf(node.data.id);
  }


  /**
   * Reselect the checklist according to the given array of selected Ids 
   */
  private reselectChecklist(selectedIds: any[]) {
    this.treeChecklist.treeControl.dataNodes.forEach(node => {
      if (this.shoudBeSelected(selectedIds, node) > -1 // should be selected
        && !this.treeChecklist.checklistSelection.isSelected(node) // and is not selected
      ) {
        this.treeChecklist.checklistSelection.select(node);
        this.changeDetectorRef.detectChanges();
      } else if (this.shoudBeSelected(selectedIds, node) === -1 // should be deselected
        && this.treeChecklist.checklistSelection.isSelected(node) // and is selected
      ) {
        this.treeChecklist.checklistSelection.deselect(node);
        this.changeDetectorRef.detectChanges();
      }
    });
  }


  /**
   * Reselect the mat-options according to the given array of selected Ids 
   */
  private reselectMatOptions(selectedIds: any[]) {
    this.matOptions.forEach((matOption: MatOption) => {
      if (this.shoudBeSelected(selectedIds, matOption.value) > -1 // should be selected
        && !matOption.selected // and is not selected
      ) {
        matOption.select();
        this.changeDetectorRef.detectChanges();
      } else if (this.shoudBeSelected(selectedIds, matOption.value) === -1 // should be deselected
        && matOption.selected // and is selected
      ) {
        matOption.deselect();
        this.changeDetectorRef.detectChanges();
      }
    });
  }




  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe()
  }
}
