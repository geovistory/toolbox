import { Injectable } from '@angular/core';
import { InfPersistentItemApi, LoadingBarActions } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { createPeItDetail } from '../../../../../core/state/services/state-creator';
import { PeItService } from '../../../shared/pe-it.service';
import { InformationComponent } from '../information.component';
import { InformationAPIAction, InformationAPIActions } from './information.actions';

@Injectable()
export class InformationAPIEpics {
  constructor(
    private peItService: PeItService,
    private actions: InformationAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(c: InformationComponent): Epic {
    return combineEpics(
      this.createLoadEntityEditorEpic(c)
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
}
