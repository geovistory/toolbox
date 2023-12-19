import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Field } from '@kleiolab/lib-redux';
import { GvFieldSourceEntity, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { DndDropEvent, DndDropzoneDirective } from 'ngx-drag-drop';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GvDndGlobalService } from '../../services/dnd-global.service';
import { ViewFieldDropListService } from '../../services/view-field-drop-list.service';
import { canDrop, getDragDataFromEvent } from '../view-field-item-container/view-field-item-container.component';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'gv-view-field-tree-item-drop-zone',
    templateUrl: './view-field-tree-item-drop-zone.component.html',
    styleUrls: ['./view-field-tree-item-drop-zone.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, DndDropzoneDirective, AsyncPipe]
})
export class ViewFieldTreeItemDropZoneComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  @Input() dragover$: BehaviorSubject<boolean>
  @Input() source: GvFieldSourceEntity;
  @Input() field: Field
  @Input() item: StatementWithTarget

  canDrop$ = new BehaviorSubject(false);

  @HostBinding('style.display') display = 'none'



  constructor(
    private s: ViewFieldDropListService,
    public dndGlobal: GvDndGlobalService,

  ) { }
  ngOnInit(): void {

    const errors: string[] = []
    if (!this.dragover$) errors.push('@Input() dragover$ is required.');
    if (!this.item) errors.push('@Input() item is required.');
    if (!this.field) errors.push('@Input() field is required.');
    if (!this.source) errors.push('@Input() pkEntity is required.');
    // if (!this.treeControl) errors.push('@Input() treeControl is required.');
    if (errors.length) throw new Error(errors.join('\n'));

    this.dndGlobal.isDragging$.pipe(
      canDrop(this.field, this.item),
      takeUntil(this.destroy$),
    ).subscribe(b => {
      this.display = b ? 'block' : 'none'
      this.canDrop$.next(b)
    })
  }
  onDropZoneEnter() {
    this.dragover$.next(true)
  }
  onDropZoneLeave() {
    this.dragover$.next(false)
  }
  onDrop(event: DndDropEvent) {
    this.dragover$.next(false)
    const droppedData = getDragDataFromEvent(event)
    this.s.moveBetweenFieldsBackend(this.field, this.source, 1, droppedData.item.statement)
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
