import { Injectable } from '@angular/core';
import { DatClassColumnMapping } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { datClassColumnMappingActions } from './dat-class-column-mapping.actions';
import { getClassColumnMappingByFkColumn, getClassColumnMappingByPkEntity, getClassColumnMappingByPkEntityState } from './dat-class-column-mapping.selectors';

@Injectable({
  providedIn: 'root'
})
export class DatClassColumnMappingFacade extends CrudFacade<DatClassColumnMapping> {

  pkEntityIndex$ = this.store.select(getClassColumnMappingByPkEntityState);

  constructor(protected store: Store<IAppState>) {
    super(store, datClassColumnMappingActions)
  }

  getClassColumnMapping = {
    byPkEntity$: (pkEntity: number) => this.store.select(getClassColumnMappingByPkEntity(pkEntity)),
    byFkColumn$: (fkColumn: number) => this.store.select(getClassColumnMappingByFkColumn(fkColumn))
  };
}
