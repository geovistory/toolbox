import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastyModule } from '@kleiolab/ng2-toasty';
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
