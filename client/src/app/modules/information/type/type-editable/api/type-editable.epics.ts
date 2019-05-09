import { Injectable } from '@angular/core';
import { LoadingBarActions, InfEntityAssociationApi, InfEntityAssociation, InfPersistentItemApi, InfPersistentItem } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, takeUntil, filter, mapTo, tap } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { TypeEditableComponent } from '../type-editable.component';
import { TypeEditableAPIActions, TypeAPIAction } from './type-editable.actions';
import { createTypeDetail } from 'app/core/state/services/state-creator';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class TypeEditableAPIEpics {
  constructor(
    private eaApi: InfEntityAssociationApi,
    private peItApi: InfPersistentItemApi,
    private actions: TypeEditableAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: TypeEditableComponent): Epic {
    return combineEpics(
      this.createChangeTypeEpic(c),
      this.createLoadTypeEpic(c),
      this.createNoTypeEpic(c)

    );
  }

  private createChangeTypeEpic(c: TypeEditableComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TypeEditableAPIActions.CHANGE_TYPE),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: TypeAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */

          combineLatest(action.meta.entityAssociations.map((assoc) => this.eaApi
            .findOrCreateInfEntityAssociation(action.meta.pkProject, assoc)))
            .subscribe((data: InfEntityAssociation[][]) => {
              let newAssoc: InfEntityAssociation;
              data.some((aa) => aa.some((a) => {
                if (a.entity_version_project_rels && a.entity_version_project_rels.length && a.entity_version_project_rels[0].is_in_project) {
                  newAssoc = a;
                  return true;
                }
              }))
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.changeTypeSucceeded(newAssoc));

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
              c.localStore.dispatch(this.actions.changeTypeFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }



  private createLoadTypeEpic(c: TypeEditableComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TypeEditableAPIActions.CHANGE_TYPE_SUCCEEDED),
        filter(action => ofSubstore(c.basePath)(action)),
        filter(action => !!(action.meta.entityAssociation)), // only if there is a new type
        switchMap((action: TypeAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */

          this.peItApi.typeNested(c.ngRedux.getState().activeProject.pk_entity, action.meta.entityAssociation.fk_info_range)
            .subscribe((typePeIt: InfPersistentItem) => {

              const typeDetail = createTypeDetail(
                {},
                { ...action.meta.entityAssociation, range_pe_it: typePeIt },
                c.ngRedux.getState().activeProject.crm,
                { pkUiContext: c.localStore.getState().pkUiContext }
              )

              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSucceeded(typeDetail));

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


  private createNoTypeEpic(c: TypeEditableComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TypeEditableAPIActions.CHANGE_TYPE_SUCCEEDED),
        filter(action => ofSubstore(c.basePath)(action)),
        filter(action => !(action.meta.entityAssociation)), // only if there is no type
        switchMap((action: TypeAPIAction) => new Observable<Action>((globalStore) => {
          c.localStore.dispatch(this.actions.loadSucceeded({}))
        }))
      )
    }
  }
}
