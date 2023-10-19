import { Injectable } from '@angular/core';
import { InfTimePrimitive } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { infTimePrimitiveActions } from './inf-time-primitive.actions';
import { getTimePrimitiveByPkEntity, getTimePrimitiveByPkEntityState } from './inf-time-primitive.selectors';

@Injectable({
  providedIn: 'root'
})
export class InfTimePrimitiveFacade extends CrudFacade<InfTimePrimitive> {

  timePrimitivesByPkEntity$ = this.store.select(getTimePrimitiveByPkEntityState);

  constructor(protected store: Store<IAppState>) {
    super(store, infTimePrimitiveActions)
  }

  getTimePrimitive = {
    byPkEntity$: (pkEntity: number) => this.store.select(getTimePrimitiveByPkEntity(pkEntity))
  };
}
