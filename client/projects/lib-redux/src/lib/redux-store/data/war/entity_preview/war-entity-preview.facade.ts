import { Injectable } from '@angular/core';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_lib/crud-facade';
import { warEntityPreviewActions } from './war-entity-preview.actions';
import { byProjectIdPkEntity, getByKey, getByProjectIdPkEntity } from './war-entity-preview.selectors';

@Injectable({
  providedIn: 'root'
})
export class WarEntityPreviewFacade extends CrudFacade<WarEntityPreview> {

  indexed$ = this.store.select(byProjectIdPkEntity);

  constructor(protected store: Store<IAppState>) {
    super(store, warEntityPreviewActions)
  }

  getEntityPreview = {
    byProjectIdPkEntity$: (projectId: number, pkEntity: number) => this.store.select(getByProjectIdPkEntity(projectId, pkEntity)),
    byKey$: (key: string) => this.store.select(getByKey(key)),
  };
}
