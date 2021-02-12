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
var DatEpics = /** @class */ (function () {
    function DatEpics(notification, datActions, infActions, proActions, digitalApi, chunkApi, columnApi, namespaceApi, schemaObjectService) {
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
    DatEpics.prototype.createEpics = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var digitalEpicsFactory = new SchemaEpicsFactory(datRoot, 'digital', this.datActions.digital, this.notification);
        /** @type {?} */
        var chunkEpicsFactory = new SchemaEpicsFactory(datRoot, 'chunk', this.datActions.chunk, this.notification);
        /** @type {?} */
        var namespaceEpicsFactory = new SchemaEpicsFactory(datRoot, 'namespace', this.datActions.namespace, this.notification);
        /** @type {?} */
        var columnEpicsFactory = new SchemaEpicsFactory(datRoot, 'column', this.datActions.column, this.notification);
        return combineEpics(
        // Digital
        digitalEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.digitalApi.getVersion(meta.pkEntity, meta.entityVersion ? meta.entityVersion : null); }), DigitalActionsFactory.LOAD_VERSION), digitalEpicsFactory.createUpsertEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.digitalApi.bulkUpsert(meta.pk, meta.items); })), digitalEpicsFactory.createDeleteEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.digitalApi.bulkDelete(meta.items.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.pk_entity; }))); })), 
        // Chunk
        chunkEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.chunkApi.ofDigital(meta.pk, meta.pkDigital); }), ChunkActionsFactory.CHUNKS_OF_DIGITAL, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var flattener = new Flattener(_this.infActions, _this.datActions, _this.proActions);
            flattener.chunk.flatten(results);
            storeFlattened(flattener.getFlattened(), pk);
        })), 
        // Namespace
        namespaceEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.namespaceApi.byProject(meta.pk); }), ''), columnEpicsFactory.createLoadEpic((/**
         * @param {?} meta
         * @return {?}
         */
        function (meta) { return _this.columnApi.ofDigital(meta.pk, meta.pkDigital); }), ColumnActionsFactory.COLUMNS_OF_TABLE, (/**
         * @param {?} results
         * @param {?} pk
         * @return {?}
         */
        function (results, pk) {
            /** @type {?} */
            var schemaObject = (/** @type {?} */ (results));
            _this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        })));
    };
    DatEpics.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DatEpics.ctorParameters = function () { return [
        { type: NotificationsAPIActions },
        { type: DatActions },
        { type: InfActions },
        { type: ProActions },
        { type: DatDigitalApi },
        { type: DatChunkApi },
        { type: DatColumnApi },
        { type: DatNamespaceApi },
        { type: SchemaObjectService }
    ]; };
    return DatEpics;
}());
export { DatEpics };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3MvZGF0LmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQVksV0FBVyxFQUFhLFlBQVksRUFBYyxhQUFhLEVBQWdCLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pKLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUVqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLFVBQVUsRUFBdUQsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXZMLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFvQyxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLEVBQXFCLE1BQU0sYUFBYSxDQUFDO0FBR3RKO0lBRUUsa0JBQ1MsWUFBcUMsRUFDckMsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsVUFBeUIsRUFDekIsUUFBcUIsRUFDckIsU0FBdUIsRUFDdkIsWUFBNkIsRUFDNUIsbUJBQXdDO1FBUnpDLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUNyQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQWE7UUFDckIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixpQkFB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Qjs7Ozs7UUFDckMsVUFBQyxPQUFPLEVBQUUsRUFBRTs7Z0JBQ0osWUFBWSxHQUFHLG1CQUFBLE9BQU8sRUFBZ0I7WUFFNUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUM5RCxDQUFDLEVBQ0YsQ0FFRixDQUFBO0lBQ0gsQ0FBQzs7Z0JBcEVGLFVBQVU7Ozs7Z0JBTEYsdUJBQXVCO2dCQUZvQixVQUFVO2dCQUF5QixVQUFVO2dCQUF1RCxVQUFVO2dCQUg3RixhQUFhO2dCQUEvRCxXQUFXO2dCQUFhLFlBQVk7Z0JBQTJDLGVBQWU7Z0JBT3ZDLG1CQUFtQjs7SUEwRTdGLGVBQUM7Q0FBQSxBQXZFRCxJQXVFQztTQXRFWSxRQUFROzs7SUFFakIsZ0NBQTRDOztJQUM1Qyw4QkFBNkI7O0lBQzdCLDhCQUE2Qjs7SUFDN0IsOEJBQTZCOztJQUM3Qiw4QkFBZ0M7O0lBQ2hDLDRCQUE0Qjs7SUFDNUIsNkJBQThCOztJQUM5QixnQ0FBb0M7Ozs7O0lBQ3BDLHVDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdENodW5rLCBEYXRDaHVua0FwaSwgRGF0Q29sdW1uLCBEYXRDb2x1bW5BcGksIERhdERpZ2l0YWwsIERhdERpZ2l0YWxBcGksIERhdE5hbWVzcGFjZSwgRGF0TmFtZXNwYWNlQXBpIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYyB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBTY2hlbWFPYmplY3QgfSBmcm9tICcuLi8uLi9yb290L21vZGVscyc7XG5pbXBvcnQgeyBDaHVua0FjdGlvbnNGYWN0b3J5LCBDb2x1bW5BY3Rpb25zRmFjdG9yeSwgRGF0QWN0aW9ucywgRGlnaXRhbEFjdGlvbnNGYWN0b3J5LCBJbmZBY3Rpb25zLCBMb2FkQ2h1bmtzT2ZEaWdpdGFsQWN0aW9uLCBMb2FkQ29sdW1uc09mVGFibGVBY3Rpb24sIFByb0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IENodW5rU2xpY2UsIENvbHVtblNsaWNlLCBEaWdpdGFsU2xpY2UsIE5hbWVzcGFjZVNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMnO1xuaW1wb3J0IHsgZGF0Um9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncyc7XG5pbXBvcnQgeyBGbGF0dGVuZXIsIExvYWRBY3Rpb25NZXRhLCBNb2RpZnlBY3Rpb25NZXRhLCBTY2hlbWFFcGljc0ZhY3RvcnksIFNjaGVtYU9iamVjdFNlcnZpY2UsIHN0b3JlRmxhdHRlbmVkLCBMb2FkVmVyc2lvbkFjdGlvbiB9IGZyb20gJy4uL19oZWxwZXJzJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0RXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwdWJsaWMgZGF0QWN0aW9uczogRGF0QWN0aW9ucyxcbiAgICBwdWJsaWMgaW5mQWN0aW9uczogSW5mQWN0aW9ucyxcbiAgICBwdWJsaWMgcHJvQWN0aW9uczogUHJvQWN0aW9ucyxcbiAgICBwdWJsaWMgZGlnaXRhbEFwaTogRGF0RGlnaXRhbEFwaSxcbiAgICBwdWJsaWMgY2h1bmtBcGk6IERhdENodW5rQXBpLFxuICAgIHB1YmxpYyBjb2x1bW5BcGk6IERhdENvbHVtbkFwaSxcbiAgICBwdWJsaWMgbmFtZXNwYWNlQXBpOiBEYXROYW1lc3BhY2VBcGksXG4gICAgcHJpdmF0ZSBzY2hlbWFPYmplY3RTZXJ2aWNlOiBTY2hlbWFPYmplY3RTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuICAgIGNvbnN0IGRpZ2l0YWxFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERpZ2l0YWxTbGljZSwgRGF0RGlnaXRhbD5cbiAgICAgIChkYXRSb290LCAnZGlnaXRhbCcsIHRoaXMuZGF0QWN0aW9ucy5kaWdpdGFsLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBjaHVua0VwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8Q2h1bmtTbGljZSwgRGF0Q2h1bms+XG4gICAgICAoZGF0Um9vdCwgJ2NodW5rJywgdGhpcy5kYXRBY3Rpb25zLmNodW5rLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBuYW1lc3BhY2VFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PE5hbWVzcGFjZVNsaWNlLCBEYXROYW1lc3BhY2U+XG4gICAgICAoZGF0Um9vdCwgJ25hbWVzcGFjZScsIHRoaXMuZGF0QWN0aW9ucy5uYW1lc3BhY2UsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IGNvbHVtbkVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8Q29sdW1uU2xpY2UsIERhdENvbHVtbj5cbiAgICAgIChkYXRSb290LCAnY29sdW1uJywgdGhpcy5kYXRBY3Rpb25zLmNvbHVtbiwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcblxuICAgICAgLy8gRGlnaXRhbFxuICAgICAgZGlnaXRhbEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkVmVyc2lvbkFjdGlvbj4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmRpZ2l0YWxBcGkuZ2V0VmVyc2lvbihtZXRhLnBrRW50aXR5LCBtZXRhLmVudGl0eVZlcnNpb24gPyBtZXRhLmVudGl0eVZlcnNpb24gOiBudWxsKSxcbiAgICAgICAgRGlnaXRhbEFjdGlvbnNGYWN0b3J5LkxPQURfVkVSU0lPTlxuICAgICAgKSxcbiAgICAgIGRpZ2l0YWxFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPERhdERpZ2l0YWw+PihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuZGlnaXRhbEFwaS5idWxrVXBzZXJ0KG1ldGEucGssIG1ldGEuaXRlbXMpXG4gICAgICApLFxuICAgICAgZGlnaXRhbEVwaWNzRmFjdG9yeS5jcmVhdGVEZWxldGVFcGljKFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5kaWdpdGFsQXBpLmJ1bGtEZWxldGUobWV0YS5pdGVtcy5tYXAoaXRlbSA9PiBpdGVtLnBrX2VudGl0eSkpXG4gICAgICApLFxuXG4gICAgICAvLyBDaHVua1xuICAgICAgY2h1bmtFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZENodW5rc09mRGlnaXRhbEFjdGlvbj4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmNodW5rQXBpLm9mRGlnaXRhbChtZXRhLnBrLCBtZXRhLnBrRGlnaXRhbCksXG4gICAgICAgIENodW5rQWN0aW9uc0ZhY3RvcnkuQ0hVTktTX09GX0RJR0lUQUwsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLmNodW5rLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwayk7XG4gICAgICAgIH1cbiAgICAgICksXG5cbiAgICAgIC8vIE5hbWVzcGFjZVxuICAgICAgbmFtZXNwYWNlRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMubmFtZXNwYWNlQXBpLmJ5UHJvamVjdChtZXRhLnBrKSwgJydcbiAgICAgICksXG5cbiAgICAgIGNvbHVtbkVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQ29sdW1uc09mVGFibGVBY3Rpb24+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5jb2x1bW5BcGkub2ZEaWdpdGFsKG1ldGEucGssIG1ldGEucGtEaWdpdGFsKSxcbiAgICAgICAgQ29sdW1uQWN0aW9uc0ZhY3RvcnkuQ09MVU1OU19PRl9UQUJMRSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hT2JqZWN0ID0gcmVzdWx0cyBhcyBTY2hlbWFPYmplY3Q7XG5cbiAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3Qoc2NoZW1hT2JqZWN0LCBwaylcbiAgICAgICAgfVxuICAgICAgKSxcblxuICAgIClcbiAgfVxuXG5cbn1cbiJdfQ==