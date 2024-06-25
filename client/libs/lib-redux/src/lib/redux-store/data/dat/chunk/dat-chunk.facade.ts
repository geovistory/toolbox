import { Injectable } from '@angular/core';
import { DatChunk } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { datChunkActions } from './dat-chunk.actions';
import { getChunkByFkText, getChunkByPkEntity, getChunkByPkEntityState } from './dat-chunk.selectors';

@Injectable({
  providedIn: 'root'
})
export class DatChunkFacade extends CrudFacade<DatChunk> {

  pkEntityIndex$ = this.store.select(getChunkByPkEntityState);

  constructor(protected override store: Store<IAppState>) {
    super(store, datChunkActions)
  }

  getChunk = {
    byPkEntity$: (pkEntity: number) => this.store.select(getChunkByPkEntity(pkEntity)),
    byFkText$: (fkText: number) => this.store.select(getChunkByFkText(fkText))
  };
}
