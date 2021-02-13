import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let SchemaObjectService = 
/**
 * Class to put schema objects into store
 */
class SchemaObjectService {
    constructor(api, infActions, proActions, datActions, warActions, tabActions, dfhActions, sysActions, notifications, entityPreviewSocket) {
        this.api = api;
        this.infActions = infActions;
        this.proActions = proActions;
        this.datActions = datActions;
        this.warActions = warActions;
        this.tabActions = tabActions;
        this.dfhActions = dfhActions;
        this.sysActions = sysActions;
        this.notifications = notifications;
        this.entityPreviewSocket = entityPreviewSocket;
    }
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param apiCall$
     * @param pkProject primary key of project or 'ofRepo', if repo versions
     */
    store(apiCall$, pkProject) {
        const s$ = new Subject();
        apiCall$.subscribe(result => {
            this.storeSchemaObject(result, pkProject === 'ofRepo' ? null : pkProject);
            s$.next(result);
        }, error => {
            this.notifications.addToast({
                type: 'error',
                options: { title: error.message }
            });
            s$.error(error);
        });
        return s$;
    }
    /**
     * watches an Observable<SchemaObject>
     * on success stores the parts of the object at right place of store
     * on error emits error message
     *
     * @param apiCall$
     * @param pkProject primary key of project or 'ofRepo', if repo versions
     */
    storeGv(apiCall$, pkProject) {
        const s$ = new Subject();
        apiCall$.subscribe(result => {
            this.storeSchemaObjectGv(result, pkProject === 'ofRepo' ? null : pkProject);
            s$.next(result);
        }, error => {
            this.notifications.addToast({
                type: 'error',
                options: { title: error.message }
            });
            s$.error(error);
        });
        return s$;
    }
    /**
     *
     * @param object
     * @param pkProject primary key of project or null, if repo versions
     */
    storeSchemaObject(object, pkProject) {
        if (object && Object.keys(object).length > 0) {
            Object.keys(object).forEach(schema => {
                let actions;
                if (schema === 'inf')
                    actions = this.infActions;
                else if (schema === 'pro')
                    actions = this.proActions;
                else if (schema === 'dat')
                    actions = this.datActions;
                else if (schema === 'war')
                    actions = this.warActions;
                if (actions) {
                    Object.keys(object[schema]).forEach(model => {
                        actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
                    });
                }
            });
        }
    }
    /**
     *
     * @param object
     * @param pkProject primary key of project or null, if repo versions
     */
    storeSchemaObjectGv(object, pkProject) {
        if (object && Object.keys(object).length > 0) {
            Object.keys(object).forEach(schema => {
                let actions;
                if (schema === 'inf')
                    actions = this.infActions;
                else if (schema === 'pro')
                    actions = this.proActions;
                else if (schema === 'dat')
                    actions = this.datActions;
                else if (schema === 'war')
                    actions = this.warActions;
                else if (schema === 'tab')
                    actions = this.tabActions;
                else if (schema === 'dfh')
                    actions = this.dfhActions;
                else if (schema === 'sys')
                    actions = this.sysActions;
                if (actions) {
                    Object.keys(object[schema]).forEach(model => {
                        actions[model].loadSucceeded(object[schema][model], undefined, pkProject);
                    });
                }
            });
            this.extendEntityPreviewStream(object, pkProject);
        }
    }
    /**
     * Adds the entity previews to the streamed entity previews (for ws communication)
     * @param object
     * @param pkProject
     */
    extendEntityPreviewStream(object, pkProject) {
        if (object && object.war && object.war.entity_preview && object.war.entity_preview.length) {
            this.entityPreviewSocket.emit('extendStream', {
                pkProject,
                pks: object.war.entity_preview.map(p => p.pk_entity)
            });
        }
    }
};
SchemaObjectService = tslib_1.__decorate([
    Injectable()
    /**
     * Class to put schema objects into store
     */
], SchemaObjectService);
export { SchemaObjectService };
//# sourceMappingURL=schema-object.service.js.map