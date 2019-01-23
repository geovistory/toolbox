import { Injectable } from '@angular/core';
import { DfhLabel, DfhLabelApi, LoadingBarActions } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { DfhLabelEditComponent } from '../dfh-label-edit.component';
import { DfhLabelEditAPIAction, DfhLabelEditAPIActions } from './dfh-label-edit.actions';
import { ofSubstore } from 'app/core/store/module';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';


@Injectable()
export class DfhLabelEditAPIEpics {
  constructor(
    private labelApi: DfhLabelApi,
    private actions: DfhLabelEditAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: DfhLabelEditComponent): Epic {
    return combineEpics(
      this.createLabelEpic(c)
    );
  }

  private createLabelEpic(c: DfhLabelEditComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(DfhLabelEditAPIActions.SAVE),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: DfhLabelEditAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.labelApi.patchAttributes(action.meta.dfhLabel.pk_entity, action.meta.dfhLabel) // <- change api call here
            /**
             * Subscribe to the api call
             */
            .subscribe((data: DfhLabel) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.saveSucceeded(data));

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
              c.localStore.dispatch(this.actions.saveFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
