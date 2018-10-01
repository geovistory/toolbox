import { Injectable } from '@angular/core';
import { LoadingBarActions, DfhProperty } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { PropertyListComponent } from '../property-list.component';
import { PropertyListAPIActions, PropertyListAPIAction } from './property-list.actions';
import { DfhPropertyApi } from 'app/core/sdk/services/custom/DfhProperty';

@Injectable()
export class PropertyListAPIEpics {
  constructor(
    private propertyApi: DfhPropertyApi, // <- change the api
    private actions: PropertyListAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(c: PropertyListComponent): Epic {
    return combineEpics(this.createLoadPropertyListEpic(c));
  }

  private createLoadPropertyListEpic(c: PropertyListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(PropertyListAPIActions.LOAD),
        switchMap((action: PropertyListAPIAction) => new Observable<FluxStandardAction<any>>((globalStore) => {
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
          this.propertyApi.findComplex({
            order: [{ dfh_identifier_in_namespace: 'asc' }],
            include: {
              label_sg: {
                $relation: {
                  name: 'labels',
                  joinType: 'left join',
                  orderBy: [{ notes: 'asc' }],
                  where: ['notes', '=', 'label.sg']

                }
              },
              label_pl: {
                $relation: {
                  name: 'labels',
                  joinType: 'left join',
                  orderBy: [{ notes: 'asc' }],
                  where: ['notes', '=', 'label.pl']

                }
              },
              label_inversed_sg: {
                $relation: {
                  name: 'labels',
                  joinType: 'left join',
                  orderBy: [{ notes: 'asc' }],
                  where: ['notes', '=', 'label_inversed.sg']

                }
              },
              label_inversed_pl: {
                $relation: {
                  name: 'labels',
                  joinType: 'left join',
                  orderBy: [{ notes: 'asc' }],
                  where: ['notes', '=', 'label_inversed.pl']
                }
              },
              // text_properties: {
              //     $relation: {
              //         name: 'text_properties',
              //         joinType: 'left join'
              //     }
              // }
              // ,
              domain_class: {
                $relation: {
                  name: 'domain_class',
                  joinType: 'left join',
                  orderBy: [{ pk_entity: 'asc' }]
                }
              },
              range_class: {
                $relation: {
                  name: 'range_class',
                  joinType: 'left join',
                  orderBy: [{ pk_entity: 'asc' }]
                }
              }
            }
          })
            /**
             * Subscribe to the api call
             */
            .subscribe((data: DfhProperty[]) => {
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
