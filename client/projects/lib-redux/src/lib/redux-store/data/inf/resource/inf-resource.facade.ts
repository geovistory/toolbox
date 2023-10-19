import { Injectable } from '@angular/core';
import { InfResource } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { infResourceActions } from './inf-resource.actions';
import { getResourceByFkClass, getResourceByPkEntity, getResourceByPkEntityState } from './inf-resource.selectors';

@Injectable({
  providedIn: 'root'
})
export class InfResourceFacade extends CrudFacade<InfResource> {

  resourcesByPkEntity$ = this.store.select(getResourceByPkEntityState);

  getResource = {
    byPkEntity$: (pkEntity: number) => this.store.select(getResourceByPkEntity(pkEntity)),
    byFkClass$: (fkClass: number) => this.store.select(getResourceByFkClass(fkClass))
  };

  constructor(protected store: Store<IAppState>) {
    super(store, infResourceActions)
  }

}
