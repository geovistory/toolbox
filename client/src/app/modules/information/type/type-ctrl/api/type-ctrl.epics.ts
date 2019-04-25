import { Injectable } from '@angular/core';
import { LoadingBarActions, InfPersistentItemApi, InfPersistentItem, U } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { TypeCtrlComponent } from '../type-ctrl.component';
import { TypeCtrlAPIActions, TypeCtrlAPIAction } from './type-ctrl.actions';
import { TypeOptions } from './type-ctrl.models';
import { TreeviewItem } from 'ngx-treeview';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class TypeCtrlAPIEpics {
  constructor(
    private peItApi: InfPersistentItemApi, // <- change the api
    private actions: TypeCtrlAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: TypeCtrlComponent): Epic {
    return combineEpics(this.createLoadTypeCtrlEpic(c));
  }

  private createLoadTypeCtrlEpic(c: TypeCtrlComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TypeCtrlAPIActions.LOAD),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: TypeCtrlAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.peItApi.typesByClassAndProject(action.meta.pkProject, action.meta.pkTypeClass) // <- change api call here
            /**
             * Subscribe to the api call
             */
            .subscribe((data: InfPersistentItem[]) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());

              const treeviewItems: TreeviewItem[] = data.map((peIt) => {
                return new TreeviewItem({
                  value: peIt.pk_entity,
                  text: U.stringForPeIt(peIt)
                })
              })
              // insert a No Type option
              treeviewItems.unshift(new TreeviewItem({
                value: null,
                text: 'No Type'
              }))
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSucceeded(treeviewItems));

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
              c.localStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
