import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { NotificationsAPIAction, NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { NotificationsI } from '../models/notifications.models';



@Injectable({
  providedIn: 'root'
})
export class NotificationsAPIEpics {
  notificationChannel$ = new ReplaySubject<NotificationsI>()
  constructor(
  ) {

  }

  public createEpics(): Epic {
    return combineEpics(this.createAddToastEpic());
  }

  private createAddToastEpic(): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        filter((a) => {
          return a;
        }),
        ofType(NotificationsAPIActions.ADD_TOAST),
        switchMap((action) => new Observable<FluxStandardAction<any>>((observer) => {
          /**
           * Add Toast
           */
          const a = action as NotificationsAPIAction;
          if (!a.payload.options.title && !a.payload.options.msg) {
            if (a.payload.type === 'error') {
              a.payload.options.title = 'Oops, something went wrong!'
            }
          }
          this.notificationChannel$.next(a.payload)

        })),
      )
    }
  }
}
