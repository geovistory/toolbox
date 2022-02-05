import { CdkDropList } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Field } from '@kleiolab/lib-queries';
import { BehaviorSubject, Observable } from 'rxjs';
import { ViewFieldDropListService } from './view-field-drop-list.service';


export interface DropListItem<D> {
  dropList: CdkDropList<D>
  nestingLevel: number
}
/**
 * Singleton (global) service for connecting cdkDropLists in the right way.
 * Provides functions to register and unregister cdkDropLists and a globalDropListMap.
 */
@Injectable({
  providedIn: 'root'
})
export class GlobalDragDropService {


  /**
   * map of connected drop lists.
   * The key identifies the 'category' of conected drop lists.
   * Each key holds an array of cdkDropLists, which can be injected into
   * the @Input('cdkDropListConnectedTo') connectedTo of the cdkDropList directives
   */
  globalDropListMap: { [key: string]: BehaviorSubject<DropListItem<any>[]> } = {}

  constructor() { }

  /**
   * register a field's droplist in the globalDropListMap
   * @param field
   * @param dropList
   * @returns an observable array of droplists of the same field key, to which this droplist can be connected
   */
  registerViewFieldBodyDropList(d: ViewFieldDropListService, dropListItem: DropListItem<any>): Observable<DropListItem<any>[]> {
    const key = this.createFieldBodyKey(d.field);
    if (!this.globalDropListMap[key]) this.globalDropListMap[key] = new BehaviorSubject([dropListItem])
    else {
      const newVal = [dropListItem, ...this.globalDropListMap[key].value]
      newVal.sort((a, b) => {
        return b.nestingLevel - a.nestingLevel
      })
      this.globalDropListMap[key].next(newVal)
    }
    return this.globalDropListMap[key]
  }


  /**
   * unregister a field's droplist from the globalDropListMap
   * @param field
   * @param dropList
   */
  unregisterViewFieldBodyDropList(d: ViewFieldDropListService, dropListItem: DropListItem<any>) {
    try {

      const key = this.createFieldBodyKey(d.field);
      const newVal = this.globalDropListMap[key].value.filter(i => i !== dropListItem);
      this.globalDropListMap[key].next(newVal)
    } catch (error) {
      console.warn(error)
    }
  }

  /**
   * create a key for a field in the global drop list map
   */
  createFieldBodyKey(field: Field): string {
    return `f_${field.property.fkProperty}_${field.isOutgoing}`
  }

  getString() {
    const o = {}
    for (const key in this.globalDropListMap) {
      if (Object.prototype.hasOwnProperty.call(this.globalDropListMap, key)) {
        const element = this.globalDropListMap[key];
        o[key] = element.value.map(i => i.dropList.id)
      }
    }
    return o
  }
}
