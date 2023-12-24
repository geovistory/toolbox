import { AsyncPipe, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { Field } from '@kleiolab/lib-redux';
import { StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { DndDropEvent, DndDropzoneDirective } from 'ngx-drag-drop';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GvDndSortListDirective } from '../../../modules/base/directives/dnd-sort-list.directive';
import { DndDropPosition, GvDndGlobalService, ItemData, TreeItem } from '../../../modules/base/services/dnd-global.service';
import { ViewFieldTreeNodeService } from '../../../modules/base/services/view-field-tree-node.service';
import { READ_ONLY } from '../../../modules/base/tokens/READ_ONLY';
import { ViewFieldItemService } from '../view-field-item/view-field-item.service';
export const canDrop = (field: Field, stmt: StatementWithTarget) => map<TreeItem | false, boolean>((dragStmt) => {
  // item can't be dropped here if...

  // ...nothing is dragged
  if (!dragStmt) return false;

  // ...this item is the same as the dragged
  if (
    dragStmt.statement.pk_entity === stmt.statement.pk_entity &&
    dragStmt.isOutgoing === stmt.isOutgoing
  ) return false;

  // ...the field property is different from the dragged property
  if (field.property.fkProperty !== dragStmt.statement.fk_property) return false

  // ...the field direction is different from the dragged direction
  if (field.isOutgoing !== dragStmt.isOutgoing) return false;

  // ...the field target classes don't include the dragged targed class
  if (!field.targetClasses.includes(dragStmt.targetClass)) return false;

  // in this case, the dragged can be dropped here
  return true
});

export function getDragDataFromEvent(event: DndDropEvent): ItemData {
  return event.data as ItemData;
}

@Component({
  selector: 'gv-view-field-item-container',
  templateUrl: './view-field-item-container.component.html',
  styleUrls: ['./view-field-item-container.component.scss'],
  standalone: true,
  imports: [NgStyle, NgIf, NgTemplateOutlet, DndDropzoneDirective, AsyncPipe]
})
export class ViewFieldItemContainerComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  @Input() treeExtraPl = 80; // add extra padding left if displayMode is 'tree'
  @Input() minHeight = 48;
  pl$: Observable<number>


  /** Drag and drop start */

  @Input() field?: Field
  @Input() item?: StatementWithTarget
  @Input() hasDropZones = true // create drop zones by default
  @Input() hasDropZoneStart = true // create start zones by default
  @Input() hasDropZoneEnd = true // create end zones by default
  @Input() enableDropZoneStart$: Observable<boolean> = new BehaviorSubject(true) // enable start zone by default
  @Input() enableDropZoneEnd$: Observable<boolean> = new BehaviorSubject(true) // enable end zone by default

  showBody$ = new BehaviorSubject(false)
  dragover$ = new Subject<DndDropPosition>()
  dragoverClass$: Observable<string>;
  canDrop$!: Observable<boolean>;
  /** Drag and drop end */

  constructor(
    public nodeService: ViewFieldTreeNodeService,
    public dndGlobal: GvDndGlobalService,
    @Optional() private parentSortList: GvDndSortListDirective,
    @Optional() @Inject(READ_ONLY) readonly: boolean,
    @Optional() private itemService: ViewFieldItemService,

  ) {
    if (readonly) this.hasDropZones = false


  }

  ngOnInit(): void {
    if (this.hasDropZones) {
      if (this.itemService) {
        this.field = this.itemService.component.field
        this.item = this.itemService.component.item
      }
      if (!this.field) throw new Error('this.field missing');
      if (!this.item) throw new Error('this.item missing');
      this.dragoverClass$ = this.dragover$.pipe(map(s => `dnd-dragover-${s}`))
      this.canDrop$ = this.dndGlobal.isDragging$.pipe(canDrop(this.itemService.component.field, this.itemService.component.item))
    }

    if (this.nodeService.displayMode === 'tree') {
      this.pl$ = this.nodeService.indentation$.pipe(map(indentation => this.treeExtraPl + ((indentation - 1) * 40)))
    } else {
      this.pl$ = of(16)
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /** Drag and drop start */

  onDropZoneEnter(position: DndDropPosition) {
    this.dragover$.next(position)
  }
  onDropZoneLeave() {
    this.dragover$.next(undefined)
  }

  onDrop(event: DndDropEvent, position: DndDropPosition) {
    this.dragover$.next(undefined)

    const droppedData = getDragDataFromEvent(event)

    this.parentSortList.onDrop({
      droppedData,
      receiver: {
        data: this.itemService.component.item,
        position
      }
    })
  }

  /** Drag and drop end */

}


