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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLWVwaWMtZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9faGVscGVycy9pbmYtZXBpYy1mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFFNUQsTUFBTSxPQUFPLGVBQWdDLFNBQVEsa0JBQWtDOzs7Ozs7Ozs7SUFDckYsWUFDUyxZQUFvQixFQUNwQixTQUFpQixFQUNqQixPQUF5QyxFQUN6QyxhQUFzQyxFQUN0QyxjQUFpQyxFQUNqQyxVQUFzQjtRQUU3QixLQUFLLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFQL0MsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFrQztRQUN6QyxrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFDdEMsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLGVBQVUsR0FBVixVQUFVLENBQVk7SUFHL0IsQ0FBQzs7Ozs7Ozs7OztJQU9ELGdCQUFnQixDQUFJLEtBQXVDLEVBQUUsYUFBNEM7UUFDdkc7Ozs7O1FBQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDeEIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVks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MkI7O0lBQzNCLG9DQUF3Qjs7SUFDeEIsa0NBQWdEOztJQUNoRCx3Q0FBNkM7O0lBQzdDLHlDQUF3Qzs7SUFDeEMscUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvSW5mb1Byb2pSZWwsIFByb0luZm9Qcm9qUmVsQXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IHBhdGhPciB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFByb0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3Byby5hY3Rpb25zJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IEluZkFjdGlvbkZhY3RvcnkgfSBmcm9tICcuL2luZi1hY3Rpb24tZmFjdG9yeSc7XG5pbXBvcnQgeyBNb2RpZnlBY3Rpb25NZXRhIH0gZnJvbSAnLi9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcbmltcG9ydCB7IFNjaGVtYUVwaWNzRmFjdG9yeSB9IGZyb20gJy4vc2NoZW1hLWVwaWNzLWZhY3RvcnknO1xuXG5leHBvcnQgY2xhc3MgSW5mRXBpY3NGYWN0b3J5PFBheWxvYWQsIE1vZGVsPiBleHRlbmRzIFNjaGVtYUVwaWNzRmFjdG9yeTxQYXlsb2FkLCBNb2RlbD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgYWN0aW9uUHJlZml4OiBzdHJpbmcsXG4gICAgcHVibGljIG1vZGVsTmFtZTogc3RyaW5nLFxuICAgIHB1YmxpYyBhY3Rpb25zOiBJbmZBY3Rpb25GYWN0b3J5PFBheWxvYWQsIE1vZGVsPixcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uczogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHVibGljIGluZm9Qcm9qUmVsQXBpOiBQcm9JbmZvUHJvalJlbEFwaSxcbiAgICBwdWJsaWMgcHJvQWN0aW9uczogUHJvQWN0aW9uc1xuICApIHtcbiAgICBzdXBlcihhY3Rpb25QcmVmaXgsIG1vZGVsTmFtZSwgYWN0aW9ucywgbm90aWZpY2F0aW9ucylcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHVwc2VydCBlcGljIG92ZXJyaWRlcyB0aGUgc3RhbmRhcmQgdXBzZXJ0LlxuICAgKiBJbiBhZGRpdGlvbiB0byB0aGUgc3RhbmRhcmQsIGl0IGV4dGVuZHMgdGhlIGl0ZW1zIHRvIHVwc2VydCwgc28gdGhhdFxuICAgKiB0aGV5IGFyZSBhZGRlZCB0byB0aGUgcHJvamVjdC5cbiAgICovXG4gIGNyZWF0ZVVwc2VydEVwaWM8VD4oYXBpRm46IChtZXRhOiBUKSA9PiBPYnNlcnZhYmxlPE1vZGVsW10+LCBvblN1Y2Nlc3NIb29rPzogKGRhdGE6IE1vZGVsW10sIHBrPykgPT4gdm9pZCkge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZSh0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6VVBTRVJUJyksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNb2RpZnlBY3Rpb25NZXRhPE1vZGVsPj4pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbEFjdGlvbnMpID0+IHtcbiAgICAgICAgICBjb25zdCBwZW5kaW5nS2V5ID0gYWN0aW9uLm1ldGEuYWRkUGVuZGluZztcblxuICAgICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YSBhcyBhbnk7XG4gICAgICAgICAgLy8gYWRkIGlzX2luX3Byb2plY3QgdHJ1ZVxuXG4gICAgICAgICAgbWV0YS5pdGVtcyA9IG1ldGEuaXRlbXMubWFwKGkgPT4gKHtcbiAgICAgICAgICAgIC4uLmksIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVsczogW3tcbiAgICAgICAgICAgICAgLi4ucGF0aE9yKHt9LCBbJ2VudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscycsIDBdLCBpKSxcbiAgICAgICAgICAgICAgaXNfaW5fcHJvamVjdDogdHJ1ZSxcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfSkpXG5cbiAgICAgICAgICBhcGlGbihtZXRhKS5zdWJzY3JpYmUoKGRhdGE6IE1vZGVsW10pID0+IHtcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3NIb29rKSB7XG4gICAgICAgICAgICAgIG9uU3VjY2Vzc0hvb2soZGF0YSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuc3VjY2VlZGVkKGRhdGEsIHBlbmRpbmdLZXksIGFjdGlvbi5tZXRhLnBrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMudXBzZXJ0U3VjY2VlZGVkKGRhdGEsIHBlbmRpbmdLZXksIGFjdGlvbi5tZXRhLnBrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBnbG9iYWxBY3Rpb25zLm5leHQodGhpcy5ub3RpZmljYXRpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IubWVzc2FnZSB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuZmFpbGVkKHsgc3RhdHVzOiAnJyArIGVycm9yLnN0YXR1cyB9LCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGVwaWMgbWFwcyB0aGUgaXRlbXMgdG8gcmVtb3ZlIGluIG1pbmltYWxpc2ljIGluc3RhbmNlcyBvZlxuICAgKiBJbmZvUHJvalJlbCwgY29udGFpbmluZyBvbmx5IHRoZSBma19lbnRpdHkgYW5kIGlzX2luX3Byb2plY3Q9ZmFsc2UuXG4gICAqIFRoZSBwayBvZiB0aGUgcHJvamVjdCwgdGhhdCByZW1vdmVzIHRoZSBpdGVtcywgaXMgdHJhbnNwb3J0ZWQgaW4gbWV0YS5way5cbiAgICovXG4gIGNyZWF0ZVJlbW92ZUVwaWMoKSB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpSRU1PVkUnKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1vZGlmeUFjdGlvbk1ldGE8TW9kZWw+PikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsQWN0aW9ucykgPT4ge1xuICAgICAgICAgIGNvbnN0IHBlbmRpbmdLZXkgPSBhY3Rpb24ubWV0YS5hZGRQZW5kaW5nO1xuXG4gICAgICAgICAgdGhpcy5pbmZvUHJvalJlbEFwaS5idWxrVXBkYXRlRXByQXR0cmlidXRlcyhcbiAgICAgICAgICAgIGFjdGlvbi5tZXRhLnBrLFxuICAgICAgICAgICAgYWN0aW9uLm1ldGEuaXRlbXMubWFwKChpdGVtOiBhbnkpID0+ICh7XG4gICAgICAgICAgICAgIGZrX2VudGl0eTogaXRlbS5wa19lbnRpdHksXG4gICAgICAgICAgICAgIGlzX2luX3Byb2plY3Q6IGZhbHNlXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChpbmZvUHJvalJlbHM6IFByb0luZm9Qcm9qUmVsW10pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGluZm9Qcm9qUmVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb0FjdGlvbnMuaW5mb19wcm9qX3JlbC51cHNlcnRTdWNjZWVkZWQoaW5mb1Byb2pSZWxzLCB1bmRlZmluZWQsIGFjdGlvbi5tZXRhLnBrKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5yZW1vdmVTdWNjZWVkZWQoYWN0aW9uLm1ldGEuaXRlbXMsIHBlbmRpbmdLZXksIGFjdGlvbi5tZXRhLnBrKVxuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICBnbG9iYWxBY3Rpb25zLm5leHQodGhpcy5ub3RpZmljYXRpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yLm1lc3NhZ2UgfVxuICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5mYWlsZWQoeyBzdGF0dXM6ICcnICsgZXJyb3Iuc3RhdHVzIH0sIHBlbmRpbmdLZXksIGFjdGlvbi5tZXRhLnBrKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkpXG5cbiAgICAgIClcbiAgICB9XG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIFRoaXMgdXBzZXJ0IGVwaWMgb3ZlcnJpZGVzIHRoZSBzdGFuZGFyZCB1cHNlcnQuXG4gICAqIEluIGFkZGl0aW9uIHRvIHRoZSBzdGFuZGFyZCwgaXQgZXh0ZW5kcyB0aGUgaXRlbXMgdG8gdXBzZXJ0LCBzbyB0aGF0XG4gICAqIHRoZXkgYXJlIGFkZGVkIHRvIHRoZSBwcm9qZWN0LlxuICAgKi9cbiAgY3JlYXRlQ3VzdG9tVXBzZXJ0RXBpYzxUPihhcGlGbjogKG1ldGE6IFQpID0+IE9ic2VydmFibGU8TW9kZWxbXT4sIGFjdGlvblN1ZmZpeDogc3RyaW5nLCBvblN1Y2Nlc3NIb29rPzogKGRhdGE6IE1vZGVsW10sIHBrPykgPT4gdm9pZCkge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZSh0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6VVBTRVJUJyArIChhY3Rpb25TdWZmaXggPyAnOjonICsgYWN0aW9uU3VmZml4IDogJycpKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1vZGlmeUFjdGlvbk1ldGE8TW9kZWw+PikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsQWN0aW9ucykgPT4ge1xuICAgICAgICAgIGNvbnN0IHBlbmRpbmdLZXkgPSBhY3Rpb24ubWV0YS5hZGRQZW5kaW5nO1xuICAgICAgICAgIGNvbnN0IG1ldGEgPSBhY3Rpb24ubWV0YSBhcyBhbnk7XG4gICAgICAgICAgYXBpRm4obWV0YSkuc3Vic2NyaWJlKChkYXRhOiBNb2RlbFtdKSA9PiB7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzSG9vaykge1xuICAgICAgICAgICAgICBvblN1Y2Nlc3NIb29rKGRhdGEsIGFjdGlvbi5tZXRhLnBrKTtcbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnVwc2VydFN1Y2NlZWRlZChbXSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy51cHNlcnRTdWNjZWVkZWQoZGF0YSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGdsb2JhbEFjdGlvbnMubmV4dCh0aGlzLm5vdGlmaWNhdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvci5tZXNzYWdlIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5mYWlsZWQoeyBzdGF0dXM6ICcnICsgZXJyb3Iuc3RhdHVzIH0sIHBlbmRpbmdLZXksIGFjdGlvbi5tZXRhLnBrKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkpKTtcbiAgICB9O1xuICB9XG5cbn1cbiJdfQ==