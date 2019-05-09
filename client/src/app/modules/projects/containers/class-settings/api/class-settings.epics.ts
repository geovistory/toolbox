import { Injectable } from '@angular/core';
import { LoadingBarActions, DfhClassApi, DfhClass, DatNamespaceApi } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ClassSettingsComponent } from '../class-settings.component';
import { ClassSettingsAPIActions, ClassSettingsAPIAction } from './class-settings.actions';

@Injectable()
export class ClassSettingsAPIEpics {
  constructor(
    private classApi: DfhClassApi,
    private namespaceApi: DatNamespaceApi,
    private actions: ClassSettingsAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(c: ClassSettingsComponent): Epic {
    return combineEpics(
      this.createLoadClassSettingsEpic(c)
    )
  }

  private createLoadClassSettingsEpic(c: ClassSettingsComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ClassSettingsAPIActions.LOAD),
        switchMap((action: ClassSettingsAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Emit the local action that sets the loading flag to true
           */
          c.localStore.dispatch(this.actions.loadStarted());
          /**
           * Do some api calls
           */
          const cla$: Observable<DfhClass> = this.classApi.findById(action.meta.dfhPkClass)
          const nmsp$ = this.namespaceApi.findWhereProjectOrHasTypes(action.meta.dfhPkClass, c.project.pk_entity);

          /**
           * Subscribe to the api calls
           */
          combineLatest(cla$, nmsp$).subscribe((data) => {
            const cla = data[0], nmsp = data[1];
            /**
             * Emit the global action that completes the loading bar
             */
            globalStore.next(this.loadingBarActions.completeLoading());
            /**
             * Emit the local action on loading succeeded
             */
            c.localStore.dispatch(this.actions.loadSucceeded(cla, nmsp));

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
