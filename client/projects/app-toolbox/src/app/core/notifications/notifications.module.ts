import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastyModule } from '@cime/ngx-toasty';
import { NotificationsComponent } from './components/notifications.component';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot()
  ],
  providers: [],
  declarations: [NotificationsComponent],
  exports: [NotificationsComponent]
})
export class NotificationsModule { }
