import { Injectable } from '@angular/core';
import { LoadingBarActions, PeItDetail } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { LeafPeItViewComponent } from '../leaf-pe-it-view.component';
import { LeafPeItViewAPIActions, LeafPeItViewAPIAction } from './leaf-pe-it-view.actions';
import { PeItService } from '../../../shared/pe-it.service';
import { createPeItDetail } from '../../../../../core/state/services/state-creator';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class LeafPeItViewAPIEpics {
  constructor(
    private peItService: PeItService,
    private actions: LeafPeItViewAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: LeafPeItViewComponent): Epic {
    return combineEpics(this.createLoadLeafPeItViewEpic(c));
  }

  private createLoadLeafPeItViewEpic(c: LeafPeItViewComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(LeafPeItViewAPIActions.LOAD),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: LeafPeItViewAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.peItService.getNestedObject(action.meta.pkEntity, action.meta.projectDetail.pk_project) // <- change api call here
            /**
             * Subscribe to the api call
             */
            .subscribe((data) => {
              if (data) {
                const peItDetail: PeItDetail = createPeItDetail({}, data, action.meta.projectDetail.crm, { isViewMode: true })
                /**
                 * Emit the global action that completes the loading bar
                 */
                globalStore.next(this.loadingBarActions.completeLoading());
                /**
                 * Emit the local action on loading succeeded
                 */
                c.localStore.dispatch(this.actions.loadSucceeded(peItDetail));
              } else {
                globalStore.next(this.loadingBarActions.completeLoading());
                globalStore.next(this.notificationActions.addToast({
                  type: 'error',
                  options: {
                    title: 'Failed loading related item ' + action.meta.pkEntity
                  }
                }));
              }
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
