import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';


import { ActivePeItService } from './active-pe-it.service';
import { InfPersistentItemApi, InfTemporalEntityApi, InfAppellationApi, InfRoleApi, InfLanguageApi, InfPersistentItem, InfTemporalEntity, InfAppellation, InfRole } from 'app/core';


@Injectable()
export class PeItService {

  constructor(
    private persistentItemApi: InfPersistentItemApi,
    private temporalEntityApi: InfTemporalEntityApi,
    private appellationApi: InfAppellationApi,
    private roleApi: InfRoleApi,
    private languageApi: InfLanguageApi,
    private activePeItService: ActivePeItService
  ) {

  }

  createPeIt(projectId: number, peIt: InfPersistentItem) {
    return this.persistentItemApi.findOrCreatePeIt(projectId, peIt)
  }

  createTeEnt(projectId: number, teEnt: InfTemporalEntity) {
    return this.temporalEntityApi.findOrCreateInfTemporalEntity(projectId, teEnt);
  }

  createAppe(projectId: number, appe: InfAppellation) {
    return this.appellationApi.findOrCreateAppellation(projectId, appe);
  }

  createRole(projectId: number, role: InfRole) {
    return this.roleApi.findOrCreateInfRole(projectId, role);
  }

  findLangByIso6392t(iso6392t) {
    return this.languageApi.find({
      "where": {
        "iso6392t": iso6392t
      }
    });
  }



}
