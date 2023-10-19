import { Injectable } from '@angular/core';
import { DatDigital } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { datDigitalActions } from './dat-digital.actions';
import { getDigitalByPkEntity, getDigitalByPkEntityAndVersion, getDigitalByPkEntityAndVersionState, getDigitalByPkText } from './dat-digital.selectors';

@Injectable({
  providedIn: 'root'
})
export class DatDigitalFacade extends CrudFacade<DatDigital> {

  pkEntityVersionIndex$ = this.store.select(getDigitalByPkEntityAndVersionState);

  constructor(protected store: Store<IAppState>) {
    super(store, datDigitalActions)
  }

  getDigital = {
    byPkEntityVersion$: (pkEntity: number, version: number) => this.store.select(getDigitalByPkEntityAndVersion(pkEntity, version)),
    byPkEntity$: (pkEntity: number) => this.store.select(getDigitalByPkEntity(pkEntity)),
    byPkText$: (pkText: number) => this.store.select(getDigitalByPkText(pkText))
  };
}
