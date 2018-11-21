import { Injectable } from '@angular/core';
import { LoadingBarActions, InfEntityAssociationApi, ComConfig, PropertyField, InfEntityAssociation } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { SectionListComponent } from '../section-list.component';
import { SectionListAPIActions, SectionListAPIAction } from './section-list.actions';
import { ofSubstore } from 'app/core/store/module';
import { createEntityAssociationList } from 'app/core/state/services/state-creator';

@Injectable()
export class SectionListAPIEpics {
  constructor(
    private eaApi: InfEntityAssociationApi,
    private actions: SectionListAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: SectionListComponent): Epic {
    return combineEpics(this.createLoadSectionListEpic(c));
  }

  private createLoadSectionListEpic(c: SectionListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(SectionListAPIActions.LOAD),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: SectionListAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.eaApi.queryByParams(true, action.meta.pkProject, null, action.meta.fkRangeEntity, null, action.meta.fkProperty)
            /**
             * Subscribe to the api call
             */
            .subscribe((data: InfEntityAssociation[]) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());

              // const eaList = createEntityAssociationList(new PropertyField(), data, action.meta.crm, { pkUiContext: ComConfig.PK_UI_CONTEXT_SOURCES_EDITABLE })

              const pkSections = data.map(ea => ea.fk_domain_entity)

              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSucceeded(pkSections));

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
