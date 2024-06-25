import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { pendingFeatureKey } from './pending.feature.key';
import { pendingReducers } from './pending.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(pendingFeatureKey, pendingReducers),
  ]
})
export class PendingModule { }
