import { Injectable } from '@angular/core';
import { DatTextProperty } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { datTextPropertyActions } from './dat-text-property.actions';
import { getTextPropertyByFkEntityAndFkSysType, getTextPropertyByPkEntity, getTextPropertyByPkEntityState } from './dat-text-property.selectors';

@Injectable({
  providedIn: 'root'
})
export class DatTextPropertyFacade extends CrudFacade<DatTextProperty> {

  pkEntityIndex$ = this.store.select(getTextPropertyByPkEntityState);

  constructor(protected override store: Store<IAppState>) {
    super(store, datTextPropertyActions)
  }

  getTextProperty = {
    byPkEntity$: (pkEntity: number) => this.store.select(getTextPropertyByPkEntity(pkEntity)),
    byFkEntityAndSysType$: (fkEntity: number, fkSystemType: number) => this.store.select(getTextPropertyByFkEntityAndFkSysType(fkEntity, fkSystemType))
  };
}
