import { Injectable } from '@angular/core';
import { ProProject } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { values } from 'ramda';
import { map } from 'rxjs/operators';
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
  latestFirst$ = this.projectsByPkEntity$.pipe(
    map(all => values(all).sort((a, b) => {
      const dateA = new Date(a.tmsp_last_modification);
      const dateB = new Date(b.tmsp_last_modification);
      return dateA < dateB ? 1 : -1;
    }))
  )

  constructor(protected store: Store<IAppState>) {
    super(store, proProjectActions)
  }

  getProject = {
    byPkEntity$: (pkEntity: number) => this.store.select(getProjectByPkEntity(pkEntity)),
  };

}
