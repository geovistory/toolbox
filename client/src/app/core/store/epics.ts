import { Injectable } from '@angular/core';
import { combineEpics, Epic, StateObservable, ActionsObservable, ofType } from 'redux-observable';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Action } from 'redux';
import { ActiveProjectEpics } from '../active-project/active-project.epics';
import { LoadingBarEpics } from '../loading-bar/api/loading-bar.epics';
import { mergeMap, flatMap, map } from 'rxjs/operators';
import { IAppState } from './model';
import { AccountEpics } from 'app/modules/account/api/account.epics';
import { SystemEpics } from '../system/system.epics';
import { DfhEpics } from '../dfh/dfh.epics';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { FluxStandardAction } from 'flux-standard-action';
import { StandardActionsFactory } from './actions';
import { flatten } from 'ramda';

export function bulkCreateOrReplace<T>(api: (item: T) => Observable<T>): (items: T[]) => Observable<T[]> {
  return (items: T[]) => combineLatest<T>(items.map(item => api(item)))
    .pipe(
      map((items) => flatten(items))
    )
}

export class StandardEpicsFactory<Payload, Model> {

  loadEpic;

  constructor(
    private actionPrefix: string,
    private modelName: string,
    private standardActions: StandardActionsFactory<Payload, Model>,
    private notifications: NotificationsAPIActions
  ) {
  }

  createLoadEpic(apiCall: Observable<Model[]>, actionSuffix: string) {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::LOAD' + (actionSuffix ? '::' + actionSuffix : '')),
        mergeMap((action: FluxStandardAction<Payload, { addPending: string }>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;
          apiCall.subscribe((data: Model[]) => {
            this.standardActions.loadSucceeded(data, pendingKey)
          }, error => {
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.standardActions.failed({ status: '' + error.status }, pendingKey)
          })
        }))
      )
    }
  }

  createUpsertEpic(apiFn: (items: Model[]) => Observable<Model[]>)  {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT'),
        mergeMap((action: FluxStandardAction<Payload, { items: Model[], addPending: string }>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;

          apiFn(action.meta.items).subscribe((data: Model[]) => {
            this.standardActions.upsertSucceeded(data, pendingKey)
          }, error => {
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.standardActions.failed({ status: '' + error.status }, pendingKey)
          })
        }))
      )
    }
  }

  createDeleteEpic(apiFn: (items: Model[]) => Observable<Model[]>) {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::DELETE'),
        mergeMap((action: FluxStandardAction<Payload, { items: Model[], addPending: string }>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;

          apiFn(action.meta.items).subscribe((data: Model[]) => {
            this.standardActions.deleteSucceeded(action.meta.items, pendingKey)
          }, error => {
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.standardActions.failed({ status: '' + error.status }, pendingKey)
          })
        }))
      )
    }
  }

}



@Injectable()
export class RootEpics {

  private rootEpicStream$;
  private rootEpic;

  constructor(
    private loadingBarEpics: LoadingBarEpics,
    private activeProjectEpics: ActiveProjectEpics,
    private systemEpics: SystemEpics,
    private dfhEpics: DfhEpics,
    private accountEpics: AccountEpics
  ) {

    this.rootEpicStream$ = new BehaviorSubject(combineEpics(
      this.loadingBarEpics.createEpics(),
      this.systemEpics.createEpics(),
      this.activeProjectEpics.createEpics(),
      this.accountEpics.createEpics(),
      this.dfhEpics.createEpics()
    ));

    this.rootEpic = (
      action$: ActionsObservable<Action>,
      state$: StateObservable<IAppState>,
      dependencies = undefined
    ): Observable<Action> => {
      return this.rootEpicStream$.pipe(
        mergeMap((epic: Epic) => epic(action$, state$, dependencies))
      );
    }
  }

  public getRootEpic(): Epic<Action<any>, Action<any>, void, any> {
    return this.rootEpic;
  }

  /**
   * Adds an epic to the RootEpic middleware
   * @param epic that will be added to the RootEpics
   */
  public addEpic(epic: Epic<Action<any>, Action<any>, void, any>) {
    this.rootEpicStream$.next(epic);
  }
}
