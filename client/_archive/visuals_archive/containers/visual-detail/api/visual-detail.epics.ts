import { Injectable } from '@angular/core';
import { LoadingBarActions, ProVisualApi, ProQueryApi, ProVisual, ActiveProjectService } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { VisualDetailComponent } from '../visual-detail.component';
import { VisualDetailAPIActions, VisualDetailAPIAction } from './visual-detail.actions';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class VisualDetailAPIEpics {
  constructor(
    private visualApi: ProVisualApi,
    private queryApi: ProQueryApi,
    private actions: VisualDetailAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions,
    private p: ActiveProjectService
  ) { }

  public createEpics(c: VisualDetailComponent): Epic {
    return combineEpics(
      this.createLoadVisualPreviewEpic(c),
      this.createSaveVisualDetailEpic(c),
      this.createDeleteVisualDetailEpic(c)
    );
  }

  private createSaveVisualDetailEpic(c: VisualDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(VisualDetailAPIActions.SAVE),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: VisualDetailAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Create the query (fk_project is within the object)
           */
          const apiCall = action.meta.pkEntity ?
            this.visualApi.patchAttributes(action.meta.pkEntity, action.meta.comVisual) :
            this.visualApi.create(action.meta.comVisual);

          /**
           * Subscribe to the api call
           */
          apiCall.subscribe((comVisual: ProVisual) => {
            /**
             * Emit the global action that completes the loading bar
             */
            globalStore.next(this.loadingBarActions.completeLoading());

            /**
             * Emit the local action on loading succeeded
             */
            c.localStore.dispatch(this.actions.saveSucceeded(comVisual));

          }, error => {

            if (error && error.code === '23505') {
              error = {
                title: 'Name already exists',
                message: 'Please choose another name.'
              }
            }
            /**
            * Emit the global action that shows some loading error message
            */
            globalStore.next(this.loadingBarActions.completeLoading());
            globalStore.next(this.notificationActions.addToast({
              type: 'error',
              options: {
                title: error.title,
                msg: error.message,
              }
            }));
            /**
             * Emit the local action on loading failed
             */
            c.localStore.dispatch(this.actions.saveFailed(error))
          })
        })),
        takeUntil(c.destroy$)
      )
    }
  }

  private createLoadVisualPreviewEpic(c: VisualDetailComponent): Epic {
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



  private createDeleteVisualDetailEpic(c: VisualDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(VisualDetailAPIActions.DELETE),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: VisualDetailAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.visualApi.deleteById(action.meta.pkEntity)
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
              c.localStore.dispatch(this.actions.deleteSucceeded());
              c.t.setTabTitle('(Deleted)')

            }, error => {
              /**
              * Emit the global action that shows some loading error message
              */
              globalStore.next(this.loadingBarActions.completeLoading());
              globalStore.next(this.notificationActions.addToast({
                type: 'error',
                options: {
                  title: 'Visual could not be deleted'
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
