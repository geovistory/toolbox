import { Injectable } from '@angular/core';
import { ProInfoProjRel, ProInfoProjRelApi, LoadingBarActions } from 'app/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { TeEntService } from 'app/modules/information/shared/te-ent.service';
import { FluxStandardAction } from 'flux-standard-action';
import { startsWith } from 'ramda';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, filter, tap } from 'rxjs/operators';
import { createPeItDetail, createTeEntDetail } from '../../../../../core/state/services/state-creator';
import { PeItService } from '../../../shared/pe-it.service';
import { ofSubstore } from 'app/core/store/module';
import { PeItDetailAPIActions, PeItDetailAPIAction } from './pe-it-detail.actions';
import { PeItDetailComponent } from '../pe-it-detail.component';

export const ofDirectChildSubstore = (path: string[]) => (action): boolean => {
  const actionPath = JSON.parse(action['@angular-redux::fractalkey']);

  // path must be equal to begin of action path
  const startsWithBool = startsWith(path, actionPath);

  // number of levels (_leaf_pe_it) must equal in actionPath and in path
  const nextLevelBool = (path.filter(s => s === '_leaf_peIt').length) === actionPath.filter(s => s === '_leaf_peIt').length

  return (startsWithBool && nextLevelBool);
}

@Injectable()
export class PeItDetailAPIEpics {
  constructor(
    private eprApi: ProInfoProjRelApi,
    private peItService: PeItService,
    private teEntService: TeEntService,
    private actions: PeItDetailAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: PeItDetailComponent): Epic {
    return combineEpics(
      // this.createLoadPersistentEntityEditorEpic(c),
      // this.createRemovePeItEpic(c)
    );
  }


  // private createLoadPersistentEntityEditorEpic(c: PeItDetailComponent): Epic {
  //   return (action$, store) => {
  //     return action$.pipe(
  //       /**
  //        * Filter the actions that triggers this epic
  //        */
  //       ofType(PeItDetailAPIActions.LOAD),
  //       tap((x) => {

  //       }),
  //       filter(action => ofSubstore(c.basePath)(action)),
  //       switchMap((action: PeItDetailAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
  //         /**
  //          * Emit the global action that activates the loading bar
  //          */
  //         globalStore.next(this.loadingBarActions.startLoading());

  //         c.t.setTabLoading(true)

  //         /**
  //          * Do some api call
  //          */
  //         this.peItService.getNestedObject(action.meta.pkEntity, action.meta.pkProject)
  //           /**
  //            * Subscribe to the api call
  //            */
  //           .subscribe((data) => {
  //             const peItDetail = createPeItDetail(
  //               action.meta.config,
  //               data,
  //               action.meta.crm,
  //               action.meta.settings
  //             )
  //             /**
  //              * Emit the global action that completes the loading bar
  //              */
  //             globalStore.next(this.loadingBarActions.completeLoading());
  //             /**
  //              * Emit the local action on loading succeeded
  //              */
  //             c.localStore.dispatch(this.actions.loadSucceeded(peItDetail));
  //             c.t.setTabLoading(false)


  //           }, error => {
  //             /**
  //              * Emit the global action that shows some loading error message
  //              */
  //             // globalStore.next(this.loadingBarActions.completeLoading());
  //             /**
  //             * Emit the local action on loading failed
  //             */
  //             c.localStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
  //           })
  //       })),
  //       takeUntil(c.destroy$)
  //     )
  //   }
  // }

  // /**
  //  * Epic to remove a peIt from project
  //  */
  // private createRemovePeItEpic(c: PeItDetailComponent): Epic {
  //   return (action$, store) => {
  //     return action$.pipe(
  //       /**
  //        * Filter the actions that triggers this epic
  //        */
  //       ofType(PeItDetailAPIActions.REMOVE_PE_IT),
  //       filter(action => ofSubstore(c.basePath)(action)),
  //       switchMap((action: PeItDetailAPIAction) => new Observable<Action>((globalStore) => {
  //         /**
  //          * Emit the global action that activates the loading bar
  //          */
  //         globalStore.next(this.loadingBarActions.startLoading());
  //         /**
  //          * Do some api call
  //          */
  //         this.eprApi.updateEprAttributes(action.meta.pkProject, action.meta.pkEntity, {
  //           is_in_project: false
  //         } as ProInfoProjRel)
  //           /**
  //            * Subscribe to the api call
  //            */
  //           .subscribe((data) => {

  //             /**
  //              * Emit the global action that completes the loading bar
  //              */
  //             globalStore.next(this.loadingBarActions.completeLoading());
  //             /**
  //              * Emit the local action on loading succeeded
  //              */
  //             c.localStore.dispatch(this.actions.removePeItSucceded());

  //           }, error => {
  //             /**
  //             * Emit the global action that shows some loading error message
  //             */
  //             globalStore.next(this.loadingBarActions.completeLoading());
  //             globalStore.next(this.notificationActions.addToast({
  //               type: 'error',
  //               options: {
  //                 title: error.message
  //               }
  //             }));
  //             c.localStore.dispatch(this.actions.removePeItFailed(error.message));

  //           })
  //       })),
  //       takeUntil(c.destroy$)
  //     )
  //   }
  // }


}
