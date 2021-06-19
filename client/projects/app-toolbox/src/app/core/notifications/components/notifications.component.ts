import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NotificationsAPIEpics } from '@kleiolab/lib-redux';
import { Message, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'gv-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnDestroy {
  destroy$ = new Subject<boolean>();
  @ViewChild(Toast) toast: Toast;
  constructor(
    private messageService: MessageService,
    not: NotificationsAPIEpics) {
    let id = 0;
    not.notificationChannel$
      .pipe(takeUntil(this.destroy$))
      .subscribe(n => {
        const message: Message = {
          closable: false,
          id: id++,
          severity: n.type,
          summary: n.options.title,
          detail: n.options.msg,
          life: 3000
        }
        this.messageService.add(message)
      })
  }

  onClose(id: number) {
    const message = this.toast.messages.find(m => m.id === id)
    const index = this.toast.messages.findIndex(m => m.id === id)
    if (index > -1) {
      this.toast.onMessageClose({ message, index })
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
