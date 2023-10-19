import { Injectable } from '@angular/core';
import { AccountDataService } from '@kleiolab/lib-sdk-lb4';
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, first, mergeMap, startWith } from 'rxjs/operators';
import { NotificationsAPIActions } from '../actions/notifications.actions';
import { LoadingBarActions } from '../loadingBar/loading-bar.actions';
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
      catchError(error => of(
        LoadingBarActions.REMOVE_JOB(),
        this.notificationActions.addToast({
          type: 'error',
          options: { title: error }
        })
      )),
      startWith(LoadingBarActions.ADD_JOB())
    ))

  )
  )
  constructor(
    private accountDataApi: AccountDataService,
    private notificationActions: NotificationsAPIActions,
    private actions$: Actions<AccountAction>,
  ) { }
}
