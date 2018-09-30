import { Injectable } from '@angular/core';
import { LoadingBarActions, InfPersistentItemApi, DfhClassApi, InfPersistentItem, InfNamespaceApi, InfNamespace } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { TypesComponent } from '../types.component';
import { TypesAPIActions, TypesAPIAction } from './types.actions';
import * as Config from '../../../../../../../../common/config/Config';
import { NotificationsAPIActions } from '../../../../../core/notifications/components/api/notifications.actions';
import { Action } from 'redux';
import { PeItDetailService } from 'app/core/state/services/custom/pe-it-detail';

@Injectable()
export class TypesAPIEpics {
  constructor(
    private peItApi: InfPersistentItemApi,
    private classApi: DfhClassApi,
    private namespaceApi: InfNamespaceApi,
    private actions: TypesAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions,
    private peItDetailService: PeItDetailService
  ) { }

  public createEpics(c: TypesComponent): Epic {
    return combineEpics(
      this.createLoadTypesEpic(c),
      this.createCreateTypeEpic(c),
      this.createOpenEditFormEpic(c)
    );
  }

  private createLoadTypesEpic(c: TypesComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TypesAPIActions.LOAD),
        switchMap((action: TypesAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Emit the local action that sets the loading flag to true
           */
          c.localStore.dispatch(this.actions.loadStarted());
          /**
           * Prepare some api calls
           */
          const types$: Observable<InfPersistentItem[]> = this.peItApi.typesOfNamespaceClassAndProject(action.meta.pkNamespace, action.meta.pkProject, action.meta.pkTypedClass, null);
          const classes$ = this.classApi.findComplex({
            include: {
              ingoing_properties: {
                $relation: {
                  name: 'ingoing_properties',
                  select: false,
                  joinType: 'inner join',
                  // TODO: Replace this use of Config as soon as we have generic way to find type class of class
                  where: ['dfh_pk_property', '=', Config.PK_CLASS_PK_HAS_TYPE_MAP[action.meta.pkTypedClass]]
                }
              }
            }
          });
          const namespace$: Observable<InfNamespace> = this.namespaceApi.findById(action.meta.pkNamespace);
          /**
           * Subscribe to the api call
           */
          combineLatest(classes$, types$, namespace$)
            .subscribe((data) => {
              const classes = data[0], peits = data[1], namespace = data[2];
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSucceeded(classes[0], peits, namespace));

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


  private createCreateTypeEpic(c: TypesComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(TypesAPIActions.CREATE),
        switchMap((action: TypesAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Emit the local action that sets the loading flag to true
           */
          c.localStore.dispatch(this.actions.createStarted());

          /**
           * Subscribe to the api call
           */
          this.peItApi.findOrCreateType(
            c.ngRedux.getState().activeProject.pk_project,
            c.localStore.getState().namespace.pk_entity,
            action.meta.type)
            .subscribe((data) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.createSucceeded(data[0]));

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
              c.localStore.dispatch(this.actions.createFailed({ status: '' + error.status }))
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
        switchMap((action: TypesAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Emit the local action that sets the loading flag to true
           */
          c.localStore.dispatch(this.actions.loadStarted());
          /**
           * Prepare some api calls
           */
          const type$: Observable<InfPersistentItem[]> = this.peItApi.typeNested(c.pkNamespace, c.project.pk_project, action.meta.type.pk_entity);
          /**
           * Subscribe to the api call
           */
          type$.subscribe((data) => {

            const peItDetail = this.peItDetailService.createState({}, data[0], c.ngRedux.getState().activeProject.crm)

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


}
