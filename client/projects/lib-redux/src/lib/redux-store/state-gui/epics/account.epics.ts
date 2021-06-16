import { Injectable } from '@angular/core';
import { PubAccountApi } from '@kleiolab/lib-sdk-lb3';
import { FluxStandardAction } from 'flux-standard-action';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';
import { AccountAction, AccountActions } from '../actions/account.actions';
import { LoadingBarActions } from '../actions/loading-bar.actions';
import { NotificationsAPIActions } from '../actions/notifications.actions';
import { AccountRole } from '../models/account.model';



@Injectable({
  providedIn: 'root'
})
export class AccountEpics {
  constructor(
    private actions: AccountActions,
    private loadingBarActions: LoadingBarActions,
    private accountApi: PubAccountApi,
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
      mergeMap((action: AccountAction) => new Observable<Action>((globalStore) => {

        globalStore.next(this.loadingBarActions.addJob());
        this.accountApi.getRoles(action.meta.accountId)
          .pipe(first())
          .subscribe((data: AccountRole[]) => {
            globalStore.next(this.loadingBarActions.removeJob());
            globalStore.next(this.actions.loadRolesSucceeded(data));
          }, error => {
            globalStore.next(this.loadingBarActions.removeJob());
            globalStore.next(this.notificationActions.addToast({
              type: 'error',
              options: { title: error }
            }))
          })
      }))

    )
  }


}
