import { Injectable } from '@angular/core';
import { LoadingBarActions, ComQueryApi } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { VisualDetailComponent } from '../visual-detail.component';
import { VisualDetailAPIActions, VisualDetailAPIAction } from './visual-detail.actions';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class VisualDetailAPIEpics {
  constructor(
    private queryApi: ComQueryApi,
    private actions: VisualDetailAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: VisualDetailComponent): Epic {
    return combineEpics(this.createLoadVisualDetailEpic(c));
  }

  private createLoadVisualDetailEpic(c: VisualDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(VisualDetailAPIActions.LOAD_PREVIEW),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: VisualDetailAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.queryApi.runVersion(action.meta.pkProject, action.meta.pkEntity, action.meta.version)
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
              c.localStore.dispatch(this.actions.loadPreviewSucceeded(data, action.meta.pkEntity, action.meta.version));

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
              c.localStore.dispatch(this.actions.loadPreviewFailed({ status: '' + error.status },  action.meta.pkEntity, action.meta.version))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
