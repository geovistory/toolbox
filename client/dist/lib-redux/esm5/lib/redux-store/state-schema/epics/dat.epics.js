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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvZXBpY3MvZGF0LmVwaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQVksV0FBVyxFQUFhLFlBQVksRUFBYyxhQUFhLEVBQWdCLGVBQWUsRUFBZ0IsTUFBTSx1QkFBdUIsQ0FBQztBQUMvSixPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBdUQsTUFBTSx3QkFBd0IsQ0FBQztBQUMzSyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXBELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7Ozs7QUFHdEU7SUFJRSxrQkFDUyxZQUFxQyxFQUNyQyxVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUFzQixFQUN0QixVQUF5QixFQUN6QixRQUFxQixFQUNyQixTQUF1QixFQUN2QixZQUE2QixFQUM1QixtQkFBa0M7UUFSbkMsaUJBQVksR0FBWixZQUFZLENBQXlCO1FBQ3JDLGVBQVUsR0FBVixVQUFVLENBQVk7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Y0FBYzs7OztRQUMvQixVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFqRCxDQUFpRCxHQUMzRCxvQkFBb0IsQ0FBQyxnQkFBZ0I7Ozs7O1FBQ3JDLFVBQUMsT0FBTyxFQUFFLEVBQUU7O2dCQUNKLFlBQVksR0FBRyxtQkFBQSxtQkFBQSxPQUFPLEVBQVcsRUFBZ0I7WUFFdkQsS0FBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUM5RCxDQUFDLEVBQ0YsQ0FFRixDQUFBO0lBQ0gsQ0FBQzs7Z0JBdEVGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBZFEsdUJBQXVCO2dCQUNvQixVQUFVO2dCQUNyRCxVQUFVO2dCQUNWLFVBQVU7Z0JBTGtELGFBQWE7Z0JBQS9ELFdBQVc7Z0JBQWEsWUFBWTtnQkFBMkMsZUFBZTtnQkFReEcsYUFBYTs7O21CQVR0QjtDQXdGQyxBQXpFRCxJQXlFQztTQXRFWSxRQUFROzs7SUFFakIsZ0NBQTRDOztJQUM1Qyw4QkFBNkI7O0lBQzdCLDhCQUE2Qjs7SUFDN0IsOEJBQTZCOztJQUM3Qiw4QkFBZ0M7O0lBQ2hDLDRCQUE0Qjs7SUFDNUIsNkJBQThCOztJQUM5QixnQ0FBb0M7Ozs7O0lBQ3BDLHVDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdENodW5rLCBEYXRDaHVua0FwaSwgRGF0Q29sdW1uLCBEYXRDb2x1bW5BcGksIERhdERpZ2l0YWwsIERhdERpZ2l0YWxBcGksIERhdE5hbWVzcGFjZSwgRGF0TmFtZXNwYWNlQXBpLCBTY2hlbWFPYmplY3QgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IENodW5rQWN0aW9uc0ZhY3RvcnksIENvbHVtbkFjdGlvbnNGYWN0b3J5LCBEYXRBY3Rpb25zLCBEaWdpdGFsQWN0aW9uc0ZhY3RvcnksIExvYWRDaHVua3NPZkRpZ2l0YWxBY3Rpb24sIExvYWRDb2x1bW5zT2ZUYWJsZUFjdGlvbiB9IGZyb20gJy4uL2FjdGlvbnMvZGF0LmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5mLmFjdGlvbnMnO1xuaW1wb3J0IHsgUHJvQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgQ2h1bmtTbGljZSwgQ29sdW1uU2xpY2UsIERpZ2l0YWxTbGljZSwgTmFtZXNwYWNlU2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvZGF0Lm1vZGVscyc7XG5pbXBvcnQgeyBkYXRSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzL2RhdC5jb25maWcnO1xuaW1wb3J0IHsgU2NoZW1hU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NjaGVtYS5zZXJ2aWNlJztcbmltcG9ydCB7IEZsYXR0ZW5lciwgc3RvcmVGbGF0dGVuZWQgfSBmcm9tICcuLi9faGVscGVycy9mbGF0dGVuZXInO1xuaW1wb3J0IHsgTG9hZEFjdGlvbk1ldGEsIExvYWRWZXJzaW9uQWN0aW9uLCBNb2RpZnlBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5pbXBvcnQgeyBTY2hlbWFFcGljc0ZhY3RvcnkgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtZXBpY3MtZmFjdG9yeSc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGF0RXBpY3Mge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25zQVBJQWN0aW9ucyxcbiAgICBwdWJsaWMgZGF0QWN0aW9uczogRGF0QWN0aW9ucyxcbiAgICBwdWJsaWMgaW5mQWN0aW9uczogSW5mQWN0aW9ucyxcbiAgICBwdWJsaWMgcHJvQWN0aW9uczogUHJvQWN0aW9ucyxcbiAgICBwdWJsaWMgZGlnaXRhbEFwaTogRGF0RGlnaXRhbEFwaSxcbiAgICBwdWJsaWMgY2h1bmtBcGk6IERhdENodW5rQXBpLFxuICAgIHB1YmxpYyBjb2x1bW5BcGk6IERhdENvbHVtbkFwaSxcbiAgICBwdWJsaWMgbmFtZXNwYWNlQXBpOiBEYXROYW1lc3BhY2VBcGksXG4gICAgcHJpdmF0ZSBzY2hlbWFPYmplY3RTZXJ2aWNlOiBTY2hlbWFTZXJ2aWNlXG4gICkgeyB9XG5cbiAgcHVibGljIGNyZWF0ZUVwaWNzKCk6IEVwaWMge1xuICAgIGNvbnN0IGRpZ2l0YWxFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PERpZ2l0YWxTbGljZSwgRGF0RGlnaXRhbD5cbiAgICAgIChkYXRSb290LCAnZGlnaXRhbCcsIHRoaXMuZGF0QWN0aW9ucy5kaWdpdGFsLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBjaHVua0VwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8Q2h1bmtTbGljZSwgRGF0Q2h1bms+XG4gICAgICAoZGF0Um9vdCwgJ2NodW5rJywgdGhpcy5kYXRBY3Rpb25zLmNodW5rLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICBjb25zdCBuYW1lc3BhY2VFcGljc0ZhY3RvcnkgPSBuZXcgU2NoZW1hRXBpY3NGYWN0b3J5PE5hbWVzcGFjZVNsaWNlLCBEYXROYW1lc3BhY2U+XG4gICAgICAoZGF0Um9vdCwgJ25hbWVzcGFjZScsIHRoaXMuZGF0QWN0aW9ucy5uYW1lc3BhY2UsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IGNvbHVtbkVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8Q29sdW1uU2xpY2UsIERhdENvbHVtbj5cbiAgICAgIChkYXRSb290LCAnY29sdW1uJywgdGhpcy5kYXRBY3Rpb25zLmNvbHVtbiwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgcmV0dXJuIGNvbWJpbmVFcGljcyhcblxuICAgICAgLy8gRGlnaXRhbFxuICAgICAgZGlnaXRhbEVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkVmVyc2lvbkFjdGlvbj4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmRpZ2l0YWxBcGkuZ2V0VmVyc2lvbihtZXRhLnBrRW50aXR5LCBtZXRhLmVudGl0eVZlcnNpb24gPyBtZXRhLmVudGl0eVZlcnNpb24gOiBudWxsKSxcbiAgICAgICAgRGlnaXRhbEFjdGlvbnNGYWN0b3J5LkxPQURfVkVSU0lPTlxuICAgICAgKSxcbiAgICAgIGRpZ2l0YWxFcGljc0ZhY3RvcnkuY3JlYXRlVXBzZXJ0RXBpYzxNb2RpZnlBY3Rpb25NZXRhPERhdERpZ2l0YWw+PihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuZGlnaXRhbEFwaS5idWxrVXBzZXJ0KG1ldGEucGssIG1ldGEuaXRlbXMpXG4gICAgICApLFxuICAgICAgZGlnaXRhbEVwaWNzRmFjdG9yeS5jcmVhdGVEZWxldGVFcGljKFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5kaWdpdGFsQXBpLmJ1bGtEZWxldGUobWV0YS5pdGVtcy5tYXAoaXRlbSA9PiBpdGVtLnBrX2VudGl0eSkpXG4gICAgICApLFxuXG4gICAgICAvLyBDaHVua1xuICAgICAgY2h1bmtFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZENodW5rc09mRGlnaXRhbEFjdGlvbj4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmNodW5rQXBpLm9mRGlnaXRhbChtZXRhLnBrLCBtZXRhLnBrRGlnaXRhbCksXG4gICAgICAgIENodW5rQWN0aW9uc0ZhY3RvcnkuQ0hVTktTX09GX0RJR0lUQUwsXG4gICAgICAgIChyZXN1bHRzLCBwaykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZsYXR0ZW5lciA9IG5ldyBGbGF0dGVuZXIodGhpcy5pbmZBY3Rpb25zLCB0aGlzLmRhdEFjdGlvbnMsIHRoaXMucHJvQWN0aW9ucyk7XG4gICAgICAgICAgZmxhdHRlbmVyLmNodW5rLmZsYXR0ZW4ocmVzdWx0cyk7XG4gICAgICAgICAgc3RvcmVGbGF0dGVuZWQoZmxhdHRlbmVyLmdldEZsYXR0ZW5lZCgpLCBwayk7XG4gICAgICAgIH1cbiAgICAgICksXG5cbiAgICAgIC8vIE5hbWVzcGFjZVxuICAgICAgbmFtZXNwYWNlRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRBY3Rpb25NZXRhPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMubmFtZXNwYWNlQXBpLmJ5UHJvamVjdChtZXRhLnBrKSwgJydcbiAgICAgICksXG5cbiAgICAgIGNvbHVtbkVwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQ29sdW1uc09mVGFibGVBY3Rpb24+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5jb2x1bW5BcGkub2ZEaWdpdGFsKG1ldGEucGssIG1ldGEucGtEaWdpdGFsKSxcbiAgICAgICAgQ29sdW1uQWN0aW9uc0ZhY3RvcnkuQ09MVU1OU19PRl9UQUJMRSxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2NoZW1hT2JqZWN0ID0gcmVzdWx0cyBhcyB1bmtub3duIGFzIFNjaGVtYU9iamVjdDtcblxuICAgICAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdChzY2hlbWFPYmplY3QsIHBrKVxuICAgICAgICB9XG4gICAgICApLFxuXG4gICAgKVxuICB9XG5cblxufVxuIl19