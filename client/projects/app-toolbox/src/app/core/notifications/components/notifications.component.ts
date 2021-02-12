import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'gv-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();


  constructor() { }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
