import { Injectable } from '@angular/core';
import { ProInfoProjRel, ProInfoProjRelApi, LoadingBarActions } from 'app/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { TeEntService } from 'app/modules/information/shared/te-ent.service';
import { FluxStandardAction } from 'flux-standard-action';
import { startsWith } from 'ramda';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { createPeItDetail, createTeEntDetail } from '../../../../../core/state/services/state-creator';
import { PeItService } from '../../../shared/pe-it.service';
import { EntityDetailComponent } from '../entity-detail.component';
import { EntityDetailAPIAction, EntityDetailAPIActions } from './entity-detail.actions';
import { ofSubstore } from 'app/core/store/module';

export const ofDirectChildSubstore = (path: string[]) => (action): boolean => {
  const actionPath = JSON.parse(action['@angular-redux::fractalkey']);

  // path must be equal to begin of action path
  const startsWithBool = startsWith(path, actionPath);

  // number of levels (_leaf_pe_it) must equal in actionPath and in path
  const nextLevelBool = (path.filter(s => s === '_leaf_peIt').length) === actionPath.filter(s => s === '_leaf_peIt').length

  return (startsWithBool && nextLevelBool);
}

@Injectable()
export class EntityDetailAPIEpics {
  constructor(
    private eprApi: ProInfoProjRelApi,
    private peItService: PeItService,
    private teEntService: TeEntService,
    private actions: EntityDetailAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: EntityDetailComponent): Epic {
    return combineEpics(
      this.createLoadPersistentEntityEditorEpic(c),
      this.createLoadTemporalEntityEditorEpic(c),
      this.createRemovePeItEpic(c)
    );
  }


  private createLoadPersistentEntityEditorEpic(c: EntityDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(EntityDetailAPIActions.OPEN_PERSISTENT_ENTITY_EDITOR),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: EntityDetailAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
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
                showProperties: true,
                showPropertiesToggle: true,
                showMap: true,
                showMapToggle: true,
                showTimeline: true,
                showTimelineToggle: true,
                showSources: false,
                showSourcesToggle: true,
                sources: {
                  mentioningListType: 'ofEntity',
                  mentionedEntityPk: action.meta.pkEntity
                }
              }, data, c.ngRedux.getState().activeProject.crm)
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.openPersistentEntityEditorSucceeded(peItDetail));

            }, error => {
              /**
               * Emit the global action that shows some loading error message
               */
              // globalStore.next(this.loadingBarActions.completeLoading());
              /**
              * Emit the local action on loading failed
              */
              c.localStore.dispatch(this.actions.openPersistentEntityEditorFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }



  private createLoadTemporalEntityEditorEpic(c: EntityDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(EntityDetailAPIActions.OPEN_TEMPORAL_ENTITY_EDITOR),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: EntityDetailAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.teEntService.getNestedObject(action.meta.pkEntity, action.meta.pkProject)
            /**
             * Subscribe to the api call
             */
            .subscribe((data) => {
              const teEntDetail = createTeEntDetail({}, data, c.ngRedux.getState().activeProject.crm)
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.openTemporalEntityEditorSucceeded(teEntDetail));

            }, error => {
              /**
               * Emit the global action that shows some loading error message
               */
              // globalStore.next(this.loadingBarActions.completeLoading());
              /**
              * Emit the local action on loading failed
              */
              c.localStore.dispatch(this.actions.openTemporalEntityEditorFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }

  /**
   * Epic to remove a peIt from project
   */
  private createRemovePeItEpic(c: EntityDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(EntityDetailAPIActions.REMOVE_PE_IT),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: EntityDetailAPIAction) => new Observable<Action>((globalStore) => {
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
              c.localStore.dispatch(this.actions.removePeItSucceded());

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
              c.localStore.dispatch(this.actions.removePeItFailed(error.message));

            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }


}