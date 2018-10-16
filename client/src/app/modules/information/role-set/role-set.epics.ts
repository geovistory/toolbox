import { ObservableStore } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InfEntityProjectRel, InfEntityProjectRelApi, LoadingBarAction, LoadingBarActions, InfRoleApi, InfRole } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { equals } from 'ramda';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { RoleSet } from 'app/core/state/models';
import { RoleSetActions, RoleSetAction } from './role-set.actions';
import { RoleSetBase } from './role-set.base';
import { Action } from 'redux';
import { createRoleDetailList } from 'app/core/state/services/state-creator';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';


const ofSubstore = (path: string[]) => (action): boolean => {
    const actionPath = JSON.parse(action['@angular-redux::fractalkey']);
    const bool = equals(actionPath, path);
    return bool;
}

@Injectable()
export class RoleSetApiEpics {
    constructor(
        private eprApi: InfEntityProjectRelApi,
        private roleApi: InfRoleApi,
        private actions: RoleSetActions,
        private loadingBarActions: LoadingBarActions,
        private notificationActions: NotificationsAPIActions
    ) { }

    public createEpics(c: RoleSetBase) {
        return combineEpics(
            this.createUpdateOrderEpic(c),
            this.listenToRoleListLength(c),
            this.createAddRolesWithTeEntEpic(c),
            this.createAddRolesWithoutTeEntEpic(c)

        );
    }

    private createUpdateOrderEpic(c: RoleSetBase): Epic {
        return (action$, store) => {
            return action$.pipe(
                ofType(RoleSetActions.ROLE_SET_UPDATE_ORDER),
                filter(action => ofSubstore(c.basePath)(action)),
                switchMap((action: FluxStandardAction<any, any>) => new Observable<LoadingBarAction>((globalStore) => {
                    globalStore.next(this.loadingBarActions.startLoading());
                    // subStore.dispatch(this.actions.loadStarted());

                    combineLatest(
                        action.meta.eprs.map(data => this.eprApi.patchOrCreate(data))
                    )
                        .subscribe((data: InfEntityProjectRel[]) => {
                            globalStore.next(this.loadingBarActions.completeLoading());

                            c.localStore.dispatch(this.actions.updateOrderSucceeded(data));
                        }, error => {
                            // c.localStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
                        })
                })),
                takeUntil(c.destroy$)
            )
        }
    }

    private listenToRoleListLength(c: RoleSetBase): Epic {
        return (action$, store) => {
            return action$.pipe(
                ofType(
                    RoleSetActions.REMOVE_ROLE_FROM_ROLE_LIST,
                    RoleSetActions.ROLE_REMOVED_FROM_PROJECT,
                    RoleSetActions.STOP_CREATE_NEW_ROLE
                ),
                filter(action => ofSubstore(c.basePath)(action)),
                switchMap((action: FluxStandardAction<any, any>) => new Observable<LoadingBarAction>((globalStore) => {
                    const state = c.localStore.getState();
                    if (!state._role_list ||  Object.keys(state._role_list).length === 0) {
                        c.localStore.dispatch(this.actions.removeRoleSet());
                    }

                })),
                takeUntil(c.destroy$)
            )
        }
    }


    private createAddRolesWithTeEntEpic(c: RoleSetBase): Epic {
        return (action$, store) => {
          return action$.pipe(
            /**
             * Filter the actions that triggers this epic
             */
            ofType(RoleSetActions.ADD_ROLES_WITH_TE_ENT),
            filter(action => ofSubstore(c.basePath)(action)),
            switchMap((action: RoleSetAction) => new Observable<Action>((globalStore) => {
              /**
               * Emit the global action that activates the loading bar
               */
              globalStore.next(this.loadingBarActions.startLoading());
              /**
               * Do some api call
               */
              this.roleApi.addToProjectWithTeEnt(c.ngRedux.getState().activeProject.pk_project, action.meta.pk_roles)
                /**
                 * Subscribe to the api call
                 */
                .subscribe((roles: InfRole[]) => {
                  /**
                   * Emit the global action that completes the loading bar
                   */
                  globalStore.next(this.loadingBarActions.completeLoading());
                  /**
                   * Emit the local action on loading succeeded
                   */
                  const roleDetailList = createRoleDetailList(new RoleSet(c.localStore.getState()), roles, c.ngRedux.getState().activeProject.crm, {})
                  c.localStore.dispatch(this.actions.addRolesWithTeEntSucceeded(roleDetailList));

                }, error => {
                  /**
                  * Emit the global action that shows some loading error message
                  */
                  globalStore.next(this.loadingBarActions.completeLoading());
                  globalStore.next(this.notificationActions.addToast({
                    type: 'error',
                    options: {
                      title: error.message
                    }
                  }));
                  /**
                  * Emit the local action on loading failed
                  */
                  c.localStore.dispatch(this.actions.addRolesWithTeEntFailed())
                })
            })),
            takeUntil(c.destroy$)
          )
        }
      }



    private createAddRolesWithoutTeEntEpic(c: RoleSetBase): Epic {
        return (action$, store) => {
          return action$.pipe(
            /**
             * Filter the actions that triggers this epic
             */
            ofType(RoleSetActions.ADD_ROLES_WITHOUT_TE_ENT),
            filter(action => ofSubstore(c.basePath)(action)),
            switchMap((action: RoleSetAction) => new Observable<Action>((globalStore) => {
              /**
               * Emit the global action that activates the loading bar
               */
              globalStore.next(this.loadingBarActions.startLoading());
              /**
               * Do some api call
               */
              this.roleApi.addToProject(c.ngRedux.getState().activeProject.pk_project, action.meta.pk_roles)
                /**
                 * Subscribe to the api call
                 */
                .subscribe((roles: InfRole[]) => {
                  /**
                   * Emit the global action that completes the loading bar
                   */
                  globalStore.next(this.loadingBarActions.completeLoading());
                  /**
                   * Emit the local action on loading succeeded
                   */
                  const roleDetailList = createRoleDetailList(new RoleSet(c.localStore.getState()), roles, c.ngRedux.getState().activeProject.crm, {})
                  c.localStore.dispatch(this.actions.addRolesWithTeEntSucceeded(roleDetailList));

                }, error => {
                  /**
                  * Emit the global action that shows some loading error message
                  */
                  globalStore.next(this.loadingBarActions.completeLoading());
                  globalStore.next(this.notificationActions.addToast({
                    type: 'error',
                    options: {
                      title: error.message
                    }
                  }));
                  /**
                  * Emit the local action on loading failed
                  */
                  c.localStore.dispatch(this.actions.addRolesWithTeEntFailed())
                })
            })),
            takeUntil(c.destroy$)
          )
        }
      }

}
