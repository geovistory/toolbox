import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';
import { FluxStandardAction } from 'flux-standard-action';
import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { LoadActionMeta, ModifyActionMeta, StandardActionsFactory } from './actions';

export class StandardEpicsFactory<Payload, Model> {
  constructor(
    public actionPrefix: string,
    public modelName: string,
    public actions: StandardActionsFactory<Payload, Model>,
    public notifications: NotificationsAPIActions) { }


  createLoadEpic<T>(apiFn: (meta: T) => Observable<Model[]>, actionSuffix: string, onSuccessHook?: (data: Model[], pk?) => void) {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::LOAD' + (actionSuffix ? '::' + actionSuffix : '')),
        mergeMap((action: FluxStandardAction<Payload, LoadActionMeta>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;
          const meta = action.meta as any as T;
          apiFn(meta).subscribe((data: Model[]) => {
            if (onSuccessHook) {
              onSuccessHook(data, action.meta.pk);
              this.actions.loadSucceeded([], pendingKey, action.meta.pk);
            }
            else {
              this.actions.loadSucceeded(data, pendingKey, action.meta.pk);
            }
          }, error => {
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
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
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
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
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
          });
        })));
    };
  }
}
