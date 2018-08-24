import { Injectable } from '@angular/core';
import { InfAppellation, InfAppellationApi, InfLanguageApi, InfPersistentItem, InfPersistentItemApi, InfRole, InfRoleApi, InfTemporalEntity, InfTemporalEntityApi } from 'app/core';
import { ReplaySubject } from 'rxjs';
import { ClassService } from './class.service';
import { EprService } from './epr.service';





@Injectable()
export class PeItService {

  constructor(
    private persistentItemApi: InfPersistentItemApi,
    private temporalEntityApi: InfTemporalEntityApi,
    private appellationApi: InfAppellationApi,
    private roleApi: InfRoleApi,
    private languageApi: InfLanguageApi,
    private peItApi: InfPersistentItemApi,
    private classService: ClassService,
    private eprService: EprService,
  ) {

  }

  findLangByIso6392t(iso6392t) {
    return this.languageApi.find({
      "where": {
        "iso6392t": iso6392t
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
      }
      else {
        this.peItApi.nestedObjectOfRepo(pkEntity).subscribe((peIts: InfPersistentItem[]) => {

          subject.next(peIts[0]);

        })
      }
    })

    return subject;

  }



}
