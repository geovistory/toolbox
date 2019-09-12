import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { FluxStandardAction } from 'flux-standard-action';
import { Action } from 'redux';
import { ofType, ActionsObservable } from 'redux-observable-es6-compat';
import { Observable, Subscriber } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { LoadActionMeta, ModifyActionMeta, StandardActionsFactory, FluxActionObservable } from './actions';

export class StandardEpicsFactory<Payload, Model> {
  constructor(
    public actionPrefix: string,
    public modelName: string,
    public actions: StandardActionsFactory<Payload, Model>,
    public notifications: NotificationsAPIActions) { }


  createLoadEpic<T>(apiFn: (meta: T) => Observable<Model[]>, actionSuffix: string, onSuccessHook?: (data: Model[], pk?, initialMeta?: T) => void) {
    return (action$: FluxActionObservable<Payload, LoadActionMeta>, store) => {
      return action$.pipe(
        ofType(this.type('LOAD', actionSuffix)),
        mergeMap((action) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;
          const meta = action.meta as any as T;
          apiFn(meta).subscribe((data: Model[]) => {
            if (onSuccessHook) {
              onSuccessHook(data, action.meta.pk, meta);
              this.actions.loadSucceeded([], pendingKey, action.meta.pk);
            }
            else {
              this.actions.loadSucceeded(data, pendingKey, action.meta.pk);
            }
          }, error => {
            this.onError(globalActions, error, pendingKey, action.meta.pk)
          });
        })));
    };
  }
  createUpsertEpic<T>(apiFn: (meta: T) => Observable<Model[]>, onSuccessHook?: (data: Model[], pk?) => void) {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT'),
        mergeMap((action: FluxStandardAction<Payload, ModifyActionMeta<Model>>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;
          const meta = action.meta as any as T;
          apiFn(meta).subscribe((data: Model[]) => {
            if (onSuccessHook) {
              onSuccessHook(data, action.meta.pk);
              this.actions.upsertSucceeded([], pendingKey, action.meta.pk);
            }
            else {
              this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
            }
          }, error => {
            this.onError(globalActions, error, pendingKey, action.meta.pk)
          });
        })));
    };
  }
  createDeleteEpic(apiFn: (meta: ModifyActionMeta<Model>) => Observable<Model[]>) {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::DELETE'),
        mergeMap((action: FluxStandardAction<Payload, ModifyActionMeta<Model>>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;
          apiFn(action.meta).subscribe((data: Model[]) => {
            this.actions.deleteSucceeded(action.meta.items, pendingKey, action.meta.pk);
          }, error => {
            this.onError(globalActions, error, pendingKey, action.meta.pk)
          });
        })));
    };
  }

  /**
   * Create the string used as action.type
   */
  type(operation: 'LOAD' | 'UPSERT' | ' DELETE', actionSuffix: string): string {
    return this.actionPrefix + '.' + this.modelName + '::' + operation + (actionSuffix ? '::' + actionSuffix : '')
  }

  /**
  * Create the onError logic for standard actions
  * @param globalActions pass in the subscriber to the action$ stream
  */
  onError(globalActions: Subscriber<Action>, error, pendingKey, pkProject) {
    globalActions.next(this.notifications.addToast({
      type: 'error',
      options: { title: error.message }
    }));
    this.actions.failed({ status: '' + error.status }, pendingKey, pkProject);
  }
}
