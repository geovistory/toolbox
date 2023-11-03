import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AccountEffects } from './account/account.effects';
import { AccountModule } from './account/account.module';
import { ActiveProjectEffects } from './active-project/active-project.effects';
import { ActiveProjectModule } from './active-project/active-project.module';
import { LoadingBarModule } from './loading-bar/loading-bar.module';
import { NotificationEffects } from './notification/notification.effects';
import { NotificationModule } from './notification/notification.module';
import { uiFeatureKey } from './ui.feature.key';
import { uiReducers } from './ui.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(uiFeatureKey, uiReducers),
    EffectsModule.forFeature(AccountEffects, ActiveProjectEffects, NotificationEffects),
    AccountModule,
    ActiveProjectModule,
    LoadingBarModule,
    NotificationModule
  ]
})
export class UiModule { }
