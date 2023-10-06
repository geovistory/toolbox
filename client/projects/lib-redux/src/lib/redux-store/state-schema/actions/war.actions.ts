
import { Injectable } from '@angular/core';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { IAppState } from '../../root/models/model';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import { warRoot } from '../reducer-configs/war.config';

@Injectable({
  providedIn: 'root'
})
export class WarActions {
  entity_preview: SchemaActionsFactory<WarEntityPreview>;

  constructor(public store: Store<IAppState>) {
    this.entity_preview = new SchemaActionsFactory<WarEntityPreview>(this.store, warRoot, 'entity_preview')
  }
}
