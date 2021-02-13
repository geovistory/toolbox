/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/inf-epic-factory.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLWVwaWMtZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL19oZWxwZXJzL2luZi1lcGljLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRS9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUsxQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7OztBQUU1RCxNQUFNLE9BQU8sZUFBZ0MsU0FBUSxrQkFBa0M7Ozs7Ozs7OztJQUNyRixZQUNTLFlBQW9CLEVBQ3BCLFNBQWlCLEVBQ2pCLE9BQXlDLEVBQ3pDLGFBQXNDLEVBQ3RDLGNBQWlDLEVBQ2pDLFVBQXNCO1FBRTdCLEtBQUssQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQTtRQVAvQyxpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQUNwQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLFlBQU8sR0FBUCxPQUFPLENBQWtDO1FBQ3pDLGtCQUFhLEdBQWIsYUFBYSxDQUF5QjtRQUN0QyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDakMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUcvQixDQUFDOzs7Ozs7Ozs7O0lBT0QsZ0JBQWdCLENBQUksS0FBdUMsRUFBRSxhQUE0QztRQUN2Rzs7Ozs7UUFBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN4QixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxFQUM3RCxRQUFROzs7O1lBQUMsQ0FBQyxNQUE0RCxFQUFFLEVBQUUsQ0FBQyxJQUFJLFVBQVU7Ozs7WUFBUyxDQUFDLGFBQWEsRUFBRSxFQUFFOztzQkFDNUcsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVTs7c0JBRW5DLElBQUksR0FBRyxtQkFBQSxNQUFNLENBQUMsSUFBSSxFQUFPO2dCQUMvQix5QkFBeUI7Z0JBRXpCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHOzs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsbUJBQzVCLENBQUMsSUFBRSwyQkFBMkIsRUFBRSxtQkFDOUIsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLDZCQUE2QixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUNwRCxhQUFhLEVBQUUsSUFBSSxJQUNuQixJQUNGLEVBQUMsQ0FBQTtnQkFFSCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUzs7OztnQkFBQyxDQUFDLElBQWEsRUFBRSxFQUFFO29CQUN0QyxJQUFJLGFBQWEsRUFBRTt3QkFDakIsYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQzFEO3lCQUNJO3dCQUNILElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDaEU7Z0JBQ0gsQ0FBQzs7OztnQkFBRSxLQUFLLENBQUMsRUFBRTtvQkFDVCxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO3dCQUM3QyxJQUFJLEVBQUUsT0FBTzt3QkFDYixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRTtxQkFDbEMsQ0FBQyxDQUFDLENBQUM7b0JBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakYsQ0FBQyxFQUFDLENBQUM7WUFDTCxDQUFDLEVBQUMsRUFBQyxDQUFDLENBQUM7UUFDVCxDQUFDLEVBQUM7SUFDSixDQUFDOzs7Ozs7O0lBT0QsZ0JBQWdCO1FBQ2Q7Ozs7O1FBQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDeEIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsRUFDN0QsUUFBUTs7OztZQUFDLENBQUMsTUFBNEQsRUFBRSxFQUFFLENBQUMsSUFBSSxVQUFVOzs7O1lBQVMsQ0FBQyxhQUFhLEVBQUUsRUFBRTs7c0JBQzVHLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVU7Z0JBRXpDLElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7Ozs7Z0JBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3BDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztvQkFDekIsYUFBYSxFQUFFLEtBQUs7aUJBQ3JCLENBQUMsRUFBQyxDQUNKO3FCQUNFLFNBQVM7Ozs7Z0JBQUMsQ0FBQyxZQUE4QixFQUFFLEVBQUU7b0JBQzVDLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTt3QkFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtxQkFDdkY7b0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQzdFLENBQUM7Ozs7Z0JBQUUsS0FBSyxDQUFDLEVBQUU7b0JBQ1QsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQzt3QkFDN0MsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUU7cUJBQ2xDLENBQUMsQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ2hGLENBQUMsRUFBQyxDQUFBO1lBQ04sQ0FBQyxFQUFDLEVBQUMsQ0FFSixDQUFBO1FBQ0gsQ0FBQyxFQUFBO0lBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7SUFTRCxzQkFBc0IsQ0FBSSxLQUF1QyxFQUFFLFlBQW9CLEVBQUUsYUFBNEM7UUFDbkk7Ozs7O1FBQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDeEIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3pHLFFBQVE7Ozs7WUFBQyxDQUFDLE1BQTRELEVBQUUsRUFBRSxDQUFDLElBQUksVUFBVTs7OztZQUFTLENBQUMsYUFBYSxFQUFFLEVBQUU7O3NCQUM1RyxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVOztzQkFDbkMsSUFBSSxHQUFHLG1CQUFBLE1BQU0sQ0FBQyxJQUFJLEVBQU87Z0JBQy9CLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTOzs7O2dCQUFDLENBQUMsSUFBYSxFQUFFLEVBQUU7b0JBQ3RDLElBQUksYUFBYSxFQUFFO3dCQUNqQixhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDOUQ7eUJBQ0k7d0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNoRTtnQkFDSCxDQUFDOzs7O2dCQUFFLEtBQUssQ0FBQyxFQUFFO29CQUNULGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7d0JBQzdDLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFO3FCQUNsQyxDQUFDLENBQUMsQ0FBQztvQkFDSixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRixDQUFDLEVBQUMsQ0FBQztZQUNMLENBQUMsRUFBQyxFQUFDLENBQUMsQ0FBQztRQUNULENBQUMsRUFBQztJQUNKLENBQUM7Q0FFRjs7O0lBekhHLHVDQUEyQjs7SUFDM0Isb0NBQXdCOztJQUN4QixrQ0FBZ0Q7O0lBQ2hELHdDQUE2Qzs7SUFDN0MseUNBQXdDOztJQUN4QyxxQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9JbmZvUHJvalJlbCwgUHJvSW5mb1Byb2pSZWxBcGkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgcGF0aE9yIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUHJvQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucy9ub3RpZmljYXRpb25zLmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mQWN0aW9uRmFjdG9yeSB9IGZyb20gJy4vaW5mLWFjdGlvbi1mYWN0b3J5JztcbmltcG9ydCB7IE1vZGlmeUFjdGlvbk1ldGEgfSBmcm9tICcuL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuaW1wb3J0IHsgU2NoZW1hRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi9zY2hlbWEtZXBpY3MtZmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBJbmZFcGljc0ZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+IGV4dGVuZHMgU2NoZW1hRXBpY3NGYWN0b3J5PFBheWxvYWQsIE1vZGVsPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBhY3Rpb25QcmVmaXg6IHN0cmluZyxcbiAgICBwdWJsaWMgbW9kZWxOYW1lOiBzdHJpbmcsXG4gICAgcHVibGljIGFjdGlvbnM6IEluZkFjdGlvbkZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+LFxuICAgIHB1YmxpYyBub3RpZmljYXRpb25zOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwdWJsaWMgaW5mb1Byb2pSZWxBcGk6IFByb0luZm9Qcm9qUmVsQXBpLFxuICAgIHB1YmxpYyBwcm9BY3Rpb25zOiBQcm9BY3Rpb25zXG4gICkge1xuICAgIHN1cGVyKGFjdGlvblByZWZpeCwgbW9kZWxOYW1lLCBhY3Rpb25zLCBub3RpZmljYXRpb25zKVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgdXBzZXJ0IGVwaWMgb3ZlcnJpZGVzIHRoZSBzdGFuZGFyZCB1cHNlcnQuXG4gICAqIEluIGFkZGl0aW9uIHRvIHRoZSBzdGFuZGFyZCwgaXQgZXh0ZW5kcyB0aGUgaXRlbXMgdG8gdXBzZXJ0LCBzbyB0aGF0XG4gICAqIHRoZXkgYXJlIGFkZGVkIHRvIHRoZSBwcm9qZWN0LlxuICAgKi9cbiAgY3JlYXRlVXBzZXJ0RXBpYzxUPihhcGlGbjogKG1ldGE6IFQpID0+IE9ic2VydmFibGU8TW9kZWxbXT4sIG9uU3VjY2Vzc0hvb2s/OiAoZGF0YTogTW9kZWxbXSwgcGs/KSA9PiB2b2lkKSB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpVUFNFUlQnKSxcbiAgICAgICAgbWVyZ2VNYXAoKGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1vZGlmeUFjdGlvbk1ldGE8TW9kZWw+PikgPT4gbmV3IE9ic2VydmFibGU8QWN0aW9uPigoZ2xvYmFsQWN0aW9ucykgPT4ge1xuICAgICAgICAgIGNvbnN0IHBlbmRpbmdLZXkgPSBhY3Rpb24ubWV0YS5hZGRQZW5kaW5nO1xuXG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhIGFzIGFueTtcbiAgICAgICAgICAvLyBhZGQgaXNfaW5fcHJvamVjdCB0cnVlXG5cbiAgICAgICAgICBtZXRhLml0ZW1zID0gbWV0YS5pdGVtcy5tYXAoaSA9PiAoe1xuICAgICAgICAgICAgLi4uaSwgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzOiBbe1xuICAgICAgICAgICAgICAuLi5wYXRoT3Ioe30sIFsnZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzJywgMF0sIGkpLFxuICAgICAgICAgICAgICBpc19pbl9wcm9qZWN0OiB0cnVlLFxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9KSlcblxuICAgICAgICAgIGFwaUZuKG1ldGEpLnN1YnNjcmliZSgoZGF0YTogTW9kZWxbXSkgPT4ge1xuICAgICAgICAgICAgaWYgKG9uU3VjY2Vzc0hvb2spIHtcbiAgICAgICAgICAgICAgb25TdWNjZXNzSG9vayhkYXRhLCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5zdWNjZWVkZWQoZGF0YSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuYWN0aW9ucy51cHNlcnRTdWNjZWVkZWQoZGF0YSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIGdsb2JhbEFjdGlvbnMubmV4dCh0aGlzLm5vdGlmaWNhdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICBvcHRpb25zOiB7IHRpdGxlOiBlcnJvci5tZXNzYWdlIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aW9ucy5mYWlsZWQoeyBzdGF0dXM6ICcnICsgZXJyb3Iuc3RhdHVzIH0sIHBlbmRpbmdLZXksIGFjdGlvbi5tZXRhLnBrKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkpKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZXBpYyBtYXBzIHRoZSBpdGVtcyB0byByZW1vdmUgaW4gbWluaW1hbGlzaWMgaW5zdGFuY2VzIG9mXG4gICAqIEluZm9Qcm9qUmVsLCBjb250YWluaW5nIG9ubHkgdGhlIGZrX2VudGl0eSBhbmQgaXNfaW5fcHJvamVjdD1mYWxzZS5cbiAgICogVGhlIHBrIG9mIHRoZSBwcm9qZWN0LCB0aGF0IHJlbW92ZXMgdGhlIGl0ZW1zLCBpcyB0cmFuc3BvcnRlZCBpbiBtZXRhLnBrLlxuICAgKi9cbiAgY3JlYXRlUmVtb3ZlRXBpYygpIHtcbiAgICByZXR1cm4gKGFjdGlvbiQsIHN0b3JlKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgICBvZlR5cGUodGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OlJFTU9WRScpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTW9kaWZ5QWN0aW9uTWV0YTxNb2RlbD4+KSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxBY3Rpb25zKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGVuZGluZ0tleSA9IGFjdGlvbi5tZXRhLmFkZFBlbmRpbmc7XG5cbiAgICAgICAgICB0aGlzLmluZm9Qcm9qUmVsQXBpLmJ1bGtVcGRhdGVFcHJBdHRyaWJ1dGVzKFxuICAgICAgICAgICAgYWN0aW9uLm1ldGEucGssXG4gICAgICAgICAgICBhY3Rpb24ubWV0YS5pdGVtcy5tYXAoKGl0ZW06IGFueSkgPT4gKHtcbiAgICAgICAgICAgICAgZmtfZW50aXR5OiBpdGVtLnBrX2VudGl0eSxcbiAgICAgICAgICAgICAgaXNfaW5fcHJvamVjdDogZmFsc2VcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGluZm9Qcm9qUmVsczogUHJvSW5mb1Byb2pSZWxbXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoaW5mb1Byb2pSZWxzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvQWN0aW9ucy5pbmZvX3Byb2pfcmVsLnVwc2VydFN1Y2NlZWRlZChpbmZvUHJvalJlbHMsIHVuZGVmaW5lZCwgYWN0aW9uLm1ldGEucGspXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnJlbW92ZVN1Y2NlZWRlZChhY3Rpb24ubWV0YS5pdGVtcywgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspXG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGdsb2JhbEFjdGlvbnMubmV4dCh0aGlzLm5vdGlmaWNhdGlvbnMuYWRkVG9hc3Qoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogeyB0aXRsZTogZXJyb3IubWVzc2FnZSB9XG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmZhaWxlZCh7IHN0YXR1czogJycgKyBlcnJvci5zdGF0dXMgfSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KSlcblxuICAgICAgKVxuICAgIH1cbiAgfVxuXG5cblxuICAvKipcbiAgICogVGhpcyB1cHNlcnQgZXBpYyBvdmVycmlkZXMgdGhlIHN0YW5kYXJkIHVwc2VydC5cbiAgICogSW4gYWRkaXRpb24gdG8gdGhlIHN0YW5kYXJkLCBpdCBleHRlbmRzIHRoZSBpdGVtcyB0byB1cHNlcnQsIHNvIHRoYXRcbiAgICogdGhleSBhcmUgYWRkZWQgdG8gdGhlIHByb2plY3QuXG4gICAqL1xuICBjcmVhdGVDdXN0b21VcHNlcnRFcGljPFQ+KGFwaUZuOiAobWV0YTogVCkgPT4gT2JzZXJ2YWJsZTxNb2RlbFtdPiwgYWN0aW9uU3VmZml4OiBzdHJpbmcsIG9uU3VjY2Vzc0hvb2s/OiAoZGF0YTogTW9kZWxbXSwgcGs/KSA9PiB2b2lkKSB7XG4gICAgcmV0dXJuIChhY3Rpb24kLCBzdG9yZSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgICAgb2ZUeXBlKHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpVUFNFUlQnICsgKGFjdGlvblN1ZmZpeCA/ICc6OicgKyBhY3Rpb25TdWZmaXggOiAnJykpLFxuICAgICAgICBtZXJnZU1hcCgoYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTW9kaWZ5QWN0aW9uTWV0YTxNb2RlbD4+KSA9PiBuZXcgT2JzZXJ2YWJsZTxBY3Rpb24+KChnbG9iYWxBY3Rpb25zKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGVuZGluZ0tleSA9IGFjdGlvbi5tZXRhLmFkZFBlbmRpbmc7XG4gICAgICAgICAgY29uc3QgbWV0YSA9IGFjdGlvbi5tZXRhIGFzIGFueTtcbiAgICAgICAgICBhcGlGbihtZXRhKS5zdWJzY3JpYmUoKGRhdGE6IE1vZGVsW10pID0+IHtcbiAgICAgICAgICAgIGlmIChvblN1Y2Nlc3NIb29rKSB7XG4gICAgICAgICAgICAgIG9uU3VjY2Vzc0hvb2soZGF0YSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMudXBzZXJ0U3VjY2VlZGVkKFtdLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zLnVwc2VydFN1Y2NlZWRlZChkYXRhLCBwZW5kaW5nS2V5LCBhY3Rpb24ubWV0YS5wayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsQWN0aW9ucy5uZXh0KHRoaXMubm90aWZpY2F0aW9ucy5hZGRUb2FzdCh7XG4gICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGl0bGU6IGVycm9yLm1lc3NhZ2UgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmZhaWxlZCh7IHN0YXR1czogJycgKyBlcnJvci5zdGF0dXMgfSwgcGVuZGluZ0tleSwgYWN0aW9uLm1ldGEucGspO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSkpO1xuICAgIH07XG4gIH1cblxufVxuIl19