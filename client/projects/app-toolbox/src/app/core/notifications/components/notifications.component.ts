import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Toast as Notfication } from '@kleiolab/lib-redux/lib/redux-store/ui/notification/notification.actions';
import { StateFacade } from '@kleiolab/lib-redux/public-api';
import { Message, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { difference } from 'ramda';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'gv-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationComponent implements OnDestroy {
  destroy$ = new Subject<boolean>();
  @ViewChild(Toast) toast: Toast;
  constructor(
    private messageService: MessageService,
    state: StateFacade
  ) {
    let id = 0;
    let lastState: Notfication[] = [];
    state.ui.notifications.toasts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(n => {
        difference(n, lastState).forEach(newToast => {
          const message: Message = {
            closable: false,
            id: id++,
            severity: newToast.type,
            summary: newToast.options.title,
            detail: newToast.options.msg,
            life: newToast.options.timeout ?? 3000
          }
          this.messageService.add(message)
        })
        lastState = n;
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
