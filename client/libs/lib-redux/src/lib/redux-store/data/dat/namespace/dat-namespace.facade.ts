import { Injectable } from '@angular/core';
import { DatNamespace } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { datNamespaceActions } from './dat-namespace.actions';
import { getNamespaceByFkProject, getNamespaceByPkEntity, getNamespaceByPkEntityState } from './dat-namespace.selectors';

@Injectable({
  providedIn: 'root'
})
export class DatNamespaceFacade extends CrudFacade<DatNamespace> {

  pkEntityIndex$ = this.store.select(getNamespaceByPkEntityState);

  constructor(protected override store: Store<IAppState>) {
    super(store, datNamespaceActions)
  }

  getNamespace = {
    byPkEntity$: (pkEntity: number) => this.store.select(getNamespaceByPkEntity(pkEntity)),
    byFkProject$: (fkProject: number) => this.store.select(getNamespaceByFkProject(fkProject))
  };
}
