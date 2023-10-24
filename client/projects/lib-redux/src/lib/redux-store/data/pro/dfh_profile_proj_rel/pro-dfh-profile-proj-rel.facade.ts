import { Injectable } from '@angular/core';
import { ProDfhProfileProjRel } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { proDfhProfileProjRelActions } from './pro-dfh-profile-proj-rel.actions';
import { byFkProjectFkClassState, getDfhProfileProjRel } from './pro-dfh-profile-proj-rel.selectors';

@Injectable({
  providedIn: 'root'
})
export class ProDfhProfileProjRelFacade extends CrudFacade<ProDfhProfileProjRel> {

  getDfhProfileProjRelByFkProjectFkClass$ = this.store.select(byFkProjectFkClassState);

  constructor(protected store: Store<IAppState>) {
    super(store, proDfhProfileProjRelActions)
  }

  getDfhProfileProjRel = {
    byFkProjectFkClass$: (fkProject: number, fkClass: number) =>
      this.store.select(getDfhProfileProjRel.byFkProjectFkClass(fkProject, fkClass)),

    byFkProject$: (fkProject: number) =>
      this.store.select(getDfhProfileProjRel.byFkProject(fkProject)),

    byFkProjectEnabled$: (fkProject: number, enabled: boolean) =>
      this.store.select(getDfhProfileProjRel.byFkProjectEnabled(fkProject, enabled))
  };
}
