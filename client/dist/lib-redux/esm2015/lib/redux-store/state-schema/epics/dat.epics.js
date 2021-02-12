/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/dat.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DatChunkApi, DatColumnApi, DatDigitalApi, DatNamespaceApi } from '@kleiolab/lib-sdk-lb3';
import { combineEpics } from 'redux-observable-es6-compat';
import { ChunkActionsFactory, ColumnActionsFactory, DatActions, DigitalActionsFactory, InfActions, ProActions } from '../actions';
import { NotificationsAPIActions } from '../../state-gui/actions';
import { datRoot } from '../reducer-configs';
import { Flattener, SchemaEpicsFactory, SchemaObjectService, storeFlattened } from '../_helpers';
export class DatEpics {
    /**
     * @param {?} notification
     * @param {?} datActions
     * @param {?} infActions
     * @param {?} proActions
     * @param {?} digitalApi
     * @param {?} chunkApi
     * @param {?} columnApi
     * @param {?} namespaceApi
     * @param {?} schemaObjectService
     */
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
    /**
     * @return {?}
     */
    createEpics() {
        /** @type {?} */
        const digitalEpicsFactory = new SchemaEpicsFactory(datRoot, 'digital', this.datActions.digital, this.notification);
        /** @type {?} */
        const chunkEpicsFactory = new SchemaEpicsFactory(datRoot, 'chunk', this.datActions.chunk, this.notification);
        /** @type {?} */
        const namespaceEpicsFactory = new SchemaEpicsFactory(datRoot, 'namespace', this.datActions.namespace, this.notification);
        /** @type {?} */
        const columnEpicsFactory = new SchemaEpicsFactory(datRoot, 'column', this.datActions.column, this.notification);
        return combineEpics(
        // Digital
        digitalEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.digitalApi.getVersion(meta.pkEntity, meta.entityVersion ? meta.entityVersion : null)), DigitalActionsFactory.LOAD_VERSION), digitalEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.digitalApi.bulkUpsert(meta.pk, meta.items))), digitalEpicsFactory.createDeleteEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.digitalApi.bulkDelete(meta.items.map((/**
         * @param {?} item
         * @return {?}
         */
        item => item.pk_entity))))), 
        // Chunk
        chunkEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.chunkApi.ofDigital(meta.pk, meta.pkDigital)), ChunkActionsFactory.CHUNKS_OF_DIGITAL, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const flattener = new Flattener(this.infActions, this.datActions, this.proActions);
            flattener.chunk.flatten(results);
            storeFlattened(flattener.getFlattened(), pk);
        })), 
        // Namespace
        namespaceEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.namespaceApi.byProject(meta.pk)), ''), columnEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        (meta) => this.columnApi.ofDigital(meta.pk, meta.pkDigital)), ColumnActionsFactory.COLUMNS_OF_TABLE, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        (results, pk) => {
            /** @type {?} */
            const schemaObject = (/** @type {?} */ (results));
            this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        })));
    }
}
DatEpics.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DatEpics.ctorParameters = () => [
    { type: NotificationsAPIActions },
    { type: DatActions },
    { type: InfActions },
    { type: ProActions },
    { type: DatDigitalApi },
    { type: DatChunkApi },
    { type: DatColumnApi },
    { type: DatNamespaceApi },
    { type: SchemaObjectService }
];
if (false) {
    /** @type {?} */
    DatEpics.prototype.notification;
    /** @type {?} */
    DatEpics.prototype.datActions;
    /** @type {?} */
    DatEpics.prototype.infActions;
    /** @type {?} */
    DatEpics.prototype.proActions;
    /** @type {?} */
    DatEpics.prototype.digitalApi;
    /** @type {?} */
    DatEpics.prototype.chunkApi;
    /** @type {?} */
    DatEpics.prototype.columnApi;
    /** @type {?} */
    DatEpics.prototype.namespaceApi;
    /**
     * @type {?}
     * @private
     */
    DatEpics.prototype.schemaObjectService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3MvZGF0LmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQVksV0FBVyxFQUFhLFlBQVksRUFBYyxhQUFhLEVBQWdCLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pKLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLFVBQVUsRUFBdUQsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXZMLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFvQyxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLEVBQXFCLE1BQU0sYUFBYSxDQUFDO0FBSXRKLE1BQU0sT0FBTyxRQUFROzs7Ozs7Ozs7Ozs7SUFDbkIsWUFDUyxZQUFxQyxFQUNyQyxVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUF5QixFQUN6QixRQUFxQixFQUNyQixTQUF1QixFQUN2QixZQUE2QixFQUM1QixtQkFBd0M7UUFSekMsaUJBQVksR0FBWixZQUFZLENBQXlCO1FBQ3JDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQWU7UUFDekIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQUNyQixjQUFT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QUFFOztrQkFDUixZQUFZLEdBQUcsbUJBQUEsT0FBTyxFQUFnQjtZQUU1QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQzlELENBQUMsRUFDRixDQUVGLENBQUE7SUFDSCxDQUFDOzs7WUFwRUYsVUFBVTs7OztZQUxGLHVCQUF1QjtZQUZvQixVQUFVO1lBQXlCLFVBQVU7WUFBdUQsVUFBVTtZQUg3RixhQUFhO1lBQS9ELFdBQVc7WUFBYSxZQUFZO1lBQTJDLGVBQWU7WUFPdkMsbUJBQW1COzs7O0lBTXpGLGdDQUE0Qzs7SUFDNUMsOEJBQTZCOztJQUM3Qiw4QkFBNkI7O0lBQzdCLDhCQUE2Qjs7SUFDN0IsOEJBQWdDOztJQUNoQyw0QkFBNEI7O0lBQzVCLDZCQUE4Qjs7SUFDOUIsZ0NBQW9DOzs7OztJQUNwQyx1Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRDaHVuaywgRGF0Q2h1bmtBcGksIERhdENvbHVtbiwgRGF0Q29sdW1uQXBpLCBEYXREaWdpdGFsLCBEYXREaWdpdGFsQXBpLCBEYXROYW1lc3BhY2UsIERhdE5hbWVzcGFjZUFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0IH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMnO1xuaW1wb3J0IHsgQ2h1bmtBY3Rpb25zRmFjdG9yeSwgQ29sdW1uQWN0aW9uc0ZhY3RvcnksIERhdEFjdGlvbnMsIERpZ2l0YWxBY3Rpb25zRmFjdG9yeSwgSW5mQWN0aW9ucywgTG9hZENodW5rc09mRGlnaXRhbEFjdGlvbiwgTG9hZENvbHVtbnNPZlRhYmxlQWN0aW9uLCBQcm9BY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBDaHVua1NsaWNlLCBDb2x1bW5TbGljZSwgRGlnaXRhbFNsaWNlLCBOYW1lc3BhY2VTbGljZSB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zJztcbmltcG9ydCB7IGRhdFJvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MnO1xuaW1wb3J0IHsgRmxhdHRlbmVyLCBMb2FkQWN0aW9uTWV0YSwgTW9kaWZ5QWN0aW9uTWV0YSwgU2NoZW1hRXBpY3NGYWN0b3J5LCBTY2hlbWFPYmplY3RTZXJ2aWNlLCBzdG9yZUZsYXR0ZW5lZCwgTG9hZFZlcnNpb25BY3Rpb24gfSBmcm9tICcuLi9faGVscGVycyc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdEVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHVibGljIGRhdEFjdGlvbnM6IERhdEFjdGlvbnMsXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG4gICAgcHVibGljIHByb0FjdGlvbnM6IFByb0FjdGlvbnMsXG4gICAgcHVibGljIGRpZ2l0YWxBcGk6IERhdERpZ2l0YWxBcGksXG4gICAgcHVibGljIGNodW5rQXBpOiBEYXRDaHVua0FwaSxcbiAgICBwdWJsaWMgY29sdW1uQXBpOiBEYXRDb2x1bW5BcGksXG4gICAgcHVibGljIG5hbWVzcGFjZUFwaTogRGF0TmFtZXNwYWNlQXBpLFxuICAgIHByaXZhdGUgc2NoZW1hT2JqZWN0U2VydmljZTogU2NoZW1hT2JqZWN0U2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICBjb25zdCBkaWdpdGFsRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxEaWdpdGFsU2xpY2UsIERhdERpZ2l0YWw+XG4gICAgICAoZGF0Um9vdCwgJ2RpZ2l0YWwnLCB0aGlzLmRhdEFjdGlvbnMuZGlnaXRhbCwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgY2h1bmtFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PENodW5rU2xpY2UsIERhdENodW5rPlxuICAgICAgKGRhdFJvb3QsICdjaHVuaycsIHRoaXMuZGF0QWN0aW9ucy5jaHVuaywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgbmFtZXNwYWNlRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxOYW1lc3BhY2VTbGljZSwgRGF0TmFtZXNwYWNlPlxuICAgICAgKGRhdFJvb3QsICduYW1lc3BhY2UnLCB0aGlzLmRhdEFjdGlvbnMubmFtZXNwYWNlLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBjb2x1bW5FcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PENvbHVtblNsaWNlLCBEYXRDb2x1bW4+XG4gICAgICAoZGF0Um9vdCwgJ2NvbHVtbicsIHRoaXMuZGF0QWN0aW9ucy5jb2x1bW4sIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG5cbiAgICAgIC8vIERpZ2l0YWxcbiAgICAgIGRpZ2l0YWxFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZFZlcnNpb25BY3Rpb24+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5kaWdpdGFsQXBpLmdldFZlcnNpb24obWV0YS5wa0VudGl0eSwgbWV0YS5lbnRpdHlWZXJzaW9uID8gbWV0YS5lbnRpdHlWZXJzaW9uIDogbnVsbCksXG4gICAgICAgIERpZ2l0YWxBY3Rpb25zRmFjdG9yeS5MT0FEX1ZFUlNJT05cbiAgICAgICksXG4gICAgICBkaWdpdGFsRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxEYXREaWdpdGFsPj4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmRpZ2l0YWxBcGkuYnVsa1Vwc2VydChtZXRhLnBrLCBtZXRhLml0ZW1zKVxuICAgICAgKSxcbiAgICAgIGRpZ2l0YWxFcGljc0ZhY3RvcnkuY3JlYXRlRGVsZXRlRXBpYyhcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuZGlnaXRhbEFwaS5idWxrRGVsZXRlKG1ldGEuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5wa19lbnRpdHkpKVxuICAgICAgKSxcblxuICAgICAgLy8gQ2h1bmtcbiAgICAgIGNodW5rRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRDaHVua3NPZkRpZ2l0YWxBY3Rpb24+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5jaHVua0FwaS5vZkRpZ2l0YWwobWV0YS5waywgbWV0YS5wa0RpZ2l0YWwpLFxuICAgICAgICBDaHVua0FjdGlvbnNGYWN0b3J5LkNIVU5LU19PRl9ESUdJVEFMLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5jaHVuay5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGspO1xuICAgICAgICB9XG4gICAgICApLFxuXG4gICAgICAvLyBOYW1lc3BhY2VcbiAgICAgIG5hbWVzcGFjZUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLm5hbWVzcGFjZUFwaS5ieVByb2plY3QobWV0YS5wayksICcnXG4gICAgICApLFxuXG4gICAgICBjb2x1bW5FcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZENvbHVtbnNPZlRhYmxlQWN0aW9uPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuY29sdW1uQXBpLm9mRGlnaXRhbChtZXRhLnBrLCBtZXRhLnBrRGlnaXRhbCksXG4gICAgICAgIENvbHVtbkFjdGlvbnNGYWN0b3J5LkNPTFVNTlNfT0ZfVEFCTEUsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtYU9iamVjdCA9IHJlc3VsdHMgYXMgU2NoZW1hT2JqZWN0O1xuXG4gICAgICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0KHNjaGVtYU9iamVjdCwgcGspXG4gICAgICAgIH1cbiAgICAgICksXG5cbiAgICApXG4gIH1cblxuXG59XG4iXX0=