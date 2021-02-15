import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './components/notifications.component';
import { NotificationsAPIActions } from "@kleiolab/lib-redux";
import { NotificationsAPIEpics } from './components/api/notifications.epics';
import { ToastyModule } from '@cime/ngx-toasty'

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
