import { CdkDropList } from '@angular/cdk/drag-drop';
import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { Field } from '@kleiolab/lib-queries';
import { GvFieldPageScope, GvFieldSourceEntity, StatementWithTarget } from '@kleiolab/lib-sdk-lb4/public-api';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DropListItem, GlobalDragDropService } from '../services/global-drag-drop.service';
import { ViewFieldDropListService } from '../services/view-field-drop-list.service';
import { ViewFieldTreeNodeService } from '../services/view-field-tree-node.service';

@Directive({
  selector: '[gvViewFieldDropList]'
})
export class ViewFieldDropListDirective implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  @Input() gvViewFieldDropList: ViewFieldDropListService
  @Input() dlField: Field
  @Input() dlSource: GvFieldSourceEntity;
  @Input() dlScope: GvFieldPageScope
  @Input() dlLimit$: BehaviorSubject<number>
  @Input() dlPageIndex$: BehaviorSubject<number>;
  @Input() dlItems$: Observable<StatementWithTarget[]>

  dropListItem: DropListItem<ViewFieldDropListService>

  constructor(
    private globalDragDropService: GlobalDragDropService,
    private dropListService: ViewFieldDropListService,
    private treeNodeService: ViewFieldTreeNodeService,
    private dropList: CdkDropList
  ) { }

  ngOnInit() {
    this.dropListService.register(
      this.dlField, this.dlSource, this.dlScope, this.dlLimit$, this.dlItems$, this.dlPageIndex$
    )

    // if this field is not identifying the source or target
    if (!this.dlField.identityDefiningForSource && !this.dlField.identityDefiningForTarget) {
      // we can allow to 'move' its statements to another source
      this.dropListItem = { nestingLevel: this.treeNodeService.indentation$.value, dropList: this.dropList }
      const dropListGroup$ = this.globalDragDropService.registerViewFieldBodyDropList(this.gvViewFieldDropList, this.dropListItem);
      dropListGroup$.pipe(takeUntil(this.destroy$)).subscribe(dropLists => {
        this.dropListService.connectedToDropLists$.next(dropLists.map(d => d.dropList))
        // console.log(this.globalDragDropService.getString())
      })
    }

  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.globalDragDropService.unregisterViewFieldBodyDropList(this.gvViewFieldDropList, this.dropListItem)

  }
}
