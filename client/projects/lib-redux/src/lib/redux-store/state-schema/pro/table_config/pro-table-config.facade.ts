import { Injectable } from '@angular/core';
import { ProTableConfig } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_helpers/crud-facade';
import { proTableConfigActions } from './pro-table-config.actions';
import { byPkEntityState, getByFkDigital, getByPkEntity } from './pro-table-config.selectors';

@Injectable()
export class ProTableConfigFacade extends CrudFacade<ProTableConfig> {

  // Loaders
  pkEntityIndex$ = this.store.select(byPkEntityState);

  constructor(protected store: Store<IAppState>) {
    super(store, proTableConfigActions)
  }

  getTableConfig = {
    byPkEntity$: (pkEntity: number) => this.store.select(getByPkEntity(pkEntity)),
    byFkDigital$: (pkDigital: number) => this.store.select(getByFkDigital(pkDigital))
  };
}
