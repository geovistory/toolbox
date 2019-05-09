import { Injectable } from '@angular/core';
import { ProInfoProjRel, ProInfoProjRelApi, IAppState } from 'app/core';
import { ReplaySubject } from 'rxjs';
import { NgRedux } from '@angular-redux/store';


@Injectable()
export class EprService {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private eprApi: ProInfoProjRelApi
  ) { }


  /**
  * getEpr - returns the InfEntityProjectRel between the given entity
  * and the active project
  *
  * @param  {any} entity   InfPersistentItem, InfRole, InfTemporalEntity, InfAppellation, InfLanguage
  * @return {type}        description
  */
  getEprOfEntity(entity) {
    if (!entity.entity_version_project_rels) return undefined;

    const eprs = entity.entity_version_project_rels.filter(
      epr => epr.fk_project === this.ngRedux.getState().activeProject.pk_entity
    )
    if (eprs.length !== 1) {
      // TODO error
    }
    return eprs[0];
  }

  /**
  * updateEprOfEntity - Updates InfEntityProjectRel between the given entity
  * and the active project
  *
  * @param  {any} entity   InfPersistentItem, InfRole, InfTemporalEntity, InfAppellation, InfLanguage
  * @param  {ProInfoProjRel} epr
  */
  updateEprOfEntity(entity, epr: ProInfoProjRel) {
    let eprs = entity.entity_version_project_rels;
    for (let i = 0; i < eprs.length; i++) {
      if (eprs[i].pk_entity_version_project_rel == epr.pk_entity_version_project_rel) {
        eprs[i] = epr;
      }
    }
  }


  /**
   * checks if the entity with given pkEntity is in project of given pkProject.
   * @param pkProject 
   * @param pkEntity 
   */
  checkIfInProject(pkEntity: number, pkProject?: number): ReplaySubject<boolean> {
    const onDone = new ReplaySubject<boolean>();

    if (!pkProject) onDone.next(false);


    this.eprApi.find({
      'where': {
        'fk_entity': pkEntity,
        'fk_project': pkProject
      }
    }).subscribe(eprs => {
      if (eprs.length > 0) {

        onDone.next(true)
      } else {
        onDone.next(false);
      }

    })


    return onDone;
  }

}
