import { Injectable } from '@angular/core';
import { SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { sysConfigActions } from './sys-config.actions';
import { getSysConfig } from './sys-config.selectors';

@Injectable({
  providedIn: 'root'
})
export class SysConfigFacade extends CrudFacade<SysConfigValue> {

  sysConfig$ = this.store.select(getSysConfig);

  constructor(protected store: Store<IAppState>) {
    super(store, sysConfigActions)
  }

}
