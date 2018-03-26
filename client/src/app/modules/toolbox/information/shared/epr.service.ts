import { Injectable } from '@angular/core';
import { ActiveProjectService, InfEntityProjectRel } from 'app/core';


@Injectable()
export class EprService {

  constructor(
    private activeProjectService:ActiveProjectService
  ) { }


  /**
  * getEpr - returns the InfEntityProjectRel between the given entity
  * and the active project
  *
  * @param  {any} entity   InfPersistentItem, InfRole, InfTemporalEntity, InfAppellation, InfLanguage
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
  * updateEprOfEntity - Updates InfEntityProjectRel between the given entity
  * and the active project
  *
  * @param  {any} entity   InfPersistentItem, InfRole, InfTemporalEntity, InfAppellation, InfLanguage
  * @param  {InfEntityProjectRel} epr
  */
  updateEprOfEntity (entity, epr:InfEntityProjectRel){
    let eprs = entity.entity_version_project_rels;
    for (let i = 0; i < eprs.length; i++) {
      if(eprs[i].pk_entity_version_project_rel == epr.pk_entity_version_project_rel){
        eprs[i] = epr;
      }
    }
  }

}
