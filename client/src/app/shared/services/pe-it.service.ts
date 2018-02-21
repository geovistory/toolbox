import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { PersistentItemApi } from '../sdk/services/custom/PersistentItem';
import { PersistentItem } from '../sdk/models/PersistentItem';
import { TemporalEntity } from '../sdk/models/TemporalEntity';
import { Appellation } from '../sdk/models/Appellation';
import { InfLanguage } from '../sdk/models/InfLanguage';
import { TemporalEntityApi } from '../sdk/services/custom/TemporalEntity';
import { AppellationApi } from '../sdk/services/custom/Appellation';
import { InformationRoleApi } from '../sdk/services/custom/InformationRole';
import { InformationRole } from '../sdk/models/InformationRole';
import { InfLanguageApi } from '../sdk/services/custom/InfLanguage';
import { ActivePeItService } from './active-pe-it.service';


@Injectable()
export class PeItService {

  constructor(
    private persistentItemApi: PersistentItemApi,
    private temporalEntityApi: TemporalEntityApi,
    private appellationApi: AppellationApi,
    private roleApi: InformationRoleApi,
    private languageApi: InfLanguageApi,
    private activePeItService: ActivePeItService
  ) {

  }

  createPeIt(projectId: number, peIt: PersistentItem) {
    return this.persistentItemApi.findOrCreatePeIt(projectId, peIt)
  }

  createTeEnt(projectId: number, teEnt: TemporalEntity) {
    return this.temporalEntityApi.findOrCreateTemporalEntity(projectId, teEnt);
  }

  createAppe(projectId: number, appe: Appellation) {
    return this.appellationApi.findOrCreateAppellation(projectId, appe);
  }

  createRole(projectId: number, role: InformationRole) {
    return this.roleApi.findOrCreateInformationRole(projectId, role);
  }

  findLangByIso6392t(iso6392t) {
    return this.languageApi.find({
      "where": {
        "iso6392t": iso6392t
      }
    });
  }



}
