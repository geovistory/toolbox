import { Injectable } from '@angular/core';
import { LoadingBarActions } from 'app/core';
import { InfPersistentItemApi } from "app/core/sdk";
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
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
