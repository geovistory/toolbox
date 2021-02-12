/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/inf-epic-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { pathOr } from 'ramda';
import { ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { SchemaEpicsFactory } from './schema-epics-factory';
/**
 * @template Payload, Model
 */
export class InfEpicsFactory extends SchemaEpicsFactory {
    /**
     * @param {?} actionPrefix
     * @param {?} modelName
     * @param {?} actions
     * @param {?} notifications
     * @param {?} infoProjRelApi
     * @param {?} proActions
     */
    constructor(actionPrefix, modelName, actions, notifications, infoProjRelApi, proActions) {
        super(actionPrefix, modelName, actions, notifications);
        this.actionPrefix = actionPrefix;
        this.modelName = modelName;
        this.actions = actions;
        this.notifications = notifications;
        this.infoProjRelApi = infoProjRelApi;
        this.proActions = proActions;
    }
    /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
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
                const meta = (/** @type {?} */ (action.meta));
                // add is_in_project true
                meta.items = meta.items.map((/**
                 * @param {?} i
                 * @return {?}
                 */
                i => (Object.assign({}, i, { entity_version_project_rels: [Object.assign({}, pathOr({}, ['entity_version_project_rels', 0], i), { is_in_project: true })] }))));
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
                    globalActions.next(this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                }));
            })))));
        });
    }
    /**
     * This epic maps the items to remove in minimalisic instances of
     * InfoProjRel, containing only the fk_entity and is_in_project=false.
     * The pk of the project, that removes the items, is transported in meta.pk.
     * @return {?}
     */
    createRemoveEpic() {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::REMOVE'), mergeMap((/**
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
                this.infoProjRelApi.bulkUpdateEprAttributes(action.meta.pk, action.meta.items.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => ({
                    fk_entity: item.pk_entity,
                    is_in_project: false
                }))))
                    .subscribe((/**
                 * @param {?} infoProjRels
                 * @return {?}
                 */
                (infoProjRels) => {
                    if (infoProjRels.length) {
                        this.proActions.info_proj_rel.upsertSucceeded(infoProjRels, undefined, action.meta.pk);
                    }
                    this.actions.removeSucceeded(action.meta.items, pendingKey, action.meta.pk);
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    globalActions.next(this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                }));
            })))));
        });
    }
    /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     * @template T
     * @param {?} apiFn
     * @param {?} actionSuffix
     * @param {?=} onSuccessHook
     * @return {?}
     */
    createCustomUpsertEpic(apiFn, actionSuffix, onSuccessHook) {
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT' + (actionSuffix ? '::' + actionSuffix : '')), mergeMap((/**
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
                const meta = (/** @type {?} */ (action.meta));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk);
                        this.actions.upsertSucceeded([], pendingKey, action.meta.pk);
                    }
                    else {
                        this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    globalActions.next(this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                }));
            })))));
        });
    }
}
if (false) {
    /** @type {?} */
    InfEpicsFactory.prototype.actionPrefix;
    /** @type {?} */
    InfEpicsFactory.prototype.modelName;
    /** @type {?} */
    InfEpicsFactory.prototype.actions;
    /** @type {?} */
    InfEpicsFactory.prototype.notifications;
    /** @type {?} */
    InfEpicsFactory.prototype.infoProjRelApi;
    /** @type {?} */
    InfEpicsFactory.prototype.proActions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLWVwaWMtZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9faGVscGVycy9pbmYtZXBpYy1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFFNUQsTUFBTSxPQUFPLGVBQWdDLFNBQVEsa0JBQWtDOzs7Ozs7Ozs7SUFDckYsWUFDUyxZQUFvQixFQUNwQixTQUFpQixFQUNqQixPQUF5QyxFQUN6QyxhQUFzQyxFQUN0QyxjQUFpQyxFQUNqQyxVQUFzQjtRQUU3QixLQUFLLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFQL0MsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFrQztRQUN6QyxrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFDdEMsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLGVBQVUsR0FBVixVQUFVLENBQVk7SUFHL0IsQ0FBQzs7Ozs7Ozs7OztJQU9ELGdCQUFnQixDQUFJLEtBQXVDLEVBQUUsYUFBNEM7UUFDdkc7Ozs7O1FBQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDeEIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVks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MkI7O0lBQzNCLG9DQUF3Qjs7SUFDeEIsa0NBQWdEOztJQUNoRCx3Q0FBNkM7O0lBQzdDLHlDQUF3Qzs7SUFDeEMscUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvSW5mb1Byb2pSZWwsIFByb0luZm9Qcm9qUmVsQXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IHBhdGhPciB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFByb0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMnO1xuaW1wb3J0IHsgSW5mQWN0aW9uRmFjdG9yeSB9IGZyb20gJy4vaW5mLWFjdGlvbi1mYWN0b3J5JztcbmltcG9ydCB7IE1vZGlmeUFjdGlvbk1ldGEgfSBmcm9tICcuL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuaW1wb3J0IHsgU2NoZW1hRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi9zY2hlbWEtZXBpY3MtZmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBJbmZFcGljc0ZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+IGV4dGVuZHMgU2NoZW1hRXBpY3NGYWN0b3J5PFBheWxvYWQsIE1vZGVsPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBhY3Rpb25QcmVmaXg6IHN0cmluZyxcbiAgICBwdWJsaWMgbW9kZWxOYW1lOiBzdHJpbmcsXG4gICAgcHVibGljIGFjdGlvbnM6IEluZkFjdGlvbkZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+LFxuICAgIHB1YmxpYyBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwdWJsaWMgaW5mb1Byb2pSZWxBcGk6IFByb0luZm9Qcm9qUmVsQXBpLFxuICAgIHB1YmxpYyBwcm9BY3Rpb25zOiBQcm9BY3Rpb25zXG4gICkge1xuICAgIHN1cGVyKGFjdGlvblByZWZpeCwgbW9kZWxOYW1lLCBhY3Rpb25zLCBub3RpZmljYXRpb25zKVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgdXBzZXJ0IGVwaWMgb3ZlcnJpZGVzIHRoZSBzdGFuZGFyZCB1cHNlcnQuXG4gICAqIEluIGFkZGl0aW9uIHRvIHRoZSBzdGFuZGFyZCwgaXQgZXh0ZW5kcyB0aGUgaXRlbXMgdG8gdXBzZXJ0LCBzbyB0aGF0XG4gICAqIHRoZXkgYXJlIGFkZGVkIHRvIHRoZSBwcm9qZWN0LlxuICAgKi9cbiAgY3JlYXRlVXBzZXJ0RXBpYzxUPihhcGlGbjogKG1ldGE6IFQpID0+IE9ic2VydmFibGU8TW9kZWxbXT4sIG9uU3VjY2Vzc0hvb2s/OiAoZGF0YTogTW9kZWxbXSwgcGs/KSA9PiB2b2lkKSB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpVUFNFUlQnKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1vZGlmeUFjdGlvbk1ldGE8TW9kZWw+PikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsQWN0aW9ucykgPT4ge1xuICAgICAgICAgIGNvbnN0IHBlbmRpbmdLZXkgPSBhY3Rpb24ubWV0YS5hZGRQZW5kaW5nO1xuXG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhIGFzIGFueTtcbiAgICAgICAgICAvLyBhZGQgaXNfaW5fcHJvamVjdCB0cnVlXG5cbiAgICAgICAgICBtZXRhLml0ZW1zID0gbWV0YS5pdGVtcy5tYXAoaSA9PiAoe1xuICAgICAgICAgICAgLi4uaSwgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzOiBbe1xuICAgICAgICAgICAgICAuLi5wYXRoT3Ioe30sIFsnZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzJywgMF0sIGkpLFxuICAgICAgICAgICAgICBpc19pbl9wcm9qZWN0OiB0cnVlLFxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9KSlcblxuICAgICAgICAgIGFwaUZuKG1ldGEpLnN1YnNjcmliZSgoZGF0YTogTW9kZWxbXSkgPT4ge1xuICAgICAgICAgICAgaWYgKG9uU3VjY2Vzc0hvb2spIHtcbiAgICAgICAgICAgICAgb25TdWNjZXNzSG9vayhkYXRhLCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5zdWNjZWVkZWQoZGF0YSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy51cHNlcnRTdWNjZWVkZWQoZGF0YSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGdsb2JhbEFjdGlvbnMubmV4dCh0aGlzLm5vdGlmaWNhdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvci5tZXNzYWdlIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5mYWlsZWQoeyBzdGF0dXM6ICcnICsgZXJyb3Iuc3RhdHVzIH0sIHBlbmRpbmdLZXksIGFjdGlvbi5tZXRhLnBrKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkpKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZXBpYyBtYXBzIHRoZSBpdGVtcyB0byByZW1vdmUgaW4gbWluaW1hbGlzaWMgaW5zdGFuY2VzIG9mXG4gICAqIEluZm9Qcm9qUmVsLCBjb250YWluaW5nIG9ubHkgdGhlIGZrX2VudGl0eSBhbmQgaXNfaW5fcHJvamVjdD1mYWxzZS5cbiAgICogVGhlIHBrIG9mIHRoZSBwcm9qZWN0LCB0aGF0IHJlbW92ZXMgdGhlIGl0ZW1zLCBpcyB0cmFuc3BvcnRlZCBpbiBtZXRhLnBrLlxuICAgKi9cbiAgY3JlYXRlUmVtb3ZlRXBpYygpIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUodGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OlJFTU9WRScpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTW9kaWZ5QWN0aW9uTWV0YTxNb2RlbD4+KSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxBY3Rpb25zKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGVuZGluZ0tleSA9IGFjdGlvbi5tZXRhLmFkZFBlbmRpbmc7XG5cbiAgICAgICAgICB0aGlzLmluZm9Qcm9qUmVsQXBpLmJ1bGtVcGRhdGVFcHJBdHRyaWJ1dGVzKFxuICAgICAgICAgICAgYWN0aW9uLm1ldGEucGssXG4gICAgICAgICAgICBhY3Rpb24ubWV0YS5pdGVtcy5tYXAoKGl0ZW06IGFueSkgPT4gKHtcbiAgICAgICAgICAgICAgZmtfZW50aXR5OiBpdGVtLnBrX2VudGl0eSxcbiAgICAgICAgICAgICAgaXNfaW5fcHJvamVjdDogZmFsc2VcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGluZm9Qcm9qUmVsczogUHJvSW5mb1Byb2pSZWxbXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoaW5mb1Byb2pSZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvQWN0aW9ucy5pbmZvX3Byb2pfcmVsLnVwc2VydFN1Y2NlZWRlZChpbmZvUHJvalJlbHMsIHVuZGVmaW5lZCwgYWN0aW9uLm1ldGEucGspXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnJlbW92ZVN1Y2NlZWRlZChhY3Rpb24ubWV0YS5pdGVtcywgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspXG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGdsb2JhbEFjdGlvbnMubmV4dCh0aGlzLm5vdGlmaWNhdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IubWVzc2FnZSB9XG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmZhaWxlZCh7IHN0YXR1czogJycgKyBlcnJvci5zdGF0dXMgfSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KSlcblxuICAgICAgKVxuICAgIH1cbiAgfVxuXG5cblxuICAvKipcbiAgICogVGhpcyB1cHNlcnQgZXBpYyBvdmVycmlkZXMgdGhlIHN0YW5kYXJkIHVwc2VydC5cbiAgICogSW4gYWRkaXRpb24gdG8gdGhlIHN0YW5kYXJkLCBpdCBleHRlbmRzIHRoZSBpdGVtcyB0byB1cHNlcnQsIHNvIHRoYXRcbiAgICogdGhleSBhcmUgYWRkZWQgdG8gdGhlIHByb2plY3QuXG4gICAqL1xuICBjcmVhdGVDdXN0b21VcHNlcnRFcGljPFQ+KGFwaUZuOiAobWV0YTogVCkgPT4gT2JzZXJ2YWJsZTxNb2RlbFtdPiwgYWN0aW9uU3VmZml4OiBzdHJpbmcsIG9uU3VjY2Vzc0hvb2s/OiAoZGF0YTogTW9kZWxbXSwgcGs/KSA9PiB2b2lkKSB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpVUFNFUlQnICsgKGFjdGlvblN1ZmZpeCA/ICc6OicgKyBhY3Rpb25TdWZmaXggOiAnJykpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTW9kaWZ5QWN0aW9uTWV0YTxNb2RlbD4+KSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxBY3Rpb25zKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGVuZGluZ0tleSA9IGFjdGlvbi5tZXRhLmFkZFBlbmRpbmc7XG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhIGFzIGFueTtcbiAgICAgICAgICBhcGlGbihtZXRhKS5zdWJzY3JpYmUoKGRhdGE6IE1vZGVsW10pID0+IHtcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3NIb29rKSB7XG4gICAgICAgICAgICAgIG9uU3VjY2Vzc0hvb2soZGF0YSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMudXBzZXJ0U3VjY2VlZGVkKFtdLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnVwc2VydFN1Y2NlZWRlZChkYXRhLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsQWN0aW9ucy5uZXh0KHRoaXMubm90aWZpY2F0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yLm1lc3NhZ2UgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmZhaWxlZCh7IHN0YXR1czogJycgKyBlcnJvci5zdGF0dXMgfSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSkpO1xuICAgIH07XG4gIH1cblxufVxuIl19