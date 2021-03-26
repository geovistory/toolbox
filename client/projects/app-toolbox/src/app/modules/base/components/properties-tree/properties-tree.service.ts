import { Injectable } from '@angular/core';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';


@Injectable()
export class PropertiesTreeService {

  constructor(
    private p: ActiveProjectService
  ) { }

  // updateOrder(event: CdkDragDrop<ItemBasics[]>, items$: Observable<ItemBasics[]>) {
  //   combineLatest(this.p.pkProject$, items$).pipe(
  //     first(([p, i]) => (i && i.length > 0))
  //   ).subscribe(([pkProject, items]) => {

  //     moveItemInArray(items, event.previousIndex, event.currentIndex);

  //     const changedEprs: ProInfoProjRel[] = []

  //     // check, if needs update
  //     for (let i = 0; i < items.length; i++) {

  //       const ipr = items[i].projRel;
  //       // if the ord_num is wrong
  //       // TODO: add support for ord_num_of_range
  //       if (ipr.ord_num_of_domain != i) {
  //         changedEprs.push({ ...ipr, ord_num_of_domain: i, })
  //       }
  //     }

  //     if (changedEprs.length) this.p.pro$.info_proj_rel.upsert(changedEprs, pkProject)
  //   })
  // }

}
