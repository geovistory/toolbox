import { Injectable } from '@angular/core';
import { InfPlace } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_helpers/crud-facade';
import { infPlaceActions } from './inf-place.actions';
import { getPlaceByPkEntity, getPlaceByPkEntityState } from './inf-place.selectors';

@Injectable({
  providedIn: 'root'
})
export class InfPlaceFacade extends CrudFacade<InfPlace> {

  placesByPkEntity$ = this.store.select(getPlaceByPkEntityState);

  constructor(protected store: Store<IAppState>) {
    super(store, infPlaceActions)
  }

  getPlace = {
    byPkEntity$: (pkEntity: number) => this.store.select(getPlaceByPkEntity(pkEntity))
  };
}
