/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/schema-actions-factory.ts
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
export class SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
    }
    /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @return {?}
     */
    createCrudActions(actionPrefix, modelName) {
        this.actionPrefix = actionPrefix;
        this.modelName = modelName;
        this.load = (/**
         * @param {?=} suffix
         * @param {?=} pk
         * @return {?}
         */
        (suffix = '', pk) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + (suffix ? '::' + suffix : ''),
                meta: { addPending, pk },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        this.loadSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        (items, removePending, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
        });
        /**
         * Call the Redux Action to upsert model instances.
         */
        this.upsert = (/**
         * @param {?} items
         * @param {?=} pk
         * @return {?}
         */
        (items, pk) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::UPSERT',
                meta: { items, addPending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        this.upsertSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        (items, removePending, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::UPSERT_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
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
        (items, removePending, pk) => {
            /** @type {?} */
            const action = ({
                type: 'general::UPSERT_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
        });
        /**
        * Call the Redux Action to delete model instances.
        */
        this.delete = (/**
         * @param {?} items
         * @param {?=} pk
         * @return {?}
         */
        (items, pk) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::DELETE',
                meta: { items, addPending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]).pipe(filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !!x))),
                key: addPending
            };
        });
        this.deleteSucceeded = (/**
         * @param {?} items
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        (items, removePending, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::DELETE_SUCCEEDED',
                meta: { items, removePending, pk },
                payload: null
            });
            this.ngRedux.dispatch(action);
        });
        this.failed = (/**
         * @param {?} error
         * @param {?} removePending
         * @param {?=} pk
         * @return {?}
         */
        (error, removePending, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::FAILED',
                meta: { removePending, pk },
                payload: null,
                error,
            });
            this.ngRedux.dispatch(action);
        });
        this.loadPage = (/**
         * @param {?} paginateBy
         * @param {?} limit
         * @param {?} offset
         * @param {?=} pk
         * @return {?}
         */
        (paginateBy, limit, offset, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE',
                meta: { paginateBy, limit, offset, pk },
                payload: null,
            });
            this.ngRedux.dispatch(action);
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
        (pks, count, paginateBy, limit, offset, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_SUCCEEDED',
                meta: { pks, paginateBy, count, limit, offset, pk },
                payload: null,
            });
            this.ngRedux.dispatch(action);
        });
        this.loadPageFailed = (/**
         * @param {?} paginateBy
         * @param {?} limit
         * @param {?} offset
         * @param {?=} pk
         * @return {?}
         */
        (paginateBy, limit, offset, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_FAILED',
                meta: { paginateBy, limit, offset, pk },
                payload: null,
            });
            this.ngRedux.dispatch(action);
        });
        return this;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWFjdGlvbnMtZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSXhDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUd4QyxvQ0FBbUU7OztJQUFqQyxvQ0FBbUI7O0lBQUMsNEJBQVc7Ozs7O0FBQ2pFLHVDQUFxRzs7O0lBQXpDLHFDQUFpQjs7SUFBQywwQ0FBcUI7O0FBQUUsQ0FBQzs7OztBQUN0RyxrREFBb0g7OztJQUFwRSxrREFBbUI7O0lBQUMsMENBQVk7O0lBQUMsZ0RBQWlCOztJQUFDLCtDQUFlOzs7Ozs7QUFFbEgsc0NBQTRGOzs7SUFBakQsaUNBQWU7O0lBQUMsc0NBQW1COztJQUFDLDhCQUFXOzs7Ozs7QUFDMUYsdUNBQWdHOzs7SUFBcEQsa0NBQWU7O0lBQUMsMENBQXNCOztJQUFDLCtCQUFXOzs7OztBQUM5RixvQ0FBc0U7OztJQUFwQyx1Q0FBc0I7O0lBQUMsNEJBQVc7Ozs7O0FBRXBFLHFDQUFvRTs7OztBQUNwRSxrQ0FBMkc7OztJQUEzRSxrQ0FBOEI7O0lBQUMsNkJBQWM7O0lBQUMsOEJBQWU7O0lBQUMsMEJBQVc7Ozs7O0FBQ3pHLDJDQUFrSjs7O0lBQXpHLG9DQUFjOztJQUFDLHNDQUFjOztJQUFDLDJDQUE4Qjs7SUFBQyxzQ0FBYzs7SUFBQyx1Q0FBZTs7SUFBQyxtQ0FBVzs7Ozs7O0FBSWhKLDRDQUE4STs7O0lBQTdGLDBDQUE4Qjs7SUFBQywyQ0FBZ0Q7O0lBQUMscUNBQVc7Ozs7Ozs7QUFXNUksTUFBTSxPQUFPLG9CQUFvQjs7OztJQXVEL0IsWUFBbUIsT0FBMkI7UUFBM0Is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QUUsSUFBSTthQUNkLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMvQixDQUFDLENBQUEsQ0FBQTtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUVGOzs7SUFwTUMsb0NBQXNFOzs7OztJQUt0RSw2Q0FBNEU7Ozs7O0lBSzVFLHNDQUFnRjs7Ozs7SUFLaEYsK0NBQThFOzs7OztJQUs5RSxzQ0FBdUU7Ozs7O0lBS3ZFLCtDQUE4RTs7Ozs7SUFLOUUsc0NBQTREOzs7OztJQU01RCx3Q0FBOEY7Ozs7O0lBSzlGLGlEQUFxSTs7SUFDckksOENBQW9HOzs7Ozs7SUFNcEcseUNBQXdFOztJQUV4RSw0Q0FBcUI7O0lBQ3JCLHlDQUFrQjs7SUFFTix1Q0FBa0M7Ozs7O0FBaUpoRCxnREFBa0Y7OztJQUFwQyxtREFBc0I7O0lBQUMsd0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgVSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgQWN0aW9uc09ic2VydmFibGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRBY3Rpb25NZXRhIHsgYWRkUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlciB9XG5leHBvcnQgaW50ZXJmYWNlIExvYWRWZXJzaW9uQWN0aW9uIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEgeyBwa0VudGl0eTogbnVtYmVyLCBlbnRpdHlWZXJzaW9uOiBudW1iZXIgfTtcbmV4cG9ydCBpbnRlcmZhY2UgTG9hZEJ5UGtBbmRWZXJzaW9uQWN0aW9uTWV0YSB7IGFkZFBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIsIHBrRW50aXR5OiBudW1iZXIsIHZlcnNpb246IG51bWJlciB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kaWZ5QWN0aW9uTWV0YTxNb2RlbD4geyBpdGVtczogTW9kZWxbXSwgYWRkUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlciB9XG5leHBvcnQgaW50ZXJmYWNlIFN1Y2NlZWRBY3Rpb25NZXRhPE1vZGVsPiB7IGl0ZW1zOiBNb2RlbFtdLCByZW1vdmVQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyIH1cbmV4cG9ydCBpbnRlcmZhY2UgRmFpbEFjdGlvbk1ldGEgeyByZW1vdmVQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyIH1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdpbmF0ZUJ5UGFyYW0geyBba2V5OiBzdHJpbmddOiBudW1iZXIgfCBib29sZWFuIH1cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZFBhZ2VNZXRhIHsgcGFnaW5hdGVCeTogUGFnaW5hdGVCeVBhcmFtW10sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBwaz86IG51bWJlciB9XG5leHBvcnQgaW50ZXJmYWNlIExvYWRQYWdlU3VjY2VlZGVkTWV0YSB7IHBrczogbnVtYmVyW10sIGNvdW50OiBudW1iZXIsIHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgcGs/OiBudW1iZXIgfVxuXG5cblxuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPE1vZGVsPiB7IHBlbmRpbmckOiBPYnNlcnZhYmxlPGJvb2xlYW4+LCByZXNvbHZlZCQ6IE9ic2VydmFibGU8U3VjY2VlZEFjdGlvbk1ldGE8TW9kZWw+Piwga2V5OiBzdHJpbmcgfVxuXG5leHBvcnQgdHlwZSBGbHV4QWN0aW9uT2JzZXJ2YWJsZTxQYXlsb2FkLCBNZXRhPiA9IEFjdGlvbnNPYnNlcnZhYmxlPEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNZXRhPj5cblxuXG5cbi8qKlxuICogQTogU2NoZW1hIEFjdGlvbiBUeXBlIChlLmcuIERmaEFjdGlvbilcbiAqIE06IE1vZGVsIGZvciB3aGl0Y2ggdGhlIEFjdGlvbnMgYXJlIHByb2R1Y2VkXG4gKi9cblxuZXhwb3J0IGNsYXNzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIE1vZGVsPiB7XG5cbiAgbG9hZDogKHN1ZmZpeD86IHN0cmluZywgcGs/OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8TW9kZWw+O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGsgaXMgdXNlZCBmb3IgZmFjZXR0aW5nXG4gICAqL1xuICBsb2FkU3VjY2VlZGVkOiAoaXRlbXM6IE1vZGVsW10sIHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwayBpcyB1c2VkIGZvciBmYWNldHRpbmdcbiAgICovXG4gIHVwc2VydDogKGl0ZW1zOiBQYXJ0aWFsPE1vZGVsPltdLCBwaz86IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxNb2RlbD47XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwayBpcyB1c2VkIGZvciBmYWNldHRpbmdcbiAgICovXG4gIHVwc2VydFN1Y2NlZWRlZDogKGl0ZW1zOiBNb2RlbFtdLCByZW1vdmVQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGsgaXMgdXNlZCBmb3IgZmFjZXR0aW5nXG4gICAqL1xuICBkZWxldGU6IChpdGVtczogTW9kZWxbXSwgcGs/OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8TW9kZWw+O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGsgaXMgdXNlZCBmb3IgZmFjZXR0aW5nXG4gICAqL1xuICBkZWxldGVTdWNjZWVkZWQ6IChpdGVtczogTW9kZWxbXSwgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlcikgPT4gdm9pZDtcblxuICAvKipcbiAgICogQHBhcmFtIHBrIGlzIHVzZWQgZm9yIGZhY2V0dGluZ1xuICAgKi9cbiAgZmFpbGVkOiAoZXJyb3IsIHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIpID0+IHZvaWQ7XG5cblxuICAvKipcbiAgICogQHBhcmFtIHBrIGlzIHVzZWQgZm9yIGZhY2V0dGluZ1xuICAgKi9cbiAgbG9hZFBhZ2U6IChwYWdpbmF0ZUJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSwgbGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHBrPzogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIC8qKlxuICogQHBhcmFtIHBrIGlzIHVzZWQgZm9yIGZhY2V0dGluZ1xuICovXG4gIGxvYWRQYWdlU3VjY2VlZGVkOiAocGtzOiBudW1iZXJbXSwgY291bnQ6IG51bWJlciwgcGFnaW5hdGVCeTogUGFnaW5hdGVCeVBhcmFtW10sIGxpbWl0OiBudW1iZXIsIG9mZnNldDogbnVtYmVyLCBwaz86IG51bWJlcikgPT4gdm9pZDtcbiAgbG9hZFBhZ2VGYWlsZWQ6IChwYWdpbmF0ZUJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSwgbGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHBrPzogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiB0aGlzIGFjdGlvbiBpcyBub3QgbW9kZWwgc3BlY2lmaWMgYnV0IHBlbmRpbmdLZXkgc3BlY2lmaWMuXG4gICAqIFJlZHVjZXIgd2lsbCBhZGQgd2hvbGUgbWV0YSBwYXJ0IHRvIHRoZSByZXNvbHZlZCBrZXkuXG4gICAqL1xuICBzdWNjZWVkZWQ6IChpdGVtczogTW9kZWxbXSwgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlcikgPT4gdm9pZDtcblxuICBhY3Rpb25QcmVmaXg6IHN0cmluZztcbiAgbW9kZWxOYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikge1xuICB9XG5cblxuICBjcmVhdGVDcnVkQWN0aW9ucyhhY3Rpb25QcmVmaXg6IHN0cmluZywgbW9kZWxOYW1lOiBzdHJpbmcpOiBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBNb2RlbD4ge1xuICAgIHRoaXMuYWN0aW9uUHJlZml4ID0gYWN0aW9uUHJlZml4O1xuICAgIHRoaXMubW9kZWxOYW1lID0gbW9kZWxOYW1lO1xuXG4gICAgdGhpcy5sb2FkID0gKHN1ZmZpeDogc3RyaW5nID0gJycsIHBrPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRBY3Rpb25NZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgKHN1ZmZpeCA/ICc6OicgKyBzdWZmaXggOiAnJyksXG4gICAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8TW9kZWw+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkU3VjY2VlZGVkID0gKGl0ZW1zOiBNb2RlbFtdLCByZW1vdmVQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBTdWNjZWVkQWN0aW9uTWV0YTxNb2RlbD4+ID0gKHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQURfU1VDQ0VFREVEJyxcbiAgICAgICAgbWV0YTogeyBpdGVtcywgcmVtb3ZlUGVuZGluZywgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbCB0aGUgUmVkdXggQWN0aW9uIHRvIHVwc2VydCBtb2RlbCBpbnN0YW5jZXMuXG4gICAgICovXG4gICAgdGhpcy51cHNlcnQgPSAoaXRlbXM6IE1vZGVsW10sIHBrPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKCk7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNb2RpZnlBY3Rpb25NZXRhPE1vZGVsPj4gPSAoe1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6VVBTRVJUJyxcbiAgICAgICAgbWV0YTogeyBpdGVtcywgYWRkUGVuZGluZywgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxNb2RlbD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLnVwc2VydFN1Y2NlZWRlZCA9IChpdGVtczogTW9kZWxbXSwgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgU3VjY2VlZEFjdGlvbk1ldGE8TW9kZWw+PiA9ICh7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpVUFNFUlRfU1VDQ0VFREVEJyxcbiAgICAgICAgbWV0YTogeyBpdGVtcywgcmVtb3ZlUGVuZGluZywgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdGhpcyBhY3Rpb24gaXMgbm90IG1vZGVsIHNwZWNpZmljIGJ1dCBwZW5kaW5nS2V5IHNwZWNpZmljLlxuICAgICAqIFJlZHVjZXIgd2lsbCBhZGQgd2hvbGUgbWV0YSBwYXJ0IHRvIHRoZSByZXNvbHZlZCBrZXlcbiAgICAgKi9cbiAgICB0aGlzLnN1Y2NlZWRlZCA9IChpdGVtczogTW9kZWxbXSwgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgU3VjY2VlZEFjdGlvbk1ldGE8TW9kZWw+PiA9ICh7XG4gICAgICAgIHR5cGU6ICdnZW5lcmFsOjpVUFNFUlRfU1VDQ0VFREVEJyxcbiAgICAgICAgbWV0YTogeyBpdGVtcywgcmVtb3ZlUGVuZGluZywgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAqIENhbGwgdGhlIFJlZHV4IEFjdGlvbiB0byBkZWxldGUgbW9kZWwgaW5zdGFuY2VzLlxuICAgICovXG4gICAgdGhpcy5kZWxldGUgPSAoaXRlbXM6IE1vZGVsW10sIHBrPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKCk7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNb2RpZnlBY3Rpb25NZXRhPE1vZGVsPj4gPSAoe1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6REVMRVRFJyxcbiAgICAgICAgbWV0YTogeyBpdGVtcywgYWRkUGVuZGluZywgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxNb2RlbD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMuZGVsZXRlU3VjY2VlZGVkID0gKGl0ZW1zOiBNb2RlbFtdLCByZW1vdmVQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBTdWNjZWVkQWN0aW9uTWV0YTxNb2RlbD4+ID0gKHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkRFTEVURV9TVUNDRUVERUQnLFxuICAgICAgICBtZXRhOiB7IGl0ZW1zLCByZW1vdmVQZW5kaW5nLCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsXG4gICAgICB9KVxuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICB9XG5cblxuXG4gICAgdGhpcy5mYWlsZWQgPSAoZXJyb3IsIHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIEZhaWxBY3Rpb25NZXRhPiA9ICh7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpGQUlMRUQnLFxuICAgICAgICBtZXRhOiB7IHJlbW92ZVBlbmRpbmcsIHBrIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICAgIGVycm9yLFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgfVxuXG5cbiAgICB0aGlzLmxvYWRQYWdlID0gKHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgcGs/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRQYWdlTWV0YT4gPSAoe1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRF9QQUdFJyxcbiAgICAgICAgbWV0YTogeyBwYWdpbmF0ZUJ5LCBsaW1pdCwgb2Zmc2V0LCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgfVxuXG4gICAgdGhpcy5sb2FkUGFnZVN1Y2NlZWRlZCA9IChwa3M6IG51bWJlcltdLCBjb3VudDogbnVtYmVyLCBwYWdpbmF0ZUJ5OiBQYWdpbmF0ZUJ5UGFyYW1bXSwgbGltaXQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIsIHBrPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBMb2FkUGFnZVN1Y2NlZWRlZE1ldGE+ID0gKHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQURfUEFHRV9TVUNDRUVERUQnLFxuICAgICAgICBtZXRhOiB7IHBrcywgcGFnaW5hdGVCeSwgY291bnQsIGxpbWl0LCBvZmZzZXQsIHBrIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9KVxuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRQYWdlRmFpbGVkID0gKHBhZ2luYXRlQnk6IFBhZ2luYXRlQnlQYXJhbVtdLCBsaW1pdDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlciwgcGs/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRQYWdlTWV0YT4gPSAoe1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRF9QQUdFX0ZBSUxFRCcsXG4gICAgICAgIG1ldGE6IHsgcGFnaW5hdGVCeSwgbGltaXQsIG9mZnNldCwgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH0pXG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTY2hlbWFPYmplY3RMb2FkQWN0aW9uTWV0YSB7IHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIgfVxuIl19