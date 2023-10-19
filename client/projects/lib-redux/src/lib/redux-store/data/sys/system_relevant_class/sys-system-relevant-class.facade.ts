import { Injectable } from '@angular/core';
import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { sysSystemRelevantClassActions } from './sys-system-relevant-class.actions';
import { byPkEntityState, getSystemRelevantClass } from './sys-system-relevant-class.selectors';

@Injectable({
  providedIn: 'root'
})
export class SysSystemRelevantClassFacade extends CrudFacade<SysSystemRelevantClass> {

  index$ = this.store.select(byPkEntityState);

  constructor(protected store: Store<IAppState>) {
    super(store, sysSystemRelevantClassActions)
  }
  getSystemRelevantClass = {
    byPkEntity$: (pkEntity: number) => this.store.select(getSystemRelevantClass.byPkEntity$(pkEntity)),
    byFkClass$: (fkClass: number) => this.store.select(getSystemRelevantClass.byFkClass$(fkClass)),
    byRequiredBySources$: (required: boolean) => this.store.select(getSystemRelevantClass.byRequiredBySources$(required)),
    byRequired$: (required: boolean) => this.store.select(getSystemRelevantClass.byRequired$(required)),
  }
}
