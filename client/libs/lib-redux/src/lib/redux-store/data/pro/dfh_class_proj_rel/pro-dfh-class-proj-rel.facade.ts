import { Injectable } from '@angular/core';
import { ProDfhClassProjRel } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { proDfhClassProjRelActions } from './pro-dfh-class-proj-rel.actions';
import { byFkProjectFkClassState, getDfhClassProjRel } from './pro-dfh-class-proj-rel.selectors';

@Injectable({
  providedIn: 'root'
})
export class ProDfhClassProjRelFacade extends CrudFacade<ProDfhClassProjRel> {

  getDfhClassProjRelByFkProjectFkClass$ = this.store.select(byFkProjectFkClassState);

  constructor(protected override store: Store<IAppState>) {
    super(store, proDfhClassProjRelActions)
  }

  getDfhClassProjRel = {
    byFkProjectFkClass$: (fkProject: number, fkClass: number) =>
      this.store.select(getDfhClassProjRel.byFkProjectFkClass(fkProject, fkClass)),

    byFkProject$: (fkProject: number) =>
      this.store.select(getDfhClassProjRel.byFkProject(fkProject)),

    byFkProjectEnabledInEntities$: (fkProject: number, enabled: boolean) =>
      this.store.select(getDfhClassProjRel.byFkProjectEnabledInEntities(fkProject, enabled))
  };
}
