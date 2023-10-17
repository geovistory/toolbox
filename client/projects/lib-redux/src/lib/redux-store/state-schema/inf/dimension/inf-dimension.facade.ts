import { Injectable } from '@angular/core';
import { InfDimension } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_helpers/crud-facade';
import { infDimensionActions } from './inf-dimension.actions';
import { getDimensionByPkEntity, getDimensionByPkEntityState } from './inf-dimension.selectors';

@Injectable()
export class InfDimensionFacade extends CrudFacade<InfDimension> {

  dimensionsByPkEntity$ = this.store.select(getDimensionByPkEntityState);

  constructor(protected store: Store<IAppState>) {
    super(store, infDimensionActions)
  }

  getDimension = {
    byPkEntity$: (pkEntity: number) => this.store.select(getDimensionByPkEntity(pkEntity))
  };
}
