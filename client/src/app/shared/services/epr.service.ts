import { Injectable } from '@angular/core';
import { ActiveProjectService } from './active-project.service';
import { EntityVersionProjectRel } from '../sdk/models/EntityVersionProjectRel';

@Injectable()
export class EprService {

  constructor(
    private activeProjectService:ActiveProjectService
  ) { }


  /**
  * getEpr - returns the EntityVersionProjectRel between the given entity
  * and the active project
  *
  * @param  {any} entity   PersistentItemVersion, Role, TemporalEntity, Appellation, Language
  * @return {type}        description
  */
  getEprOfEntity (entity){
    if(!entity.entity_version_project_rels) return undefined;
    
    const eprs = entity.entity_version_project_rels.filter(
      epr => epr.fk_project === this.activeProjectService.project.pk_project
    )
    if (eprs.length !== 1){
      // TODO error
    }
    return eprs[0];
  }

  /**
  * updateEprOfEntity - Updates EntityVersionProjectRel between the given entity
  * and the active project
  *
  * @param  {any} entity   PersistentItemVersion, Role, TemporalEntity, Appellation, Language
  * @param  {EntityVersionProjectRel} epr
  */
  updateEprOfEntity (entity, epr:EntityVersionProjectRel){
    let eprs = entity.entity_version_project_rels;
    for (let i = 0; i < eprs.length; i++) {
      if(eprs[i].pk_entity_version_project_rel == epr.pk_entity_version_project_rel){
        eprs[i] = epr;
      }
    }
  }

}
