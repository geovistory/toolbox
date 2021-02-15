/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/dat.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { datRoot } from '../reducer-configs/dat.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DatActions.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ DatActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DatActions_Factory() { return new DatActions(i0.ɵɵinject(i1.NgRedux)); }, token: DatActions, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9kYXQuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFJeEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sRUFBNkQsb0JBQW9CLEVBQXFCLE1BQU0sb0NBQW9DLENBQUM7OztBQUd4SjtJQUEyQyxpREFBOEM7SUFVdkYsK0JBQW1CLE9BQTJCO1FBQTlDLFlBQWtELGtCQUFNLE9BQU8sQ0FBQyxTQUFFO1FBQS9DLGFBQU8sR0FBUCxPQUFPLENBQW9COztJQUFtQixDQUFDOzs7O0lBRWxFLDZDQUFhOzs7SUFBYjtRQUFBLGlCQW1CQztRQWxCQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7UUFFL0QsSUFBSSxDQUFDLFdBQVc7Ozs7O1FBQUcsVUFBQyxRQUFnQixFQUFFLGFBQXNCOztnQkFDcEQsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7O2dCQUVyQixNQUFNLEdBQXdEO2dCQUNsRSxJQUFJLEVBQUUsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLHFCQUFxQixDQUFDLFlBQVk7Z0JBQ3JHLElBQUksRUFBRSxFQUFFLFVBQVUsWUFBQSxFQUFFLFFBQVEsVUFBQSxFQUFFLGFBQWEsZUFB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b0JBQW9CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBRS9ELHlCQUFvQixHQUFHLElBQUksb0JBQW9CLENBQWlELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLENBQUMsQ0FBQTtRQUVoSyxjQUFTLEdBQUcsSUFBSSxvQkFBb0IsQ0FBK0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUV4SCxrQkFBYSxHQUFHLElBQUksb0JBQW9CLENBQXFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUE7SUFFcEYsQ0FBQzs7Z0JBakJwRCxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQXhIUSxPQUFPOzs7cUJBQWhCO0NBeUlDLEFBbkJELElBbUJDO1NBaEJZLFVBQVU7OztJQUVyQiw2QkFBa0U7O0lBRWxFLDJCQUE2RDs7SUFFN0QsNEJBQStEOztJQUUvRCwwQ0FBZ0s7O0lBRWhLLCtCQUF3SDs7SUFFeEgsbUNBQXNJOztJQUUxSCw2QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0Q2h1bmssIERhdENvbHVtbiwgRGF0RGlnaXRhbCwgRGF0TmFtZXNwYWNlLCBEYXRUZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRGF0Q2xhc3NDb2x1bW5NYXBwaW5nIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IFUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzL21vZGVsJztcbmltcG9ydCB7IENodW5rU2xpY2UsIENsYXNzQ29sdW1uTWFwcGluZ1NsaWNlLCBDb2x1bW5TbGljZSwgRGlnaXRhbFNsaWNlLCBOYW1lc3BhY2VTbGljZSwgVGV4dFByb3BlcnR5U2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvZGF0Lm1vZGVscyc7XG5pbXBvcnQgeyBkYXRSb290IH0gZnJvbSAnLi4vcmVkdWNlci1jb25maWdzL2RhdC5jb25maWcnO1xuaW1wb3J0IHsgQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZSwgTG9hZEFjdGlvbk1ldGEsIExvYWRWZXJzaW9uQWN0aW9uLCBTY2hlbWFBY3Rpb25zRmFjdG9yeSwgU3VjY2VlZEFjdGlvbk1ldGEgfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuXG5leHBvcnQgY2xhc3MgRGlnaXRhbEFjdGlvbnNGYWN0b3J5IGV4dGVuZHMgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8RGlnaXRhbFNsaWNlLCBEYXREaWdpdGFsPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IExPQURfVkVSU0lPTiA9ICdMT0FEX1ZFUlNJT04nO1xuXG4gIC8qKlxuICAgKiBMb2FkIGEgdmVyc2lvbi4gaWYgZW50aXR5VmVyc2lvbiBvbWl0dGVkLCBsYXRlc3QgdmVyc2lvbiBpcyByZXR1cm5lZC5cbiAgICovXG4gIGxvYWRWZXJzaW9uOiAocGtFbnRpdHk6IG51bWJlciwgZW50aXR5VmVyc2lvbj86IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxEYXREaWdpdGFsPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IERpZ2l0YWxBY3Rpb25zRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICdkaWdpdGFsJykpXG5cbiAgICB0aGlzLmxvYWRWZXJzaW9uID0gKHBrRW50aXR5OiBudW1iZXIsIGVudGl0eVZlcnNpb24/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxEaWdpdGFsU2xpY2UsIExvYWRWZXJzaW9uQWN0aW9uPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIERpZ2l0YWxBY3Rpb25zRmFjdG9yeS5MT0FEX1ZFUlNJT04sXG4gICAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGtFbnRpdHksIGVudGl0eVZlcnNpb24gfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8RGF0RGlnaXRhbD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkQ2h1bmtzT2ZEaWdpdGFsQWN0aW9uIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEgeyBwa0RpZ2l0YWw6IG51bWJlciB9XG5cbmV4cG9ydCBjbGFzcyBDaHVua0FjdGlvbnNGYWN0b3J5IGV4dGVuZHMgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8Q2h1bmtTbGljZSwgRGF0Q2h1bms+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgQ0hVTktTX09GX0RJR0lUQUwgPSAnQ0hVTktTX09GX0RJR0lUQUwnO1xuXG4gIC8qKlxuICAgKiBMb2FkIGEgdmVyc2lvbi4gaWYgZW50aXR5VmVyc2lvbiBvbWl0dGVkLCBsYXRlc3QgdmVyc2lvbiBpcyByZXR1cm5lZC5cbiAgICovXG4gIGxvYWRDaHVua3NPZkRpZ2l0YWw6IChwa0RpZ2l0YWw6IG51bWJlciwgcGs6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxEYXRDaHVuaz47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBDaHVua0FjdGlvbnNGYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMoZGF0Um9vdCwgJ2NodW5rJykpXG5cbiAgICB0aGlzLmxvYWRDaHVua3NPZkRpZ2l0YWwgPSAocGtEaWdpdGFsOiBudW1iZXIsIHBrOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxDaHVua1NsaWNlLCBMb2FkQ2h1bmtzT2ZEaWdpdGFsQWN0aW9uPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIENodW5rQWN0aW9uc0ZhY3RvcnkuQ0hVTktTX09GX0RJR0lUQUwsXG4gICAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGtEaWdpdGFsLCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxEYXRDaHVuaz4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkQ29sdW1uc09mVGFibGVBY3Rpb24gZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7IHBrRGlnaXRhbDogbnVtYmVyIH1cblxuZXhwb3J0IGNsYXNzIENvbHVtbkFjdGlvbnNGYWN0b3J5IGV4dGVuZHMgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8Q29sdW1uU2xpY2UsIERhdENvbHVtbj4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBDT0xVTU5TX09GX1RBQkxFID0gJ0NPTFVNTlNfT0ZfVEFCTEUnO1xuXG4gIC8qKlxuICAgKiBMb2FkIGEgdmVyc2lvbi4gaWYgZW50aXR5VmVyc2lvbiBvbWl0dGVkLCBsYXRlc3QgdmVyc2lvbiBpcyByZXR1cm5lZC5cbiAgICovXG4gIGxvYWRDb2x1bW5zT2ZUYWJsZTogKHBrRGlnaXRhbDogbnVtYmVyLCBwazogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPERhdENvbHVtbj47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBDb2x1bW5BY3Rpb25zRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICdjb2x1bW4nKSlcblxuICAgIHRoaXMubG9hZENvbHVtbnNPZlRhYmxlID0gKHBrRGlnaXRhbDogbnVtYmVyLCBwazogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcblxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248Q29sdW1uU2xpY2UsIExvYWRDb2x1bW5zT2ZUYWJsZUFjdGlvbj4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBDb2x1bW5BY3Rpb25zRmFjdG9yeS5DT0xVTU5TX09GX1RBQkxFLFxuICAgICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHBrRGlnaXRhbCwgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8RGF0Q29sdW1uPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEYXRBY3Rpb25zIHtcblxuICBkaWdpdGFsID0gbmV3IERpZ2l0YWxBY3Rpb25zRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKTtcblxuICBjaHVuayA9IG5ldyBDaHVua0FjdGlvbnNGYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpXG5cbiAgY29sdW1uID0gbmV3IENvbHVtbkFjdGlvbnNGYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpXG5cbiAgY2xhc3NfY29sdW1uX21hcHBpbmcgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8Q2xhc3NDb2x1bW5NYXBwaW5nU2xpY2UsIERhdENsYXNzQ29sdW1uTWFwcGluZz4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAnY2xhc3NfY29sdW1uX21hcHBpbmcnKVxuXG4gIG5hbWVzcGFjZSA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxOYW1lc3BhY2VTbGljZSwgRGF0TmFtZXNwYWNlPih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICduYW1lc3BhY2UnKVxuXG4gIHRleHRfcHJvcGVydHkgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8VGV4dFByb3BlcnR5U2xpY2UsIERhdFRleHRQcm9wZXJ0eT4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAndGV4dF9wcm9wZXJ0eScpXG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyB9XG5cbn1cbiJdfQ==