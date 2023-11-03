import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { interval, of } from 'rxjs';
import { debounce, switchMap } from 'rxjs/operators';
import { notificationActions } from './notification.actions';



@Injectable({
  providedIn: 'root'
})
export class NotificationEffects {

  addToast$ = createEffect(() =>
    this.actions$.pipe(
      /**
       * Remove the toast after a certain interval
       */
      ofType(notificationActions.add),
      debounce((action) => interval(action.toast.options.timeout ?? 3000)),
      switchMap(a => of(notificationActions.remove({ uid: a.toast.uid })))
    )
  )
  constructor(
    private actions$: Actions
  ) { }
}
