import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Toast as Notfication, StateFacade } from '@kleiolab/lib-redux';
import { Message, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { difference } from 'ramda';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'gv-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationComponent implements OnDestroy {
  destroy$ = new Subject<boolean>();
  @ViewChild(Toast) toast: Toast;
  text$ = new BehaviorSubject('A')
  constructor(
    private messageService: MessageService,
    public state: StateFacade
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
