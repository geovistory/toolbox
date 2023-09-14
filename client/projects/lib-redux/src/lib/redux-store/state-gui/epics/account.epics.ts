import { Injectable } from '@angular/core';
import { AccountDataService } from '@kleiolab/lib-sdk-lb4';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { of } from 'rxjs';
import { catchError, first, mergeMap, startWith } from 'rxjs/operators';
import { AccountAction, AccountActions } from '../actions/account.actions';
import { LoadingBarActions } from '../actions/loading-bar.actions';
import { NotificationsAPIActions } from '../actions/notifications.actions';



@Injectable({
  providedIn: 'root'
})
export class AccountEpics {
  constructor(
    private actions: AccountActions,
    private loadingBarActions: LoadingBarActions,
    private accountDataApi: AccountDataService,
    private notificationActions: NotificationsAPIActions,
  ) { }

  public createEpics(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return combineEpics(
      this.loadRoles()
    );
  }

  private loadRoles(): Epic {
    return (action$, store) => action$.pipe(
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
  }


}
