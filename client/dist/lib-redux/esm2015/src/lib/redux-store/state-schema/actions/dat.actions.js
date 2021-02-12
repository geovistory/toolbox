/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/dat.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { datRoot } from '../reducer-configs';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
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
    { type: Injectable }
];
/** @nocollapse */
DatActions.ctorParameters = () => [
    { type: NgRedux }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9kYXQuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUl4QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUEwQyxvQkFBb0IsRUFBd0MsTUFBTSxvQ0FBb0MsQ0FBQztBQUd4SixNQUFNLE9BQU8scUJBQXNCLFNBQVEsb0JBQThDOzs7O0lBVXZGLFlBQW1CLE9BQTJCO1FBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQTdDLFlBQU8sR0FBUCxPQUFPLENBQW9CO0lBQW1CLENBQUM7Ozs7SUFFbEUsYUFBYTtRQUNYLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQTtRQUUvRCxJQUFJLENBQUMsV0FBVzs7Ozs7UUFBRyxDQUFDLFFBQWdCLEVBQUUsYUFBc0IsRUFBRSxFQUFFOztrQkFDeEQsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7O2tCQUVyQixNQUFNLEdBQXdEO2dCQUNsRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLHFCQUFxQixDQUFDLFlBQVk7Z0JBQ3JHLElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFO2dCQUM3QyxP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LENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBRXhILGtCQUFhLEdBQUcsSUFBSSxvQkFBb0IsQ0FBcUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQTtJQUVwRixDQUFDOzs7WUFmcEQsVUFBVTs7OztZQXRIRixPQUFPOzs7O0lBeUhkLDZCQUFrRTs7SUFFbEUsMkJBQTZEOztJQUU3RCw0QkFBK0Q7O0lBRS9ELDBDQUFnSzs7SUFFaEssK0JBQXdIOztJQUV4SCxtQ0FBc0k7O0lBRTFILDZCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRDaHVuaywgRGF0Q29sdW1uLCBEYXREaWdpdGFsLCBEYXROYW1lc3BhY2UsIERhdFRleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBEYXRDbGFzc0NvbHVtbk1hcHBpbmcgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgVSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMnO1xuaW1wb3J0IHsgQ2h1bmtTbGljZSwgQ2xhc3NDb2x1bW5NYXBwaW5nU2xpY2UsIENvbHVtblNsaWNlLCBEaWdpdGFsU2xpY2UsIE5hbWVzcGFjZVNsaWNlLCBUZXh0UHJvcGVydHlTbGljZSB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBkYXRSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzJztcbmltcG9ydCB7IEFjdGlvblJlc3VsdE9ic2VydmFibGUsIExvYWRBY3Rpb25NZXRhLCBTY2hlbWFBY3Rpb25zRmFjdG9yeSwgU3VjY2VlZEFjdGlvbk1ldGEsIExvYWRWZXJzaW9uQWN0aW9uIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cblxuZXhwb3J0IGNsYXNzIERpZ2l0YWxBY3Rpb25zRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PERpZ2l0YWxTbGljZSwgRGF0RGlnaXRhbD4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBMT0FEX1ZFUlNJT04gPSAnTE9BRF9WRVJTSU9OJztcblxuICAvKipcbiAgICogTG9hZCBhIHZlcnNpb24uIGlmIGVudGl0eVZlcnNpb24gb21pdHRlZCwgbGF0ZXN0IHZlcnNpb24gaXMgcmV0dXJuZWQuXG4gICAqL1xuICBsb2FkVmVyc2lvbjogKHBrRW50aXR5OiBudW1iZXIsIGVudGl0eVZlcnNpb24/OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8RGF0RGlnaXRhbD47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBEaWdpdGFsQWN0aW9uc0ZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAnZGlnaXRhbCcpKVxuXG4gICAgdGhpcy5sb2FkVmVyc2lvbiA9IChwa0VudGl0eTogbnVtYmVyLCBlbnRpdHlWZXJzaW9uPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcblxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248RGlnaXRhbFNsaWNlLCBMb2FkVmVyc2lvbkFjdGlvbj4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBEaWdpdGFsQWN0aW9uc0ZhY3RvcnkuTE9BRF9WRVJTSU9OLFxuICAgICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHBrRW50aXR5LCBlbnRpdHlWZXJzaW9uIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPERhdERpZ2l0YWw+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZENodW5rc09mRGlnaXRhbEFjdGlvbiBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHsgcGtEaWdpdGFsOiBudW1iZXIgfVxuXG5leHBvcnQgY2xhc3MgQ2h1bmtBY3Rpb25zRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PENodW5rU2xpY2UsIERhdENodW5rPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IENIVU5LU19PRl9ESUdJVEFMID0gJ0NIVU5LU19PRl9ESUdJVEFMJztcblxuICAvKipcbiAgICogTG9hZCBhIHZlcnNpb24uIGlmIGVudGl0eVZlcnNpb24gb21pdHRlZCwgbGF0ZXN0IHZlcnNpb24gaXMgcmV0dXJuZWQuXG4gICAqL1xuICBsb2FkQ2h1bmtzT2ZEaWdpdGFsOiAocGtEaWdpdGFsOiBudW1iZXIsIHBrOiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8RGF0Q2h1bms+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogQ2h1bmtBY3Rpb25zRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICdjaHVuaycpKVxuXG4gICAgdGhpcy5sb2FkQ2h1bmtzT2ZEaWdpdGFsID0gKHBrRGlnaXRhbDogbnVtYmVyLCBwazogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcblxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248Q2h1bmtTbGljZSwgTG9hZENodW5rc09mRGlnaXRhbEFjdGlvbj4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBDaHVua0FjdGlvbnNGYWN0b3J5LkNIVU5LU19PRl9ESUdJVEFMLFxuICAgICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHBrRGlnaXRhbCwgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8RGF0Q2h1bms+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZENvbHVtbnNPZlRhYmxlQWN0aW9uIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEgeyBwa0RpZ2l0YWw6IG51bWJlciB9XG5cbmV4cG9ydCBjbGFzcyBDb2x1bW5BY3Rpb25zRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PENvbHVtblNsaWNlLCBEYXRDb2x1bW4+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgQ09MVU1OU19PRl9UQUJMRSA9ICdDT0xVTU5TX09GX1RBQkxFJztcblxuICAvKipcbiAgICogTG9hZCBhIHZlcnNpb24uIGlmIGVudGl0eVZlcnNpb24gb21pdHRlZCwgbGF0ZXN0IHZlcnNpb24gaXMgcmV0dXJuZWQuXG4gICAqL1xuICBsb2FkQ29sdW1uc09mVGFibGU6IChwa0RpZ2l0YWw6IG51bWJlciwgcGs6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxEYXRDb2x1bW4+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogQ29sdW1uQWN0aW9uc0ZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAnY29sdW1uJykpXG5cbiAgICB0aGlzLmxvYWRDb2x1bW5zT2ZUYWJsZSA9IChwa0RpZ2l0YWw6IG51bWJlciwgcGs6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG5cbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPENvbHVtblNsaWNlLCBMb2FkQ29sdW1uc09mVGFibGVBY3Rpb24+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgQ29sdW1uQWN0aW9uc0ZhY3RvcnkuQ09MVU1OU19PRl9UQUJMRSxcbiAgICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwa0RpZ2l0YWwsIHBrIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPERhdENvbHVtbj4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdEFjdGlvbnMge1xuXG4gIGRpZ2l0YWwgPSBuZXcgRGlnaXRhbEFjdGlvbnNGYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpO1xuXG4gIGNodW5rID0gbmV3IENodW5rQWN0aW9uc0ZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKClcblxuICBjb2x1bW4gPSBuZXcgQ29sdW1uQWN0aW9uc0ZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKClcblxuICBjbGFzc19jb2x1bW5fbWFwcGluZyA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxDbGFzc0NvbHVtbk1hcHBpbmdTbGljZSwgRGF0Q2xhc3NDb2x1bW5NYXBwaW5nPih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICdjbGFzc19jb2x1bW5fbWFwcGluZycpXG5cbiAgbmFtZXNwYWNlID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PE5hbWVzcGFjZVNsaWNlLCBEYXROYW1lc3BhY2U+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoZGF0Um9vdCwgJ25hbWVzcGFjZScpXG5cbiAgdGV4dF9wcm9wZXJ0eSA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxUZXh0UHJvcGVydHlTbGljZSwgRGF0VGV4dFByb3BlcnR5Pih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICd0ZXh0X3Byb3BlcnR5JylcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IH1cblxufVxuIl19