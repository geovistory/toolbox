import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { SubstoreComponent } from 'projects/toolbox/src/app/core/state/models/substore-component';
import { Subject } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux } from '@angular-redux/store';
import { RootEpics } from 'projects/toolbox/src/app/core/redux-store/epics';
import { Notifications } from './api/notifications.models';
import { NotificationsAPIEpics } from './api/notifications.epics';
import { notificationsReducer } from './api/notifications.reducer';
import { IAppState } from 'projects/toolbox/src/app/core/redux-store/model';


@Component({
  selector: 'gv-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();


  constructor(
    protected rootEpics: RootEpics,
    private epics: NotificationsAPIEpics,
    protected ngRedux: NgRedux<IAppState>
  ) { }
  ngOnInit() {
    this.rootEpics.addEpic(this.epics.createEpics(this));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
