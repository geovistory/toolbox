import { Injectable } from '@angular/core';
import { LoadingBarActions, InfEntityProjectRelApi, InfEntityProjectRel } from 'app/core';
import { PeItActions } from 'app/modules/information/data-unit/pe-it/pe-it.actions';
import { FluxStandardAction } from 'flux-standard-action';
import { startsWith } from 'ramda';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { createPeItDetail } from '../../../../../core/state/services/state-creator';
import { PeItService } from '../../../shared/pe-it.service';
import { InformationComponent } from '../information.component';
import { InformationAPIAction, InformationAPIActions } from './information.actions';
import { Action } from 'redux';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';

export const ofDirectChildSubstore = (path: string[]) => (action): boolean => {
  const actionPath = JSON.parse(action['@angular-redux::fractalkey']);

  // path must be equal to begin of action path
  const startsWithBool = startsWith(path, actionPath);

  // number of levels (_leaf_pe_it) must equal in actionPath and in path
  const nextLevelBool = (path.filter(s => s === '_leaf_peIt').length) === actionPath.filter(s => s === '_leaf_peIt').length

  return (startsWithBool && nextLevelBool);
}

@Injectable()
export class InformationAPIEpics {
  constructor(
    private eprApi: InfEntityProjectRelApi,
    private peItService: PeItService,
    private actions: InformationAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: InformationComponent): Epic {
    return combineEpics(
      this.createLoadEntityEditorEpic(c),
      this.createRemovePeItEpic(c)
    );
  }


  private createLoadEntityEditorEpic(c: InformationComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(InformationAPIActions.OPEN_ENTITY_EDITOR),
        switchMap((action: InformationAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
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
                showTimelineToggle: true
              }, data, c.ngRedux.getState().activeProject.crm)
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.openEntityEditorSucceeded(peItDetail));

            }, error => {
              /**
               * Emit the global action that shows some loading error message
               */
              // globalStore.next(this.loadingBarActions.completeLoading());
              /**
              * Emit the local action on loading failed
              */
              c.localStore.dispatch(this.actions.openEntityEditorFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }

  /**
   * Epic to remove a peIt from project
   */
  private createRemovePeItEpic(c: InformationComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(InformationAPIActions.REMOVE_PE_IT),
        switchMap((action: InformationAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.eprApi.updateEprAttributes(action.meta.pkProject, action.meta.pkEntity, {
            is_in_project: false
          } as InfEntityProjectRel)
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
              c.openSearchList()

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
