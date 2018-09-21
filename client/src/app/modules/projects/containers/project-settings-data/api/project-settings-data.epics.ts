import { Injectable } from '@angular/core';
import { LoadingBarActions, DfhClassApi } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ProjectSettingsDataComponent } from '../project-settings-data.component';
import { ProjectSettingsDataAPIActions } from './project-settings-data.actions';

@Injectable()
export class ProjectSettingsDataAPIEpics {
  constructor(
    private classApi: DfhClassApi,
    private actions: ProjectSettingsDataAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(c: ProjectSettingsDataComponent): Epic {
    return combineEpics(this.createLoadProjectSettingsDataEpic(c));
  }

  private createLoadProjectSettingsDataEpic(c: ProjectSettingsDataComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ProjectSettingsDataAPIActions.LOAD),
        switchMap(() => new Observable<FluxStandardAction<any>>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Emit the local action that sets the loading flag to true
           */
          c.localStore.dispatch(this.actions.loadStarted());
          /**
           * Do some api call
           */
          this.classApi.projectSettingsClassList(c.project.pk_project)
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
              c.localStore.dispatch(this.actions.loadSucceeded(data));

            }, error => {
              /**
               * Emit the global action that shows some loading error message
               */
              // globalStore.next(this.loadingBarActions.completeLoading());
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
