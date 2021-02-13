/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/dat.epics.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DatChunkApi, DatDigitalApi, DatNamespaceApi, DatColumnApi } from '@kleiolab/lib-sdk-lb3';
import { combineEpics } from 'redux-observable-es6-compat';
import { ChunkActionsFactory, ColumnActionsFactory, DatActions, DigitalActionsFactory } from '../actions/dat.actions';
import { NotificationsAPIActions } from '../../state-gui/actions/notifications.actions';
import { datRoot } from '../reducer-configs/dat.config';
import { InfActions } from '../actions/inf.actions';
import { ProActions } from '../actions/pro.actions';
import { SchemaObjectService } from '../services/schema-object.service';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';
import { Flattener, storeFlattened } from '../_helpers/flattener';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2RhdC5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFZLFdBQVcsRUFBeUIsYUFBYSxFQUFnQixlQUFlLEVBQWdCLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQy9KLE9BQU8sRUFBRSxZQUFZLEVBQVEsTUFBTSw2QkFBNkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUF1RCxNQUFNLHdCQUF3QixDQUFDO0FBRTNLLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUd4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFJbEUsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7Ozs7OztJQUNuQixZQUNTLFlBQXFDLEVBQ3JDLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXNCLEVBQ3RCLFVBQXlCLEVBQ3pCLFFBQXFCLEVBQ3JCLFNBQXVCLEVBQ3ZCLFlBQTZCLEVBQzVCLG1CQUF3QztRQVJ6QyxpQkFBWSxHQUFaLFlBQVksQ0FBeUI7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QUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQzNELG9CQUFvQixDQUFDLGdCQUFnQjs7Ozs7UUFDckMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUU7O2tCQUNSLFlBQVksR0FBRyxtQkFBQSxtQkFBQSxPQUFPLEVBQVcsRUFBZ0I7WUFFdkQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUM5RCxDQUFDLEVBQ0YsQ0FFRixDQUFBO0lBQ0gsQ0FBQzs7O1lBcEVGLFVBQVU7Ozs7WUFYRix1QkFBdUI7WUFGb0IsVUFBVTtZQU1yRCxVQUFVO1lBQ1YsVUFBVTtZQVRvQyxhQUFhO1lBQWpELFdBQVc7WUFBcUYsWUFBWTtZQUEzQyxlQUFlO1lBVTFGLG1CQUFtQjs7OztJQVF4QixnQ0FBNEM7O0lBQzVDLDhCQUE2Qjs7SUFDN0IsOEJBQTZCOztJQUM3Qiw4QkFBNkI7O0lBQzdCLDhCQUFnQzs7SUFDaEMsNEJBQTRCOztJQUM1Qiw2QkFBOEI7O0lBQzlCLGdDQUFvQzs7Ozs7SUFDcEMsdUNBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0Q2h1bmssIERhdENodW5rQXBpLCBEYXRDb2x1bW4sIERhdERpZ2l0YWwsIERhdERpZ2l0YWxBcGksIERhdE5hbWVzcGFjZSwgRGF0TmFtZXNwYWNlQXBpLCBTY2hlbWFPYmplY3QsIERhdENvbHVtbkFwaSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBjb21iaW5lRXBpY3MsIEVwaWMgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlLWVzNi1jb21wYXQnO1xuaW1wb3J0IHsgQ2h1bmtBY3Rpb25zRmFjdG9yeSwgQ29sdW1uQWN0aW9uc0ZhY3RvcnksIERhdEFjdGlvbnMsIERpZ2l0YWxBY3Rpb25zRmFjdG9yeSwgTG9hZENodW5rc09mRGlnaXRhbEFjdGlvbiwgTG9hZENvbHVtbnNPZlRhYmxlQWN0aW9uIH0gZnJvbSAnLi4vYWN0aW9ucy9kYXQuYWN0aW9ucyc7XG5pbXBvcnQgeyBDaHVua1NsaWNlLCBDb2x1bW5TbGljZSwgRGlnaXRhbFNsaWNlLCBOYW1lc3BhY2VTbGljZSB9IGZyb20gJy4uL21vZGVscy9kYXQubW9kZWxzJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zIH0gZnJvbSAnLi4vLi4vc3RhdGUtZ3VpL2FjdGlvbnMvbm90aWZpY2F0aW9ucy5hY3Rpb25zJztcbmltcG9ydCB7IGRhdFJvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MvZGF0LmNvbmZpZyc7XG5pbXBvcnQgeyBMb2FkQWN0aW9uTWV0YSwgTW9kaWZ5QWN0aW9uTWV0YSwgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcbmltcG9ydCB7IExvYWRWZXJzaW9uQWN0aW9uIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5pbXBvcnQgeyBJbmZBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmYuYWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9BY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9wcm8uYWN0aW9ucyc7XG5pbXBvcnQgeyBTY2hlbWFPYmplY3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2NoZW1hLW9iamVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IFNjaGVtYUVwaWNzRmFjdG9yeSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1lcGljcy1mYWN0b3J5JztcbmltcG9ydCB7IEZsYXR0ZW5lciwgc3RvcmVGbGF0dGVuZWQgfSBmcm9tICcuLi9faGVscGVycy9mbGF0dGVuZXInO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHB1YmxpYyBkYXRBY3Rpb25zOiBEYXRBY3Rpb25zLFxuICAgIHB1YmxpYyBpbmZBY3Rpb25zOiBJbmZBY3Rpb25zLFxuICAgIHB1YmxpYyBwcm9BY3Rpb25zOiBQcm9BY3Rpb25zLFxuICAgIHB1YmxpYyBkaWdpdGFsQXBpOiBEYXREaWdpdGFsQXBpLFxuICAgIHB1YmxpYyBjaHVua0FwaTogRGF0Q2h1bmtBcGksXG4gICAgcHVibGljIGNvbHVtbkFwaTogRGF0Q29sdW1uQXBpLFxuICAgIHB1YmxpYyBuYW1lc3BhY2VBcGk6IERhdE5hbWVzcGFjZUFwaSxcbiAgICBwcml2YXRlIHNjaGVtYU9iamVjdFNlcnZpY2U6IFNjaGVtYU9iamVjdFNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG4gICAgY29uc3QgZGlnaXRhbEVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8RGlnaXRhbFNsaWNlLCBEYXREaWdpdGFsPlxuICAgICAgKGRhdFJvb3QsICdkaWdpdGFsJywgdGhpcy5kYXRBY3Rpb25zLmRpZ2l0YWwsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IGNodW5rRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxDaHVua1NsaWNlLCBEYXRDaHVuaz5cbiAgICAgIChkYXRSb290LCAnY2h1bmsnLCB0aGlzLmRhdEFjdGlvbnMuY2h1bmssIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IG5hbWVzcGFjZUVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8TmFtZXNwYWNlU2xpY2UsIERhdE5hbWVzcGFjZT5cbiAgICAgIChkYXRSb290LCAnbmFtZXNwYWNlJywgdGhpcy5kYXRBY3Rpb25zLm5hbWVzcGFjZSwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgY29sdW1uRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxDb2x1bW5TbGljZSwgRGF0Q29sdW1uPlxuICAgICAgKGRhdFJvb3QsICdjb2x1bW4nLCB0aGlzLmRhdEFjdGlvbnMuY29sdW1uLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuXG4gICAgICAvLyBEaWdpdGFsXG4gICAgICBkaWdpdGFsRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRWZXJzaW9uQWN0aW9uPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuZGlnaXRhbEFwaS5nZXRWZXJzaW9uKG1ldGEucGtFbnRpdHksIG1ldGEuZW50aXR5VmVyc2lvbiA/IG1ldGEuZW50aXR5VmVyc2lvbiA6IG51bGwpLFxuICAgICAgICBEaWdpdGFsQWN0aW9uc0ZhY3RvcnkuTE9BRF9WRVJTSU9OXG4gICAgICApLFxuICAgICAgZGlnaXRhbEVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8RGF0RGlnaXRhbD4+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5kaWdpdGFsQXBpLmJ1bGtVcHNlcnQobWV0YS5waywgbWV0YS5pdGVtcylcbiAgICAgICksXG4gICAgICBkaWdpdGFsRXBpY3NGYWN0b3J5LmNyZWF0ZURlbGV0ZUVwaWMoXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmRpZ2l0YWxBcGkuYnVsa0RlbGV0ZShtZXRhLml0ZW1zLm1hcChpdGVtID0+IGl0ZW0ucGtfZW50aXR5KSlcbiAgICAgICksXG5cbiAgICAgIC8vIENodW5rXG4gICAgICBjaHVua0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQ2h1bmtzT2ZEaWdpdGFsQWN0aW9uPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuY2h1bmtBcGkub2ZEaWdpdGFsKG1ldGEucGssIG1ldGEucGtEaWdpdGFsKSxcbiAgICAgICAgQ2h1bmtBY3Rpb25zRmFjdG9yeS5DSFVOS1NfT0ZfRElHSVRBTCxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIuY2h1bmsuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrKTtcbiAgICAgICAgfVxuICAgICAgKSxcblxuICAgICAgLy8gTmFtZXNwYWNlXG4gICAgICBuYW1lc3BhY2VFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5uYW1lc3BhY2VBcGkuYnlQcm9qZWN0KG1ldGEucGspLCAnJ1xuICAgICAgKSxcblxuICAgICAgY29sdW1uRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRDb2x1bW5zT2ZUYWJsZUFjdGlvbj4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmNvbHVtbkFwaS5vZkRpZ2l0YWwobWV0YS5waywgbWV0YS5wa0RpZ2l0YWwpLFxuICAgICAgICBDb2x1bW5BY3Rpb25zRmFjdG9yeS5DT0xVTU5TX09GX1RBQkxFLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWFPYmplY3QgPSByZXN1bHRzIGFzIHVua25vd24gYXMgU2NoZW1hT2JqZWN0O1xuXG4gICAgICAgICAgdGhpcy5zY2hlbWFPYmplY3RTZXJ2aWNlLnN0b3JlU2NoZW1hT2JqZWN0KHNjaGVtYU9iamVjdCwgcGspXG4gICAgICAgIH1cbiAgICAgICksXG5cbiAgICApXG4gIH1cblxuXG59XG4iXX0=