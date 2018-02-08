import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { PersistentItemVersionApi } from '../sdk/services/custom/PersistentItemVersion';
import { PersistentItemVersion } from '../sdk/models/PersistentItemVersion';
import { TemporalEntity } from '../sdk/models/TemporalEntity';
import { Appellation } from '../sdk/models/Appellation';
import { InformationLanguage } from '../sdk/models/InformationLanguage';
import { TemporalEntityApi } from '../sdk/services/custom/TemporalEntity';
import { AppellationApi } from '../sdk/services/custom/Appellation';
import { InformationRoleApi } from '../sdk/services/custom/InformationRole';
import { InformationRole } from '../sdk/models/InformationRole';
import { InformationLanguageApi } from '../sdk/services/custom/InformationLanguage';
import { ActivePeItService } from './active-pe-it.service';


@Injectable()
export class PeItService {

  constructor(
    private persistentItemApi: PersistentItemVersionApi,
    private temporalEntityApi: TemporalEntityApi,
    private appellationApi: AppellationApi,
    private roleApi: InformationRoleApi,
    private languageApi: InformationLanguageApi,
    private activePeItService: ActivePeItService
  ) {

  }

  /**
  * getRichObject - get a rich object of the PeIt with all its
  * roles > temporal entities > roles > PeIts from Api
  * and store it in the ActivePeItService.peIt
  *
  * @param  {type} pkProject primary key of project
  * @param  {type} pkEntity  pk_entity of the persistent item
  * @return {Observable<PersistentItemVersion[]>}
  */
  getRichObject(pkProject: number, pkEntity: number): Observable<PersistentItemVersion[]> {
    const innerJoinThisProject = {
      "entity_version_project_rels": {
        "$relation": {
          "name": "entity_version_project_rels",
          "joinType": "inner join",
          "where": ["fk_project", "=", pkProject]
        }
      }
    };

    const filter =
      {
        "where": ["pk_entity", "=", pkEntity],
        "include": {
          ...innerJoinThisProject,
          "pi_roles": {
            "$relation": {
              "name": "pi_roles",
              "joinType": "left join"
            },
            ...innerJoinThisProject,
            "temporal_entity": {
              "$relation": {
                "name": "temporal_entity",
                "joinType": "inner join",
                "orderBy": [{ "pk_entity": "asc" }]
              },
              ...innerJoinThisProject,
              "te_roles": {
                "$relation": {
                  "name": "te_roles",
                  "joinType": "inner join",
                  "orderBy": [{ "pk_entity": "asc" }]
                },
                ...innerJoinThisProject,
                "appellation": {
                  "$relation": {
                    "name": "appellation",
                    "joinType": "left join",
                    "orderBy": [{ "pk_entity": "asc" }]
                  },
                  ...innerJoinThisProject
                },
                "language": {
                  "$relation": {
                    "name": "language",
                    "joinType": "left join",
                    "orderBy": [{ "pk_entity": "asc" }]
                  }
                  // ,
                  // ...innerJoinThisProject
                }
              }
            }
          }
        }
      }

    return this.persistentItemApi.findComplex(filter);
  }



  createPeIt(projectId: number, peIt: PersistentItemVersion) {
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
