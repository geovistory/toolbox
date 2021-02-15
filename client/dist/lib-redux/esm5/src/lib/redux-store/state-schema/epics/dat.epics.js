/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/dat.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DatChunkApi, DatColumnApi, DatDigitalApi, DatNamespaceApi } from '@kleiolab/lib-sdk-lb3';
import { combineEpics } from 'redux-observable-es6-compat';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { ChunkActionsFactory, ColumnActionsFactory, DatActions, DigitalActionsFactory } from '../actions/dat.actions';
import { InfActions } from '../actions/inf.actions';
import { ProActions } from '../actions/pro.actions';
import { datRoot } from '../reducer-configs/dat.config';
import { SchemaObjectService } from '../services/schema-object.service';
import { Flattener, storeFlattened } from '../_helpers/flattener';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';
import * as i0 from "@angular/core";
import * as i1 from "../../state-gui/actions/notifications.actions";
import * as i2 from "../actions/dat.actions";
import * as i3 from "../actions/inf.actions";
import * as i4 from "../actions/pro.actions";
import * as i5 from "@kleiolab/lib-sdk-lb3";
import * as i6 from "../services/schema-object.service";
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
            var schemaObject = (/** @type {?} */ ((/** @type {?} */ (results))));
            _this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        })));
    };
    DatEpics.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
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
    /** @nocollapse */ DatEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DatEpics_Factory() { return new DatEpics(i0.ɵɵinject(i1.NotificationsAPIActions), i0.ɵɵinject(i2.DatActions), i0.ɵɵinject(i3.InfActions), i0.ɵɵinject(i4.ProActions), i0.ɵɵinject(i5.DatDigitalApi), i0.ɵɵinject(i5.DatChunkApi), i0.ɵɵinject(i5.DatColumnApi), i0.ɵɵinject(i5.DatNamespaceApi), i0.ɵɵinject(i6.SchemaObjectService)); }, token: DatEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2RhdC5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFZLFdBQVcsRUFBYSxZQUFZLEVBQWMsYUFBYSxFQUFnQixlQUFlLEVBQWdCLE1BQU0sdUJBQXVCLENBQUM7QUFDL0osT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUscUJBQXFCLEVBQXVELE1BQU0sd0JBQXdCLENBQUM7QUFDM0ssT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7Ozs7QUFHdEU7SUFJRSxrQkFDUyxZQUFxQyxFQUNyQyxVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUF5QixFQUN6QixRQUFxQixFQUNyQixTQUF1QixFQUN2QixZQUE2QixFQUM1QixtQkFBd0M7UUFSekMsaUJBQVksR0FBWixZQUFZLENBQXlCO1FBQ3JDLGVBQVUsR0FBVixVQUFV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QixDQUFDLGNBQWM7Ozs7UUFDL0IsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBakQsQ0FBaUQsR0FDM0Qsb0JBQW9CLENBQUMsZ0JBQWdCOzs7OztRQUNyQyxVQUFDLE9BQU8sRUFBRSxFQUFFOztnQkFDSixZQUFZLEdBQUcsbUJBQUEsbUJBQUEsT0FBTyxFQUFXLEVBQWdCO1lBRXZELEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDOUQsQ0FBQyxFQUNGLENBRUYsQ0FBQTtJQUNILENBQUM7O2dCQXRFRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWRRLHVCQUF1QjtnQkFDb0IsVUFBVTtnQkFDckQsVUFBVTtnQkFDVixVQUFVO2dCQUxrRCxhQUFhO2dCQUEvRCxXQUFXO2dCQUFhLFlBQVk7Z0JBQTJDLGVBQWU7Z0JBUXhHLG1CQUFtQjs7O21CQVQ1QjtDQXdGQyxBQXpFRCxJQXlFQztTQXRFWSxRQUFROzs7SUFFakIsZ0NBQTRDOztJQUM1Qyw4QkFBNkI7O0lBQzdCLDhCQUE2Qjs7SUFDN0IsOEJBQTZCOztJQUM3Qiw4QkFBZ0M7O0lBQ2hDLDRCQUE0Qjs7SUFDNUIsNkJBQThCOztJQUM5QixnQ0FBb0M7Ozs7O0lBQ3BDLHVDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdENodW5rLCBEYXRDaHVua0FwaSwgRGF0Q29sdW1uLCBEYXRDb2x1bW5BcGksIERhdERpZ2l0YWwsIERhdERpZ2l0YWxBcGksIERhdE5hbWVzcGFjZSwgRGF0TmFtZXNwYWNlQXBpLCBTY2hlbWFPYmplY3QgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IENodW5rQWN0aW9uc0ZhY3RvcnksIENvbHVtbkFjdGlvbnNGYWN0b3J5LCBEYXRBY3Rpb25zLCBEaWdpdGFsQWN0aW9uc0ZhY3RvcnksIExvYWRDaHVua3NPZkRpZ2l0YWxBY3Rpb24sIExvYWRDb2x1bW5zT2ZUYWJsZUFjdGlvbiB9IGZyb20gJy4uL2FjdGlvbnMvZGF0LmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5mLmFjdGlvbnMnO1xuaW1wb3J0IHsgUHJvQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgQ2h1bmtTbGljZSwgQ29sdW1uU2xpY2UsIERpZ2l0YWxTbGljZSwgTmFtZXNwYWNlU2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvZGF0Lm1vZGVscyc7XG5pbXBvcnQgeyBkYXRSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzL2RhdC5jb25maWcnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NjaGVtYS1vYmplY3Quc2VydmljZSc7XG5pbXBvcnQgeyBGbGF0dGVuZXIsIHN0b3JlRmxhdHRlbmVkIH0gZnJvbSAnLi4vX2hlbHBlcnMvZmxhdHRlbmVyJztcbmltcG9ydCB7IExvYWRBY3Rpb25NZXRhLCBMb2FkVmVyc2lvbkFjdGlvbiwgTW9kaWZ5QWN0aW9uTWV0YSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuaW1wb3J0IHsgU2NoZW1hRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWVwaWNzLWZhY3RvcnknO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdEVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHVibGljIGRhdEFjdGlvbnM6IERhdEFjdGlvbnMsXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG4gICAgcHVibGljIHByb0FjdGlvbnM6IFByb0FjdGlvbnMsXG4gICAgcHVibGljIGRpZ2l0YWxBcGk6IERhdERpZ2l0YWxBcGksXG4gICAgcHVibGljIGNodW5rQXBpOiBEYXRDaHVua0FwaSxcbiAgICBwdWJsaWMgY29sdW1uQXBpOiBEYXRDb2x1bW5BcGksXG4gICAgcHVibGljIG5hbWVzcGFjZUFwaTogRGF0TmFtZXNwYWNlQXBpLFxuICAgIHByaXZhdGUgc2NoZW1hT2JqZWN0U2VydmljZTogU2NoZW1hT2JqZWN0U2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICBjb25zdCBkaWdpdGFsRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxEaWdpdGFsU2xpY2UsIERhdERpZ2l0YWw+XG4gICAgICAoZGF0Um9vdCwgJ2RpZ2l0YWwnLCB0aGlzLmRhdEFjdGlvbnMuZGlnaXRhbCwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgY2h1bmtFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PENodW5rU2xpY2UsIERhdENodW5rPlxuICAgICAgKGRhdFJvb3QsICdjaHVuaycsIHRoaXMuZGF0QWN0aW9ucy5jaHVuaywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgbmFtZXNwYWNlRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxOYW1lc3BhY2VTbGljZSwgRGF0TmFtZXNwYWNlPlxuICAgICAgKGRhdFJvb3QsICduYW1lc3BhY2UnLCB0aGlzLmRhdEFjdGlvbnMubmFtZXNwYWNlLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBjb2x1bW5FcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PENvbHVtblNsaWNlLCBEYXRDb2x1bW4+XG4gICAgICAoZGF0Um9vdCwgJ2NvbHVtbicsIHRoaXMuZGF0QWN0aW9ucy5jb2x1bW4sIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG5cbiAgICAgIC8vIERpZ2l0YWxcbiAgICAgIGRpZ2l0YWxFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZFZlcnNpb25BY3Rpb24+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5kaWdpdGFsQXBpLmdldFZlcnNpb24obWV0YS5wa0VudGl0eSwgbWV0YS5lbnRpdHlWZXJzaW9uID8gbWV0YS5lbnRpdHlWZXJzaW9uIDogbnVsbCksXG4gICAgICAgIERpZ2l0YWxBY3Rpb25zRmFjdG9yeS5MT0FEX1ZFUlNJT05cbiAgICAgICksXG4gICAgICBkaWdpdGFsRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxEYXREaWdpdGFsPj4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmRpZ2l0YWxBcGkuYnVsa1Vwc2VydChtZXRhLnBrLCBtZXRhLml0ZW1zKVxuICAgICAgKSxcbiAgICAgIGRpZ2l0YWxFcGljc0ZhY3RvcnkuY3JlYXRlRGVsZXRlRXBpYyhcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuZGlnaXRhbEFwaS5idWxrRGVsZXRlKG1ldGEuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5wa19lbnRpdHkpKVxuICAgICAgKSxcblxuICAgICAgLy8gQ2h1bmtcbiAgICAgIGNodW5rRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRDaHVua3NPZkRpZ2l0YWxBY3Rpb24+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5jaHVua0FwaS5vZkRpZ2l0YWwobWV0YS5waywgbWV0YS5wa0RpZ2l0YWwpLFxuICAgICAgICBDaHVua0FjdGlvbnNGYWN0b3J5LkNIVU5LU19PRl9ESUdJVEFMLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5jaHVuay5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGspO1xuICAgICAgICB9XG4gICAgICApLFxuXG4gICAgICAvLyBOYW1lc3BhY2VcbiAgICAgIG5hbWVzcGFjZUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLm5hbWVzcGFjZUFwaS5ieVByb2plY3QobWV0YS5wayksICcnXG4gICAgICApLFxuXG4gICAgICBjb2x1bW5FcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZENvbHVtbnNPZlRhYmxlQWN0aW9uPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuY29sdW1uQXBpLm9mRGlnaXRhbChtZXRhLnBrLCBtZXRhLnBrRGlnaXRhbCksXG4gICAgICAgIENvbHVtbkFjdGlvbnNGYWN0b3J5LkNPTFVNTlNfT0ZfVEFCTEUsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtYU9iamVjdCA9IHJlc3VsdHMgYXMgdW5rbm93biBhcyBTY2hlbWFPYmplY3Q7XG5cbiAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3Qoc2NoZW1hT2JqZWN0LCBwaylcbiAgICAgICAgfVxuICAgICAgKSxcblxuICAgIClcbiAgfVxuXG5cbn1cbiJdfQ==