import { Injectable } from '@angular/core';
import { DatColumn } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { datColumnActions } from './dat-column.actions';
import { getColumnByFkDigital, getColumnByPkEntity, getColumnByPkEntityState } from './dat-column.selectors';

@Injectable({
  providedIn: 'root'
})
export class DatColumnFacade extends CrudFacade<DatColumn> {

  pkEntityIndex$ = this.store.select(getColumnByPkEntityState);

  constructor(protected store: Store<IAppState>) {
    super(store, datColumnActions)
  }

  getColumn = {
    byPkEntity$: (pkEntity: number) => this.store.select(getColumnByPkEntity(pkEntity)),
    byFkDigital$: (fkDigital: number) => this.store.select(getColumnByFkDigital(fkDigital))
  };
}
