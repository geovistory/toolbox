import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AccountModule } from './account/account.module';
import { ActiveProjectModule } from './active-project/active-project.module';
import { LoadingBarModule } from './loading-bar/loading-bar.module';
import { NotificationModule } from './notification/notification.module';
import { uiFeatureKey } from './ui.feature.key';
import { uiReducers } from './ui.reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(uiFeatureKey, uiReducers),
    AccountModule,
    ActiveProjectModule,
    LoadingBarModule,
    NotificationModule
  ]
})
export class UiModule { }
