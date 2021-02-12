/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/dat.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { datRoot } from '../reducer-configs';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
var DigitalActionsFactory = /** @class */ (function (_super) {
    tslib_1.__extends(DigitalActionsFactory, _super);
    function DigitalActionsFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    DigitalActionsFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(datRoot, 'digital'));
        this.loadVersion = (/**
         * @param {?} pkEntity
         * @param {?=} entityVersion
         * @return {?}
         */
        function (pkEntity, entityVersion) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + DigitalActionsFactory.LOAD_VERSION,
                meta: { addPending: addPending, pkEntity: pkEntity, entityVersion: entityVersion },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    DigitalActionsFactory.LOAD_VERSION = 'LOAD_VERSION';
    return DigitalActionsFactory;
}(SchemaActionsFactory));
export { DigitalActionsFactory };
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
var ChunkActionsFactory = /** @class */ (function (_super) {
    tslib_1.__extends(ChunkActionsFactory, _super);
    function ChunkActionsFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    ChunkActionsFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(datRoot, 'chunk'));
        this.loadChunksOfDigital = (/**
         * @param {?} pkDigital
         * @param {?} pk
         * @return {?}
         */
        function (pkDigital, pk) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ChunkActionsFactory.CHUNKS_OF_DIGITAL,
                meta: { addPending: addPending, pkDigital: pkDigital, pk: pk },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    ChunkActionsFactory.CHUNKS_OF_DIGITAL = 'CHUNKS_OF_DIGITAL';
    return ChunkActionsFactory;
}(SchemaActionsFactory));
export { ChunkActionsFactory };
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
var ColumnActionsFactory = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnActionsFactory, _super);
    function ColumnActionsFactory(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        return _this;
    }
    /**
     * @return {?}
     */
    ColumnActionsFactory.prototype.createActions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.assign(this, this.createCrudActions(datRoot, 'column'));
        this.loadColumnsOfTable = (/**
         * @param {?} pkDigital
         * @param {?} pk
         * @return {?}
         */
        function (pkDigital, pk) {
            /** @type {?} */
            var addPending = U.uuid();
            /** @type {?} */
            var action = {
                type: _this.actionPrefix + '.' + _this.modelName + '::LOAD' + '::' + ColumnActionsFactory.COLUMNS_OF_TABLE,
                meta: { addPending: addPending, pkDigital: pkDigital, pk: pk },
                payload: null,
            };
            _this.ngRedux.dispatch(action);
            return {
                pending$: _this.ngRedux.select(['pending', addPending]),
                resolved$: _this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    };
    // Suffixes of load action types
    ColumnActionsFactory.COLUMNS_OF_TABLE = 'COLUMNS_OF_TABLE';
    return ColumnActionsFactory;
}(SchemaActionsFactory));
export { ColumnActionsFactory };
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
var DatActions = /** @class */ (function () {
    function DatActions(ngRedux) {
        this.ngRedux = ngRedux;
        this.digital = new DigitalActionsFactory(this.ngRedux).createActions();
        this.chunk = new ChunkActionsFactory(this.ngRedux).createActions();
        this.column = new ColumnActionsFactory(this.ngRedux).createActions();
        this.class_column_mapping = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'class_column_mapping');
        this.namespace = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'namespace');
        this.text_property = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'text_property');
    }
    DatActions.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DatActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    return DatActions;
}());
export { DatActions };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL2RhdC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUl4QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxFQUEwQyxvQkFBb0IsRUFBd0MsTUFBTSxvQ0FBb0MsQ0FBQztBQUd4SjtJQUEyQyxpREFBOEM7SUFVdkYsK0JBQW1CLE9BQTJCO1FBQTlDLFlBQWtELGtCQUFNLE9BQU8sQ0FBQyxTQUFFO1FBQS9DLGFBQU8sR0FBUCxPQUFPLENBQW9COztJQUFtQixDQUFDOzs7O0lBRWxFLDZDQUFhOzs7SUFBYjtRQUFBLGlCQW1CQztRQWxCQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7UUFFL0QsSUFBSSxDQUFDLFdBQVc7Ozs7O1FBQUcsVUFBQyxRQUFnQixFQUFFLGFBQXNCOztnQkFDcEQsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7O2dCQUVyQixNQUFNLEdBQXdEO2dCQUNsRSxJQUFJLEVBQUUsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLHFCQUFxQixDQUFDLFlBQVk7Z0JBQ3JHLElBQUksRUFBRSxFQUFFLFVBQVUsWUFBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLGFBQWEsZUFBQSxFQUFF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Q0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUE7UUFFL0QseUJBQW9CLEdBQUcsSUFBSSxvQkFBb0IsQ0FBaUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxzQkFBc0IsQ0FBQyxDQUFBO1FBRWhLLGNBQVMsR0FBRyxJQUFJLG9CQUFvQixDQUErQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBRXhILGtCQUFhLEdBQUcsSUFBSSxvQkFBb0IsQ0FBcUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQTtJQUVwRixDQUFDOztnQkFmcEQsVUFBVTs7OztnQkF0SEYsT0FBTzs7SUF1SWhCLGlCQUFDO0NBQUEsQUFqQkQsSUFpQkM7U0FoQlksVUFBVTs7O0lBRXJCLDZCQUFrRTs7SUFFbEUsMkJBQTZEOztJQUU3RCw0QkFBK0Q7O0lBRS9ELDBDQUFnSzs7SUFFaEssK0JBQXdIOztJQUV4SCxtQ0FBc0k7O0lBRTFILDZCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRDaHVuaywgRGF0Q29sdW1uLCBEYXREaWdpdGFsLCBEYXROYW1lc3BhY2UsIERhdFRleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBEYXRDbGFzc0NvbHVtbk1hcHBpbmcgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgVSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMnO1xuaW1wb3J0IHsgQ2h1bmtTbGljZSwgQ2xhc3NDb2x1bW5NYXBwaW5nU2xpY2UsIENvbHVtblNsaWNlLCBEaWdpdGFsU2xpY2UsIE5hbWVzcGFjZVNsaWNlLCBUZXh0UHJvcGVydHlTbGljZSB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBkYXRSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzJztcbmltcG9ydCB7IEFjdGlvblJlc3VsdE9ic2VydmFibGUsIExvYWRBY3Rpb25NZXRhLCBTY2hlbWFBY3Rpb25zRmFjdG9yeSwgU3VjY2VlZEFjdGlvbk1ldGEsIExvYWRWZXJzaW9uQWN0aW9uIH0gZnJvbSAnLi4vX2hlbHBlcnMvc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cblxuZXhwb3J0IGNsYXNzIERpZ2l0YWxBY3Rpb25zRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PERpZ2l0YWxTbGljZSwgRGF0RGlnaXRhbD4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBMT0FEX1ZFUlNJT04gPSAnTE9BRF9WRVJTSU9OJztcblxuICAvKipcbiAgICogTG9hZCBhIHZlcnNpb24uIGlmIGVudGl0eVZlcnNpb24gb21pdHRlZCwgbGF0ZXN0IHZlcnNpb24gaXMgcmV0dXJuZWQuXG4gICAqL1xuICBsb2FkVmVyc2lvbjogKHBrRW50aXR5OiBudW1iZXIsIGVudGl0eVZlcnNpb24/OiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8RGF0RGlnaXRhbD47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBEaWdpdGFsQWN0aW9uc0ZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAnZGlnaXRhbCcpKVxuXG4gICAgdGhpcy5sb2FkVmVyc2lvbiA9IChwa0VudGl0eTogbnVtYmVyLCBlbnRpdHlWZXJzaW9uPzogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcblxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248RGlnaXRhbFNsaWNlLCBMb2FkVmVyc2lvbkFjdGlvbj4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBEaWdpdGFsQWN0aW9uc0ZhY3RvcnkuTE9BRF9WRVJTSU9OLFxuICAgICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHBrRW50aXR5LCBlbnRpdHlWZXJzaW9uIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPERhdERpZ2l0YWw+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZENodW5rc09mRGlnaXRhbEFjdGlvbiBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHsgcGtEaWdpdGFsOiBudW1iZXIgfVxuXG5leHBvcnQgY2xhc3MgQ2h1bmtBY3Rpb25zRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PENodW5rU2xpY2UsIERhdENodW5rPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IENIVU5LU19PRl9ESUdJVEFMID0gJ0NIVU5LU19PRl9ESUdJVEFMJztcblxuICAvKipcbiAgICogTG9hZCBhIHZlcnNpb24uIGlmIGVudGl0eVZlcnNpb24gb21pdHRlZCwgbGF0ZXN0IHZlcnNpb24gaXMgcmV0dXJuZWQuXG4gICAqL1xuICBsb2FkQ2h1bmtzT2ZEaWdpdGFsOiAocGtEaWdpdGFsOiBudW1iZXIsIHBrOiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8RGF0Q2h1bms+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogQ2h1bmtBY3Rpb25zRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICdjaHVuaycpKVxuXG4gICAgdGhpcy5sb2FkQ2h1bmtzT2ZEaWdpdGFsID0gKHBrRGlnaXRhbDogbnVtYmVyLCBwazogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcblxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248Q2h1bmtTbGljZSwgTG9hZENodW5rc09mRGlnaXRhbEFjdGlvbj4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBDaHVua0FjdGlvbnNGYWN0b3J5LkNIVU5LU19PRl9ESUdJVEFMLFxuICAgICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHBrRGlnaXRhbCwgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8RGF0Q2h1bms+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZENvbHVtbnNPZlRhYmxlQWN0aW9uIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEgeyBwa0RpZ2l0YWw6IG51bWJlciB9XG5cbmV4cG9ydCBjbGFzcyBDb2x1bW5BY3Rpb25zRmFjdG9yeSBleHRlbmRzIFNjaGVtYUFjdGlvbnNGYWN0b3J5PENvbHVtblNsaWNlLCBEYXRDb2x1bW4+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgQ09MVU1OU19PRl9UQUJMRSA9ICdDT0xVTU5TX09GX1RBQkxFJztcblxuICAvKipcbiAgICogTG9hZCBhIHZlcnNpb24uIGlmIGVudGl0eVZlcnNpb24gb21pdHRlZCwgbGF0ZXN0IHZlcnNpb24gaXMgcmV0dXJuZWQuXG4gICAqL1xuICBsb2FkQ29sdW1uc09mVGFibGU6IChwa0RpZ2l0YWw6IG51bWJlciwgcGs6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxEYXRDb2x1bW4+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogQ29sdW1uQWN0aW9uc0ZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAnY29sdW1uJykpXG5cbiAgICB0aGlzLmxvYWRDb2x1bW5zT2ZUYWJsZSA9IChwa0RpZ2l0YWw6IG51bWJlciwgcGs6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG5cbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPENvbHVtblNsaWNlLCBMb2FkQ29sdW1uc09mVGFibGVBY3Rpb24+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgQ29sdW1uQWN0aW9uc0ZhY3RvcnkuQ09MVU1OU19PRl9UQUJMRSxcbiAgICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwa0RpZ2l0YWwsIHBrIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPERhdENvbHVtbj4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdEFjdGlvbnMge1xuXG4gIGRpZ2l0YWwgPSBuZXcgRGlnaXRhbEFjdGlvbnNGYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpO1xuXG4gIGNodW5rID0gbmV3IENodW5rQWN0aW9uc0ZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKClcblxuICBjb2x1bW4gPSBuZXcgQ29sdW1uQWN0aW9uc0ZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKClcblxuICBjbGFzc19jb2x1bW5fbWFwcGluZyA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxDbGFzc0NvbHVtbk1hcHBpbmdTbGljZSwgRGF0Q2xhc3NDb2x1bW5NYXBwaW5nPih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICdjbGFzc19jb2x1bW5fbWFwcGluZycpXG5cbiAgbmFtZXNwYWNlID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PE5hbWVzcGFjZVNsaWNlLCBEYXROYW1lc3BhY2U+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoZGF0Um9vdCwgJ25hbWVzcGFjZScpXG5cbiAgdGV4dF9wcm9wZXJ0eSA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxUZXh0UHJvcGVydHlTbGljZSwgRGF0VGV4dFByb3BlcnR5Pih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICd0ZXh0X3Byb3BlcnR5JylcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IH1cblxufVxuIl19