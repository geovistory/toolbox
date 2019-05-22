import { Injectable } from '@angular/core';
import { LoopBackConfig } from 'app/core';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { AccountEpics } from 'app/modules/account/api/account.epics';
import { environment } from 'environments/environment';
import { FluxStandardAction } from 'flux-standard-action';
import { Action } from 'redux';
import { ActionsObservable, combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ActiveProjectEpics } from '../active-project/active-project.epics';
import { DfhEpics } from '../dfh/dfh.epics';
import { InfEpics } from '../inf/inf.epics';
import { LoadingBarEpics } from '../loading-bar/api/loading-bar.epics';
import { SysEpics } from '../sys/sys.epics';
import { LoadActionMeta, ModifyActionMeta, StandardActionsFactory } from './actions';
import { IAppState } from './model';

export class StandardEpicsFactory<Payload, Model> {

  loadEpic;

  constructor(
    private actionPrefix: string,
    private modelName: string,
    private standardActions: StandardActionsFactory<Payload, Model>,
    private notifications: NotificationsAPIActions
  ) { }

  createLoadEpic<T>(apiFn: (meta: T) => Observable<Model[]>, actionSuffix: string) {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::LOAD' + (actionSuffix ? '::' + actionSuffix : '')),
        mergeMap((action: FluxStandardAction<Payload, LoadActionMeta>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;
          const meta = action.meta as any as T;
          apiFn(meta).subscribe((data: Model[]) => {
            this.standardActions.loadSucceeded(data, pendingKey, action.meta.pk)
          }, error => {
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.standardActions.failed({ status: '' + error.status }, pendingKey, action.meta.pk)
          })
        }))
      )
    }
  }

  createUpsertEpic(apiFn: (items: Model[]) => Observable<Model[]>) {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT'),
        mergeMap((action: FluxStandardAction<Payload, ModifyActionMeta<Model>>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;

          apiFn(action.meta.items).subscribe((data: Model[]) => {
            this.standardActions.upsertSucceeded(data, pendingKey, action.meta.pk)
          }, error => {
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.standardActions.failed({ status: '' + error.status }, pendingKey, action.meta.pk)
          })
        }))

      )
    }
  }

  createDeleteEpic(apiFn: (items: Model[]) => Observable<Model[]>) {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::DELETE'),
        mergeMap((action: FluxStandardAction<Payload, ModifyActionMeta<Model>>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;

          apiFn(action.meta.items).subscribe((data: Model[]) => {
            this.standardActions.deleteSucceeded(action.meta.items, pendingKey, action.meta.pk)
          }, error => {
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.standardActions.failed({ status: '' + error.status }, pendingKey, action.meta.pk)
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
    private systemEpics: SysEpics,
    private dfhEpics: DfhEpics,
    private accountEpics: AccountEpics,
    private infEpics: InfEpics
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);


    this.rootEpicStream$ = new BehaviorSubject(combineEpics(
      this.loadingBarEpics.createEpics(),
      this.systemEpics.createEpics(),
      this.activeProjectEpics.createEpics(),
      this.accountEpics.createEpics(),
      this.dfhEpics.createEpics(),
      this.infEpics.createEpics()
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
