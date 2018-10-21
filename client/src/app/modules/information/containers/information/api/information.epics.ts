import { Injectable } from '@angular/core';
import { LoadingBarActions, InfPersistentItemApi } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { InformationComponent } from '../information.component';
import { InformationAPIActions, InformationAPIAction } from './information.actions';
import { SearchResponse } from './information.models';
import { PeItService } from '../../../shared/pe-it.service';
import { createPeItDetail } from '../../../../../core/state/services/state-creator';

@Injectable()
export class InformationAPIEpics {
  constructor(
    private peItService: PeItService,
    private peItApi: InfPersistentItemApi, // <- change the api
    private actions: InformationAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(c: InformationComponent): Epic {
    return combineEpics(
      this.createLoadInformationEpic(c),
      this.createLoadEntityEditorEpic(c)
    );
  }

  private createLoadInformationEpic(c: InformationComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(InformationAPIActions.SEARCH),
        switchMap((action: InformationAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Emit the local action that sets the loading flag to true
           */
          c.localStore.dispatch(this.actions.searchStarted());
          /**
           * Do some api call
           */
          this.peItApi.searchInProject(action.meta.pkProject, action.meta.searchString, action.meta.limit, action.meta.page)
            /**
             * Subscribe to the api call
             */
            .subscribe((data: SearchResponse) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.searchSucceeded(data));

            }, error => {
              /**
               * Emit the global action that shows some loading error message
               */
              // globalStore.next(this.loadingBarActions.completeLoading());
              /**
              * Emit the local action on loading failed
              */
              c.localStore.dispatch(this.actions.searchFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
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
              const peItDetail = createPeItDetail({}, data, c.ngRedux.getState().activeProject.crm)
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
}
