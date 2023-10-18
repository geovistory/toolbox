import { Injectable } from '@angular/core';
import { ProInfoProjRel } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_helpers/crud-facade';
import { proInfoProjRelActions } from './pro-info-proj-rel.actions';
import { getInfoProjRelByFkProjectPkEntity, getInfoProjRelByFkProjectPkEntityState } from './pro-info-proj-rel.selectors';

@Injectable()
export class ProInfoProjRelFacade extends CrudFacade<ProInfoProjRel> {

  // Loaders
  fkProjectFkEntity$ = this.store.select(getInfoProjRelByFkProjectPkEntityState);

  constructor(protected store: Store<IAppState>) {
    super(store, proInfoProjRelActions)
  }

  getInfoProjRel = {
    byFkProjectPkEntity$: (fkProject: number, pkEntity: number) => this.store.select(getInfoProjRelByFkProjectPkEntity(fkProject, pkEntity))
  };
}
