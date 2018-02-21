import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { InfPersistentItemApi } from '../sdk/services/custom/InfPersistentItem';
import { InfPersistentItem } from '../sdk/models/InfPersistentItem';
import { InfTemporalEntity } from '../sdk/models/InfTemporalEntity';
import { Appellation } from '../sdk/models/Appellation';
import { InfLanguage } from '../sdk/models/InfLanguage';
import { InfTemporalEntityApi } from '../sdk/services/custom/InfTemporalEntity';
import { AppellationApi } from '../sdk/services/custom/Appellation';
import { InfRoleApi } from '../sdk/services/custom/InfRole';
import { InfRole } from '../sdk/models/InfRole';
import { InfLanguageApi } from '../sdk/services/custom/InfLanguage';
import { ActivePeItService } from './active-pe-it.service';


@Injectable()
export class PeItService {

  constructor(
    private persistentItemApi: InfPersistentItemApi,
    private temporalEntityApi: InfTemporalEntityApi,
    private appellationApi: AppellationApi,
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

  createAppe(projectId: number, appe: Appellation) {
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
