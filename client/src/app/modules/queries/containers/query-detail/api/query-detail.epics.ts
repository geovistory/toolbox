import { Injectable } from '@angular/core';
import { LoadingBarActions, ProQuery } from 'app/core';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { QueryDetailComponent } from '../query-detail.component';
import { QueryDetailAPIActions, QueryDetailAPIAction } from './query-detail.actions';
import { ofSubstore } from 'app/core/store/module';
import { ProQueryApi } from 'app/core/sdk';
import { saveAs } from 'file-saver';

@Injectable()
export class QueryDetailAPIEpics {
  constructor(
    private queryApi: ProQueryApi, // <- change the api
    private actions: QueryDetailAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: QueryDetailComponent): Epic {
    return combineEpics(
      this.createLoadQueryDetailEpic(c),
      this.createRunQueryDetailEpic(c),
      this.createRunInitQueryDetailEpic(c),
      this.createSaveQueryDetailEpic(c),
      this.createReloadEpic(c),
      this.createDeleteQueryDetailEpic(c),
      this.createDownloadDetailEpic(c),

    );
  }

  private createLoadQueryDetailEpic(c: QueryDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(QueryDetailAPIActions.LOAD),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: QueryDetailAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.queryApi.findByIdAndProject(action.meta.pkProject, action.meta.pkEntity)
            /**
             * Subscribe to the api call
             */
            .subscribe((query: ProQuery) => {
              /**
               * Emit the global action that completes the loading bar
               */
              globalStore.next(this.loadingBarActions.completeLoading());
              /**
               * Emit the local action on loading succeeded
               */
              c.localStore.dispatch(this.actions.loadSucceeded(query));
              c.t.setTabTitle(query.name)

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

  private createRunInitQueryDetailEpic(c: QueryDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(QueryDetailAPIActions.RUN_INIT),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: QueryDetailAPIAction) => new Observable<Action>((globalStore) => {
          c.localStore.dispatch(this.actions.run(action.meta.pkProject, action.meta.query));
        })),
        takeUntil(c.destroy$)
      )
    }
  }

  private createRunQueryDetailEpic(c: QueryDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(QueryDetailAPIActions.RUN),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: QueryDetailAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.queryApi.run(action.meta.pkProject, action.meta.query)
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
              c.localStore.dispatch(this.actions.runSucceeded(data, action.meta.query.offset, action.meta.query.limit));

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
              c.localStore.dispatch(this.actions.runFailed({ status: '' + error.status }, action.meta.query.offset, action.meta.query.limit))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }


  private createSaveQueryDetailEpic(c: QueryDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(QueryDetailAPIActions.SAVE),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: QueryDetailAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Create the query (fk_project is within the object)
           */
          const apiCall = action.meta.pkEntity ?
            this.queryApi.patchAttributes(action.meta.pkEntity, action.meta.comQuery) :
            this.queryApi.create(action.meta.comQuery);

          /**
           * Subscribe to the api call
           */
          apiCall.subscribe((comQuery: ProQuery) => {
            /**
             * Emit the global action that completes the loading bar
             */
            globalStore.next(this.loadingBarActions.completeLoading());
            /**
             * Emit the local action on loading succeeded
             */
            c.localStore.dispatch(this.actions.saveSucceeded(comQuery));

          }, error => {

            if (error && error.code === '23505') {
              error = {
                title: 'Name already exists',
                message: 'Please choose another name.'
              }
            }
            /**
            * Emit the global action that shows some loading error message
            */
            globalStore.next(this.loadingBarActions.completeLoading());
            globalStore.next(this.notificationActions.addToast({
              type: 'error',
              options: {
                title: error.title,
                msg: error.message,
              }
            }));
            /**
             * Emit the local action on loading failed
             */
            c.localStore.dispatch(this.actions.saveFailed(error))
          })
        })),
        takeUntil(c.destroy$)
      )
    }
  }

  private createReloadEpic(c: QueryDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        ofType(QueryDetailAPIActions.SAVE_SUCCEEDED),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: QueryDetailAPIAction) => new Observable<Action>((globalStore) => {

          c.localStore.dispatch(this.actions.loadSucceeded(action.meta.comQuery));
        })),
        takeUntil(c.destroy$)
      )
    }
  }

  private createDeleteQueryDetailEpic(c: QueryDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(QueryDetailAPIActions.DELETE),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: QueryDetailAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.queryApi.deleteById(action.meta.pkEntity)
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
              c.localStore.dispatch(this.actions.deleteSucceeded());
              c.t.setTabTitle('(Deleted)')

            }, error => {
              /**
              * Emit the global action that shows some loading error message
              */
              globalStore.next(this.loadingBarActions.completeLoading());
              globalStore.next(this.notificationActions.addToast({
                type: 'error',
                options: {
                  title: 'Query could not be deleted'
                }
              }));
              /**
               * Emit the local action on loading failed
               */
              c.localStore.dispatch(this.actions.deleteFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }

  private createDownloadDetailEpic(c: QueryDetailComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        ofType(QueryDetailAPIActions.DOWNLOAD),
        filter(action => ofSubstore(c.basePath)(action)),
        switchMap((action: QueryDetailAPIAction) => new Observable<Action>((globalStore) => {
          /**
           * Emit the global action that activates the loading bar
           */
          globalStore.next(this.loadingBarActions.startLoading());
          /**
           * Do some api call
           */
          this.queryApi.runAndExport(action.meta.pkProject, action.meta.query, action.meta.filetype)
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
              c.localStore.dispatch(this.actions.downloadSucceeded());

              if (action.meta.filetype === 'json') {

                const blob = new Blob([data], { type: 'text/json' });
                saveAs(blob, 'query-results.json')

              } else if (action.meta.filetype === 'csv') {
                const blob = new Blob([data], { type: 'text/comma-separated-values' });
                saveAs(blob, 'query-results.csv')
              }

              // else if (action.meta.filetype === 'xls') {

              //   const s2ab = (s) => {
              //     var buf = new ArrayBuffer(s.length);
              //     var view = new Uint8Array(buf);
              //     for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
              //     return buf;
              //   }

              //   const blob = new Blob([s2ab(atob(data))], { type: 'application/msexcel' });
              //   saveAs(blob, 'query-results.xls')

              // }
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
              c.localStore.dispatch(this.actions.downloadFailed({ status: '' + error.status }))
            })
        })),
        takeUntil(c.destroy$)
      )
    }
  }

}
