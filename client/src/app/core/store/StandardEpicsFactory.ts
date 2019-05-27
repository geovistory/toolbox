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
    public infActions: StandardActionsFactory<Payload, Model>,
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
              this.infActions.loadSucceeded([], pendingKey, action.meta.pk);
            }
            else {
              this.infActions.loadSucceeded(data, pendingKey, action.meta.pk);
            }
          }, error => {
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.infActions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
          });
        })));
    };
  }
  createUpsertEpic<T>(apiFn: (meta: T) => Observable<Model[]>) {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT'),
        mergeMap((action: FluxStandardAction<Payload, ModifyActionMeta<Model>>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;
          const meta = action.meta as any as T;
          apiFn(meta).subscribe((data: Model[]) => {
            this.infActions.upsertSucceeded(data, pendingKey, action.meta.pk);
          }, error => {
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.infActions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
          });
        })));
    };
  }
  createDeleteEpic(apiFn: (items: Model[]) => Observable<Model[]>) {
    return (action$, store) => {
      return action$.pipe(
        ofType(this.actionPrefix + '.' + this.modelName + '::DELETE'),
        mergeMap((action: FluxStandardAction<Payload, ModifyActionMeta<Model>>) => new Observable<Action>((globalActions) => {
          const pendingKey = action.meta.addPending;
          apiFn(action.meta.items).subscribe((data: Model[]) => {
            this.infActions.deleteSucceeded(action.meta.items, pendingKey, action.meta.pk);
          }, error => {
            globalActions.next(this.notifications.addToast({
              type: 'error',
              options: { title: error.message }
            }));
            this.infActions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
          });
        })));
    };
  }
}
