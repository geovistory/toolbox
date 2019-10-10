import { Injectable } from '@angular/core';
import { LoadingBarActions, ProInfoProjRelApi } from 'app/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { ofSubstore } from 'app/core/store/module';
import { TeEntService } from 'app/modules/information/shared/te-ent.service';
import { FluxStandardAction } from 'flux-standard-action';
import { startsWith } from 'ramda';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TeEntDetailAPIActions, TeEntDetailAPIAction } from './te-ent-detail.actions';
import { TeEntDetailComponent } from '../te-ent-detail.component';
import { createTeEntDetail } from 'app/core/state/services/state-creator';


export const ofDirectChildSubstore = (path: string[]) => (action): boolean => {
  const actionPath = JSON.parse(action['@angular-redux::fractalkey']);

  // path must be equal to begin of action path
  const startsWithBool = startsWith(path, actionPath);

  // number of levels (_leaf_pe_it) must equal in actionPath and in path
  const nextLevelBool = (path.filter(s => s === '_leaf_peIt').length) === actionPath.filter(s => s === '_leaf_peIt').length

  return (startsWithBool && nextLevelBool);
}

@Injectable()
export class TeEntDetailAPIEpics {
  constructor(
    private teEntService: TeEntService,
    private actions: TeEntDetailAPIActions,
    private loadingBarActions: LoadingBarActions,
  ) { }

  public createEpics(c: TeEntDetailComponent): Epic {
    return combineEpics(
      // this.createLoadTemporalEntityEditorEpic(c),
    );
  }

  // private createLoadTemporalEntityEditorEpic(c: TeEntDetailComponent): Epic {
  //   return (action$, store) => {
  //     return action$.pipe(
  //       /**
  //        * Filter the actions that triggers this epic
  //        */
  //       ofType(TeEntDetailAPIActions.LOAD),
  //       tap((x) => {

  //       }),
  //       filter(action => ofSubstore(c.basePath)(action)),
  //       switchMap((action: TeEntDetailAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
  //         /**
  //          * Emit the global action that activates the loading bar
  //          */
  //         globalStore.next(this.loadingBarActions.startLoading());

  //         c.t.setTabLoading(true)

  //         this.teEntService.getNestedObject(action.meta.pkEntity, action.meta.pkProject)
  //           .subscribe((data) => {
  //             const teEntDetail = createTeEntDetail(
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
  //             c.localStore.dispatch(this.actions.loadSucceeded(teEntDetail));
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


}
