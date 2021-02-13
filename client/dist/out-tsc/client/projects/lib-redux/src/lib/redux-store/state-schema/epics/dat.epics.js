import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
import { ChunkActionsFactory, ColumnActionsFactory, DigitalActionsFactory } from '../actions/dat.actions';
import { datRoot } from '../reducer-configs/dat.config';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';
import { Flattener, storeFlattened } from '../_helpers/flattener';
let DatEpics = class DatEpics {
    constructor(notification, datActions, infActions, proActions, digitalApi, chunkApi, columnApi, namespaceApi, schemaObjectService) {
        this.notification = notification;
        this.datActions = datActions;
        this.infActions = infActions;
        this.proActions = proActions;
        this.digitalApi = digitalApi;
        this.chunkApi = chunkApi;
        this.columnApi = columnApi;
        this.namespaceApi = namespaceApi;
        this.schemaObjectService = schemaObjectService;
    }
    createEpics() {
        const digitalEpicsFactory = new SchemaEpicsFactory(datRoot, 'digital', this.datActions.digital, this.notification);
        const chunkEpicsFactory = new SchemaEpicsFactory(datRoot, 'chunk', this.datActions.chunk, this.notification);
        const namespaceEpicsFactory = new SchemaEpicsFactory(datRoot, 'namespace', this.datActions.namespace, this.notification);
        const columnEpicsFactory = new SchemaEpicsFactory(datRoot, 'column', this.datActions.column, this.notification);
        return combineEpics(
        // Digital
        digitalEpicsFactory.createLoadEpic((meta) => this.digitalApi.getVersion(meta.pkEntity, meta.entityVersion ? meta.entityVersion : null), DigitalActionsFactory.LOAD_VERSION), digitalEpicsFactory.createUpsertEpic((meta) => this.digitalApi.bulkUpsert(meta.pk, meta.items)), digitalEpicsFactory.createDeleteEpic((meta) => this.digitalApi.bulkDelete(meta.items.map(item => item.pk_entity))), 
        // Chunk
        chunkEpicsFactory.createLoadEpic((meta) => this.chunkApi.ofDigital(meta.pk, meta.pkDigital), ChunkActionsFactory.CHUNKS_OF_DIGITAL, (results, pk) => {
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.chunk.flatten(results);
            storeFlattened(flattener.getFlattened(), pk);
        }), 
        // Namespace
        namespaceEpicsFactory.createLoadEpic((meta) => this.namespaceApi.byProject(meta.pk), ''), columnEpicsFactory.createLoadEpic((meta) => this.columnApi.ofDigital(meta.pk, meta.pkDigital), ColumnActionsFactory.COLUMNS_OF_TABLE, (results, pk) => {
            const schemaObject = results;
            this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        }));
    }
};
DatEpics = tslib_1.__decorate([
    Injectable()
], DatEpics);
export { DatEpics };
//# sourceMappingURL=dat.epics.js.map