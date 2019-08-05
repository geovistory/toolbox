import { Component, Input, OnInit } from '@angular/core';
import { NestedTreeControl } from '../../../../../../node_modules/@angular/cdk/tree';
import { MatDialog } from '../../../../../../node_modules/@angular/material';
import { sum } from '../../../../../../node_modules/ramda';
import { combineLatest, Observable, Subject } from '../../../../../../node_modules/rxjs';
import { map, takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { ChooseClassDialogComponent, ChooseClassDialogData } from '../choose-class-dialog/choose-class-dialog.component';
import { FieldDefinition, ListDefinition, ListType } from '../properties-tree/properties-tree.models';
import { PropertyTreeService } from '../properties-tree/properties-tree.service';

interface ListDefinitionWithItemCount extends ListDefinition {
  itemsCount: number
}
@Component({
  selector: 'gv-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {


  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;

  @Input() fieldDefinition: FieldDefinition
  @Input() appContext: number
  @Input() treeControl: NestedTreeControl<FieldDefinition>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>

  listsWithCounts$: Observable<ListDefinitionWithItemCount[]>
  showAddButton$
  itemsCount$;

  constructor(
    public t: PropertyTreeService,
    public dialog: MatDialog
  ) {
    // this.t.pipeEntityPreviewList(l, this.pkEntity).pipe(map(x => x.length))
  }

  ngOnInit() {

    this.listsWithCounts$ = combineLatest(this.fieldDefinition.listDefinitions.map(l => {
      return this.t.pipeList(l, this.pkEntity).pipe(
        map((items) => ({
          ...l, itemsCount: items.length
        }))
      )
    })).pipe(
      map(lists => lists.filter((list: any) => list.itemsCount > 0))
    )

    this.itemsCount$ = this.listsWithCounts$.pipe(map((ls) => sum(ls.map((l) => l.itemsCount))))

    this.showAddButton$ = combineLatest(this.itemsCount$, this.readonly$)
      .pipe(map(([n, r]) => {
        if (r) return false;
        if (this.fieldDefinition.targetMaxQuantity === -1) return true;
        if (this.fieldDefinition.targetMaxQuantity <= n) return false
        return true;
      }))


  }

  is = (node: ListDefinition, type: ListType) => {
    return node.listType === type
  };

  addClick() {
    if (this.fieldDefinition.targetClasses && this.fieldDefinition.targetClasses.length > 1) {
      // show a select list
      const data: ChooseClassDialogData = {
        pkClasses: this.fieldDefinition.targetClasses,
        title: 'Choose a class'
      }
      this.dialog.open(ChooseClassDialogComponent, { data })
        .afterClosed().pipe(takeUntil(this.destroy$)).subscribe(chosenClass => {
          if (chosenClass) {
            const listDef = this.fieldDefinition.listDefinitions.find(l => l.targetClass === chosenClass)
            this.t.showControl$.next(listDef)
          }
        });
    }
    else {
      this.t.showControl$.next(this.fieldDefinition.listDefinitions[0])
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
