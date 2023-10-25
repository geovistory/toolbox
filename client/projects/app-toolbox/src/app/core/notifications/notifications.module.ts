import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NotificationComponent } from './components/notifications.component';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ToastModule
  ],
  providers: [MessageService],
  declarations: [NotificationComponent],
  exports: [NotificationComponent]
})
export class NotificationModule { }
