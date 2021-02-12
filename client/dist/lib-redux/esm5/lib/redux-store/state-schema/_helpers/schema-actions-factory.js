/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/schema-actions-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { U } from '@kleiolab/lib-utils';
import { filter } from 'rxjs/operators';
/**
 * @record
 */
export function LoadActionMeta() { }
if (false) {
    /** @type {?} */
    LoadActionMeta.prototype.addPending;
    /** @type {?|undefined} */
    LoadActionMeta.prototype.pk;
}
/**
 * @record
 */
export function LoadVersionAction() { }
if (false) {
    /** @type {?} */
    LoadVersionAction.prototype.pkEntity;
    /** @type {?} */
    LoadVersionAction.prototype.entityVersion;
}
;
/**
 * @record
 */
export function LoadByPkAndVersionActionMeta() { }
if (false) {
    /** @type {?} */
    LoadByPkAndVersionActionMeta.prototype.addPending;
    /** @type {?|undefined} */
    LoadByPkAndVersionActionMeta.prototype.pk;
    /** @type {?} */
    LoadByPkAndVersionActionMeta.prototype.pkEntity;
    /** @type {?} */
    LoadByPkAndVersionActionMeta.prototype.version;
}
/**
 * @record
 * @template Model
 */
export function ModifyActionMeta() { }
if (false) {
    /** @type {?} */
    ModifyActionMeta.prototype.items;
    /** @type {?} */
    ModifyActionMeta.prototype.addPending;
    /** @type {?|undefined} */
    ModifyActionMeta.prototype.pk;
}
/**
 * @record
 * @template Model
 */
export function SucceedActionMeta() { }
if (false) {
    /** @type {?} */
    SucceedActionMeta.prototype.items;
    /** @type {?} */
    SucceedActionMeta.prototype.removePending;
    /** @type {?|undefined} */
    SucceedActionMeta.prototype.pk;
}
/**
 * @record
 */
export function FailActionMeta() { }
if (false) {
    /** @type {?} */
    FailActionMeta.prototype.removePending;
    /** @type {?|undefined} */
    FailActionMeta.prototype.pk;
}
/**
 * @record
 */
export function PaginateByParam() { }
/**
 * @record
 */
export function LoadPageMeta() { }
if (false) {
    /** @type {?} */
    LoadPageMeta.prototype.paginateBy;
    /** @type {?} */
    LoadPageMeta.prototype.limit;
    /** @type {?} */
    LoadPageMeta.prototype.offset;
    /** @type {?|undefined} */
    LoadPageMeta.prototype.pk;
}
/**
 * @record
 */
export function LoadPageSucceededMeta() { }
if (false) {
    /** @type {?} */
    LoadPageSucceededMeta.prototype.pks;
    /** @type {?} */
    LoadPageSucceededMeta.prototype.count;
    /** @type {?} */
    LoadPageSucceededMeta.prototype.paginateBy;
    /** @type {?} */
    LoadPageSucceededMeta.prototype.limit;
    /** @type {?} */
    LoadPageSucceededMeta.prototype.offset;
    /** @type {?|undefined} */
    LoadPageSucceededMeta.prototype.pk;
}
/**
 * @record
 * @template Model
 */
export function ActionResultObservable() { }
if (false) {
    /** @type {?} */
    ActionResultObservable.prototype.pending$;
    /** @type {?} */
    ActionResultObservable.prototype.resolved$;
    /** @type {?} */
    ActionResultObservable.prototype.key;
}
/**
 * A: Schema Action Type (e.g. DfhAction)
 * M: Model for whitch the Actions are produced
 * @template Payload, Model
 */
var /**
 * A: Schema Action Type (e.g. DfhAction)
 * M: Model for whitch the Actions are produced
 * @template Payload, Model
 */
SchemaActionsFactory = /** @class */ (function () {
    function SchemaActionsFactory(ngRedux) {
        this.ngRedux = ngRedux;
    }
    /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @return {?}
     */
    SchemaActionsFactory.prototype.createCrudActions = /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @return {?}
     */
    function (actionPrefix, modelName) {
        var _this = this;
        this.actionPrefix = actionPrefix;
        this.modelName = modelName;
        this.load = (/**
         * @param {?=} suffix
         * @param {?=} pk
         * @return {?}
         */
        function (suffix, pk) {
            if (suffix === void 0) { suffix = ''; }
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + (suffix ? '::' + suffix : ''),
                meta: { addPending: addPending, pk: pk },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        this.loadSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        function (items, removePending, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD_SUCCEEDED',
                meta: { items: items, removePending: removePending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
        });
        /**
         * Call the Redux Action to upsert model instances.
         */
        this.upsert = (/**
         * @param {?} items
         * @param {?=} pk
         * @return {?}
         */
        function (items, pk) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::UPSERT',
                meta: { items: items, addPending: addPending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        this.upsertSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        function (items, removePending, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::UPSERT_SUCCEEDED',
                meta: { items: items, removePending: removePending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
        });
        /**
         * this action is not model specific but pendingKey specific.
         * Reducer will add whole meta part to the resolved key
         */
        this.succeeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        function (items, removePending, pk) {
            /** @type {?} */
            var action = ({
                type: 'general::UPSERT_SUCCEEDED',
                meta: { items: items, removePending: removePending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
        });
        /**
        * Call the Redux Action to delete model instances.
        */
        this.delete = (/**
         * @param {?} items
         * @param {?=} pk
         * @return {?}
         */
        function (items, pk) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::DELETE',
                meta: { items: items, addPending: addPending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return !!x; }))),
                key: addPending
            };
        });
        this.deleteSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        function (items, removePending, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::DELETE_SUCCEEDED',
                meta: { items: items, removePending: removePending, pk: pk },
                payload: null
            });
            _this.ngRedux.dispatch(action);
        });
        this.failed = (/**
         * @param {?} error
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        function (error, removePending, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::FAILED',
                meta: { removePending: removePending, pk: pk },
                payload: null,
                error: error,
            });
            _this.ngRedux.dispatch(action);
        });
        this.loadPage = (/**
         * @param {?} paginateBy
         * @param {?} limit
         * @param {?} offset
         * @param {?=} pk
         * @return {?}
         */
        function (paginateBy, limit, offset, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD_PAGE',
                meta: { paginateBy: paginateBy, limit: limit, offset: offset, pk: pk },
                payload: null,
            });
            _this.ngRedux.dispatch(action);
        });
        this.loadPageSucceeded = (/**
         * @param {?} pks
         * @param {?} count
         * @param {?} paginateBy
         * @param {?} limit
         * @param {?} offset
         * @param {?=} pk
         * @return {?}
         */
        function (pks, count, paginateBy, limit, offset, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD_PAGE_SUCCEEDED',
                meta: { pks: pks, paginateBy: paginateBy, count: count, limit: limit, offset: offset, pk: pk },
                payload: null,
            });
            _this.ngRedux.dispatch(action);
        });
        this.loadPageFailed = (/**
         * @param {?} paginateBy
         * @param {?} limit
         * @param {?} offset
         * @param {?=} pk
         * @return {?}
         */
        function (paginateBy, limit, offset, pk) {
            /** @type {?} */
            var action = ({
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD_PAGE_FAILED',
                meta: { paginateBy: paginateBy, limit: limit, offset: offset, pk: pk },
                payload: null,
            });
            _this.ngRedux.dispatch(action);
        });
        return this;
    };
    return SchemaActionsFactory;
}());
/**
 * A: Schema Action Type (e.g. DfhAction)
 * M: Model for whitch the Actions are produced
 * @template Payload, Model
 */
export { SchemaActionsFactory };
if (false) {
    /** @type {?} */
    SchemaActionsFactory.prototype.load;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.loadSucceeded;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.upsert;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.upsertSucceeded;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.delete;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.deleteSucceeded;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.failed;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.loadPage;
    /**
     * \@param pk is used for facetting
     * @type {?}
     */
    SchemaActionsFactory.prototype.loadPageSucceeded;
    /** @type {?} */
    SchemaActionsFactory.prototype.loadPageFailed;
    /**
     * this action is not model specific but pendingKey specific.
     * Reducer will add whole meta part to the resolved key.
     * @type {?}
     */
    SchemaActionsFactory.prototype.succeeded;
    /** @type {?} */
    SchemaActionsFactory.prototype.actionPrefix;
    /** @type {?} */
    SchemaActionsFactory.prototype.modelName;
    /** @type {?} */
    SchemaActionsFactory.prototype.ngRedux;
}
/**
 * @record
 */
export function SchemaObjectLoadActionMeta() { }
if (false) {
    /** @type {?} */
    SchemaObjectLoadActionMeta.prototype.removePending;
    /** @type {?|undefined} */
    SchemaObjectLoadActionMeta.prototype.pk;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWFjdGlvbnMtZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFJeEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR3hDLG9DQUFtRTs7O0lBQWpDLG9DQUFtQjs7SUFBQyw0QkFBVzs7Ozs7QUFDakUsdUNBQXFHOzs7SUFBekMscUNBQWlCOztJQUFDLDBDQUFxQjs7QUFBRSxDQUFDOzs7O0FBQ3RHLGtEQUFvSDs7O0lBQXBFLGtEQUFtQjs7SUFBQywwQ0FBWTs7SUFBQyxnREFBaUI7O0lBQUMsK0NBQWU7Ozs7OztBQUVsSCxzQ0FBNEY7OztJQUFqRCxpQ0FBZTs7SUFBQyxzQ0FBbUI7O0lBQUMsOEJBQVc7Ozs7OztBQUMxRix1Q0FBZ0c7OztJQUFwRCxrQ0FBZTs7SUFBQywwQ0FBc0I7O0lBQUMsK0JBQVc7Ozs7O0FBQzlGLG9DQUFzRTs7O0lBQXBDLHVDQUFzQjs7SUFBQyw0QkFBVzs7Ozs7QUFFcEUscUNBQW9FOzs7O0FBQ3BFLGtDQUEyRzs7O0lBQTNFLGtDQUE4Qjs7SUFBQyw2QkFBYzs7SUFBQyw4QkFBZTs7SUFBQywwQkFBVzs7Ozs7QUFDekcsMkNBQWtKOzs7SUFBekcsb0NBQWM7O0lBQUMsc0NBQWM7O0lBQUMsMkNBQThCOztJQUFDLHNDQUFjOztJQUFDLHVDQUFlOztJQUFDLG1DQUFXOzs7Ozs7QUFJaEosNENBQThJOzs7SUFBN0YsMENBQThCOztJQUFDLDJDQUFnRDs7SUFBQyxxQ0FBVzs7Ozs7OztBQVU1STs7Ozs7O0lBdURFLDhCQUFtQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFv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R0FBRyxvQkFBb0I7Z0JBQ3JFLElBQUksRUFBRSxFQUFFLFVBQVUsWUFBQSxFQUFFLEtBQUssT0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLEVBQUUsSUFBQSxFQUFFO2dCQUN2QyxPQUFPLEVBQUUsSUFBSTthQUNkLENBQUM7WUFDRixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUEsQ0FBQTtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVILDJCQUFDO0FBQUQsQ0FBQyxBQXRNRCxJQXNNQzs7Ozs7Ozs7O0lBcE1DLG9DQUFzRTs7Ozs7SUFLdEUsNkNBQTRFOzs7OztJQUs1RSxzQ0FBZ0Y7Ozs7O0lBS2hGLCtDQUE4RTs7Ozs7SUFLOUUsc0NBQXVFOzs7OztJQUt2RSwrQ0FBOEU7Ozs7O0lBSzlFLHNDQUE0RDs7Ozs7SUFNNUQsd0NBQThGOzs7OztJQUs5RixpREFBcUk7O0lBQ3JJLDhDQUFvRzs7Ozs7O0lBTXBHLHlDQUF3RTs7SUFFeEUsNENBQXFCOztJQUNyQix5Q0FBa0I7O0lBRU4sdUNBQWtDOzs7OztBQWlKaEQsZ0RBQWtGOzs7SUFBcEMsbURBQXNCOztJQUFDLHdDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IFUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IEFjdGlvbnNPYnNlcnZhYmxlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcblxuZXhwb3J0IGludGVyZmFjZSBMb2FkQWN0aW9uTWV0YSB7IGFkZFBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIgfVxuZXhwb3J0IGludGVyZmFjZSBMb2FkVmVyc2lvbkFjdGlvbiBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHsgcGtFbnRpdHk6IG51bWJlciwgZW50aXR5VmVyc2lvbjogbnVtYmVyIH07XG5leHBvcnQgaW50ZXJmYWNlIExvYWRCeVBrQW5kVmVyc2lvbkFjdGlvbk1ldGEgeyBhZGRQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyLCBwa0VudGl0eTogbnVtYmVyLCB2ZXJzaW9uOiBudW1iZXIgfVxuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGlmeUFjdGlvbk1ldGE8TW9kZWw+IHsgaXRlbXM6IE1vZGVsW10sIGFkZFBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIgfVxuZXhwb3J0IGludGVyZmFjZSBTdWNjZWVkQWN0aW9uTWV0YTxNb2RlbD4geyBpdGVtczogTW9kZWxbXSwgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlciB9XG5leHBvcnQgaW50ZXJmYWNlIEZhaWxBY3Rpb25NZXRhIHsgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlciB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnaW5hdGVCeVBhcmFtIHsgW2tleTogc3RyaW5nXTogbnVtYmVyIHwgYm9vbGVhbiB9XG5leHBvcnQgaW50ZXJmYWNlIExvYWRQYWdlTWV0YSB7IHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgcGs/OiBudW1iZXIgfVxuZXhwb3J0IGludGVyZmFjZSBMb2FkUGFnZVN1Y2NlZWRlZE1ldGEgeyBwa3M6IG51bWJlcltdLCBjb3VudDogbnVtYmVyLCBwYWdpbmF0ZUJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSwgbGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHBrPzogbnVtYmVyIH1cblxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxNb2RlbD4geyBwZW5kaW5nJDogT2JzZXJ2YWJsZTxib29sZWFuPiwgcmVzb2x2ZWQkOiBPYnNlcnZhYmxlPFN1Y2NlZWRBY3Rpb25NZXRhPE1vZGVsPj4sIGtleTogc3RyaW5nIH1cblxuZXhwb3J0IHR5cGUgRmx1eEFjdGlvbk9ic2VydmFibGU8UGF5bG9hZCwgTWV0YT4gPSBBY3Rpb25zT2JzZXJ2YWJsZTxGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWV0YT4+XG5cblxuXG4vKipcbiAqIEE6IFNjaGVtYSBBY3Rpb24gVHlwZSAoZS5nLiBEZmhBY3Rpb24pXG4gKiBNOiBNb2RlbCBmb3Igd2hpdGNoIHRoZSBBY3Rpb25zIGFyZSBwcm9kdWNlZFxuICovXG5leHBvcnQgY2xhc3MgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+IHtcblxuICBsb2FkOiAoc3VmZml4Pzogc3RyaW5nLCBwaz86IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxNb2RlbD47XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwayBpcyB1c2VkIGZvciBmYWNldHRpbmdcbiAgICovXG4gIGxvYWRTdWNjZWVkZWQ6IChpdGVtczogTW9kZWxbXSwgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlcikgPT4gdm9pZDtcblxuICAvKipcbiAgICogQHBhcmFtIHBrIGlzIHVzZWQgZm9yIGZhY2V0dGluZ1xuICAgKi9cbiAgdXBzZXJ0OiAoaXRlbXM6IFBhcnRpYWw8TW9kZWw+W10sIHBrPzogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPE1vZGVsPjtcblxuICAvKipcbiAgICogQHBhcmFtIHBrIGlzIHVzZWQgZm9yIGZhY2V0dGluZ1xuICAgKi9cbiAgdXBzZXJ0U3VjY2VlZGVkOiAoaXRlbXM6IE1vZGVsW10sIHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwayBpcyB1c2VkIGZvciBmYWNldHRpbmdcbiAgICovXG4gIGRlbGV0ZTogKGl0ZW1zOiBNb2RlbFtdLCBwaz86IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxNb2RlbD47XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwayBpcyB1c2VkIGZvciBmYWNldHRpbmdcbiAgICovXG4gIGRlbGV0ZVN1Y2NlZWRlZDogKGl0ZW1zOiBNb2RlbFtdLCByZW1vdmVQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGsgaXMgdXNlZCBmb3IgZmFjZXR0aW5nXG4gICAqL1xuICBmYWlsZWQ6IChlcnJvciwgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlcikgPT4gdm9pZDtcblxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGsgaXMgdXNlZCBmb3IgZmFjZXR0aW5nXG4gICAqL1xuICBsb2FkUGFnZTogKHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgcGs/OiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgLyoqXG4gKiBAcGFyYW0gcGsgaXMgdXNlZCBmb3IgZmFjZXR0aW5nXG4gKi9cbiAgbG9hZFBhZ2VTdWNjZWVkZWQ6IChwa3M6IG51bWJlcltdLCBjb3VudDogbnVtYmVyLCBwYWdpbmF0ZUJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSwgbGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHBrPzogbnVtYmVyKSA9PiB2b2lkO1xuICBsb2FkUGFnZUZhaWxlZDogKHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgcGs/OiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIHRoaXMgYWN0aW9uIGlzIG5vdCBtb2RlbCBzcGVjaWZpYyBidXQgcGVuZGluZ0tleSBzcGVjaWZpYy5cbiAgICogUmVkdWNlciB3aWxsIGFkZCB3aG9sZSBtZXRhIHBhcnQgdG8gdGhlIHJlc29sdmVkIGtleS5cbiAgICovXG4gIHN1Y2NlZWRlZDogKGl0ZW1zOiBNb2RlbFtdLCByZW1vdmVQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIGFjdGlvblByZWZpeDogc3RyaW5nO1xuICBtb2RlbE5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7XG4gIH1cblxuXG4gIGNyZWF0ZUNydWRBY3Rpb25zKGFjdGlvblByZWZpeDogc3RyaW5nLCBtb2RlbE5hbWU6IHN0cmluZyk6IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIE1vZGVsPiB7XG4gICAgdGhpcy5hY3Rpb25QcmVmaXggPSBhY3Rpb25QcmVmaXg7XG4gICAgdGhpcy5tb2RlbE5hbWUgPSBtb2RlbE5hbWU7XG5cbiAgICB0aGlzLmxvYWQgPSAoc3VmZml4OiBzdHJpbmcgPSAnJywgcGs/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZEFjdGlvbk1ldGE+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAoc3VmZml4ID8gJzo6JyArIHN1ZmZpeCA6ICcnKSxcbiAgICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxNb2RlbD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRTdWNjZWVkZWQgPSAoaXRlbXM6IE1vZGVsW10sIHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIFN1Y2NlZWRBY3Rpb25NZXRhPE1vZGVsPj4gPSAoe1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRF9TVUNDRUVERUQnLFxuICAgICAgICBtZXRhOiB7IGl0ZW1zLCByZW1vdmVQZW5kaW5nLCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsXG4gICAgICB9KVxuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsIHRoZSBSZWR1eCBBY3Rpb24gdG8gdXBzZXJ0IG1vZGVsIGluc3RhbmNlcy5cbiAgICAgKi9cbiAgICB0aGlzLnVwc2VydCA9IChpdGVtczogTW9kZWxbXSwgcGs/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKTtcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1vZGlmeUFjdGlvbk1ldGE8TW9kZWw+PiA9ICh7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpVUFNFUlQnLFxuICAgICAgICBtZXRhOiB7IGl0ZW1zLCBhZGRQZW5kaW5nLCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsXG4gICAgICB9KVxuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPE1vZGVsPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMudXBzZXJ0U3VjY2VlZGVkID0gKGl0ZW1zOiBNb2RlbFtdLCByZW1vdmVQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBTdWNjZWVkQWN0aW9uTWV0YTxNb2RlbD4+ID0gKHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OlVQU0VSVF9TVUNDRUVERUQnLFxuICAgICAgICBtZXRhOiB7IGl0ZW1zLCByZW1vdmVQZW5kaW5nLCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsXG4gICAgICB9KVxuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB0aGlzIGFjdGlvbiBpcyBub3QgbW9kZWwgc3BlY2lmaWMgYnV0IHBlbmRpbmdLZXkgc3BlY2lmaWMuXG4gICAgICogUmVkdWNlciB3aWxsIGFkZCB3aG9sZSBtZXRhIHBhcnQgdG8gdGhlIHJlc29sdmVkIGtleVxuICAgICAqL1xuICAgIHRoaXMuc3VjY2VlZGVkID0gKGl0ZW1zOiBNb2RlbFtdLCByZW1vdmVQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBTdWNjZWVkQWN0aW9uTWV0YTxNb2RlbD4+ID0gKHtcbiAgICAgICAgdHlwZTogJ2dlbmVyYWw6OlVQU0VSVF9TVUNDRUVERUQnLFxuICAgICAgICBtZXRhOiB7IGl0ZW1zLCByZW1vdmVQZW5kaW5nLCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsXG4gICAgICB9KVxuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICogQ2FsbCB0aGUgUmVkdXggQWN0aW9uIHRvIGRlbGV0ZSBtb2RlbCBpbnN0YW5jZXMuXG4gICAgKi9cbiAgICB0aGlzLmRlbGV0ZSA9IChpdGVtczogTW9kZWxbXSwgcGs/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKTtcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1vZGlmeUFjdGlvbk1ldGE8TW9kZWw+PiA9ICh7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpERUxFVEUnLFxuICAgICAgICBtZXRhOiB7IGl0ZW1zLCBhZGRQZW5kaW5nLCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsXG4gICAgICB9KVxuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPE1vZGVsPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKS5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5kZWxldGVTdWNjZWVkZWQgPSAoaXRlbXM6IE1vZGVsW10sIHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIFN1Y2NlZWRBY3Rpb25NZXRhPE1vZGVsPj4gPSAoe1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6REVMRVRFX1NVQ0NFRURFRCcsXG4gICAgICAgIG1ldGE6IHsgaXRlbXMsIHJlbW92ZVBlbmRpbmcsIHBrIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGxcbiAgICAgIH0pXG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgIH1cblxuXG5cbiAgICB0aGlzLmZhaWxlZCA9IChlcnJvciwgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgRmFpbEFjdGlvbk1ldGE+ID0gKHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkZBSUxFRCcsXG4gICAgICAgIG1ldGE6IHsgcmVtb3ZlUGVuZGluZywgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgICAgZXJyb3IsXG4gICAgICB9KVxuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICB9XG5cblxuICAgIHRoaXMubG9hZFBhZ2UgPSAocGFnaW5hdGVCeTogUGFnaW5hdGVCeVBhcmFtW10sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBwaz86IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZFBhZ2VNZXRhPiA9ICh7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEX1BBR0UnLFxuICAgICAgICBtZXRhOiB7IHBhZ2luYXRlQnksIGxpbWl0LCBvZmZzZXQsIHBrIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9KVxuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRQYWdlU3VjY2VlZGVkID0gKHBrczogbnVtYmVyW10sIGNvdW50OiBudW1iZXIsIHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgcGs/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRQYWdlU3VjY2VlZGVkTWV0YT4gPSAoe1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRF9QQUdFX1NVQ0NFRURFRCcsXG4gICAgICAgIG1ldGE6IHsgcGtzLCBwYWdpbmF0ZUJ5LCBjb3VudCwgbGltaXQsIG9mZnNldCwgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH0pXG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgIH1cblxuICAgIHRoaXMubG9hZFBhZ2VGYWlsZWQgPSAocGFnaW5hdGVCeTogUGFnaW5hdGVCeVBhcmFtW10sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBwaz86IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZFBhZ2VNZXRhPiA9ICh7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEX1BBR0VfRkFJTEVEJyxcbiAgICAgICAgbWV0YTogeyBwYWdpbmF0ZUJ5LCBsaW1pdCwgb2Zmc2V0LCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjaGVtYU9iamVjdExvYWRBY3Rpb25NZXRhIHsgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlciB9XG4iXX0=