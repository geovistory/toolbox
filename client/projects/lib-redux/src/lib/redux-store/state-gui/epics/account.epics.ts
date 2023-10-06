import { Injectable } from '@angular/core';
import { AccountDataService } from '@kleiolab/lib-sdk-lb4';
import { Actions, createEffect } from '@ngrx/effects';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, first, mergeMap, startWith } from 'rxjs/operators';
import { AccountAction, AccountActions } from '../actions/account.actions';
import { LoadingBarActions } from '../actions/loading-bar.actions';
import { NotificationsAPIActions } from '../actions/notifications.actions';



@Injectable({
  providedIn: 'root'
})
export class AccountEpics {

  loadRoles$ = createEffect(() => this.actions$.pipe(
    ofType(AccountActions.LOAD_ROLES),
    mergeMap((action: AccountAction) => this.accountDataApi.accountDataControllerGetRoles(action.meta.accountId).pipe(
      first(),
      mergeMap(data => of(
        this.actions.loadRolesSucceeded(data),
        this.loadingBarActions.removeJobAction
      )),
      catchError(error => of(
        this.loadingBarActions.removeJobAction,
        this.notificationActions.addToast({
          type: 'error',
          options: { title: error }
        })
      )),
      startWith(this.loadingBarActions.addJobAction)
    ))

  )
  )
  constructor(
    private actions: AccountActions,
    private loadingBarActions: LoadingBarActions,
    private accountDataApi: AccountDataService,
    private notificationActions: NotificationsAPIActions,
    private actions$: Actions<AccountAction>,
  ) { }





}
