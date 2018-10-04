import { Injectable } from '@angular/core';
import { DfhLabelApi, LoadingBarActions, DfhLabel } from 'app/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { DfhLabelListEditComponent } from '../dfh-label-list-edit.component';
import { DfhLabelListEditAPIAction, DfhLabelListEditAPIActions } from './dfh-label-list-edit.actions';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class DfhLabelListEditAPIEpics {
  constructor(
    private labelApi: DfhLabelApi,
    private actions: DfhLabelListEditAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: DfhLabelListEditComponent): Epic {
    return combineEpics(
      this.createLoadDfhLabelListEditEpic(c),
      this.deleteLabelEpic(c)
      );
  }

  private createLoadDfhLabelListEditEpic(c: DfhLabelListEditComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(DfhLabelListEditAPIActions.CREATE),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: DfhLabelListEditAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.labelApi.create(action.meta.dfhLabel)
            /**
             * Subscribe to the api call
             */
            .subscribe((data) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.createSucceeded(data));

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
              c.localStore.dispatch(this.actions.createFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }



  private deleteLabelEpic(c: DfhLabelListEditComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(DfhLabelListEditAPIActions.DELETE),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: DfhLabelListEditAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.labelApi.deleteById(action.meta.dfhLabel.pk_entity) // <- change api call here
            /**
             * Subscribe to the api call
             */
            .subscribe((data) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.deleteSucceeded(action.meta.dfhLabel))

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
              c.localStore.dispatch(this.actions.deleteFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
