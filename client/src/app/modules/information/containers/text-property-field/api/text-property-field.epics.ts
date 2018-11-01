import { Injectable } from '@angular/core';
import { LoadingBarActions, InfTextPropertyApi } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { TextPropertyFieldComponent } from '../text-property-field.component';
import { TextPropertyFieldAPIActions, TextPropertyFieldAPIAction } from './text-property-field.actions';
import { ofSubstore } from 'app/core/store/module';
import { createTextPropertyField, createTextPropertyDetail } from 'app/core/state/services/state-creator';

@Injectable()
export class TextPropertyFieldAPIEpics {
  constructor(
    private textPropertyApi: InfTextPropertyApi,
    private actions: TextPropertyFieldAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: TextPropertyFieldComponent): Epic {
    return combineEpics(this.createCreateTextPropertyFieldEpic(c));
  }

  private createCreateTextPropertyFieldEpic(c: TextPropertyFieldComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TextPropertyFieldAPIActions.CREATE),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: TextPropertyFieldAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.textPropertyApi.findOrCreateInfTextProperty(
            c.ngRedux.getState().activeProject.pk_project,
            action.meta.infTextProperty
          )
            /**
           * Subscribe to the api call
           */
            .subscribe((data) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());

              const txtPropDetail = createTextPropertyDetail({ fkClassField: c.localStore.getState().fkClassField }, data[0])
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.createSucceeded(txtPropDetail));

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
}
