/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/epics/dat.epics.ts
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
            const schemaObject = (/** @type {?} */ ((/** @type {?} */ (results))));
            this.schemaObjectService.storeSchemaObject(schemaObject, pk);
        })));
    }
}
DatEpics.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
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
/** @nocollapse */ DatEpics.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DatEpics_Factory() { return new DatEpics(i0.ɵɵinject(i1.NotificationsAPIActions), i0.ɵɵinject(i2.DatActions), i0.ɵɵinject(i3.InfActions), i0.ɵɵinject(i4.ProActions), i0.ɵɵinject(i5.DatDigitalApi), i0.ɵɵinject(i5.DatChunkApi), i0.ɵɵinject(i5.DatColumnApi), i0.ɵɵinject(i5.DatNamespaceApi), i0.ɵɵinject(i6.SchemaObjectService)); }, token: DatEpics, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3MvZGF0LmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQVksV0FBVyxFQUFhLFlBQVksRUFBYyxhQUFhLEVBQWdCLGVBQWUsRUFBZ0IsTUFBTSx1QkFBdUIsQ0FBQztBQUMvSixPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBdUQsTUFBTSx3QkFBd0IsQ0FBQztBQUMzSyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXBELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWxFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7Ozs7OztBQU10RSxNQUFNLE9BQU8sUUFBUTs7Ozs7Ozs7Ozs7O0lBQ25CLFlBQ1MsWUFBcUMsRUFDckMsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsVUFBeUIsRUFDekIsUUFBcUIsRUFDckIsU0FBdUIsRUFDdkIsWUFBNkIsRUFDNUIsbUJBQXdDO1FBUnpDLGlCQUFZLEdBQVosWUFBWSxDQUF5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LEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FDM0Qsb0JBQW9CLENBQUMsZ0JBQWdCOzs7OztRQUNyQyxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRTs7a0JBQ1IsWUFBWSxHQUFHLG1CQUFBLG1CQUFBLE9BQU8sRUFBVyxFQUFnQjtZQUV2RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQzlELENBQUMsRUFDRixDQUVGLENBQUE7SUFDSCxDQUFDOzs7WUF0RUYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBZFEsdUJBQXVCO1lBQ29CLFVBQVU7WUFDckQsVUFBVTtZQUNWLFVBQVU7WUFMa0QsYUFBYTtZQUEvRCxXQUFXO1lBQWEsWUFBWTtZQUEyQyxlQUFlO1lBUXhHLG1CQUFtQjs7Ozs7SUFXeEIsZ0NBQTRDOztJQUM1Qyw4QkFBNkI7O0lBQzdCLDhCQUE2Qjs7SUFDN0IsOEJBQTZCOztJQUM3Qiw4QkFBZ0M7O0lBQ2hDLDRCQUE0Qjs7SUFDNUIsNkJBQThCOztJQUM5QixnQ0FBb0M7Ozs7O0lBQ3BDLHVDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdENodW5rLCBEYXRDaHVua0FwaSwgRGF0Q29sdW1uLCBEYXRDb2x1bW5BcGksIERhdERpZ2l0YWwsIERhdERpZ2l0YWxBcGksIERhdE5hbWVzcGFjZSwgRGF0TmFtZXNwYWNlQXBpLCBTY2hlbWFPYmplY3QgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IENodW5rQWN0aW9uc0ZhY3RvcnksIENvbHVtbkFjdGlvbnNGYWN0b3J5LCBEYXRBY3Rpb25zLCBEaWdpdGFsQWN0aW9uc0ZhY3RvcnksIExvYWRDaHVua3NPZkRpZ2l0YWxBY3Rpb24sIExvYWRDb2x1bW5zT2ZUYWJsZUFjdGlvbiB9IGZyb20gJy4uL2FjdGlvbnMvZGF0LmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5mLmFjdGlvbnMnO1xuaW1wb3J0IHsgUHJvQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgQ2h1bmtTbGljZSwgQ29sdW1uU2xpY2UsIERpZ2l0YWxTbGljZSwgTmFtZXNwYWNlU2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvZGF0Lm1vZGVscyc7XG5pbXBvcnQgeyBkYXRSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzL2RhdC5jb25maWcnO1xuaW1wb3J0IHsgU2NoZW1hT2JqZWN0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NjaGVtYS1vYmplY3Quc2VydmljZSc7XG5pbXBvcnQgeyBGbGF0dGVuZXIsIHN0b3JlRmxhdHRlbmVkIH0gZnJvbSAnLi4vX2hlbHBlcnMvZmxhdHRlbmVyJztcbmltcG9ydCB7IExvYWRBY3Rpb25NZXRhLCBMb2FkVmVyc2lvbkFjdGlvbiwgTW9kaWZ5QWN0aW9uTWV0YSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuaW1wb3J0IHsgU2NoZW1hRXBpY3NGYWN0b3J5IH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWVwaWNzLWZhY3RvcnknO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdEVwaWNzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMsXG4gICAgcHVibGljIGRhdEFjdGlvbnM6IERhdEFjdGlvbnMsXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG4gICAgcHVibGljIHByb0FjdGlvbnM6IFByb0FjdGlvbnMsXG4gICAgcHVibGljIGRpZ2l0YWxBcGk6IERhdERpZ2l0YWxBcGksXG4gICAgcHVibGljIGNodW5rQXBpOiBEYXRDaHVua0FwaSxcbiAgICBwdWJsaWMgY29sdW1uQXBpOiBEYXRDb2x1bW5BcGksXG4gICAgcHVibGljIG5hbWVzcGFjZUFwaTogRGF0TmFtZXNwYWNlQXBpLFxuICAgIHByaXZhdGUgc2NoZW1hT2JqZWN0U2VydmljZTogU2NoZW1hT2JqZWN0U2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBjcmVhdGVFcGljcygpOiBFcGljIHtcbiAgICBjb25zdCBkaWdpdGFsRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxEaWdpdGFsU2xpY2UsIERhdERpZ2l0YWw+XG4gICAgICAoZGF0Um9vdCwgJ2RpZ2l0YWwnLCB0aGlzLmRhdEFjdGlvbnMuZGlnaXRhbCwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgY2h1bmtFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PENodW5rU2xpY2UsIERhdENodW5rPlxuICAgICAgKGRhdFJvb3QsICdjaHVuaycsIHRoaXMuZGF0QWN0aW9ucy5jaHVuaywgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgbmFtZXNwYWNlRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxOYW1lc3BhY2VTbGljZSwgRGF0TmFtZXNwYWNlPlxuICAgICAgKGRhdFJvb3QsICduYW1lc3BhY2UnLCB0aGlzLmRhdEFjdGlvbnMubmFtZXNwYWNlLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBjb2x1bW5FcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PENvbHVtblNsaWNlLCBEYXRDb2x1bW4+XG4gICAgICAoZGF0Um9vdCwgJ2NvbHVtbicsIHRoaXMuZGF0QWN0aW9ucy5jb2x1bW4sIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIHJldHVybiBjb21iaW5lRXBpY3MoXG5cbiAgICAgIC8vIERpZ2l0YWxcbiAgICAgIGRpZ2l0YWxFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZFZlcnNpb25BY3Rpb24+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5kaWdpdGFsQXBpLmdldFZlcnNpb24obWV0YS5wa0VudGl0eSwgbWV0YS5lbnRpdHlWZXJzaW9uID8gbWV0YS5lbnRpdHlWZXJzaW9uIDogbnVsbCksXG4gICAgICAgIERpZ2l0YWxBY3Rpb25zRmFjdG9yeS5MT0FEX1ZFUlNJT05cbiAgICAgICksXG4gICAgICBkaWdpdGFsRXBpY3NGYWN0b3J5LmNyZWF0ZVVwc2VydEVwaWM8TW9kaWZ5QWN0aW9uTWV0YTxEYXREaWdpdGFsPj4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmRpZ2l0YWxBcGkuYnVsa1Vwc2VydChtZXRhLnBrLCBtZXRhLml0ZW1zKVxuICAgICAgKSxcbiAgICAgIGRpZ2l0YWxFcGljc0ZhY3RvcnkuY3JlYXRlRGVsZXRlRXBpYyhcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuZGlnaXRhbEFwaS5idWxrRGVsZXRlKG1ldGEuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5wa19lbnRpdHkpKVxuICAgICAgKSxcblxuICAgICAgLy8gQ2h1bmtcbiAgICAgIGNodW5rRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRDaHVua3NPZkRpZ2l0YWxBY3Rpb24+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5jaHVua0FwaS5vZkRpZ2l0YWwobWV0YS5waywgbWV0YS5wa0RpZ2l0YWwpLFxuICAgICAgICBDaHVua0FjdGlvbnNGYWN0b3J5LkNIVU5LU19PRl9ESUdJVEFMLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBmbGF0dGVuZXIgPSBuZXcgRmxhdHRlbmVyKHRoaXMuaW5mQWN0aW9ucywgdGhpcy5kYXRBY3Rpb25zLCB0aGlzLnByb0FjdGlvbnMpO1xuICAgICAgICAgIGZsYXR0ZW5lci5jaHVuay5mbGF0dGVuKHJlc3VsdHMpO1xuICAgICAgICAgIHN0b3JlRmxhdHRlbmVkKGZsYXR0ZW5lci5nZXRGbGF0dGVuZWQoKSwgcGspO1xuICAgICAgICB9XG4gICAgICApLFxuXG4gICAgICAvLyBOYW1lc3BhY2VcbiAgICAgIG5hbWVzcGFjZUVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQWN0aW9uTWV0YT4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLm5hbWVzcGFjZUFwaS5ieVByb2plY3QobWV0YS5wayksICcnXG4gICAgICApLFxuXG4gICAgICBjb2x1bW5FcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZENvbHVtbnNPZlRhYmxlQWN0aW9uPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuY29sdW1uQXBpLm9mRGlnaXRhbChtZXRhLnBrLCBtZXRhLnBrRGlnaXRhbCksXG4gICAgICAgIENvbHVtbkFjdGlvbnNGYWN0b3J5LkNPTFVNTlNfT0ZfVEFCTEUsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjaGVtYU9iamVjdCA9IHJlc3VsdHMgYXMgdW5rbm93biBhcyBTY2hlbWFPYmplY3Q7XG5cbiAgICAgICAgICB0aGlzLnNjaGVtYU9iamVjdFNlcnZpY2Uuc3RvcmVTY2hlbWFPYmplY3Qoc2NoZW1hT2JqZWN0LCBwaylcbiAgICAgICAgfVxuICAgICAgKSxcblxuICAgIClcbiAgfVxuXG5cbn1cbiJdfQ==