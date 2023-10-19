import { Injectable } from '@angular/core';
import { InfAppellation } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_helpers/crud-facade';
import { infAppellationActions } from './inf-appellation.actions';
import { getAppellationByPkEntity, getAppellationByPkEntityState } from './inf-appellation.selectors';

@Injectable({
  providedIn: 'root'
})
export class InfAppellationFacade extends CrudFacade<InfAppellation> {

  // Loaders
  appellationsByPkEntity$ = this.store.select(getAppellationByPkEntityState);

  constructor(protected store: Store<IAppState>) {
    super(store, infAppellationActions)
  }

  getAppellation = {
    byPkEntity$: (pkEntity: number) => this.store.select(getAppellationByPkEntity(pkEntity))
  };
}
