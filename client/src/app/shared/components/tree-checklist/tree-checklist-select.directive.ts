import { AfterViewInit, ContentChildren, Directive, QueryList, ContentChild, ChangeDetectorRef } from '@angular/core';
import { MatOption } from '@angular/material';
import { TreeChecklistComponent, TreeNode } from './tree-checklist.component';

@Directive({
  selector: '[gvTreeChecklistSelect]'
})
export class TreeChecklistSelectDirective implements AfterViewInit {

  @ContentChildren(MatOption) matOptions: QueryList<MatOption>;
  @ContentChild(TreeChecklistComponent) treeChecklist: TreeChecklistComponent;

  constructor(private changeDetectorRef:ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.treeChecklist.selectionChange.subscribe((options: TreeNode<any>[]) => {
      this.matOptions.forEach((matOption: MatOption) => {
        if (options.indexOf(matOption.value) > -1) {
          matOption.select()
          this.changeDetectorRef.detectChanges()
        } else {
          matOption.deselect()
          this.changeDetectorRef.detectChanges()
        }
      })
    })

  }

}
