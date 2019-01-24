import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState, LoadingBarActions, PubAccountApi } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AccountAction, AccountActions } from './account.actions';
import { AccountRole } from '../account.model';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';




@Injectable()
export class AccountEpics {
  constructor(
    private actions: AccountActions,
    private loadingBarActions: LoadingBarActions,
    private ngRedux: NgRedux<IAppState>,
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
