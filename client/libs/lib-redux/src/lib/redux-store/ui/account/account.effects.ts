import { Injectable } from '@angular/core';
import { AccountDataService } from '@kleiolab/lib-sdk-lb4';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, first, mergeMap, startWith, tap } from 'rxjs/operators';
import { LoadingBarActions } from '../loading-bar/loading-bar.actions';
import { notificationActions } from '../notification/notification.actions';
import { AccountAction, AccountActions } from './account.actions';



@Injectable({
  providedIn: 'root'
})
export class AccountEffects {

  loadRoles$ = createEffect(() => this.actions$.pipe(
    ofType(AccountActions.LOAD_ROLES),
    mergeMap((action: AccountAction) => this.accountDataApi.accountDataControllerGetRoles(action.meta.accountId).pipe(
      first(),
      mergeMap(data => of(
        AccountActions.loadRolesSucceeded(data),
        LoadingBarActions.REMOVE_JOB()
      )),
      tap(() => action.meta?.cb()),
      catchError(error => of(
        LoadingBarActions.REMOVE_JOB(),
        notificationActions.add({
          toast: {
            type: 'error',
            options: { title: error }
          }
        })
      )),
      startWith(LoadingBarActions.ADD_JOB())
    ))

  )
  )
  constructor(
    private accountDataApi: AccountDataService,
    private actions$: Actions<AccountAction>,
  ) { }
}
