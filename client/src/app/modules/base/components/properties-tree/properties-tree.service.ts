import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Subfield, ItemBasics } from './properties-tree.models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { first } from 'rxjs/operators';
import { ActiveProjectService } from "app/core/active-project";

import { ProInfoProjRel } from "app/core/sdk";

@Injectable()
export class PropertiesTreeService {

  constructor(
    private p: ActiveProjectService
  ) { }

  updateOrder(event: CdkDragDrop<ItemBasics[]>, items$: Observable<ItemBasics[]>) {
    combineLatest(this.p.pkProject$, items$).pipe(
      first(([p, i]) => (i && i.length > 0))
    ).subscribe(([pkProject, items]) => {

      moveItemInArray(items, event.previousIndex, event.currentIndex);

      const changedEprs: ProInfoProjRel[] = []

      // check, if needs update
      for (let i = 0; i < items.length; i++) {

        const ipr = items[i].projRel;
        // if the ord_num is wrong
        // TODO: add support for ord_num_of_range
        if (ipr.ord_num_of_domain != i) {
          changedEprs.push({ ...ipr, ord_num_of_domain: i, })
        }
      }

      if (changedEprs.length) this.p.pro$.info_proj_rel.upsert(changedEprs, pkProject)
    })
  }

}
