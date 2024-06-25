import { Injectable } from '@angular/core';
import { ProClassFieldConfig } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { proClassFieldConfigActions } from './pro-class-field-config.actions';
import { getClassFieldConfigByFkProjectFkClass, getClassFieldConfigByPkEntity, getClassFieldConfigByPkEntityState } from './pro-class-field-config.selectors';

@Injectable({
  providedIn: 'root'
})
export class ProClassFieldConfigFacade extends CrudFacade<ProClassFieldConfig> {

  // Loaders
  classFieldConfigByPkEntity$ = this.store.select(getClassFieldConfigByPkEntityState);

  constructor(protected override store: Store<IAppState>) {
    super(store, proClassFieldConfigActions)
  }

  getClassFieldConfig = {
    byPkEntity$: (pkEntity: number) => this.store.select(getClassFieldConfigByPkEntity(pkEntity)),
    byFkClassFkProject$: (key: Partial<ProClassFieldConfig>) => this.store.select(getClassFieldConfigByFkProjectFkClass(key))
  };
}
