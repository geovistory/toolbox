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
var /**
 * @template Payload, Model
 */
SchemaEpicsFactory = /** @class */ (function () {
    function SchemaEpicsFactory(actionPrefix, modelName, actions, notifications) {
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
    SchemaEpicsFactory.prototype.createLoadEpic = /**
     * @template T
     * @param {?} apiFn
     * @param {?} actionSuffix
     * @param {?=} onSuccessHook
     * @return {?}
     */
    function (apiFn, actionSuffix, onSuccessHook) {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(_this.type('LOAD', actionSuffix)), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            function (globalActions) {
                /** @type {?} */
                var pendingKey = action.meta.addPending;
                /** @type {?} */
                var meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk, meta);
                        _this.actions.succeeded(data, pendingKey, action.meta.pk);
                    }
                    else {
                        _this.actions.loadSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    _this.onError(globalActions, error, pendingKey, action.meta.pk);
                }));
            })); })));
        });
    };
    /**
     * @template T
     * @param {?} apiFn
     * @param {?=} onSuccessHook
     * @return {?}
     */
    SchemaEpicsFactory.prototype.createUpsertEpic = /**
     * @template T
     * @param {?} apiFn
     * @param {?=} onSuccessHook
     * @return {?}
     */
    function (apiFn, onSuccessHook) {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(_this.actionPrefix + '.' + _this.modelName + '::UPSERT'), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            function (globalActions) {
                /** @type {?} */
                var pendingKey = action.meta.addPending;
                /** @type {?} */
                var meta = (/** @type {?} */ ((/** @type {?} */ (action.meta))));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk);
                        _this.actions.succeeded(data, pendingKey, action.meta.pk);
                    }
                    else {
                        _this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    _this.onError(globalActions, error, pendingKey, action.meta.pk);
                }));
            })); })));
        });
    };
    /**
     * @param {?} apiFn
     * @return {?}
     */
    SchemaEpicsFactory.prototype.createDeleteEpic = /**
     * @param {?} apiFn
     * @return {?}
     */
    function (apiFn) {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(_this.actionPrefix + '.' + _this.modelName + '::DELETE'), mergeMap((/**
             * @param {?} action
             * @return {?}
             */
            function (action) { return new Observable((/**
             * @param {?} globalActions
             * @return {?}
             */
            function (globalActions) {
                /** @type {?} */
                var pendingKey = action.meta.addPending;
                apiFn(action.meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    _this.actions.deleteSucceeded(action.meta.items, pendingKey, action.meta.pk);
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    _this.onError(globalActions, error, pendingKey, action.meta.pk);
                }));
            })); })));
        });
    };
    /**
     * Create the string used as action.type
     */
    /**
     * Create the string used as action.type
     * @param {?} operation
     * @param {?} actionSuffix
     * @return {?}
     */
    SchemaEpicsFactory.prototype.type = /**
     * Create the string used as action.type
     * @param {?} operation
     * @param {?} actionSuffix
     * @return {?}
     */
    function (operation, actionSuffix) {
        return this.actionPrefix + '.' + this.modelName + '::' + operation + (actionSuffix ? '::' + actionSuffix : '');
    };
    /**
    * Create the onError logic for standard actions
    * @param globalActions pass in the subscriber to the action$ stream
    */
    /**
     * Create the onError logic for standard actions
     * @param {?} globalActions pass in the subscriber to the action$ stream
     * @param {?} error
     * @param {?} pendingKey
     * @param {?} pkProject
     * @return {?}
     */
    SchemaEpicsFactory.prototype.onError = /**
     * Create the onError logic for standard actions
     * @param {?} globalActions pass in the subscriber to the action$ stream
     * @param {?} error
     * @param {?} pendingKey
     * @param {?} pkProject
     * @return {?}
     */
    function (globalActions, error, pendingKey, pkProject) {
        globalActions.next(this.notifications.addToast({
            type: 'error',
            options: { title: error.message }
        }));
        this.actions.failed({ status: '' + error.status }, pendingKey, pkProject);
    };
    return SchemaEpicsFactory;
}());
/**
 * @template Payload, Model
 */
export { SchemaEpicsFactory };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWVwaWNzLWZhY3RvcnkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9faGVscGVycy9zY2hlbWEtZXBpY3MtZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUkxQzs7OztJQUNFLDRCQUNTLFlBQW9CLEVBQ3BCLFNBQWlCLEVBQ2pCLE9BQTZDLEVBQzdDLGFBQXNDO1FBSHRDLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBc0M7UUFDN0Msa0JBQWEsR0FBYixhQUFhLENBQXlCO0lBQUksQ0FBQzs7Ozs7Ozs7SUFHcEQsMkNBQWM7Ozs7Ozs7SUFBZCxVQUFrQixLQUF1QyxFQUFFLFlBQW9CLEVBQUUsYUFBNkQ7UUFBOUksaUJBb0JDO1FBbkJDOzs7OztRQUFPLFVBQUMsT0FBc0QsRUFBRSxLQUFLO1lBQ25FLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FDakIsTUFBTSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDLEVBQ3ZDLFFBQVE7Ozs7WUFBQyxVQUFDLE1BQU0sSUFBSyxPQUFBLElBQUksVUFBVTs7OztZQUFTLFVBQUMsYUFBYTs7b0JBQ2xELFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVU7O29CQUNuQyxJQUFJLEdBQUcsbUJBQUEsbUJBQUEsTUFBTSxDQUFDLElBQUksRUFBTyxFQUFLO2dCQUNwQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsU0FB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QzVFLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFuRkQsSUFtRkM7Ozs7Ozs7SUFqRkcsMENBQTJCOztJQUMzQix1Q0FBd0I7O0lBQ3hCLHFDQUFvRDs7SUFDcEQsMkNBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmliZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucyc7XG5pbXBvcnQgeyBGbHV4QWN0aW9uT2JzZXJ2YWJsZSwgTG9hZEFjdGlvbk1ldGEsIE1vZGlmeUFjdGlvbk1ldGEsIFNjaGVtYUFjdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuZXhwb3J0IGNsYXNzIFNjaGVtYUVwaWNzRmFjdG9yeTxQYXlsb2FkLCBNb2RlbD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgYWN0aW9uUHJlZml4OiBzdHJpbmcsXG4gICAgcHVibGljIG1vZGVsTmFtZTogc3RyaW5nLFxuICAgIHB1YmxpYyBhY3Rpb25zOiBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBNb2RlbD4sXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zKSB7IH1cblxuXG4gIGNyZWF0ZUxvYWRFcGljPFQ+KGFwaUZuOiAobWV0YTogVCkgPT4gT2JzZXJ2YWJsZTxNb2RlbFtdPiwgYWN0aW9uU3VmZml4OiBzdHJpbmcsIG9uU3VjY2Vzc0hvb2s/OiAoZGF0YTogTW9kZWxbXSwgcGs/LCBpbml0aWFsTWV0YT86IFQpID0+IHZvaWQpIHtcbiAgICByZXR1cm4gKGFjdGlvbiQ6IEZsdXhBY3Rpb25PYnNlcnZhYmxlPFBheWxvYWQsIExvYWRBY3Rpb25NZXRhPiwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZSh0aGlzLnR5cGUoJ0xPQUQnLCBhY3Rpb25TdWZmaXgpKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsQWN0aW9ucykgPT4ge1xuICAgICAgICAgIGNvbnN0IHBlbmRpbmdLZXkgPSBhY3Rpb24ubWV0YS5hZGRQZW5kaW5nO1xuICAgICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YSBhcyBhbnkgYXMgVDtcbiAgICAgICAgICBhcGlGbihtZXRhKS5zdWJzY3JpYmUoKGRhdGE6IE1vZGVsW10pID0+IHtcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3NIb29rKSB7XG4gICAgICAgICAgICAgIG9uU3VjY2Vzc0hvb2soZGF0YSwgYWN0aW9uLm1ldGEucGssIG1ldGEpO1xuICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuc3VjY2VlZGVkKGRhdGEsIHBlbmRpbmdLZXksIGFjdGlvbi5tZXRhLnBrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMubG9hZFN1Y2NlZWRlZChkYXRhLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKGdsb2JhbEFjdGlvbnMsIGVycm9yLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5waylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkpKTtcbiAgICB9O1xuICB9XG4gIGNyZWF0ZVVwc2VydEVwaWM8VD4oYXBpRm46IChtZXRhOiBUKSA9PiBPYnNlcnZhYmxlPE1vZGVsW10+LCBvblN1Y2Nlc3NIb29rPzogKGRhdGE6IE1vZGVsW10sIHBrPykgPT4gdm9pZCkge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZSh0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6VVBTRVJUJyksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNb2RpZnlBY3Rpb25NZXRhPE1vZGVsPj4pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbEFjdGlvbnMpID0+IHtcbiAgICAgICAgICBjb25zdCBwZW5kaW5nS2V5ID0gYWN0aW9uLm1ldGEuYWRkUGVuZGluZztcbiAgICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGEgYXMgYW55IGFzIFQ7XG4gICAgICAgICAgYXBpRm4obWV0YSkuc3Vic2NyaWJlKChkYXRhOiBNb2RlbFtdKSA9PiB7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzSG9vaykge1xuICAgICAgICAgICAgICBvblN1Y2Nlc3NIb29rKGRhdGEsIGFjdGlvbi5tZXRhLnBrKTtcbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnN1Y2NlZWRlZChkYXRhLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnVwc2VydFN1Y2NlZWRlZChkYXRhLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKGdsb2JhbEFjdGlvbnMsIGVycm9yLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5waylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkpKTtcbiAgICB9O1xuICB9XG4gIGNyZWF0ZURlbGV0ZUVwaWMoYXBpRm46IChtZXRhOiBNb2RpZnlBY3Rpb25NZXRhPE1vZGVsPikgPT4gT2JzZXJ2YWJsZTxNb2RlbFtdPikge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZSh0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6REVMRVRFJyksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNb2RpZnlBY3Rpb25NZXRhPE1vZGVsPj4pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbEFjdGlvbnMpID0+IHtcbiAgICAgICAgICBjb25zdCBwZW5kaW5nS2V5ID0gYWN0aW9uLm1ldGEuYWRkUGVuZGluZztcbiAgICAgICAgICBhcGlGbihhY3Rpb24ubWV0YSkuc3Vic2NyaWJlKChkYXRhOiBNb2RlbFtdKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuZGVsZXRlU3VjY2VlZGVkKGFjdGlvbi5tZXRhLml0ZW1zLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKGdsb2JhbEFjdGlvbnMsIGVycm9yLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5waylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkpKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgc3RyaW5nIHVzZWQgYXMgYWN0aW9uLnR5cGVcbiAgICovXG4gIHR5cGUob3BlcmF0aW9uOiAnTE9BRCcgfCAnVVBTRVJUJyB8ICfCoERFTEVURScsIGFjdGlvblN1ZmZpeDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OicgKyBvcGVyYXRpb24gKyAoYWN0aW9uU3VmZml4ID8gJzo6JyArIGFjdGlvblN1ZmZpeCA6ICcnKVxuICB9XG5cbiAgLyoqXG4gICogQ3JlYXRlIHRoZSBvbkVycm9yIGxvZ2ljIGZvciBzdGFuZGFyZCBhY3Rpb25zXG4gICogQHBhcmFtIGdsb2JhbEFjdGlvbnMgcGFzcyBpbiB0aGUgc3Vic2NyaWJlciB0byB0aGUgYWN0aW9uJCBzdHJlYW1cbiAgKi9cbiAgb25FcnJvcihnbG9iYWxBY3Rpb25zOiBTdWJzY3JpYmVyPEFjdGlvbj4sIGVycm9yLCBwZW5kaW5nS2V5LCBwa1Byb2plY3QpIHtcbiAgICBnbG9iYWxBY3Rpb25zLm5leHQodGhpcy5ub3RpZmljYXRpb25zLmFkZFRvYXN0KHtcbiAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvci5tZXNzYWdlIH1cbiAgICB9KSk7XG4gICAgdGhpcy5hY3Rpb25zLmZhaWxlZCh7IHN0YXR1czogJycgKyBlcnJvci5zdGF0dXMgfSwgcGVuZGluZ0tleSwgcGtQcm9qZWN0KTtcbiAgfVxufVxuIl19