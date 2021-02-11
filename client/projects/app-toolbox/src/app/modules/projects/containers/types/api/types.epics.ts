import { Injectable } from '@angular/core';
import { LoadingBarActions } from "projects/app-toolbox/src/app/core/loading-bar/api/loading-bar.actions";
import { InfPersistentItemApi } from '@kleiolab/lib-sdk-lb3';
import { NotificationsAPIActions } from 'projects/app-toolbox/src/app/core/notifications/components/api/notifications.actions';
import { combineEpics, Epic } from 'redux-observable-es6-compat';
import { TypesComponent } from '../types.component';
import { TypesAPIActions } from './types.actions';

@Injectable()
export class TypesAPIEpics {
  constructor(
    private peItApi: InfPersistentItemApi,
    private actions: TypesAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: TypesComponent): Epic {
    return combineEpics(

    );
  }



}
