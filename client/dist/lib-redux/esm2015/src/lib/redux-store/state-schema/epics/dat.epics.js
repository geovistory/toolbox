/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/epics/dat.epics.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmVwaWNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL2VwaWNzL2RhdC5lcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFZLFdBQVcsRUFBYSxZQUFZLEVBQWMsYUFBYSxFQUFnQixlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqSixPQUFPLEVBQUUsWUFBWSxFQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFFakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSxVQUFVLEVBQXVELFVBQVUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUV2TCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBb0Msa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxFQUFxQixNQUFNLGFBQWEsQ0FBQztBQUl0SixNQUFNLE9BQU8sUUFBUTs7Ozs7Ozs7Ozs7O0lBQ25CLFlBQ1MsWUFBcUMsRUFDckMsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsVUFBc0IsRUFDdEIsVUFBeUIsRUFDekIsUUFBcUIsRUFDckIsU0FBdUIsRUFDdkIsWUFBNkIsRUFDNUIsbUJBQXdDO1FBUnpDLGlCQUFZLEdBQVosWUFBWSxDQUF5QjtRQUNyQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQWE7UUFDckIs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QUUsRUFBRTs7a0JBQ1IsWUFBWSxHQUFHLG1CQUFBLE9BQU8sRUFBZ0I7WUFFNUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUM5RCxDQUFDLEVBQ0YsQ0FFRixDQUFBO0lBQ0gsQ0FBQzs7O1lBcEVGLFVBQVU7Ozs7WUFMRix1QkFBdUI7WUFGb0IsVUFBVTtZQUF5QixVQUFVO1lBQXVELFVBQVU7WUFIN0YsYUFBYTtZQUEvRCxXQUFXO1lBQWEsWUFBWTtZQUEyQyxlQUFlO1lBT3ZDLG1CQUFtQjs7OztJQU16RixnQ0FBNEM7O0lBQzVDLDhCQUE2Qjs7SUFDN0IsOEJBQTZCOztJQUM3Qiw4QkFBNkI7O0lBQzdCLDhCQUFnQzs7SUFDaEMsNEJBQTRCOztJQUM1Qiw2QkFBOEI7O0lBQzlCLGdDQUFvQzs7Ozs7SUFDcEMsdUNBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0Q2h1bmssIERhdENodW5rQXBpLCBEYXRDb2x1bW4sIERhdENvbHVtbkFwaSwgRGF0RGlnaXRhbCwgRGF0RGlnaXRhbEFwaSwgRGF0TmFtZXNwYWNlLCBEYXROYW1lc3BhY2VBcGkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgY29tYmluZUVwaWNzLCBFcGljIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZS1lczYtY29tcGF0JztcbmltcG9ydCB7IFNjaGVtYU9iamVjdCB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzJztcbmltcG9ydCB7IENodW5rQWN0aW9uc0ZhY3RvcnksIENvbHVtbkFjdGlvbnNGYWN0b3J5LCBEYXRBY3Rpb25zLCBEaWdpdGFsQWN0aW9uc0ZhY3RvcnksIEluZkFjdGlvbnMsIExvYWRDaHVua3NPZkRpZ2l0YWxBY3Rpb24sIExvYWRDb2x1bW5zT2ZUYWJsZUFjdGlvbiwgUHJvQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgQ2h1bmtTbGljZSwgQ29sdW1uU2xpY2UsIERpZ2l0YWxTbGljZSwgTmFtZXNwYWNlU2xpY2UgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uc0FQSUFjdGlvbnMgfSBmcm9tICcuLi8uLi9zdGF0ZS1ndWkvYWN0aW9ucyc7XG5pbXBvcnQgeyBkYXRSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzJztcbmltcG9ydCB7IEZsYXR0ZW5lciwgTG9hZEFjdGlvbk1ldGEsIE1vZGlmeUFjdGlvbk1ldGEsIFNjaGVtYUVwaWNzRmFjdG9yeSwgU2NoZW1hT2JqZWN0U2VydmljZSwgc3RvcmVGbGF0dGVuZWQsIExvYWRWZXJzaW9uQWN0aW9uIH0gZnJvbSAnLi4vX2hlbHBlcnMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRFcGljcyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbnNBUElBY3Rpb25zLFxuICAgIHB1YmxpYyBkYXRBY3Rpb25zOiBEYXRBY3Rpb25zLFxuICAgIHB1YmxpYyBpbmZBY3Rpb25zOiBJbmZBY3Rpb25zLFxuICAgIHB1YmxpYyBwcm9BY3Rpb25zOiBQcm9BY3Rpb25zLFxuICAgIHB1YmxpYyBkaWdpdGFsQXBpOiBEYXREaWdpdGFsQXBpLFxuICAgIHB1YmxpYyBjaHVua0FwaTogRGF0Q2h1bmtBcGksXG4gICAgcHVibGljIGNvbHVtbkFwaTogRGF0Q29sdW1uQXBpLFxuICAgIHB1YmxpYyBuYW1lc3BhY2VBcGk6IERhdE5hbWVzcGFjZUFwaSxcbiAgICBwcml2YXRlIHNjaGVtYU9iamVjdFNlcnZpY2U6IFNjaGVtYU9iamVjdFNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgY3JlYXRlRXBpY3MoKTogRXBpYyB7XG4gICAgY29uc3QgZGlnaXRhbEVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8RGlnaXRhbFNsaWNlLCBEYXREaWdpdGFsPlxuICAgICAgKGRhdFJvb3QsICdkaWdpdGFsJywgdGhpcy5kYXRBY3Rpb25zLmRpZ2l0YWwsIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IGNodW5rRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxDaHVua1NsaWNlLCBEYXRDaHVuaz5cbiAgICAgIChkYXRSb290LCAnY2h1bmsnLCB0aGlzLmRhdEFjdGlvbnMuY2h1bmssIHRoaXMubm90aWZpY2F0aW9uKTtcblxuICAgIGNvbnN0IG5hbWVzcGFjZUVwaWNzRmFjdG9yeSA9IG5ldyBTY2hlbWFFcGljc0ZhY3Rvcnk8TmFtZXNwYWNlU2xpY2UsIERhdE5hbWVzcGFjZT5cbiAgICAgIChkYXRSb290LCAnbmFtZXNwYWNlJywgdGhpcy5kYXRBY3Rpb25zLm5hbWVzcGFjZSwgdGhpcy5ub3RpZmljYXRpb24pO1xuXG4gICAgY29uc3QgY29sdW1uRXBpY3NGYWN0b3J5ID0gbmV3IFNjaGVtYUVwaWNzRmFjdG9yeTxDb2x1bW5TbGljZSwgRGF0Q29sdW1uPlxuICAgICAgKGRhdFJvb3QsICdjb2x1bW4nLCB0aGlzLmRhdEFjdGlvbnMuY29sdW1uLCB0aGlzLm5vdGlmaWNhdGlvbik7XG5cbiAgICByZXR1cm4gY29tYmluZUVwaWNzKFxuXG4gICAgICAvLyBEaWdpdGFsXG4gICAgICBkaWdpdGFsRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRWZXJzaW9uQWN0aW9uPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuZGlnaXRhbEFwaS5nZXRWZXJzaW9uKG1ldGEucGtFbnRpdHksIG1ldGEuZW50aXR5VmVyc2lvbiA/IG1ldGEuZW50aXR5VmVyc2lvbiA6IG51bGwpLFxuICAgICAgICBEaWdpdGFsQWN0aW9uc0ZhY3RvcnkuTE9BRF9WRVJTSU9OXG4gICAgICApLFxuICAgICAgZGlnaXRhbEVwaWNzRmFjdG9yeS5jcmVhdGVVcHNlcnRFcGljPE1vZGlmeUFjdGlvbk1ldGE8RGF0RGlnaXRhbD4+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5kaWdpdGFsQXBpLmJ1bGtVcHNlcnQobWV0YS5waywgbWV0YS5pdGVtcylcbiAgICAgICksXG4gICAgICBkaWdpdGFsRXBpY3NGYWN0b3J5LmNyZWF0ZURlbGV0ZUVwaWMoXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmRpZ2l0YWxBcGkuYnVsa0RlbGV0ZShtZXRhLml0ZW1zLm1hcChpdGVtID0+IGl0ZW0ucGtfZW50aXR5KSlcbiAgICAgICksXG5cbiAgICAgIC8vIENodW5rXG4gICAgICBjaHVua0VwaWNzRmFjdG9yeS5jcmVhdGVMb2FkRXBpYzxMb2FkQ2h1bmtzT2ZEaWdpdGFsQWN0aW9uPihcbiAgICAgICAgKG1ldGEpID0+IHRoaXMuY2h1bmtBcGkub2ZEaWdpdGFsKG1ldGEucGssIG1ldGEucGtEaWdpdGFsKSxcbiAgICAgICAgQ2h1bmtBY3Rpb25zRmFjdG9yeS5DSFVOS1NfT0ZfRElHSVRBTCxcbiAgICAgICAgKHJlc3VsdHMsIHBrKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmxhdHRlbmVyID0gbmV3IEZsYXR0ZW5lcih0aGlzLmluZkFjdGlvbnMsIHRoaXMuZGF0QWN0aW9ucywgdGhpcy5wcm9BY3Rpb25zKTtcbiAgICAgICAgICBmbGF0dGVuZXIuY2h1bmsuZmxhdHRlbihyZXN1bHRzKTtcbiAgICAgICAgICBzdG9yZUZsYXR0ZW5lZChmbGF0dGVuZXIuZ2V0RmxhdHRlbmVkKCksIHBrKTtcbiAgICAgICAgfVxuICAgICAgKSxcblxuICAgICAgLy8gTmFtZXNwYWNlXG4gICAgICBuYW1lc3BhY2VFcGljc0ZhY3RvcnkuY3JlYXRlTG9hZEVwaWM8TG9hZEFjdGlvbk1ldGE+KFxuICAgICAgICAobWV0YSkgPT4gdGhpcy5uYW1lc3BhY2VBcGkuYnlQcm9qZWN0KG1ldGEucGspLCAnJ1xuICAgICAgKSxcblxuICAgICAgY29sdW1uRXBpY3NGYWN0b3J5LmNyZWF0ZUxvYWRFcGljPExvYWRDb2x1bW5zT2ZUYWJsZUFjdGlvbj4oXG4gICAgICAgIChtZXRhKSA9PiB0aGlzLmNvbHVtbkFwaS5vZkRpZ2l0YWwobWV0YS5waywgbWV0YS5wa0RpZ2l0YWwpLFxuICAgICAgICBDb2x1bW5BY3Rpb25zRmFjdG9yeS5DT0xVTU5TX09GX1RBQkxFLFxuICAgICAgICAocmVzdWx0cywgcGspID0+IHtcbiAgICAgICAgICBjb25zdCBzY2hlbWFPYmplY3QgPSByZXN1bHRzIGFzIFNjaGVtYU9iamVjdDtcblxuICAgICAgICAgIHRoaXMuc2NoZW1hT2JqZWN0U2VydmljZS5zdG9yZVNjaGVtYU9iamVjdChzY2hlbWFPYmplY3QsIHBrKVxuICAgICAgICB9XG4gICAgICApLFxuXG4gICAgKVxuICB9XG5cblxufVxuIl19