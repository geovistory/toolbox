import { Injectable, Inject, forwardRef } from '@angular/core';
import { indexBy } from 'ramda';
import { Observable } from 'rxjs/Observable';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';


import { ActivePeItService } from './active-pe-it.service';
import { InfPersistentItemApi, InfTemporalEntityApi, InfAppellationApi, InfRoleApi, InfLanguageApi, InfPersistentItem, InfTemporalEntity, InfAppellation, InfRole } from 'app/core';
import { RoleSetListService } from './role-set-list.service';
import { ClassService } from './class.service';
import { PeItState } from '../containers/pe-it/pe-it.model';
import { roleSetKey } from '../components/role-set-list/role-set-list-actions';
import { EprService } from './epr.service';
import { ReplaySubject } from 'rxjs';
import { TeEntService } from './te-ent.service';
import { DfhConfig } from './dfh-config';


@Injectable()
export class PeItService {

  constructor(
    private persistentItemApi: InfPersistentItemApi,
    private temporalEntityApi: InfTemporalEntityApi,
    private appellationApi: InfAppellationApi,
    private roleApi: InfRoleApi,
    private languageApi: InfLanguageApi,
    private activePeItService: ActivePeItService,
    private peItApi: InfPersistentItemApi,
    private classService: ClassService,
    private eprService: EprService,
    private roleSetListService: RoleSetListService,
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


  /**
  * Returns the teEnt (Name Use Activity) that has is for display in this project, from the given peIt
  * 
  * @param peIt 
  * @returns InfTemporalEntity that has a appellation label for display
  */
  getDisplayAppeLabelOfPeIt(peIt: InfPersistentItem): InfTemporalEntity | null {
    if (!peIt) return null

    const rolesToAppeUse: InfRole[] = peIt.pi_roles.filter(
      role => (
        role &&
        //TODO Add a better clause as soon as we have DisplayRoleForDomain/Range
        role.entity_version_project_rels &&
        role.entity_version_project_rels[0] &&
        role.entity_version_project_rels[0].is_standard_in_project &&

        // TODO this could be passed in by methods parameter 
        role.fk_property == DfhConfig.PROPERTY_PK_R63_NAMES
      ))

    return rolesToAppeUse.length ? new InfTemporalEntity(rolesToAppeUse[0].temporal_entity) : null;

  }


}
