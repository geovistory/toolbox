import { ofType } from 'redux-observable-es6-compat';
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { SchemaEpicsFactory } from "../redux-store/schema-epics-factory";
import { pathOr } from "ramda";
export class InfEpicsFactory extends SchemaEpicsFactory {
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
     */
    createUpsertEpic(apiFn, onSuccessHook) {
        return (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT'), mergeMap((action) => new Observable((globalActions) => {
                const pendingKey = action.meta.addPending;
                const meta = action.meta;
                // add is_in_project true
                meta.items = meta.items.map(i => (Object.assign({}, i, { entity_version_project_rels: [Object.assign({}, pathOr({}, ['entity_version_project_rels', 0], i), { is_in_project: true })] })));
                apiFn(meta).subscribe((data) => {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk);
                        this.actions.succeeded(data, pendingKey, action.meta.pk);
                    }
                    else {
                        this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
                    }
                }, error => {
                    globalActions.next(this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                });
            })));
        };
    }
    /**
     * This epic maps the items to remove in minimalisic instances of
     * InfoProjRel, containing only the fk_entity and is_in_project=false.
     * The pk of the project, that removes the items, is transported in meta.pk.
     */
    createRemoveEpic() {
        return (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::REMOVE'), mergeMap((action) => new Observable((globalActions) => {
                const pendingKey = action.meta.addPending;
                this.infoProjRelApi.bulkUpdateEprAttributes(action.meta.pk, action.meta.items.map((item) => ({
                    fk_entity: item.pk_entity,
                    is_in_project: false
                })))
                    .subscribe((infoProjRels) => {
                    if (infoProjRels.length) {
                        this.proActions.info_proj_rel.upsertSucceeded(infoProjRels, undefined, action.meta.pk);
                    }
                    this.actions.removeSucceeded(action.meta.items, pendingKey, action.meta.pk);
                }, error => {
                    globalActions.next(this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                });
            })));
        };
    }
    /**
     * This upsert epic overrides the standard upsert.
     * In addition to the standard, it extends the items to upsert, so that
     * they are added to the project.
     */
    createCustomUpsertEpic(apiFn, actionSuffix, onSuccessHook) {
        return (action$, store) => {
            return action$.pipe(ofType(this.actionPrefix + '.' + this.modelName + '::UPSERT' + (actionSuffix ? '::' + actionSuffix : '')), mergeMap((action) => new Observable((globalActions) => {
                const pendingKey = action.meta.addPending;
                const meta = action.meta;
                apiFn(meta).subscribe((data) => {
                    if (onSuccessHook) {
                        onSuccessHook(data, action.meta.pk);
                        this.actions.upsertSucceeded([], pendingKey, action.meta.pk);
                    }
                    else {
                        this.actions.upsertSucceeded(data, pendingKey, action.meta.pk);
                    }
                }, error => {
                    globalActions.next(this.notifications.addToast({
                        type: 'error',
                        options: { title: error.message }
                    }));
                    this.actions.failed({ status: '' + error.status }, pendingKey, action.meta.pk);
                });
            })));
        };
    }
}
//# sourceMappingURL=inf-epic-factory.js.map