/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/dat.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { datRoot } from '../reducer-configs/dat.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
export class DigitalActionsFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(datRoot, 'digital'));
        this.loadVersion = (/**
         * @param {?} pkEntity
         * @param {?=} entityVersion
         * @return {?}
         */
        (pkEntity, entityVersion) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DigitalActionsFactory.LOAD_VERSION,
                meta: { addPending, pkEntity, entityVersion },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
DigitalActionsFactory.LOAD_VERSION = 'LOAD_VERSION';
if (false) {
    /** @type {?} */
    DigitalActionsFactory.LOAD_VERSION;
    /**
     * Load a version. if entityVersion omitted, latest version is returned.
     * @type {?}
     */
    DigitalActionsFactory.prototype.loadVersion;
    /** @type {?} */
    DigitalActionsFactory.prototype.ngRedux;
}
/**
 * @record
 */
export function LoadChunksOfDigitalAction() { }
if (false) {
    /** @type {?} */
    LoadChunksOfDigitalAction.prototype.pkDigital;
}
export class ChunkActionsFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(datRoot, 'chunk'));
        this.loadChunksOfDigital = (/**
         * @param {?} pkDigital
         * @param {?} pk
         * @return {?}
         */
        (pkDigital, pk) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ChunkActionsFactory.CHUNKS_OF_DIGITAL,
                meta: { addPending, pkDigital, pk },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
ChunkActionsFactory.CHUNKS_OF_DIGITAL = 'CHUNKS_OF_DIGITAL';
if (false) {
    /** @type {?} */
    ChunkActionsFactory.CHUNKS_OF_DIGITAL;
    /**
     * Load a version. if entityVersion omitted, latest version is returned.
     * @type {?}
     */
    ChunkActionsFactory.prototype.loadChunksOfDigital;
    /** @type {?} */
    ChunkActionsFactory.prototype.ngRedux;
}
/**
 * @record
 */
export function LoadColumnsOfTableAction() { }
if (false) {
    /** @type {?} */
    LoadColumnsOfTableAction.prototype.pkDigital;
}
export class ColumnActionsFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(datRoot, 'column'));
        this.loadColumnsOfTable = (/**
         * @param {?} pkDigital
         * @param {?} pk
         * @return {?}
         */
        (pkDigital, pk) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ColumnActionsFactory.COLUMNS_OF_TABLE,
                meta: { addPending, pkDigital, pk },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
ColumnActionsFactory.COLUMNS_OF_TABLE = 'COLUMNS_OF_TABLE';
if (false) {
    /** @type {?} */
    ColumnActionsFactory.COLUMNS_OF_TABLE;
    /**
     * Load a version. if entityVersion omitted, latest version is returned.
     * @type {?}
     */
    ColumnActionsFactory.prototype.loadColumnsOfTable;
    /** @type {?} */
    ColumnActionsFactory.prototype.ngRedux;
}
export class DatActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.digital = new DigitalActionsFactory(this.ngRedux).createActions();
        this.chunk = new ChunkActionsFactory(this.ngRedux).createActions();
        this.column = new ColumnActionsFactory(this.ngRedux).createActions();
        this.class_column_mapping = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'class_column_mapping');
        this.namespace = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'namespace');
        this.text_property = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'text_property');
    }
}
DatActions.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DatActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ DatActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DatActions_Factory() { return new DatActions(i0.ɵɵinject(i1.NgRedux)); }, token: DatActions, providedIn: "root" });
if (false) {
    /** @type {?} */
    DatActions.prototype.digital;
    /** @type {?} */
    DatActions.prototype.chunk;
    /** @type {?} */
    DatActions.prototype.column;
    /** @type {?} */
    DatActions.prototype.class_column_mapping;
    /** @type {?} */
    DatActions.prototype.namespace;
    /** @type {?} */
    DatActions.prototype.text_property;
    /** @type {?} */
    DatActions.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL2RhdC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSXhDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLEVBQTZELG9CQUFvQixFQUFxQixNQUFNLG9DQUFvQyxDQUFDOzs7QUFHeEosTUFBTSxPQUFPLHFCQUFzQixTQUFRLG9CQUE4Qzs7OztJQVV2RixZQUFtQixPQUEyQjtRQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUE3QyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtJQUFtQixDQUFDOzs7O0lBRWxFLGFBQWE7UUFDWCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7UUFFL0QsSUFBSSxDQUFDLFdBQVc7Ozs7O1FBQUcsQ0FBQyxRQUFnQixFQUFFLGFBQXNCLEVBQUUsRUFBRTs7a0JBQ3hELFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztrQkFFckIsTUFBTSxHQUF3RDtnQkFDbEUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyxxQkFBcUIsQ0FBQyxZQUFZO2dCQUNyRyxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRTtnQkFDN0MsT0FB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QUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUV4SCxrQkFBYSxHQUFHLElBQUksb0JBQW9CLENBQXFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUE7SUFFcEYsQ0FBQzs7O1lBakJwRCxVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUF4SFEsT0FBTzs7Ozs7SUEySGQsNkJBQWtFOztJQUVsRSwyQkFBNkQ7O0lBRTdELDRCQUErRDs7SUFFL0QsMENBQWdLOztJQUVoSywrQkFBd0g7O0lBRXhILG1DQUFzSTs7SUFFMUgsNkJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdENodW5rLCBEYXRDb2x1bW4sIERhdERpZ2l0YWwsIERhdE5hbWVzcGFjZSwgRGF0VGV4dFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IERhdENsYXNzQ29sdW1uTWFwcGluZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBVIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscy9tb2RlbCc7XG5pbXBvcnQgeyBDaHVua1NsaWNlLCBDbGFzc0NvbHVtbk1hcHBpbmdTbGljZSwgQ29sdW1uU2xpY2UsIERpZ2l0YWxTbGljZSwgTmFtZXNwYWNlU2xpY2UsIFRleHRQcm9wZXJ0eVNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzL2RhdC5tb2RlbHMnO1xuaW1wb3J0IHsgZGF0Um9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncy9kYXQuY29uZmlnJztcbmltcG9ydCB7IEFjdGlvblJlc3VsdE9ic2VydmFibGUsIExvYWRBY3Rpb25NZXRhLCBMb2FkVmVyc2lvbkFjdGlvbiwgU2NoZW1hQWN0aW9uc0ZhY3RvcnksIFN1Y2NlZWRBY3Rpb25NZXRhIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cblxuZXhwb3J0IGNsYXNzIERpZ2l0YWxBY3Rpb25zRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PERpZ2l0YWxTbGljZSwgRGF0RGlnaXRhbD4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBMT0FEX1ZFUlNJT04gPSAnTE9BRF9WRVJTSU9OJztcblxuICAvKipcbiAgICogTG9hZCBhIHZlcnNpb24uIGlmIGVudGl0eVZlcnNpb24gb21pdHRlZCwgbGF0ZXN0IHZlcnNpb24gaXMgcmV0dXJuZWQuXG4gICAqL1xuICBsb2FkVmVyc2lvbjogKHBrRW50aXR5OiBudW1iZXIsIGVudGl0eVZlcnNpb24/OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8RGF0RGlnaXRhbD47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBEaWdpdGFsQWN0aW9uc0ZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAnZGlnaXRhbCcpKVxuXG4gICAgdGhpcy5sb2FkVmVyc2lvbiA9IChwa0VudGl0eTogbnVtYmVyLCBlbnRpdHlWZXJzaW9uPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcblxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248RGlnaXRhbFNsaWNlLCBMb2FkVmVyc2lvbkFjdGlvbj4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBEaWdpdGFsQWN0aW9uc0ZhY3RvcnkuTE9BRF9WRVJTSU9OLFxuICAgICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHBrRW50aXR5LCBlbnRpdHlWZXJzaW9uIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPERhdERpZ2l0YWw+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZENodW5rc09mRGlnaXRhbEFjdGlvbiBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHsgcGtEaWdpdGFsOiBudW1iZXIgfVxuXG5leHBvcnQgY2xhc3MgQ2h1bmtBY3Rpb25zRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PENodW5rU2xpY2UsIERhdENodW5rPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IENIVU5LU19PRl9ESUdJVEFMID0gJ0NIVU5LU19PRl9ESUdJVEFMJztcblxuICAvKipcbiAgICogTG9hZCBhIHZlcnNpb24uIGlmIGVudGl0eVZlcnNpb24gb21pdHRlZCwgbGF0ZXN0IHZlcnNpb24gaXMgcmV0dXJuZWQuXG4gICAqL1xuICBsb2FkQ2h1bmtzT2ZEaWdpdGFsOiAocGtEaWdpdGFsOiBudW1iZXIsIHBrOiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8RGF0Q2h1bms+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogQ2h1bmtBY3Rpb25zRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICdjaHVuaycpKVxuXG4gICAgdGhpcy5sb2FkQ2h1bmtzT2ZEaWdpdGFsID0gKHBrRGlnaXRhbDogbnVtYmVyLCBwazogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcblxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248Q2h1bmtTbGljZSwgTG9hZENodW5rc09mRGlnaXRhbEFjdGlvbj4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBDaHVua0FjdGlvbnNGYWN0b3J5LkNIVU5LU19PRl9ESUdJVEFMLFxuICAgICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHBrRGlnaXRhbCwgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8RGF0Q2h1bms+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZENvbHVtbnNPZlRhYmxlQWN0aW9uIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEgeyBwa0RpZ2l0YWw6IG51bWJlciB9XG5cbmV4cG9ydCBjbGFzcyBDb2x1bW5BY3Rpb25zRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PENvbHVtblNsaWNlLCBEYXRDb2x1bW4+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgQ09MVU1OU19PRl9UQUJMRSA9ICdDT0xVTU5TX09GX1RBQkxFJztcblxuICAvKipcbiAgICogTG9hZCBhIHZlcnNpb24uIGlmIGVudGl0eVZlcnNpb24gb21pdHRlZCwgbGF0ZXN0IHZlcnNpb24gaXMgcmV0dXJuZWQuXG4gICAqL1xuICBsb2FkQ29sdW1uc09mVGFibGU6IChwa0RpZ2l0YWw6IG51bWJlciwgcGs6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxEYXRDb2x1bW4+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogQ29sdW1uQWN0aW9uc0ZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAnY29sdW1uJykpXG5cbiAgICB0aGlzLmxvYWRDb2x1bW5zT2ZUYWJsZSA9IChwa0RpZ2l0YWw6IG51bWJlciwgcGs6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG5cbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPENvbHVtblNsaWNlLCBMb2FkQ29sdW1uc09mVGFibGVBY3Rpb24+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgQ29sdW1uQWN0aW9uc0ZhY3RvcnkuQ09MVU1OU19PRl9UQUJMRSxcbiAgICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwa0RpZ2l0YWwsIHBrIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPERhdENvbHVtbj4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGF0QWN0aW9ucyB7XG5cbiAgZGlnaXRhbCA9IG5ldyBEaWdpdGFsQWN0aW9uc0ZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKCk7XG5cbiAgY2h1bmsgPSBuZXcgQ2h1bmtBY3Rpb25zRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuXG4gIGNvbHVtbiA9IG5ldyBDb2x1bW5BY3Rpb25zRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuXG4gIGNsYXNzX2NvbHVtbl9tYXBwaW5nID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PENsYXNzQ29sdW1uTWFwcGluZ1NsaWNlLCBEYXRDbGFzc0NvbHVtbk1hcHBpbmc+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoZGF0Um9vdCwgJ2NsYXNzX2NvbHVtbl9tYXBwaW5nJylcblxuICBuYW1lc3BhY2UgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8TmFtZXNwYWNlU2xpY2UsIERhdE5hbWVzcGFjZT4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAnbmFtZXNwYWNlJylcblxuICB0ZXh0X3Byb3BlcnR5ID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFRleHRQcm9wZXJ0eVNsaWNlLCBEYXRUZXh0UHJvcGVydHk+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoZGF0Um9vdCwgJ3RleHRfcHJvcGVydHknKVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgfVxuXG59XG4iXX0=