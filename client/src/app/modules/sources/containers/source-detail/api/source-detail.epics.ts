import { Injectable } from '@angular/core';
import { ComConfig, InfEntityAssociation, InfEntityAssociationApi, ProInfoProjRel, ProInfoProjRelApi, LoadingBarActions, ActiveAccountService } from 'app/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { createPeItDetail } from 'app/core/state/services/state-creator';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { PeItService } from 'app/modules/information/shared/pe-it.service';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { SourceDetailComponent } from '../source-detail.component';
import { SourceDetailAPIAction, SourceDetailAPIActions } from './source-detail.actions';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class SourceDetailAPIEpics {
  constructor(
    private eprApi: ProInfoProjRelApi,
    private eaApi: InfEntityAssociationApi,
    private peItService: PeItService, // <- change the api
    private actions: SourceDetailAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: SourceDetailComponent): Epic {
    return combineEpics(
      this.createLoadSourceDetailsEpic(c),
      this.createRemoveSourceEpic(c),
    );
  }

  private createLoadSourceDetailsEpic(c: SourceDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(SourceDetailAPIActions.LOAD_SOURCE_DETAILS),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: SourceDetailAPIAction) => new Observable<Action>((globalStore) => {
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

                showMentionedEntities: true,
                showMentionedEntitiesToggle: true,

                showAssertions: false,
                showAssertionsToggle: false,

                showSectionList: true,
                showSectionListToggle: true,

                showProperties: true,
                showPropertiesToggle: true,

                showPropertiesHeader: true,
                // showAddAPropertyButton: false,

                mentionedEntities: {
                  mentioningListType: 'ofSource',
                  sourceEntityPk: action.meta.pkEntity
                }

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


  /**
   * Epic to remove a peIt from project
   */
  private createRemoveSourceEpic(c: SourceDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(SourceDetailAPIActions.REMOVE_SOURCE),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: SourceDetailAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.eprApi.updateEprAttributes(action.meta.pkProject, action.meta.pkEntity, {
            is_in_project: false
          } as ProInfoProjRel)
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
              c.localStore.dispatch(this.actions.removeSourceSucceded());

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
              c.localStore.dispatch(this.actions.removeSourceFailed(error.message));

            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }

}
