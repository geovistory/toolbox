import { Injectable } from '@angular/core';
import { LoadingBarActions } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { TextDetailComponent } from '../text-detail.component';
import { TextDetailAPIActions, TextDetailAPIAction } from './text-detail.actions';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class TextDetailAPIEpics {
  constructor(
    // private modelApi: any, // <- change the api
    private actions: TextDetailAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: TextDetailComponent): Epic {
    return combineEpics(
    );
  }


}
