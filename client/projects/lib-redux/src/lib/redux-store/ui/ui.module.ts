import { NgModule } from '@angular/core';
import { AccountModule } from './account/account.module';
import { ActiveProjectModule } from './active-project/active-project.module';
import { LoadingBarModule } from './loading-bar/loading-bar.module';
import { NotificationModule } from './notification/notification.module';

@NgModule({
  imports: [
    AccountModule,
    ActiveProjectModule,
    LoadingBarModule,
    NotificationModule
  ]
})
export class UiModule { }
