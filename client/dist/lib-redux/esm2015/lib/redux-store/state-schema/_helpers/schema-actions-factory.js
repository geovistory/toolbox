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
    LoadPageMeta.prototype.page;
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
    LoadPageSucceededMeta.prototype.page;
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
         * @param {?} page
         * @param {?=} pk
         * @return {?}
         */
        (page, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE',
                meta: { page, pk },
                payload: null,
            });
            this.ngRedux.dispatch(action);
        });
        this.loadPageSucceeded = (/**
         * @param {?} pks
         * @param {?} count
         * @param {?} page
         * @param {?=} pk
         * @return {?}
         */
        (pks, count, page, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_SUCCEEDED',
                meta: { page, pks, count, pk },
                payload: null,
            });
            this.ngRedux.dispatch(action);
        });
        this.loadPageFailed = (/**
         * @param {?} page
         * @param {?=} pk
         * @return {?}
         */
        (page, pk) => {
            /** @type {?} */
            const action = ({
                type: this.actionPrefix + '.' + this.modelName + '::LOAD_PAGE_FAILED',
                meta: { page, pk },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLWFjdGlvbnMtZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFJeEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBR3hDLG9DQUFtRTs7O0lBQWpDLG9DQUFtQjs7SUFBQyw0QkFBVzs7Ozs7QUFDakUsdUNBQXFHOzs7SUFBekMscUNBQWlCOztJQUFDLDBDQUFxQjs7QUFBRSxDQUFDOzs7O0FBQ3RHLGtEQUFvSDs7O0lBQXBFLGtEQUFtQjs7SUFBQywwQ0FBWTs7SUFBQyxnREFBaUI7O0lBQUMsK0NBQWU7Ozs7OztBQUVsSCxzQ0FBNEY7OztJQUFqRCxpQ0FBZTs7SUFBQyxzQ0FBbUI7O0lBQUMsOEJBQVc7Ozs7OztBQUMxRix1Q0FBZ0c7OztJQUFwRCxrQ0FBZTs7SUFBQywwQ0FBc0I7O0lBQUMsK0JBQVc7Ozs7O0FBQzlGLG9DQUFzRTs7O0lBQXBDLHVDQUFzQjs7SUFBQyw0QkFBVzs7Ozs7QUFFcEUscUNBQTZFOzs7O0FBQzdFLGtDQUFtRTs7O0lBQW5DLDRCQUFxQjs7SUFBQywwQkFBVzs7Ozs7QUFDakUsMkNBQTBHOzs7SUFBakUsb0NBQWM7O0lBQUMsc0NBQWM7O0lBQUMscUNBQXFCOztJQUFDLG1DQUFXOzs7Ozs7QUFJeEcsNENBQThJOzs7SUFBN0YsMENBQThCOztJQUFDLDJDQUFnRDs7SUFBQyxxQ0FBVzs7Ozs7OztBQVc1SSxNQUFNLE9BQU8sb0JBQW9COzs7O0lBdUQvQixZQUFtQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtJQUM5QyxDQUFDOzs7Ozs7SUFHRCxpQkFBaUIsQ0FB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QUtoRiwrQ0FBOEU7Ozs7O0lBSzlFLHNDQUF1RTs7Ozs7SUFLdkUsK0NBQThFOzs7OztJQUs5RSxzQ0FBNEQ7Ozs7O0lBTTVELHdDQUFzRDs7Ozs7SUFLdEQsaURBQTZGOztJQUM3Riw4Q0FBNEQ7Ozs7OztJQU01RCx5Q0FBd0U7O0lBRXhFLDRDQUFxQjs7SUFDckIseUNBQWtCOztJQUVOLHVDQUFrQzs7Ozs7QUFpSmhELGdEQUFrRjs7O0lBQXBDLG1EQUFzQjs7SUFBQyx3Q0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBHdlN1YmZpZWxkUGFnZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBVIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBBY3Rpb25zT2JzZXJ2YWJsZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZEFjdGlvbk1ldGEgeyBhZGRQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyIH1cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZFZlcnNpb25BY3Rpb24gZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7IHBrRW50aXR5OiBudW1iZXIsIGVudGl0eVZlcnNpb246IG51bWJlciB9O1xuZXhwb3J0IGludGVyZmFjZSBMb2FkQnlQa0FuZFZlcnNpb25BY3Rpb25NZXRhIHsgYWRkUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlciwgcGtFbnRpdHk6IG51bWJlciwgdmVyc2lvbjogbnVtYmVyIH1cblxuZXhwb3J0IGludGVyZmFjZSBNb2RpZnlBY3Rpb25NZXRhPE1vZGVsPiB7IGl0ZW1zOiBNb2RlbFtdLCBhZGRQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyIH1cbmV4cG9ydCBpbnRlcmZhY2UgU3VjY2VlZEFjdGlvbk1ldGE8TW9kZWw+IHsgaXRlbXM6IE1vZGVsW10sIHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIgfVxuZXhwb3J0IGludGVyZmFjZSBGYWlsQWN0aW9uTWV0YSB7IHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIgfVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2luYXRlQnlQYXJhbSB7IFtrZXk6IHN0cmluZ106IG51bWJlciB8IGJvb2xlYW4gfCBzdHJpbmcgfVxuZXhwb3J0IGludGVyZmFjZSBMb2FkUGFnZU1ldGEgeyBwYWdlOiBHdlN1YmZpZWxkUGFnZSwgcGs/OiBudW1iZXIgfVxuZXhwb3J0IGludGVyZmFjZSBMb2FkUGFnZVN1Y2NlZWRlZE1ldGEgeyBwa3M6IG51bWJlcltdLCBjb3VudDogbnVtYmVyLCBwYWdlOiBHdlN1YmZpZWxkUGFnZSwgcGs/OiBudW1iZXIgfVxuXG5cblxuZXhwb3J0IGludGVyZmFjZSBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPE1vZGVsPiB7IHBlbmRpbmckOiBPYnNlcnZhYmxlPGJvb2xlYW4+LCByZXNvbHZlZCQ6IE9ic2VydmFibGU8U3VjY2VlZEFjdGlvbk1ldGE8TW9kZWw+Piwga2V5OiBzdHJpbmcgfVxuXG5leHBvcnQgdHlwZSBGbHV4QWN0aW9uT2JzZXJ2YWJsZTxQYXlsb2FkLCBNZXRhPiA9IEFjdGlvbnNPYnNlcnZhYmxlPEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNZXRhPj5cblxuXG5cbi8qKlxuICogQTogU2NoZW1hIEFjdGlvbiBUeXBlIChlLmcuIERmaEFjdGlvbilcbiAqIE06IE1vZGVsIGZvciB3aGl0Y2ggdGhlIEFjdGlvbnMgYXJlIHByb2R1Y2VkXG4gKi9cblxuZXhwb3J0IGNsYXNzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIE1vZGVsPiB7XG5cbiAgbG9hZDogKHN1ZmZpeD86IHN0cmluZywgcGs/OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8TW9kZWw+O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGsgaXMgdXNlZCBmb3IgZmFjZXR0aW5nXG4gICAqL1xuICBsb2FkU3VjY2VlZGVkOiAoaXRlbXM6IE1vZGVsW10sIHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwayBpcyB1c2VkIGZvciBmYWNldHRpbmdcbiAgICovXG4gIHVwc2VydDogKGl0ZW1zOiBQYXJ0aWFsPE1vZGVsPltdLCBwaz86IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxNb2RlbD47XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBwayBpcyB1c2VkIGZvciBmYWNldHRpbmdcbiAgICovXG4gIHVwc2VydFN1Y2NlZWRlZDogKGl0ZW1zOiBNb2RlbFtdLCByZW1vdmVQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGsgaXMgdXNlZCBmb3IgZmFjZXR0aW5nXG4gICAqL1xuICBkZWxldGU6IChpdGVtczogTW9kZWxbXSwgcGs/OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8TW9kZWw+O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gcGsgaXMgdXNlZCBmb3IgZmFjZXR0aW5nXG4gICAqL1xuICBkZWxldGVTdWNjZWVkZWQ6IChpdGVtczogTW9kZWxbXSwgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlcikgPT4gdm9pZDtcblxuICAvKipcbiAgICogQHBhcmFtIHBrIGlzIHVzZWQgZm9yIGZhY2V0dGluZ1xuICAgKi9cbiAgZmFpbGVkOiAoZXJyb3IsIHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIpID0+IHZvaWQ7XG5cblxuICAvKipcbiAgICogQHBhcmFtIHBrIGlzIHVzZWQgZm9yIGZhY2V0dGluZ1xuICAgKi9cbiAgbG9hZFBhZ2U6IChwYWdlOiBHdlN1YmZpZWxkUGFnZSwgcGs/OiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgLyoqXG4gKiBAcGFyYW0gcGsgaXMgdXNlZCBmb3IgZmFjZXR0aW5nXG4gKi9cbiAgbG9hZFBhZ2VTdWNjZWVkZWQ6IChwa3M6IG51bWJlcltdLCBjb3VudDogbnVtYmVyLCBwYWdlOiBHdlN1YmZpZWxkUGFnZSwgcGs/OiBudW1iZXIpID0+IHZvaWQ7XG4gIGxvYWRQYWdlRmFpbGVkOiAocGFnZTogR3ZTdWJmaWVsZFBhZ2UsIHBrPzogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiB0aGlzIGFjdGlvbiBpcyBub3QgbW9kZWwgc3BlY2lmaWMgYnV0IHBlbmRpbmdLZXkgc3BlY2lmaWMuXG4gICAqIFJlZHVjZXIgd2lsbCBhZGQgd2hvbGUgbWV0YSBwYXJ0IHRvIHRoZSByZXNvbHZlZCBrZXkuXG4gICAqL1xuICBzdWNjZWVkZWQ6IChpdGVtczogTW9kZWxbXSwgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlcikgPT4gdm9pZDtcblxuICBhY3Rpb25QcmVmaXg6IHN0cmluZztcbiAgbW9kZWxOYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikge1xuICB9XG5cblxuICBjcmVhdGVDcnVkQWN0aW9ucyhhY3Rpb25QcmVmaXg6IHN0cmluZywgbW9kZWxOYW1lOiBzdHJpbmcpOiBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBNb2RlbD4ge1xuICAgIHRoaXMuYWN0aW9uUHJlZml4ID0gYWN0aW9uUHJlZml4O1xuICAgIHRoaXMubW9kZWxOYW1lID0gbW9kZWxOYW1lO1xuXG4gICAgdGhpcy5sb2FkID0gKHN1ZmZpeDogc3RyaW5nID0gJycsIHBrPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRBY3Rpb25NZXRhPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgKHN1ZmZpeCA/ICc6OicgKyBzdWZmaXggOiAnJyksXG4gICAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8TW9kZWw+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkU3VjY2VlZGVkID0gKGl0ZW1zOiBNb2RlbFtdLCByZW1vdmVQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBTdWNjZWVkQWN0aW9uTWV0YTxNb2RlbD4+ID0gKHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQURfU1VDQ0VFREVEJyxcbiAgICAgICAgbWV0YTogeyBpdGVtcywgcmVtb3ZlUGVuZGluZywgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbCB0aGUgUmVkdXggQWN0aW9uIHRvIHVwc2VydCBtb2RlbCBpbnN0YW5jZXMuXG4gICAgICovXG4gICAgdGhpcy51cHNlcnQgPSAoaXRlbXM6IE1vZGVsW10sIHBrPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKCk7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNb2RpZnlBY3Rpb25NZXRhPE1vZGVsPj4gPSAoe1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6VVBTRVJUJyxcbiAgICAgICAgbWV0YTogeyBpdGVtcywgYWRkUGVuZGluZywgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxNb2RlbD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLnVwc2VydFN1Y2NlZWRlZCA9IChpdGVtczogTW9kZWxbXSwgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgU3VjY2VlZEFjdGlvbk1ldGE8TW9kZWw+PiA9ICh7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpVUFNFUlRfU1VDQ0VFREVEJyxcbiAgICAgICAgbWV0YTogeyBpdGVtcywgcmVtb3ZlUGVuZGluZywgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdGhpcyBhY3Rpb24gaXMgbm90IG1vZGVsIHNwZWNpZmljIGJ1dCBwZW5kaW5nS2V5IHNwZWNpZmljLlxuICAgICAqIFJlZHVjZXIgd2lsbCBhZGQgd2hvbGUgbWV0YSBwYXJ0IHRvIHRoZSByZXNvbHZlZCBrZXlcbiAgICAgKi9cbiAgICB0aGlzLnN1Y2NlZWRlZCA9IChpdGVtczogTW9kZWxbXSwgcmVtb3ZlUGVuZGluZzogc3RyaW5nLCBwaz86IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgU3VjY2VlZEFjdGlvbk1ldGE8TW9kZWw+PiA9ICh7XG4gICAgICAgIHR5cGU6ICdnZW5lcmFsOjpVUFNFUlRfU1VDQ0VFREVEJyxcbiAgICAgICAgbWV0YTogeyBpdGVtcywgcmVtb3ZlUGVuZGluZywgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAqIENhbGwgdGhlIFJlZHV4IEFjdGlvbiB0byBkZWxldGUgbW9kZWwgaW5zdGFuY2VzLlxuICAgICovXG4gICAgdGhpcy5kZWxldGUgPSAoaXRlbXM6IE1vZGVsW10sIHBrPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKCk7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNb2RpZnlBY3Rpb25NZXRhPE1vZGVsPj4gPSAoe1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6REVMRVRFJyxcbiAgICAgICAgbWV0YTogeyBpdGVtcywgYWRkUGVuZGluZywgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxNb2RlbD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSkucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMuZGVsZXRlU3VjY2VlZGVkID0gKGl0ZW1zOiBNb2RlbFtdLCByZW1vdmVQZW5kaW5nOiBzdHJpbmcsIHBrPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBTdWNjZWVkQWN0aW9uTWV0YTxNb2RlbD4+ID0gKHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkRFTEVURV9TVUNDRUVERUQnLFxuICAgICAgICBtZXRhOiB7IGl0ZW1zLCByZW1vdmVQZW5kaW5nLCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsXG4gICAgICB9KVxuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICB9XG5cblxuXG4gICAgdGhpcy5mYWlsZWQgPSAoZXJyb3IsIHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIEZhaWxBY3Rpb25NZXRhPiA9ICh7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpGQUlMRUQnLFxuICAgICAgICBtZXRhOiB7IHJlbW92ZVBlbmRpbmcsIHBrIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICAgIGVycm9yLFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgfVxuXG5cbiAgICB0aGlzLmxvYWRQYWdlID0gKHBhZ2U6IEd2U3ViZmllbGRQYWdlLCBwaz86IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZFBhZ2VNZXRhPiA9ICh7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEX1BBR0UnLFxuICAgICAgICBtZXRhOiB7IHBhZ2UsIHBrIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9KVxuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRQYWdlU3VjY2VlZGVkID0gKHBrczogbnVtYmVyW10sIGNvdW50OiBudW1iZXIsIHBhZ2U6IEd2U3ViZmllbGRQYWdlLCBwaz86IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTG9hZFBhZ2VTdWNjZWVkZWRNZXRhPiA9ICh7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEX1BBR0VfU1VDQ0VFREVEJyxcbiAgICAgICAgbWV0YTogeyBwYWdlLCBwa3MsIGNvdW50LCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfSlcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgfVxuXG4gICAgdGhpcy5sb2FkUGFnZUZhaWxlZCA9IChwYWdlOiBHdlN1YmZpZWxkUGFnZSwgcGs/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIExvYWRQYWdlTWV0YT4gPSAoe1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRF9QQUdFX0ZBSUxFRCcsXG4gICAgICAgIG1ldGE6IHsgcGFnZSwgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH0pXG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTY2hlbWFPYmplY3RMb2FkQWN0aW9uTWV0YSB7IHJlbW92ZVBlbmRpbmc6IHN0cmluZywgcGs/OiBudW1iZXIgfVxuIl19