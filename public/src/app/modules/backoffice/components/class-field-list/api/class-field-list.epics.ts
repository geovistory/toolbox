import { Injectable } from '@angular/core';
import { LoadingBarActions, SysClassFieldApi } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { ClassFieldListComponent } from '../class-field-list.component';
import { ClassFieldListAPIActions, ClassFieldListAPIAction } from './class-field-list.actions';
import { ofSubstore } from 'app/core/store/module';

@Injectable()
export class ClassFieldListAPIEpics {
  constructor(
    private classFieldApi: SysClassFieldApi, // <- change the api
    private actions: ClassFieldListAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: ClassFieldListComponent): Epic {
    return combineEpics(this.createLoadClassFieldListEpic(c));
  }

  private createLoadClassFieldListEpic(c: ClassFieldListComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ClassFieldListAPIActions.LOAD),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: ClassFieldListAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.classFieldApi.findComplex({
            include: {
              // labels: {
              //   $relation: {
              //     name: 'labels',
              //     joinType: 'left join',
              //     orderBy: [{ pk_entity: 'DESC' }],
              //   }
              // },
              class_field_property_rel: {
                $relation: {
                  name: 'class_field_property_rel',
                  joinType: 'left join',
                  orderBy: [{ pk_entity: 'DESC' }],
                },
                property: {
                  $relation: {
                    name: 'property',
                    joinType: 'left join',
                    orderBy: [{ pk_entity: 'DESC' }],
                  }
                }
              }
            }
          })
            /**
             * Subscribe to the api call
             */
            .subscribe((data) => {
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
