import { Injectable } from '@angular/core';
import { LoadingBarActions, DfhClassApi } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ProjectSettingsDataComponent } from '../project-settings-data.component';
import { ProjectSettingsDataAPIActions, ProjectSettingsDataAPIAction } from './project-settings-data.actions';
import { ProDfhClassProjRelApi } from 'app/core/sdk/services/custom/ProDfhClassProjRel';

@Injectable()
export class ProjectSettingsDataAPIEpics {
  constructor(
    private classApi: DfhClassApi,
    private projRelApi: ProDfhClassProjRelApi,
    private actions: ProjectSettingsDataAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(c: ProjectSettingsDataComponent): Epic {
    return combineEpics(
    );
  }

  // /**
  //  * Epic to handle enabling and disabling of a class for project
  //  * @param c
  //  */
  // private createChangeClassProjRelEpic(c: ProjectSettingsDataComponent): Epic {
  //   return (action$, store) => {
  //     return action$.pipe(
  //       /**
  //        * Filter the actions that triggers this epic
  //        */
  //       ofType(ProjectSettingsDataAPIActions.CHANGE_CLASS_PROJ_REL),
  //       switchMap((action: ProjectSettingsDataAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
  //         /**
  //          * Emit the global action that activates the loading bar
  //          */
  //         globalStore.next(this.loadingBarActions.startLoading());
  //         /**
  //          * Emit the local action that sets the loading flag to true
  //          */
  //         c.localStore.dispatch(this.actions.changeClassProjRelStarted(action.meta.projRel));

  //         /**
  //          * Prepare api call
  //          */
  //         let apiCall;
  //         // create new projRel
  //         if (action.meta.projRel.pk_entity) apiCall = this.projRelApi.patchAttributes(action.meta.projRel.pk_entity, action.meta.projRel);
  //         // update existing projRel
  //         else apiCall = this.projRelApi.create(action.meta.projRel);

  //         /**
  //          * Subscribe to the api call
  //          */
  //         apiCall.subscribe((data) => {
  //           /**
  //            * Emit the global action that completes the loading bar
  //            */
  //           globalStore.next(this.loadingBarActions.completeLoading());
  //           /**
  //            * Emit the local action on loading succeeded
  //            */
  //           c.localStore.dispatch(this.actions.changeClassProjRelSucceeded(data));

  //         }, error => {
  //           /**
  //            * Emit the global action that shows some loading error message
  //            */
  //           // globalStore.next(this.loadingBarActions.completeLoading());
  //           /**
  //           * Emit the local action on loading failed
  //           */
  //           c.localStore.dispatch(this.actions.changeClassProjRelFailed({ status: '' + error.status }))
  //         })
  //       })),
  //       takeUntil(c.destroy$)
  //     )
  //   }
  // }
}

