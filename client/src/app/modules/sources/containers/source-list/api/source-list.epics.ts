import { Injectable } from '@angular/core';
import { LoadingBarActions, ComConfig } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { SourceListComponent } from '../source-list.component';
import { SourceListAPIActions, SourceListAPIAction } from './source-list.actions';
import { ofSubstore } from 'app/core/store/module';
import { PeItService } from 'app/modules/information/shared/pe-it.service';
import { createPeItDetail } from 'app/core/state/services/state-creator';

@Injectable()
export class SourceListAPIEpics {
  constructor(
    private peItService: PeItService, // <- change the api
    private actions: SourceListAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: SourceListComponent): Epic {
    return combineEpics(
      this.createLoadSourceDetailsEpic(c),
      this.createLoadSectionDetailsEpic(c)
    );
  }

  private createLoadSourceDetailsEpic(c: SourceListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(SourceListAPIActions.LOAD_SOURCE_DETAILS),
        switchMap((action: SourceListAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.peItService.getNestedObject(action.meta.pkEntity, action.meta.pkProject)
            /**
             * Subscribe to the api call
             */
            .subscribe((data) => {
              const peItDetail = createPeItDetail({
                showRightPanel: true,
                showMap: false,
                showTimeline: false,
                showMentionedEntities: true,
                showAssertions: true,
                showPropertiesHeader: true,
                showAddAPropertyButton: false,
                showSectionList: true
              }, data, action.meta.crm,
                { pkUiContext: ComConfig.PK_UI_CONTEXT_SOURCES_EDITABLE })
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSourceDetailsSucceeded(peItDetail));

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
              c.localStore.dispatch(this.actions.loadSourceDetailsFailed());

            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
  private createLoadSectionDetailsEpic(c: SourceListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(SourceListAPIActions.LOAD_SECTION_DETAILS),
        switchMap((action: SourceListAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.peItService.getNestedObject(action.meta.pkEntity, action.meta.pkProject)
            /**
             * Subscribe to the api call
             */
            .subscribe((data) => {
              const peItDetail = createPeItDetail({
                showRightPanel: false,
                showMentionedEntities: true,
                showAssertions: true,
                showPropertiesHeader: true,
                showRepros: true,
                showMap: false,
                showTimeline: false,
                showAddAPropertyButton: false,
                showSectionList: false
              }, data, action.meta.crm,
                { pkUiContext: ComConfig.PK_UI_CONTEXT_SOURCES_EDITABLE })
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSectionDetailsSucceeded(peItDetail));

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
              c.localStore.dispatch(this.actions.loadSectionDetailsFailed());

            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
