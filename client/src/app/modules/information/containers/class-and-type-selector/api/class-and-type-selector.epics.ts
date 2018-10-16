import { Injectable } from '@angular/core';
import { LoadingBarActions, InfPersistentItemApi, U, InfPersistentItem } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { ClassAndTypeSelectorComponent } from '../class-and-type-selector.component';
import { ClassAndTypeSelectorAPIActions, ClassAndTypeSelectorAPIAction } from './class-and-type-selector.actions';
import { TreeviewItem } from 'ngx-treeview';

@Injectable()
export class ClassAndTypeSelectorAPIEpics {
  constructor(
    private peItApi: InfPersistentItemApi, // <- change the api
    private actions: ClassAndTypeSelectorAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: ClassAndTypeSelectorComponent): Epic {
    return combineEpics(this.createLoadClassAndTypeSelectorEpic(c));
  }

  private createLoadClassAndTypeSelectorEpic(c: ClassAndTypeSelectorComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(ClassAndTypeSelectorAPIActions.LOAD),
        switchMap((action: ClassAndTypeSelectorAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          combineLatest(action.meta.pkClasses.map(pkClass => (
            this.peItApi.typesOfClassAndProject(action.meta.pkProject, pkClass)
          )))
            /**
             * Subscribe to the api call
             */
            .subscribe((data: InfPersistentItem[][]) => {

              // create the treeview
              const treeviewItems: TreeviewItem[] = data.map((typeArray, index) => {
                const pkClass = action.meta.pkClasses[index];
                const classConfig = c.ngRedux.getState().activeProject.crm.classes[pkClass];
                return new TreeviewItem({
                  value: { pkClass },
                  text: classConfig.label,
                  children: typeArray.map(peIt => (
                    new TreeviewItem({
                      value:  { pkClass, pkType: peIt.pk_entity },
                      text: U.stringForPeIt(peIt)
                    })))
                })
              });


              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSucceeded(treeviewItems));

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
