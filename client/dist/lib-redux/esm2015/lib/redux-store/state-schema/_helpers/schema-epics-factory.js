/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/schema-epics-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
/**
 * @template Payload, Model
 */
export class SchemaEpicsFactory {
    /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @param {?} actions
     * @param {?} notifications
     */
    constructor(actionPrefix, modelName, actions, notifications) {
        this.actionPrefix = actionPrefix;
        this.modelName = modelName;
        this.actions = actions;
        this.notifications = notifications;
    }
    /**
     * @template T
     * @param {?} apiFn
     * @param {?} actionSuffix
     * @param {?=} onSuccessHook
     * @return {?}
     */
    createLoadEpic(apiFn, actionSuffix, onSuccessHook) {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(this.type('LOAD', actionSuffix)), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            (globalActions) => {
                /** @type {?} */
                const pendingKey = action.meta.addPending;
                /** @type {?} */
                const meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk, meta);
                        this.actions.succeeded(data, pendingKey, action.meta.pk);
                    }
                    else {
                        this.actions.loadSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    this.onError(globalActions, error, pendingKey, action.meta.pk);
                }));
            })))));
        });
    }
    /**
     * @template T
     * @param {?} apiFn
     * @param {?=} onSuccessHook
     * @return {?}
     */
    createUpsertEpic(apiFn, onSuccessHook) {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT'), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            (globalActions) => {
                /** @type {?} */
                const pendingKey = action.meta.addPending;
                /** @type {?} */
                const meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk);
                        this.actions.succeeded(data, pendingKey, action.meta.pk);
                    }
                    else {
                        this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    this.onError(globalActions, error, pendingKey, action.meta.pk);
                }));
            })))));
        });
    }
    /**
     * @param {?} apiFn
     * @return {?}
     */
    createDeleteEpic(apiFn) {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::DELETE'), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            (action) => new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            (globalActions) => {
                /** @type {?} */
                const pendingKey = action.meta.addPending;
                apiFn(action.meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => {
                    this.actions.deleteSucceeded(action.meta.items, pendingKey, action.meta.pk);
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    this.onError(globalActions, error, pendingKey, action.meta.pk);
                }));
            })))));
        });
    }
    /**
     * Create the string used as action.type
     * @param {?} operation
     * @param {?} actionSuffix
     * @return {?}
     */
    type(operation, actionSuffix) {
        return this.actionPrefix + '.' + this.modelName + '::' + operation + (actionSuffix ? '::' + actionSuffix : '');
    }
    /**
     * Create the onError logic for standard actions
     * @param {?} globalActions pass in the subscriber to the action$ stream
     * @param {?} error
     * @param {?} pendingKey
     * @param {?} pkProject
     * @return {?}
     */
    onError(globalActions, error, pendingKey, pkProject) {
        globalActions.next(this.notifications.addToast({
            type: 'error',
            options: { title: error.message }
        }));
        this.actions.failed({ status: '' + error.status }, pendingKey, pkProject);
    }
}
if (false) {
    /** @type {?} */
    SchemaEpicsFactory.prototype.actionPrefix;
    /** @type {?} */
    SchemaEpicsFactory.prototype.modelName;
    /** @type {?} */
    SchemaEpicsFactory.prototype.actions;
    /** @type {?} */
    SchemaEpicsFactory.prototype.notifications;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWVwaWNzLWZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9faGVscGVycy9zY2hlbWEtZXBpY3MtZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUkxQyxNQUFNLE9BQU8sa0JBQWtCOzs7Ozs7O0lBQzdCLFlBQ1MsWUFBb0IsRUFDcEIsU0FBaUIsRUFDakIsT0FBNkMsRUFDN0MsYUFBc0M7UUFIdEMsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFzQztRQUM3QyxrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7SUFBSSxDQUFDOzs7Ozs7OztJQUdwRCxjQUFjLENBQUksS0FBdUMsRUFBRSxZQUFvQixFQUFFLGFBQTZEO1FBQzVJOzs7OztRQUFPLENBQUMsT0FBc0QsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN2RSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUN2QyxRQUFROzs7O1lBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksVUFBVTs7OztZQUFTLENBQUMsYUFBYSxFQUFFLEVBQUU7O3NCQUN0RCxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVOztzQkFDbkMsSUFBSSxHQUFHLG1CQUFBLG1CQUFBLE1BQU0sQ0FBQyxJQUFJLEVBQU8sRUFBSztnQkFDcEMsS0FBSyxDQUFD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O0lBakZHLDBDQUEyQjs7SUFDM0IsdUNBQXdCOztJQUN4QixxQ0FBb0Q7O0lBQ3BELDJDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpYmVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMnO1xuaW1wb3J0IHsgRmx1eEFjdGlvbk9ic2VydmFibGUsIExvYWRBY3Rpb25NZXRhLCBNb2RpZnlBY3Rpb25NZXRhLCBTY2hlbWFBY3Rpb25zRmFjdG9yeSB9IGZyb20gJy4vc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBTY2hlbWFFcGljc0ZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGFjdGlvblByZWZpeDogc3RyaW5nLFxuICAgIHB1YmxpYyBtb2RlbE5hbWU6IHN0cmluZyxcbiAgICBwdWJsaWMgYWN0aW9uczogU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+LFxuICAgIHB1YmxpYyBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucykgeyB9XG5cblxuICBjcmVhdGVMb2FkRXBpYzxUPihhcGlGbjogKG1ldGE6IFQpID0+IE9ic2VydmFibGU8TW9kZWxbXT4sIGFjdGlvblN1ZmZpeDogc3RyaW5nLCBvblN1Y2Nlc3NIb29rPzogKGRhdGE6IE1vZGVsW10sIHBrPywgaW5pdGlhbE1ldGE/OiBUKSA9PiB2b2lkKSB7XG4gICAgcmV0dXJuIChhY3Rpb24kOiBGbHV4QWN0aW9uT2JzZXJ2YWJsZTxQYXlsb2FkLCBMb2FkQWN0aW9uTWV0YT4sIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUodGhpcy50eXBlKCdMT0FEJywgYWN0aW9uU3VmZml4KSksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb24pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbEFjdGlvbnMpID0+IHtcbiAgICAgICAgICBjb25zdCBwZW5kaW5nS2V5ID0gYWN0aW9uLm1ldGEuYWRkUGVuZGluZztcbiAgICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGEgYXMgYW55IGFzIFQ7XG4gICAgICAgICAgYXBpRm4obWV0YSkuc3Vic2NyaWJlKChkYXRhOiBNb2RlbFtdKSA9PiB7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzSG9vaykge1xuICAgICAgICAgICAgICBvblN1Y2Nlc3NIb29rKGRhdGEsIGFjdGlvbi5tZXRhLnBrLCBtZXRhKTtcbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnN1Y2NlZWRlZChkYXRhLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmxvYWRTdWNjZWVkZWQoZGF0YSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihnbG9iYWxBY3Rpb25zLCBlcnJvciwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKSk7XG4gICAgfTtcbiAgfVxuICBjcmVhdGVVcHNlcnRFcGljPFQ+KGFwaUZuOiAobWV0YTogVCkgPT4gT2JzZXJ2YWJsZTxNb2RlbFtdPiwgb25TdWNjZXNzSG9vaz86IChkYXRhOiBNb2RlbFtdLCBwaz8pID0+IHZvaWQpIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUodGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OlVQU0VSVCcpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTW9kaWZ5QWN0aW9uTWV0YTxNb2RlbD4+KSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxBY3Rpb25zKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGVuZGluZ0tleSA9IGFjdGlvbi5tZXRhLmFkZFBlbmRpbmc7XG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhIGFzIGFueSBhcyBUO1xuICAgICAgICAgIGFwaUZuKG1ldGEpLnN1YnNjcmliZSgoZGF0YTogTW9kZWxbXSkgPT4ge1xuICAgICAgICAgICAgaWYgKG9uU3VjY2Vzc0hvb2spIHtcbiAgICAgICAgICAgICAgb25TdWNjZXNzSG9vayhkYXRhLCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5zdWNjZWVkZWQoZGF0YSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy51cHNlcnRTdWNjZWVkZWQoZGF0YSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihnbG9iYWxBY3Rpb25zLCBlcnJvciwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKSk7XG4gICAgfTtcbiAgfVxuICBjcmVhdGVEZWxldGVFcGljKGFwaUZuOiAobWV0YTogTW9kaWZ5QWN0aW9uTWV0YTxNb2RlbD4pID0+IE9ic2VydmFibGU8TW9kZWxbXT4pIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUodGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkRFTEVURScpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTW9kaWZ5QWN0aW9uTWV0YTxNb2RlbD4+KSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxBY3Rpb25zKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGVuZGluZ0tleSA9IGFjdGlvbi5tZXRhLmFkZFBlbmRpbmc7XG4gICAgICAgICAgYXBpRm4oYWN0aW9uLm1ldGEpLnN1YnNjcmliZSgoZGF0YTogTW9kZWxbXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmRlbGV0ZVN1Y2NlZWRlZChhY3Rpb24ubWV0YS5pdGVtcywgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihnbG9iYWxBY3Rpb25zLCBlcnJvciwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIHN0cmluZyB1c2VkIGFzIGFjdGlvbi50eXBlXG4gICAqL1xuICB0eXBlKG9wZXJhdGlvbjogJ0xPQUQnIHwgJ1VQU0VSVCcgfCAnwqBERUxFVEUnLCBhY3Rpb25TdWZmaXg6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjonICsgb3BlcmF0aW9uICsgKGFjdGlvblN1ZmZpeCA/ICc6OicgKyBhY3Rpb25TdWZmaXggOiAnJylcbiAgfVxuXG4gIC8qKlxuICAqIENyZWF0ZSB0aGUgb25FcnJvciBsb2dpYyBmb3Igc3RhbmRhcmQgYWN0aW9uc1xuICAqIEBwYXJhbSBnbG9iYWxBY3Rpb25zIHBhc3MgaW4gdGhlIHN1YnNjcmliZXIgdG8gdGhlIGFjdGlvbiQgc3RyZWFtXG4gICovXG4gIG9uRXJyb3IoZ2xvYmFsQWN0aW9uczogU3Vic2NyaWJlcjxBY3Rpb24+LCBlcnJvciwgcGVuZGluZ0tleSwgcGtQcm9qZWN0KSB7XG4gICAgZ2xvYmFsQWN0aW9ucy5uZXh0KHRoaXMubm90aWZpY2F0aW9ucy5hZGRUb2FzdCh7XG4gICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IubWVzc2FnZSB9XG4gICAgfSkpO1xuICAgIHRoaXMuYWN0aW9ucy5mYWlsZWQoeyBzdGF0dXM6ICcnICsgZXJyb3Iuc3RhdHVzIH0sIHBlbmRpbmdLZXksIHBrUHJvamVjdCk7XG4gIH1cbn1cbiJdfQ==