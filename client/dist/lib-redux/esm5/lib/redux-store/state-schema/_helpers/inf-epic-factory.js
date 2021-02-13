/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/inf-epic-factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { pathOr } from 'ramda';
import { ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { SchemaEpicsFactory } from './schema-epics-factory';
/**
 * @template Payload, Model
 */
var /**
 * @template Payload, Model
 */
InfEpicsFactory = /** @class */ (function (_super) {
    tslib_1.__extends(InfEpicsFactory, _super);
    function InfEpicsFactory(actionPrefix, modelName, actions, notifications, infoProjRelApi, proActions) {
        var _this = _super.call(this, actionPrefix, modelName, actions, notifications) || this;
        _this.actionPrefix = actionPrefix;
        _this.modelName = modelName;
        _this.actions = actions;
        _this.notifications = notifications;
        _this.infoProjRelApi = infoProjRelApi;
        _this.proActions = proActions;
        return _this;
    }
    /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     */
    /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     * @template T
     * @param {?} apiFn
     * @param {?=} onSuccessHook
     * @return {?}
     */
    InfEpicsFactory.prototype.createUpsertEpic = /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
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
                var meta = (/** @type {?} */ (action.meta));
                // add is_in_project true
                meta.items = meta.items.map((/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) { return (tslib_1.__assign({}, i, { entity_version_project_rels: [tslib_1.__assign({}, pathOr({}, ['entity_version_project_rels', 0], i), { is_in_project: true })] })); }));
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
                    globalActions.next(_this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    _this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                }));
            })); })));
        });
    };
    /**
     * This epic maps the items to remove in minimalisic instances of
     * InfoProjRel, containing only the fk_entity and is_in_project=false.
     * The pk of the project, that removes the items, is transported in meta.pk.
     */
    /**
     * This epic maps the items to remove in minimalisic instances of
     * InfoProjRel, containing only the fk_entity and is_in_project=false.
     * The pk of the project, that removes the items, is transported in meta.pk.
     * @return {?}
     */
    InfEpicsFactory.prototype.createRemoveEpic = /**
     * This epic maps the items to remove in minimalisic instances of
     * InfoProjRel, containing only the fk_entity and is_in_project=false.
     * The pk of the project, that removes the items, is transported in meta.pk.
     * @return {?}
     */
    function () {
        var _this = this;
        return (/**
         * @param {?} action$
         * @param {?} store
         * @return {?}
         */
        function (action$, store) {
            return action$.pipe(ofType(_this.actionPrefix + '.' + _this.modelName + '::REMOVE'), mergeMap((/**
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
                _this.infoProjRelApi.bulkUpdateEprAttributes(action.meta.pk, action.meta.items.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return ({
                    fk_entity: item.pk_entity,
                    is_in_project: false
                }); })))
                    .subscribe((/**
                 * @param {?} infoProjRels
                 * @return {?}
                 */
                function (infoProjRels) {
                    if (infoProjRels.length) {
                        _this.proActions.info_proj_rel.upsertSucceeded(infoProjRels, undefined, action.meta.pk);
                    }
                    _this.actions.removeSucceeded(action.meta.items, pendingKey, action.meta.pk);
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    globalActions.next(_this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    _this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                }));
            })); })));
        });
    };
    /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     */
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
    InfEpicsFactory.prototype.createCustomUpsertEpic = /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
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
            return action$.pipe(ofType(_this.actionPrefix + '.' + _this.modelName + '::UPSERT' + (actionSuffix ? '::' + actionSuffix : '')), mergeMap((/**
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
                var meta = (/** @type {?} */ (action.meta));
                apiFn(meta).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk);
                        _this.actions.upsertSucceeded([], pendingKey, action.meta.pk);
                    }
                    else {
                        _this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    globalActions.next(_this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    _this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                }));
            })); })));
        });
    };
    return InfEpicsFactory;
}(SchemaEpicsFactory));
/**
 * @template Payload, Model
 */
export { InfEpicsFactory };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLWVwaWMtZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL19oZWxwZXJzL2luZi1lcGljLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDckQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFFNUQ7Ozs7SUFBcUQsMkNBQWtDO0lBQ3JGLHlCQUNTLFlBQW9CLEVBQ3BCLFNBQWlCLEVBQ2pCLE9BQXlDLEVBQ3pDLGFBQXNDLEVBQ3RDLGNBQWlDLEVBQ2pDLFVBQXNCO1FBTi9CLFlBUUUsa0JBQU0sWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLFNBQ3ZEO1FBUlEsa0JBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsZUFBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixhQUFPLEdBQVAsT0FBTyxDQUFrQztRQUN6QyxtQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFDdEMsb0JBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLGdCQUFVLEdBQVYsVUFBVSxDQUFZOztJQUcvQixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7OztJQUNILDBDQUFnQjs7Ozs7Ozs7O0lBQWhCLFVBQW9CLEtBQXVDLEVBQUUsYUFBNEM7UUFBekcsaUJBa0NDO1FBakNDOzs7OztRQUFPLFVBQUMsT0FBTyxFQUFFLEtBQUs7WUFDcEIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUNqQixNQUFNLENBQUMsS0FB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UUFDVCxDQUFDLEVBQUM7SUFDSixDQUFDO0lBRUgsc0JBQUM7QUFBRCxDQUFDLEFBM0hELENBQXFELGtCQUFrQixHQTJIdEU7Ozs7Ozs7SUF6SEcsdUNBQTJCOztJQUMzQixvQ0FBd0I7O0lBQ3hCLGtDQUFnRDs7SUFDaEQsd0NBQTZDOztJQUM3Qyx5Q0FBd0M7O0lBQ3hDLHFDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb0luZm9Qcm9qUmVsLCBQcm9JbmZvUHJvalJlbEFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBwYXRoT3IgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBvZlR5cGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQcm9BY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9wcm8uYWN0aW9ucyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBJbmZBY3Rpb25GYWN0b3J5IH0gZnJvbSAnLi9pbmYtYWN0aW9uLWZhY3RvcnknO1xuaW1wb3J0IHsgTW9kaWZ5QWN0aW9uTWV0YSB9IGZyb20gJy4vc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5pbXBvcnQgeyBTY2hlbWFFcGljc0ZhY3RvcnkgfSBmcm9tICcuL3NjaGVtYS1lcGljcy1mYWN0b3J5JztcblxuZXhwb3J0IGNsYXNzIEluZkVwaWNzRmFjdG9yeTxQYXlsb2FkLCBNb2RlbD4gZXh0ZW5kcyBTY2hlbWFFcGljc0ZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGFjdGlvblByZWZpeDogc3RyaW5nLFxuICAgIHB1YmxpYyBtb2RlbE5hbWU6IHN0cmluZyxcbiAgICBwdWJsaWMgYWN0aW9uczogSW5mQWN0aW9uRmFjdG9yeTxQYXlsb2FkLCBNb2RlbD4sXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbnM6IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHB1YmxpYyBpbmZvUHJvalJlbEFwaTogUHJvSW5mb1Byb2pSZWxBcGksXG4gICAgcHVibGljIHByb0FjdGlvbnM6IFByb0FjdGlvbnNcbiAgKSB7XG4gICAgc3VwZXIoYWN0aW9uUHJlZml4LCBtb2RlbE5hbWUsIGFjdGlvbnMsIG5vdGlmaWNhdGlvbnMpXG4gIH1cblxuICAvKipcbiAgICogVGhpcyB1cHNlcnQgZXBpYyBvdmVycmlkZXMgdGhlIHN0YW5kYXJkIHVwc2VydC5cbiAgICogSW4gYWRkaXRpb24gdG8gdGhlIHN0YW5kYXJkLCBpdCBleHRlbmRzIHRoZSBpdGVtcyB0byB1cHNlcnQsIHNvIHRoYXRcbiAgICogdGhleSBhcmUgYWRkZWQgdG8gdGhlIHByb2plY3QuXG4gICAqL1xuICBjcmVhdGVVcHNlcnRFcGljPFQ+KGFwaUZuOiAobWV0YTogVCkgPT4gT2JzZXJ2YWJsZTxNb2RlbFtdPiwgb25TdWNjZXNzSG9vaz86IChkYXRhOiBNb2RlbFtdLCBwaz8pID0+IHZvaWQpIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUodGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OlVQU0VSVCcpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTW9kaWZ5QWN0aW9uTWV0YTxNb2RlbD4+KSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxBY3Rpb25zKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGVuZGluZ0tleSA9IGFjdGlvbi5tZXRhLmFkZFBlbmRpbmc7XG5cbiAgICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGEgYXMgYW55O1xuICAgICAgICAgIC8vIGFkZCBpc19pbl9wcm9qZWN0IHRydWVcblxuICAgICAgICAgIG1ldGEuaXRlbXMgPSBtZXRhLml0ZW1zLm1hcChpID0+ICh7XG4gICAgICAgICAgICAuLi5pLCBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM6IFt7XG4gICAgICAgICAgICAgIC4uLnBhdGhPcih7fSwgWydlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMnLCAwXSwgaSksXG4gICAgICAgICAgICAgIGlzX2luX3Byb2plY3Q6IHRydWUsXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH0pKVxuXG4gICAgICAgICAgYXBpRm4obWV0YSkuc3Vic2NyaWJlKChkYXRhOiBNb2RlbFtdKSA9PiB7XG4gICAgICAgICAgICBpZiAob25TdWNjZXNzSG9vaykge1xuICAgICAgICAgICAgICBvblN1Y2Nlc3NIb29rKGRhdGEsIGFjdGlvbi5tZXRhLnBrKTtcbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnN1Y2NlZWRlZChkYXRhLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnVwc2VydFN1Y2NlZWRlZChkYXRhLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsQWN0aW9ucy5uZXh0KHRoaXMubm90aWZpY2F0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yLm1lc3NhZ2UgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmZhaWxlZCh7IHN0YXR1czogJycgKyBlcnJvci5zdGF0dXMgfSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSkpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBlcGljIG1hcHMgdGhlIGl0ZW1zIHRvIHJlbW92ZSBpbiBtaW5pbWFsaXNpYyBpbnN0YW5jZXMgb2ZcbiAgICogSW5mb1Byb2pSZWwsIGNvbnRhaW5pbmcgb25seSB0aGUgZmtfZW50aXR5IGFuZCBpc19pbl9wcm9qZWN0PWZhbHNlLlxuICAgKiBUaGUgcGsgb2YgdGhlIHByb2plY3QsIHRoYXQgcmVtb3ZlcyB0aGUgaXRlbXMsIGlzIHRyYW5zcG9ydGVkIGluIG1ldGEucGsuXG4gICAqL1xuICBjcmVhdGVSZW1vdmVFcGljKCkge1xuICAgIHJldHVybiAoYWN0aW9uJCwgc3RvcmUpID0+IHtcbiAgICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICAgIG9mVHlwZSh0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6UkVNT1ZFJyksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNb2RpZnlBY3Rpb25NZXRhPE1vZGVsPj4pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbEFjdGlvbnMpID0+IHtcbiAgICAgICAgICBjb25zdCBwZW5kaW5nS2V5ID0gYWN0aW9uLm1ldGEuYWRkUGVuZGluZztcblxuICAgICAgICAgIHRoaXMuaW5mb1Byb2pSZWxBcGkuYnVsa1VwZGF0ZUVwckF0dHJpYnV0ZXMoXG4gICAgICAgICAgICBhY3Rpb24ubWV0YS5wayxcbiAgICAgICAgICAgIGFjdGlvbi5tZXRhLml0ZW1zLm1hcCgoaXRlbTogYW55KSA9PiAoe1xuICAgICAgICAgICAgICBma19lbnRpdHk6IGl0ZW0ucGtfZW50aXR5LFxuICAgICAgICAgICAgICBpc19pbl9wcm9qZWN0OiBmYWxzZVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoaW5mb1Byb2pSZWxzOiBQcm9JbmZvUHJvalJlbFtdKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpbmZvUHJvalJlbHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9BY3Rpb25zLmluZm9fcHJval9yZWwudXBzZXJ0U3VjY2VlZGVkKGluZm9Qcm9qUmVscywgdW5kZWZpbmVkLCBhY3Rpb24ubWV0YS5waylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMucmVtb3ZlU3VjY2VlZGVkKGFjdGlvbi5tZXRhLml0ZW1zLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5waylcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgZ2xvYmFsQWN0aW9ucy5uZXh0KHRoaXMubm90aWZpY2F0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvci5tZXNzYWdlIH1cbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuZmFpbGVkKHsgc3RhdHVzOiAnJyArIGVycm9yLnN0YXR1cyB9LCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5waylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pKVxuXG4gICAgICApXG4gICAgfVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBUaGlzIHVwc2VydCBlcGljIG92ZXJyaWRlcyB0aGUgc3RhbmRhcmQgdXBzZXJ0LlxuICAgKiBJbiBhZGRpdGlvbiB0byB0aGUgc3RhbmRhcmQsIGl0IGV4dGVuZHMgdGhlIGl0ZW1zIHRvIHVwc2VydCwgc28gdGhhdFxuICAgKiB0aGV5IGFyZSBhZGRlZCB0byB0aGUgcHJvamVjdC5cbiAgICovXG4gIGNyZWF0ZUN1c3RvbVVwc2VydEVwaWM8VD4oYXBpRm46IChtZXRhOiBUKSA9PiBPYnNlcnZhYmxlPE1vZGVsW10+LCBhY3Rpb25TdWZmaXg6IHN0cmluZywgb25TdWNjZXNzSG9vaz86IChkYXRhOiBNb2RlbFtdLCBwaz8pID0+IHZvaWQpIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUodGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OlVQU0VSVCcgKyAoYWN0aW9uU3VmZml4ID8gJzo6JyArIGFjdGlvblN1ZmZpeCA6ICcnKSksXG4gICAgICAgIG1lcmdlTWFwKChhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNb2RpZnlBY3Rpb25NZXRhPE1vZGVsPj4pID0+IG5ldyBPYnNlcnZhYmxlPEFjdGlvbj4oKGdsb2JhbEFjdGlvbnMpID0+IHtcbiAgICAgICAgICBjb25zdCBwZW5kaW5nS2V5ID0gYWN0aW9uLm1ldGEuYWRkUGVuZGluZztcbiAgICAgICAgICBjb25zdCBtZXRhID0gYWN0aW9uLm1ldGEgYXMgYW55O1xuICAgICAgICAgIGFwaUZuKG1ldGEpLnN1YnNjcmliZSgoZGF0YTogTW9kZWxbXSkgPT4ge1xuICAgICAgICAgICAgaWYgKG9uU3VjY2Vzc0hvb2spIHtcbiAgICAgICAgICAgICAgb25TdWNjZXNzSG9vayhkYXRhLCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy51cHNlcnRTdWNjZWVkZWQoW10sIHBlbmRpbmdLZXksIGFjdGlvbi5tZXRhLnBrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMudXBzZXJ0U3VjY2VlZGVkKGRhdGEsIHBlbmRpbmdLZXksIGFjdGlvbi5tZXRhLnBrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICBnbG9iYWxBY3Rpb25zLm5leHQodGhpcy5ub3RpZmljYXRpb25zLmFkZFRvYXN0KHtcbiAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IubWVzc2FnZSB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMuZmFpbGVkKHsgc3RhdHVzOiAnJyArIGVycm9yLnN0YXR1cyB9LCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKSk7XG4gICAgfTtcbiAgfVxuXG59XG4iXX0=