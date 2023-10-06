import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { FluxStandardAction } from 'flux-standard-action';
import { ofType } from 'redux-observable';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NotificationsAPIAction, NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { NotificationsI } from '../models/notifications.models';



@Injectable({
  providedIn: 'root'
})
export class NotificationsAPIEpics {
  notificationChannel$ = new ReplaySubject<NotificationsI>()

  addToast$ = createEffect(() =>
    this.actions$.pipe(
      /**
       * Filter the actions that triggers this epic
       */
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
  )
  constructor(
    private actions$: Actions
  ) { }
}
