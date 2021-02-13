import { ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
export class SchemaEpicsFactory {
    constructor(actionPrefix, modelName, actions, notifications) {
        this.actionPrefix = actionPrefix;
        this.modelName = modelName;
        this.actions = actions;
        this.notifications = notifications;
    }
    createLoadEpic(apiFn, actionSuffix, onSuccessHook) {
        return (action$, store) => {
            return action$.pipe(ofType(this.type('LOAD', actionSuffix)), mergeMap((action) => new Observable((globalActions) => {
                const pendingKey = action.meta.addPending;
                const meta = action.meta;
                apiFn(meta).subscribe((data) => {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk, meta);
                        this.actions.succeeded(data, pendingKey, action.meta.pk);
                    }
                    else {
                        this.actions.loadSucceeded(data, pendingKey, action.meta.pk);
                    }
                }, error => {
                    this.onError(globalActions, error, pendingKey, action.meta.pk);
                });
            })));
        };
    }
    createUpsertEpic(apiFn, onSuccessHook) {
        return (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT'), mergeMap((action) => new Observable((globalActions) => {
                const pendingKey = action.meta.addPending;
                const meta = action.meta;
                apiFn(meta).subscribe((data) => {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk);
                        this.actions.succeeded(data, pendingKey, action.meta.pk);
                    }
                    else {
                        this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
                    }
                }, error => {
                    this.onError(globalActions, error, pendingKey, action.meta.pk);
                });
            })));
        };
    }
    createDeleteEpic(apiFn) {
        return (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::DELETE'), mergeMap((action) => new Observable((globalActions) => {
                const pendingKey = action.meta.addPending;
                apiFn(action.meta).subscribe((data) => {
                    this.actions.deleteSucceeded(action.meta.items, pendingKey, action.meta.pk);
                }, error => {
                    this.onError(globalActions, error, pendingKey, action.meta.pk);
                });
            })));
        };
    }
    /**
     * Create the string used as action.type
     */
    type(operation, actionSuffix) {
        return this.actionPrefix + '.' + this.modelName + '::' + operation + (actionSuffix ? '::' + actionSuffix : '');
    }
    /**
    * Create the onError logic for standard actions
    * @param globalActions pass in the subscriber to the action$ stream
    */
    onError(globalActions, error, pendingKey, pkProject) {
        globalActions.next(this.notifications.addToast({
            type: 'error',
            options: { title: error.message }
        }));
        this.actions.failed({ status: '' + error.status }, pendingKey, pkProject);
    }
}
//# sourceMappingURL=schema-epics-factory.js.map