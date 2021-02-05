import { Injectable } from '@angular/core';
import { LoadingBarActions } from "app/core/loading-bar/api/loading-bar.actions";
import { PubAccountApi } from "app/core/sdk";
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { FluxStandardAction } from 'flux-standard-action';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AccountRole } from '../account.model';
import { AccountAction, AccountActions } from './account.actions';




@Injectable()
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

        globalStore.next(this.loadingBarActions.startLoading());
        this.accountApi.getRoles(action.meta.accountId)
          .subscribe((data: AccountRole[]) => {
            globalStore.next(this.loadingBarActions.completeLoading());
            globalStore.next(this.actions.loadRolesSucceeded(data));
          }, error => {
            globalStore.next(this.notificationActions.addToast({
              type: 'error',
              options: { title: error }
            }))
          })
      }))

    )
  }


}
