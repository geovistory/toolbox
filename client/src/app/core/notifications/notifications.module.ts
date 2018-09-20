import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './components/notifications.component';
import { NotificationsAPIActions } from './components/api/notifications.actions';
import { NotificationsAPIEpics } from './components/api/notifications.epics';
import { ToastyModule } from 'ng2-toasty'

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot()
  ],
  providers: [NotificationsAPIActions, NotificationsAPIEpics],
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent]
})
export class NotificationsModule { }
