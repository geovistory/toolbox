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
import { SchemaService } from '../services/schema.service';
import { Flattener, storeFlattened } from '../_helpers/flattener';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';
import * as i0 from "@angular/core";
import * as i1 from "../../state-gui/actions/notifications.actions";
import * as i2 from "../actions/dat.actions";
import * as i3 from "../actions/inf.actions";
import * as i4 from "../actions/pro.actions";
import * as i5 from "@kleiolab/lib-sdk-lb3";
import * as i6 from "../services/schema.service";
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
        { type: SchemaService }
    ]; };
    /** @nocollapse */ DatEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DatEpics_Factory() { return new DatEpics(i0.ɵɵinject(i1.NotificationsAPIActions), i0.ɵɵinject(i2.DatActions), i0.ɵɵinject(i3.InfActions), i0.ɵɵinject(i4.ProActions), i0.ɵɵinject(i5.DatDigitalApi), i0.ɵɵinject(i5.DatChunkApi), i0.ɵɵinject(i5.DatColumnApi), i0.ɵɵinject(i5.DatNamespaceApi), i0.ɵɵinject(i6.SchemaService)); }, token: DatEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2RhdC5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFZLFdBQVcsRUFBYSxZQUFZLEVBQWMsYUFBYSxFQUFnQixlQUFlLEVBQWdCLE1BQU0sdUJBQXVCLENBQUM7QUFDL0osT0FBTyxFQUFFLFlBQVksRUFBUSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUscUJBQXFCLEVBQXVELE1BQU0sd0JBQXdCLENBQUM7QUFDM0ssT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFbEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7Ozs7O0FBR3RFO0lBSUUsa0JBQ1MsWUFBcUMsRUFDckMsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsVUFBeUIsRUFDekIsUUFBcUIsRUFDckIsU0FBdUIsRUFDdkIsWUFBNkIsRUFDNUIsbUJBQWtDO1FBUm5DLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUNyQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQWE7UUFDckIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBaUI7UUFDNUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFlO0lBQ3hDLENBQUM7Ozs7SUFFRSw4QkFBVzs7O0lBQWxCO1FBQUEsaUJBc0RDOztZQXJETyxtQkFBbUIsR0FBRyxJQUFJLGtCQUFrQixDQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7O1lBRTVELGlCQUFpQixHQUFHLElBQUksa0JBQWtCLENBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzs7WUFFeEQscUJBQXFCLEdBQUcsSUFBSSxrQkFBa0IsQ0FDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDOztZQUVoRSxrQkFBa0IsR0FBRyxJQUFJLGtCQUFrQixDQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7UUFFaEUsT0FBTyxZQUFZO1FBRWpCLFVBQVU7UUFDVixtQkFBbUIsQ0FBQyxjQUFjOzs7O1FBQ2hDLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBekYsQ0FBeUYsR0FDbkcscUJBQXFCLENBQUMsWUFBWSxDQUNuQyxFQUNELG1CQUFtQixDQUFDLGdCQUFnQjs7OztRQUNsQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUEvQyxDQUErQyxFQUMxRCxFQUNELG1CQUFtQixDQUFDLGdCQUFnQjs7OztRQUNsQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFNBQVMsRUFBZCxDQUFjLEVBQUMsQ0FBQyxFQUFsRSxDQUFrRSxFQUM3RTtRQUVELFFBQVE7UUFDUixpQkFBaUIsQ0FBQyxjQUFjOzs7O1FBQzlCLFVBQUMsSUFBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQWhELENBQWdELEdBQzFELG1CQUFtQixDQUFDLGlCQUFpQjs7Ozs7UUFDckMsVUFBQyxPQUFPLEVBQUUsRUFBRTs7Z0JBQ0osU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDO1lBQ2xGLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLGNBQWMsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxFQUNGO1FBRUQsWUFBWTtRQUNaLHFCQUFxQixDQUFDLGNBQWM7Ozs7UUFDbEMsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQXBDLENBQW9DLEdBQUUsRUFBRSxDQUNuRCxFQUVELGtCQUFrQixDQUFDLGNBQWM7Ozs7UUFDL0IsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBakQsQ0FBaUQsR0FDM0Qsb0JBQW9CLENBQUMsZ0JBQWdCOzs7OztRQUNyQyxVQUFDLE9BQU8sRUFBRSxFQUFFOztnQkFDSixZQUFZLEdBQUcsbUJBQUEsbUJBQUEsT0FBTyxFQUFXLEVBQWdCO1lBRXZELEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDOUQsQ0FBQyxFQUNGLENBRUYsQ0FBQTtJQUNILENBQUM7O2dCQXRFRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWRRLHVCQUF1QjtnQkFDb0IsVUFBVTtnQkFDckQsVUFBVTtnQkFDVixVQUFVO2dCQUxrRCxhQUFhO2dCQUEvRCxXQUFXO2dCQUFhLFlBQVk7Z0JBQTJDLGVBQWU7Z0JBUXhHLGFBQWE7OzttQkFUdEI7Q0F3RkMsQUF6RUQsSUF5RUM7U0F0RVksUUFBUTs7O0lBRWpCLGdDQUE0Qzs7SUFDNUMsOEJBQTZCOztJQUM3Qiw4QkFBNkI7O0lBQzdCLDhCQUE2Qjs7SUFDN0IsOEJBQWdDOztJQUNoQyw0QkFBNEI7O0lBQzVCLDZCQUE4Qjs7SUFDOUIsZ0NBQW9DOzs7OztJQUNwQyx1Q0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRDaHVuaywgRGF0Q2h1bmtBcGksIERhdENvbHVtbiwgRGF0Q29sdW1uQXBpLCBEYXREaWdpdGFsLCBEYXREaWdpdGFsQXBpLCBEYXROYW1lc3BhY2UsIERhdE5hbWVzcGFjZUFwaSwgU2NoZW1hT2JqZWN0IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IGNvbWJpbmVFcGljcywgRXBpYyB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUtZXM2LWNvbXBhdCc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL25vdGlmaWNhdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBDaHVua0FjdGlvbnNGYWN0b3J5LCBDb2x1bW5BY3Rpb25zRmFjdG9yeSwgRGF0QWN0aW9ucywgRGlnaXRhbEFjdGlvbnNGYWN0b3J5LCBMb2FkQ2h1bmtzT2ZEaWdpdGFsQWN0aW9uLCBMb2FkQ29sdW1uc09mVGFibGVBY3Rpb24gfSBmcm9tICcuLi9hY3Rpb25zL2RhdC5hY3Rpb25zJztcbmltcG9ydCB7IEluZkFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZi5hY3Rpb25zJztcbmltcG9ydCB7IFByb0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3Byby5hY3Rpb25zJztcbmltcG9ydCB7IENodW5rU2xpY2UsIENvbHVtblNsaWNlLCBEaWdpdGFsU2xpY2UsIE5hbWVzcGFjZVNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzL2RhdC5tb2RlbHMnO1xuaW1wb3J0IHsgZGF0Um9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncy9kYXQuY29uZmlnJztcbmltcG9ydCB7IFNjaGVtYVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zY2hlbWEuc2VydmljZSc7XG5pbXBvcnQgeyBGbGF0dGVuZXIsIHN0b3JlRmxhdHRlbmVkIH0gZnJvbSAnLi4vX2hlbHBlcnMvZmxhdHRlbmVyJztcbmltcG9ydCB7IExvYWRBY3Rpb25NZXRhLCBMb2FkVmVyc2lvbkFjdGlvbiwgTW9kaWZ5QWN0aW9uTWV0YSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuaW1wb3J0IHsgU2NoZW1hRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWVwaWNzLWZhY3RvcnknO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdEVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHVibGljIGRhdEFjdGlvbnM6IERhdEFjdGlvbnMsXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG4gICAgcHVibGljIHByb0FjdGlvbnM6IFByb0FjdGlvbnMsXG4gICAgcHVibGljIGRpZ2l0YWxBcGk6IERhdERpZ2l0YWxBcGksXG4gICAgcHVibGljIGNodW5rQXBpOiBEYXRDaHVua0FwaSxcbiAgICBwdWJsaWMgY29sdW1uQXBpOiBEYXRDb2x1bW5BcGksXG4gICAgcHVibGljIG5hbWVzcGFjZUFwaTogRGF0TmFtZXNwYWNlQXBpLFxuICAgIHByaXZhdGUgc2NoZW1hT2JqZWN0U2VydmljZTogU2NoZW1hU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICBjb25zdCBkaWdpdGFsRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxEaWdpdGFsU2xpY2UsIERhdERpZ2l0YWw+XG4gICAgICAoZGF0Um9vdCwgJ2RpZ2l0YWwnLCB0aGlzLmRhdEFjdGlvbnMuZGlnaXRhbCwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgY2h1bmtFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PENodW5rU2xpY2UsIERhdENodW5rPlxuICAgICAgKGRhdFJvb3QsICdjaHVuaycsIHRoaXMuZGF0QWN0aW9ucy5jaHVuaywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgbmFtZXNwYWNlRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxOYW1lc3BhY2VTbGljZSwgRGF0TmFtZXNwYWNlPlxuICAgICAgKGRhdFJvb3QsICduYW1lc3BhY2UnLCB0aGlzLmRhdEFjdGlvbnMubmFtZXNwYWNlLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBjb2x1bW5FcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PENvbHVtblNsaWNlLCBEYXRDb2x1bW4+XG4gICAgICAoZGF0Um9vdCwgJ2NvbHVtbicsIHRoaXMuZGF0QWN0aW9ucy5jb2x1bW4sIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG5cbiAgICAgIC8vIERpZ2l0YWxcbiAgICAgIGRpZ2l0YWxFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZFZlcnNpb25BY3Rpb24+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5kaWdpdGFsQXBpLmdldFZlcnNpb24obWV0YS5wa0VudGl0eSwgbWV0YS5lbnRpdHlWZXJzaW9uID8gbWV0YS5lbnRpdHlWZXJzaW9uIDogbnVsbCksXG4gICAgICAgIERpZ2l0YWxBY3Rpb25zRmFjdG9yeS5MT0FEX1ZFUlNJT05cbiAgICAgICksXG4gICAgICBkaWdpdGFsRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxEYXREaWdpdGFsPj4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmRpZ2l0YWxBcGkuYnVsa1Vwc2VydChtZXRhLnBrLCBtZXRhLml0ZW1zKVxuICAgICAgKSxcbiAgICAgIGRpZ2l0YWxFcGljc0ZhY3RvcnkuY3JlYXRlRGVsZXRlRXBpYyhcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuZGlnaXRhbEFwaS5idWxrRGVsZXRlKG1ldGEuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5wa19lbnRpdHkpKVxuICAgICAgKSxcblxuICAgICAgLy8gQ2h1bmtcbiAgICAgIGNodW5rRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRDaHVua3NPZkRpZ2l0YWxBY3Rpb24+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5jaHVua0FwaS5vZkRpZ2l0YWwobWV0YS5waywgbWV0YS5wa0RpZ2l0YWwpLFxuICAgICAgICBDaHVua0FjdGlvbnNGYWN0b3J5LkNIVU5LU19PRl9ESUdJVEFMLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5jaHVuay5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGspO1xuICAgICAgICB9XG4gICAgICApLFxuXG4gICAgICAvLyBOYW1lc3BhY2VcbiAgICAgIG5hbWVzcGFjZUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLm5hbWVzcGFjZUFwaS5ieVByb2plY3QobWV0YS5wayksICcnXG4gICAgICApLFxuXG4gICAgICBjb2x1bW5FcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZENvbHVtbnNPZlRhYmxlQWN0aW9uPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuY29sdW1uQXBpLm9mRGlnaXRhbChtZXRhLnBrLCBtZXRhLnBrRGlnaXRhbCksXG4gICAgICAgIENvbHVtbkFjdGlvbnNGYWN0b3J5LkNPTFVNTlNfT0ZfVEFCTEUsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtYU9iamVjdCA9IHJlc3VsdHMgYXMgdW5rbm93biBhcyBTY2hlbWFPYmplY3Q7XG5cbiAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3Qoc2NoZW1hT2JqZWN0LCBwaylcbiAgICAgICAgfVxuICAgICAgKSxcblxuICAgIClcbiAgfVxuXG5cbn1cbiJdfQ==