import { Injectable } from '@angular/core';
import { LoadingBarActions, DfhProperty } from 'app/core';
import { DfhPropertyApi } from 'app/core/sdk/services/custom/DfhProperty';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import * as Config from '../../../../../../../../common/config/Config';
import { PropertyListComponent } from '../property-list.component';
import { PropertyListAPIAction, PropertyListAPIActions } from './property-list.actions';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { Action } from 'redux';

@Injectable()
export class PropertyListAPIEpics {
  constructor(
    private propertyApi: DfhPropertyApi, // <- change the api
    private actions: PropertyListAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: PropertyListComponent): Epic {
    return combineEpics(
      this.createLoadPropertyListEpic(c),
      this.createUpdatePropertyEpic(c),
      this.createListenToUpadtesEpic(c)
    );
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
                  orderBy: [{ pk_entity: 'asc' }],
                  where: ['com_fk_system_type', '=', Config.PROPERTY_LABEL_SG]

                }
              },
              label_pl: {
                $relation: {
                  name: 'labels',
                  joinType: 'left join',
                  orderBy: [{ pk_entity: 'asc' }],
                  where: ['com_fk_system_type', '=', Config.PROPERTY_LABEL_PL]

                }
              },
              label_inversed_sg: {
                $relation: {
                  name: 'labels',
                  joinType: 'left join',
                  orderBy: [{ pk_entity: 'asc' }],
                  where: ['com_fk_system_type', '=', Config.PROPERTY_LABEL_INVERSED_SG]

                }
              },
              label_inversed_pl: {
                $relation: {
                  name: 'labels',
                  joinType: 'left join',
                  orderBy: [{ pk_entity: 'asc' }],
                  where: ['com_fk_system_type', '=', Config.PROPERTY_LABEL_INVERSED_PL]
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
              },
              property_profile_view: {
                $relation: {
                  name: 'property_profile_view',
                  joinType: 'inner join',
                  select: {
                    include: ['removed_from_api', 'dfh_profile_label']
                  }
                }
              }
            }
          })
            /**
             * Subscribe to the api call
             */
            .subscribe((data: any[]) => {


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



  private createUpdatePropertyEpic(c: PropertyListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(PropertyListAPIActions.UPDATE_PROPERTY),
        switchMap((action: PropertyListAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.propertyApi.patchAttributes(action.meta.property.pk_property, action.meta.property)
            /**
             * Subscribe to the api call
             */
            .subscribe((data: DfhProperty) => {


              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());

              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.updatePropertySucceeded(data));

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
              }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }


  private createListenToUpadtesEpic(c: PropertyListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(PropertyListAPIActions.UPDATE_PROPERTY_SUCCEEDED),
        switchMap((action: PropertyListAPIAction) => new Observable<Action>((globalStore) => {
          c.setTableData(c.localStore.getState().items)
        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
