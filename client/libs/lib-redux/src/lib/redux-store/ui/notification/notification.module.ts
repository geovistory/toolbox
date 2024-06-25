import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, combineReducers } from '@ngrx/store';
import { uiFeatureKey } from '../ui.feature.key';
import { NotificationEffects } from './notification.effects';
import { NotificationFacade } from './notification.facade';
import { initialState, notificationReducer } from './notification.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(
      uiFeatureKey,
      combineReducers({ notifications: notificationReducer }),
      { initialState: { notifications: initialState } }
    ),
    EffectsModule.forFeature(NotificationEffects)
  ],
  providers: [NotificationFacade]
})
export class NotificationModule { }
