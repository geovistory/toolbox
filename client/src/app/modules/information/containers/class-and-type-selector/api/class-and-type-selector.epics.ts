import { Injectable } from '@angular/core';
import { InfPersistentItem, InfPersistentItemApi, LoadingBarActions, U, TypePeIt } from 'app/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { ofSubstore } from 'app/core/store/module';
import { TreeviewItem, TreeItem } from 'ngx-treeview';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { combineLatest, Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { ClassAndTypeSelectorComponent } from '../class-and-type-selector.component';
import { ClassAndTypeSelectorAPIAction, ClassAndTypeSelectorAPIActions } from './class-and-type-selector.actions';
import { groupBy } from 'ramda';



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
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: ClassAndTypeSelectorAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */

          this.peItApi.typesOfClassesAndProject(action.meta.pkProject, action.meta.pkClasses)
            /**
             * Subscribe to the api call
             */
            .subscribe((data: TypePeIt[]) => {

              const typesPerClass = groupBy<TypePeIt>((type) => (type.fk_typed_class.toString()), data);

              // create the treeview
              const treeviewItems: TreeviewItem[] = action.meta.pkClasses.map((pkClass, index) => {
                const classConfig = c.ngRedux.getState().activeProject.crm.classes[pkClass];
                return new TreeviewItem({
                  value: { pkClass },
                  text: classConfig.label,
                  children: (typesPerClass[pkClass] || []).map(peIt => (
                    new TreeviewItem({
                      value: {
                        pkClass,
                        pkType: peIt.pk_entity
                      },
                      text: peIt.pk_entity.toString()
                    })))
                })
              });

              // const sortItems = (items: TreeviewItem[]): TreeviewItem[] => {
              //   items.map((item) => { if (item.children) sortItems(item.children) })
              //   return items.sort((a, b) => {
              //     const textA = a.text.toUpperCase(); // ignore upper and lowercase
              //     const textB = b.text.toUpperCase(); // ignore upper and lowercase
              //     if (textA < textB) {
              //       return -1;
              //     }
              //     if (textA > textB) {
              //       return 1;
              //     }
              //     // names are equal
              //     return 0;
              //   })
              // }

              // sortItems(treeviewItems)





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
