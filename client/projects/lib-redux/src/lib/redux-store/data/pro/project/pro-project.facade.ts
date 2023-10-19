import { Injectable } from '@angular/core';
import { ProProject } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { proProjectActions } from './pro-project.actions';
import { getProjectByPkEntity, getProjectByPkEntityState } from './pro-project.selectors';

@Injectable({
  providedIn: 'root'
})
export class ProProjectFacade extends CrudFacade<ProProject> {

  // Loaders
  projectsByPkEntity$ = this.store.select(getProjectByPkEntityState);

  constructor(protected store: Store<IAppState>) {
    super(store, proProjectActions)
  }

  getProject = {
    byPkEntity$: (pkEntity: number) => this.store.select(getProjectByPkEntity(pkEntity))
  };
}
