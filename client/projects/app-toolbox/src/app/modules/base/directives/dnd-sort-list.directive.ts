import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Field } from '@kleiolab/lib-queries';
import { StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { first } from 'rxjs/operators';
import { ViewFieldBodyComponent } from '../components/view-field-body/view-field-body.component';
import { DndDropPosition, GvDndGlobalService, ItemData, TreeItem } from '../services/dnd-global.service';
import { ViewFieldDropListService } from '../services/view-field-drop-list.service';


interface DndSortListDropEvent {
  receiver: {
    data: StatementWithTarget,
    position: DndDropPosition
  }
  droppedData: ItemData,
}

type LocalEvent = DndSortListDropEvent & {
  previousIndex: number,
  currentIndex: number,
}

@Directive({
  selector: '[gvDndSortList]',
})
export class GvDndSortListDirective {
  @Input('gvDndSortList') data!: { items: TreeItem[], field: Field, id: string }
  @Output() optimisticUpdate = new EventEmitter<StatementWithTarget[]>()



  constructor(
    private dndGlobal: GvDndGlobalService,
    private service: ViewFieldDropListService,
    private currentVfb: ViewFieldBodyComponent) {

  }


  async onDrop(event: DndSortListDropEvent) {
    this.dndGlobal.isDragging$.next(false)
    const previousSortListId = event.droppedData.sortListId
    const sameContainer = this.data.id === previousSortListId;

    const previousVfb = this.dndGlobal.registeredViewFieldBodies[previousSortListId]

    // retrieve previous index (the item had before dragging)
    const previousItems = await previousVfb.items$.pipe(first()).toPromise()
    const previousIndex = previousItems.findIndex((p) => p.statement.pk_entity === event.droppedData.item.statement.pk_entity)

    // retrieve current index (where the item should be in future)
    let currentIndex: number;
    const items = await this.currentVfb.items$.pipe(first()).toPromise()
    const receiverIndex = items.indexOf(event.receiver.data)

    // if the position is center, we inform the parent comonent and do nothing
    if (event.receiver.position === 'start') currentIndex = receiverIndex;
    else if (event.receiver.position === 'end') currentIndex = receiverIndex + 1;
    else throw new Error(`Drop position ${event.receiver.position} not supported`)

    // if we move inside the same container upwards, correct currentIndex
    if (sameContainer && previousIndex < currentIndex) currentIndex--;

    const e: LocalEvent = {
      ...event,
      currentIndex,
      previousIndex,
    }

    console.log(`
    dropped ${event.droppedData.item.statement.pk_entity} from position ${previousIndex}
    in list ${this.currentVfb.field.label}
    at ${event.receiver.position} of ${event.receiver.data.statement.pk_entity} to position ${currentIndex}
    `)

    if (sameContainer) {
      const updated = await this.service.moveInSameField(
        this.currentVfb,
        previousIndex,
        currentIndex,
        event.droppedData.item.statement.pk_entity
      )
      this.optimisticUpdate.emit(updated)
    }
    else {
      const updated = await this.service.moveBetweenFields(
        previousVfb,
        previousIndex,
        this.currentVfb,
        currentIndex,
        event.droppedData.item,
      )
      this.optimisticUpdate.emit(updated.current)
    }
  }
}
