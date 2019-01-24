import { Injectable } from '@angular/core';
import { InfLanguageApi, InfPersistentItem, InfPersistentItemApi } from 'app/core';
import { ReplaySubject } from 'rxjs';
import { EprService } from './epr.service';





@Injectable()
export class PeItService {

  constructor(
    private languageApi: InfLanguageApi,
    private peItApi: InfPersistentItemApi,
    private eprService: EprService,
  ) {

  }

  findLangByIso6392t(iso6392t) {
    return this.languageApi.find({
      'where': {
        'iso6392t': iso6392t
      }
    });
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
