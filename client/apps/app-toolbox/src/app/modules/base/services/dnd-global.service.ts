import { Injectable } from '@angular/core';
import { StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { BehaviorSubject } from 'rxjs';
import type { ViewFieldBodyComponent } from '../components/view-field-body/view-field-body.component';
export type TreeItem = StatementWithTarget
export type DndDropPosition = 'start' | 'end';
export interface ItemData {
  sortListId: string
  item: TreeItem;
}
@Injectable({
  providedIn: 'root'
})
export class GvDndGlobalService {
  static _id = 0
  isDragging$ = new BehaviorSubject<TreeItem | false>(false)

  registeredViewFieldBodies: { [id: string]: ViewFieldBodyComponent } = {}

  registerAndGetId(vfb: ViewFieldBodyComponent) {
    const id = `_${GvDndGlobalService._id++}`
    this.registeredViewFieldBodies[id] = vfb
    return id
  }
  unregister(id: string) {
    delete this.registeredViewFieldBodies[id];
  }

}
