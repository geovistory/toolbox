import { Injectable } from '@angular/core';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../public-api';
import { CrudFacade } from '../../_helpers/crud-facade';
import { warEntityPreviewActions } from './war-entity-preview.actions';
import { byProjectIdPkEntity, getByProjectIdPkEntity } from './war-entity-preview.selectors';

@Injectable()
export class WarEntityPreviewFacade extends CrudFacade<WarEntityPreview> {

  indexed$ = this.store.select(byProjectIdPkEntity);

  constructor(protected store: Store<IAppState>) {
    super(store, warEntityPreviewActions)
  }

  getEntityPreview = {
    byProjectIdPkEntity$: (projectId: number, pkEntity: number) => this.store.select(getByProjectIdPkEntity(projectId, pkEntity)),
  };
}
