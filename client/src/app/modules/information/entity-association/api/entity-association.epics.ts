import { Injectable } from '@angular/core';
import { LoadingBarActions, SubstoreComponent, InfEntityAssociationApi, InfEntityAssociation } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { EntityAssociationAPIActions, EntityAssociationAPIAction } from './entity-association.actions';
import { ofSubstore } from 'app/core/store/module';
import { createEntityAssociationList, createEntityAssociationDetail } from 'app/core/state/services/state-creator';

@Injectable()
export class EntityAssociationAPIEpics {
  constructor(
    private eaApi: InfEntityAssociationApi,
    private actions: EntityAssociationAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: SubstoreComponent): Epic {
    return combineEpics(this.createLoadEntityAssociationEpic(c));
  }

  private createLoadEntityAssociationEpic(c: SubstoreComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(EntityAssociationAPIActions.LOAD_EXISTING_LIST),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: EntityAssociationAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.eaApi.nestedObject(false, action.meta.pkProject, null, action.meta.fkRangeEntity, action.meta.fkDomainEntity, action.meta.fkProperty) // <- change api call here
            /**
             * Subscribe to the api call
             */
            .subscribe((data: InfEntityAssociation[]) => {

              const eaList = createEntityAssociationList(action.meta.propertyField, data, action.meta.crm)

              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSucceeded(eaList));

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
