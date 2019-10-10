import { Injectable } from '@angular/core';
import { InfPersistentItem, InfPersistentItemApi } from 'app/core';
import { ReplaySubject } from 'rxjs';
import { EprService } from './epr.service';





@Injectable()
export class PeItService {

  constructor(
    private peItApi: InfPersistentItemApi,
    private eprService: EprService,
  ) {

  }

  getNestedObject(pkEntity: number, pkProject?: number): ReplaySubject<InfPersistentItem> {

    const subject = new ReplaySubject<InfPersistentItem>(null);

    this.eprService.checkIfInProject(pkEntity, pkProject).subscribe(isInProject => {
      if (isInProject) {
        this.peItApi.nestedObjectOfProject(pkProject, pkEntity).subscribe((peIts: InfPersistentItem[]) => {

          subject.next(peIts[0]);

        });
      } else {
        this.peItApi.nestedObjectOfRepo(pkEntity).subscribe((peIts: InfPersistentItem[]) => {

          subject.next(peIts[0]);

        })
      }
    })

    return subject;

  }



}
