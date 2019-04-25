import { Injectable } from '@angular/core';
import { LoadingBarActions, InfPersistentItemApi, DfhClassApi, InfPersistentItem, InfNamespaceApi, InfNamespace, ComConfig } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, takeUntil, filter, first } from 'rxjs/operators';
import { TypesComponent } from '../types.component';
import { TypesAPIActions, TypesAPIAction } from './types.actions';
import * as Config from '../../../../../../../../common/config/Config';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { Action } from 'redux';
import { createPeItDetail } from 'app/core/state/services/state-creator';
import { ActiveProjectActions, ActiveProjectAction } from '../../../../../core/active-project';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class TypesAPIEpics {
  constructor(
    private peItApi: InfPersistentItemApi,
    private actions: TypesAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: TypesComponent): Epic {
    return combineEpics(
      this.createLoadTypesEpic(c),
      this.createOpenEditFormEpic(c),
      this.createUpsertInfProjRelEpic(c),
    );
  }

  private createLoadTypesEpic(c: TypesComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TypesAPIActions.LOAD),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: TypesAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());

          /**
           * Subscribe to the api call
           */
          this.peItApi.typesByClassAndProject(action.meta.pkProject, action.meta.pkTypeClass)
            .subscribe((typePeIts) => {

              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSucceeded(typePeIts));

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

  private createOpenEditFormEpic(c: TypesComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TypesAPIActions.OPEN_EDIT_FORM),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: TypesAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());

          /**
           * Prepare some api calls
           */
          const type$: Observable<InfPersistentItem> = this.peItApi.typeNested(action.meta.pkProject, action.meta.type.pk_entity);
          /**
           * Subscribe to the api call
           */
          type$.subscribe((type) => {

            const peItDetail = createPeItDetail({
              showHeader: false,
              showProperties: true,
              showPropertiesHeader: true,
              showAddAPropertyButton: true
            }, type, c.ngRedux.getState().activeProject.crm, {
                pkUiContext: ComConfig.PK_UI_CONTEXT_DATA_SETTINGS_TYPES_EDITABLE
              })

            /**
             * Emit the global action that completes the loading bar
             */
            globalStore.next(this.loadingBarActions.completeLoading());
            /**
             * Emit the local action on loading succeeded
             */
            c.localStore.dispatch(this.actions.openEditFormSucceeded(peItDetail));

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
            c.localStore.dispatch(this.actions.openEditFormFailed({ status: '' + error.status }))
          })
        })),
        takeUntil(c.destroy$)
      )
    }
  }



  /**
   * This is kind of a hacky way to observe when a type is removed
   * 
   * This should be replaced with a better method, once all the information
   * data (peIt, roles, ect.) is also centrally stored in 'activeProject'
   */
  private createUpsertInfProjRelEpic(c: TypesComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(ActiveProjectActions.UPSERT_ENTITY_PROJ_REL_SUCCEEDED),
        switchMap((action: ActiveProjectAction) => new Observable<Action>((globalStore) => {
          combineLatest(c.typeClass$, c.p.pkProject$).pipe(first(d => !d.includes(undefined)), takeUntil(c.destroy$))
            .subscribe(([klass, pkProject]) => {
              c.localStore.dispatch(this.actions.load(pkProject, klass.dfh_pk_class));
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }


}
