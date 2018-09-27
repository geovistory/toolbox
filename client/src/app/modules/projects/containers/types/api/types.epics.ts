import { Injectable } from '@angular/core';
import { LoadingBarActions, InfPersistentItemApi, DfhClassApi, InfPersistentItem } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { TypesComponent } from '../types.component';
import { TypesAPIActions, TypesAPIAction } from './types.actions';
import * as InfConfig from '../../../../../../../../common/config/InfConfig';

@Injectable()
export class TypesAPIEpics {
  constructor(
    private peItApi: InfPersistentItemApi,
    private classApi: DfhClassApi,
    private actions: TypesAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(c: TypesComponent): Epic {
    return combineEpics(
      this.createLoadTypesEpic(c),
      this.createCreateTypeEpic(c)
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
          const queryTypes: Observable<InfPersistentItem[]> = this.peItApi.typesOfNamespaceClassAndProject(action.meta.pkNamespace, action.meta.pkProject, action.meta.pkTypedClass);
          const queryClass = this.classApi.findComplex({
            include: {
              ingoing_properties: {
                $relation: {
                  name: 'ingoing_properties',
                  select: false,
                  joinType: 'inner join',
                  // TODO: Replace this use of InfConfig as soon as we have generic way to find type class of class
                  where: ['dfh_pk_property', '=', InfConfig.PK_CLASS_PK_HAS_TYPE_MAP[action.meta.pkTypedClass]]
                }
              }
            }
          });
          /**
           * Subscribe to the api call
           */
          combineLatest(queryClass, queryTypes)
            .subscribe((data) => {
              const classes = data[0], peits = data[1];
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSucceeded(classes[0], peits));

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
        switchMap((action: TypesAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
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
            InfConfig.PK_NAMESPACE__GEOVISTORY_ONGOING, // TODO: Dynamic loading of current namespace
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
              // globalStore.next(this.loadingBarActions.completeLoading());
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

}
