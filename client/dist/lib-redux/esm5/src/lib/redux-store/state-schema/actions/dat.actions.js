/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/dat.actions.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9kYXQuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFJeEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sRUFBMEMsb0JBQW9CLEVBQXdDLE1BQU0sb0NBQW9DLENBQUM7QUFHeEo7SUFBMkMsaURBQThDO0lBVXZGLCtCQUFtQixPQUEyQjtRQUE5QyxZQUFrRCxrQkFBTSxPQUFPLENBQUMsU0FBRTtRQUEvQyxhQUFPLEdBQVAsT0FBTyxDQUFvQjs7SUFBbUIsQ0FBQzs7OztJQUVsRSw2Q0FBYTs7O0lBQWI7UUFBQSxpQkFtQkM7UUFsQkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFBO1FBRS9ELElBQUksQ0FBQyxXQUFXOzs7OztRQUFHLFVBQUMsUUFBZ0IsRUFBRSxhQUFzQjs7Z0JBQ3BELFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztnQkFFckIsTUFBTSxHQUF3RDtnQkFDbEUsSUFBSSxFQUFFLEtBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLEtBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyxxQkFBcUIsQ0FBQyxZQUFZO2dCQUNyRyxJQUFJLEVBQUUsRUFBRSxVQUFVLFlBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxhQUFhLGVBQUEsRUFBRTtnQkFDN0MsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUNELEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzdCLE9BQU87Z0JBQ0wsUUFBUSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFVLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMvRCxTQUFTLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQWdDLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN2RixHQUFHLEVBQUUsVUFBVTthQUNoQixDQUFDO1FBQ0osQ0FBQyxDQUFBLENBQUE7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7O0lBNUJlLGtDQUFZLEdBQUcsY0FBYyxDQUFDO0lBNkJoRCw0QkFBQztDQUFBLEFBaENELENBQTJDLG9CQUFvQixHQWdDOUQ7U0FoQ1kscUJBQXFCOzs7SUFHaEMsbUNBQThDOzs7OztJQUs5Qyw0Q0FBOEY7O0lBRWxGLHdDQUFrQzs7Ozs7QUF3QmhELCtDQUF1Rjs7O0lBQW5CLDhDQUFpQjs7QUFFckY7SUFBeUMsK0NBQTBDO0lBVWpGLDZCQUFtQixPQUEyQjtRQUE5QyxZQUFrRCxrQkFBTSxPQUFPLENBQUMsU0FBRTtRQUEvQyxhQUFPLEdBQVAsT0FBTyxDQUFvQjs7SUFBbUIsQ0FBQzs7OztJQUVsRSwyQ0FBYTs7O0lBQWI7UUFBQSxpQkFtQkM7UUFsQkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBRTdELElBQUksQ0FBQyxtQkFBbUI7Ozs7O1FBQUcsVUFBQyxTQUFpQixFQUFFLEVBQVU7O2dCQUNqRCxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7Z0JBRXJCLE1BQU0sR0FBOEQ7Z0JBQ3hFLElBQUksRUFBRSxLQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxLQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsbUJBQW1CLENBQUMsaUJBQWlCO2dCQUN4RyxJQUFJLEVBQUUsRUFBRSxVQUFVLFlBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxFQUFFLElBQUEsRUFBRTtnQkFDbkMsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUNELEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzdCLE9BQU87Z0JBQ0wsUUFBUSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFVLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMvRCxTQUFTLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQThCLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNyRixHQUFHLEVBQUUsVUFBVTthQUNoQixDQUFDO1FBQ0osQ0FBQyxDQUFBLENBQUE7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7O0lBNUJlLHFDQUFpQixHQUFHLG1CQUFtQixDQUFDO0lBNkIxRCwwQkFBQztDQUFBLEFBaENELENBQXlDLG9CQUFvQixHQWdDNUQ7U0FoQ1ksbUJBQW1COzs7SUFHOUIsc0NBQXdEOzs7OztJQUt4RCxrREFBeUY7O0lBRTdFLHNDQUFrQzs7Ozs7QUF3QmhELDhDQUFzRjs7O0lBQW5CLDZDQUFpQjs7QUFFcEY7SUFBMEMsZ0RBQTRDO0lBVXBGLDhCQUFtQixPQUEyQjtRQUE5QyxZQUFrRCxrQkFBTSxPQUFPLENBQUMsU0FBRTtRQUEvQyxhQUFPLEdBQVAsT0FBTyxDQUFvQjs7SUFBbUIsQ0FBQzs7OztJQUVsRSw0Q0FBYTs7O0lBQWI7UUFBQSxpQkFtQkM7UUFsQkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFBO1FBRTlELElBQUksQ0FBQyxrQkFBa0I7Ozs7O1FBQUcsVUFBQyxTQUFpQixFQUFFLEVBQVU7O2dCQUNoRCxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7Z0JBRXJCLE1BQU0sR0FBOEQ7Z0JBQ3hFLElBQUksRUFBRSxLQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxLQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsb0JBQW9CLENBQUMsZ0JBQWdCO2dCQUN4RyxJQUFJLEVBQUUsRUFBRSxVQUFVLFlBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxFQUFFLElBQUEsRUFBRTtnQkFDbkMsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUNELEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzdCLE9BQU87Z0JBQ0wsUUFBUSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFVLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMvRCxTQUFTLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQStCLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN0RixHQUFHLEVBQUUsVUFBVTthQUNoQixDQUFDO1FBQ0osQ0FBQyxDQUFBLENBQUE7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7O0lBNUJlLHFDQUFnQixHQUFHLGtCQUFrQixDQUFDO0lBNkJ4RCwyQkFBQztDQUFBLEFBaENELENBQTBDLG9CQUFvQixHQWdDN0Q7U0FoQ1ksb0JBQW9COzs7SUFHL0Isc0NBQXNEOzs7OztJQUt0RCxrREFBeUY7O0lBRTdFLHVDQUFrQzs7QUF3QmhEO0lBZUUsb0JBQW1CLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBWjlDLFlBQU8sR0FBRyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVsRSxVQUFLLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUE7UUFFN0QsV0FBTSxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBRS9ELHlCQUFvQixHQUFHLElBQUksb0JBQW9CLENBQWlELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLENBQUMsQ0FBQTtRQUVoSyxjQUFTLEdBQUcsSUFBSSxvQkFBb0IsQ0FBK0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUV4SCxrQkFBYSxHQUFHLElBQUksb0JBQW9CLENBQXFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUE7SUFFcEYsQ0FBQzs7Z0JBZnBELFVBQVU7Ozs7Z0JBdEhGLE9BQU87O0lBdUloQixpQkFBQztDQUFBLEFBakJELElBaUJDO1NBaEJZLFVBQVU7OztJQUVyQiw2QkFBa0U7O0lBRWxFLDJCQUE2RDs7SUFFN0QsNEJBQStEOztJQUUvRCwwQ0FBZ0s7O0lBRWhLLCtCQUF3SDs7SUFFeEgsbUNBQXNJOztJQUUxSCw2QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0Q2h1bmssIERhdENvbHVtbiwgRGF0RGlnaXRhbCwgRGF0TmFtZXNwYWNlLCBEYXRUZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRGF0Q2xhc3NDb2x1bW5NYXBwaW5nIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IFUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJy4uLy4uL3Jvb3QvbW9kZWxzJztcbmltcG9ydCB7IENodW5rU2xpY2UsIENsYXNzQ29sdW1uTWFwcGluZ1NsaWNlLCBDb2x1bW5TbGljZSwgRGlnaXRhbFNsaWNlLCBOYW1lc3BhY2VTbGljZSwgVGV4dFByb3BlcnR5U2xpY2UgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgZGF0Um9vdCB9IGZyb20gJy4uL3JlZHVjZXItY29uZmlncyc7XG5pbXBvcnQgeyBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlLCBMb2FkQWN0aW9uTWV0YSwgU2NoZW1hQWN0aW9uc0ZhY3RvcnksIFN1Y2NlZWRBY3Rpb25NZXRhLCBMb2FkVmVyc2lvbkFjdGlvbiB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG5cbmV4cG9ydCBjbGFzcyBEaWdpdGFsQWN0aW9uc0ZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxEaWdpdGFsU2xpY2UsIERhdERpZ2l0YWw+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgTE9BRF9WRVJTSU9OID0gJ0xPQURfVkVSU0lPTic7XG5cbiAgLyoqXG4gICAqIExvYWQgYSB2ZXJzaW9uLiBpZiBlbnRpdHlWZXJzaW9uIG9taXR0ZWQsIGxhdGVzdCB2ZXJzaW9uIGlzIHJldHVybmVkLlxuICAgKi9cbiAgbG9hZFZlcnNpb246IChwa0VudGl0eTogbnVtYmVyLCBlbnRpdHlWZXJzaW9uPzogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPERhdERpZ2l0YWw+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogRGlnaXRhbEFjdGlvbnNGYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMoZGF0Um9vdCwgJ2RpZ2l0YWwnKSlcblxuICAgIHRoaXMubG9hZFZlcnNpb24gPSAocGtFbnRpdHk6IG51bWJlciwgZW50aXR5VmVyc2lvbj86IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG5cbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPERpZ2l0YWxTbGljZSwgTG9hZFZlcnNpb25BY3Rpb24+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgRGlnaXRhbEFjdGlvbnNGYWN0b3J5LkxPQURfVkVSU0lPTixcbiAgICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwa0VudGl0eSwgZW50aXR5VmVyc2lvbiB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxEYXREaWdpdGFsPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRDaHVua3NPZkRpZ2l0YWxBY3Rpb24gZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7IHBrRGlnaXRhbDogbnVtYmVyIH1cblxuZXhwb3J0IGNsYXNzIENodW5rQWN0aW9uc0ZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxDaHVua1NsaWNlLCBEYXRDaHVuaz4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBDSFVOS1NfT0ZfRElHSVRBTCA9ICdDSFVOS1NfT0ZfRElHSVRBTCc7XG5cbiAgLyoqXG4gICAqIExvYWQgYSB2ZXJzaW9uLiBpZiBlbnRpdHlWZXJzaW9uIG9taXR0ZWQsIGxhdGVzdCB2ZXJzaW9uIGlzIHJldHVybmVkLlxuICAgKi9cbiAgbG9hZENodW5rc09mRGlnaXRhbDogKHBrRGlnaXRhbDogbnVtYmVyLCBwazogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPERhdENodW5rPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IENodW5rQWN0aW9uc0ZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAnY2h1bmsnKSlcblxuICAgIHRoaXMubG9hZENodW5rc09mRGlnaXRhbCA9IChwa0RpZ2l0YWw6IG51bWJlciwgcGs6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG5cbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPENodW5rU2xpY2UsIExvYWRDaHVua3NPZkRpZ2l0YWxBY3Rpb24+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgQ2h1bmtBY3Rpb25zRmFjdG9yeS5DSFVOS1NfT0ZfRElHSVRBTCxcbiAgICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwa0RpZ2l0YWwsIHBrIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPERhdENodW5rPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRDb2x1bW5zT2ZUYWJsZUFjdGlvbiBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHsgcGtEaWdpdGFsOiBudW1iZXIgfVxuXG5leHBvcnQgY2xhc3MgQ29sdW1uQWN0aW9uc0ZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxDb2x1bW5TbGljZSwgRGF0Q29sdW1uPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IENPTFVNTlNfT0ZfVEFCTEUgPSAnQ09MVU1OU19PRl9UQUJMRSc7XG5cbiAgLyoqXG4gICAqIExvYWQgYSB2ZXJzaW9uLiBpZiBlbnRpdHlWZXJzaW9uIG9taXR0ZWQsIGxhdGVzdCB2ZXJzaW9uIGlzIHJldHVybmVkLlxuICAgKi9cbiAgbG9hZENvbHVtbnNPZlRhYmxlOiAocGtEaWdpdGFsOiBudW1iZXIsIHBrOiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8RGF0Q29sdW1uPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IENvbHVtbkFjdGlvbnNGYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMoZGF0Um9vdCwgJ2NvbHVtbicpKVxuXG4gICAgdGhpcy5sb2FkQ29sdW1uc09mVGFibGUgPSAocGtEaWdpdGFsOiBudW1iZXIsIHBrOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxDb2x1bW5TbGljZSwgTG9hZENvbHVtbnNPZlRhYmxlQWN0aW9uPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIENvbHVtbkFjdGlvbnNGYWN0b3J5LkNPTFVNTlNfT0ZfVEFCTEUsXG4gICAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGtEaWdpdGFsLCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxEYXRDb2x1bW4+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEYXRBY3Rpb25zIHtcblxuICBkaWdpdGFsID0gbmV3IERpZ2l0YWxBY3Rpb25zRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKTtcblxuICBjaHVuayA9IG5ldyBDaHVua0FjdGlvbnNGYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpXG5cbiAgY29sdW1uID0gbmV3IENvbHVtbkFjdGlvbnNGYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpXG5cbiAgY2xhc3NfY29sdW1uX21hcHBpbmcgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8Q2xhc3NDb2x1bW5NYXBwaW5nU2xpY2UsIERhdENsYXNzQ29sdW1uTWFwcGluZz4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAnY2xhc3NfY29sdW1uX21hcHBpbmcnKVxuXG4gIG5hbWVzcGFjZSA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxOYW1lc3BhY2VTbGljZSwgRGF0TmFtZXNwYWNlPih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICduYW1lc3BhY2UnKVxuXG4gIHRleHRfcHJvcGVydHkgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8VGV4dFByb3BlcnR5U2xpY2UsIERhdFRleHRQcm9wZXJ0eT4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAndGV4dF9wcm9wZXJ0eScpXG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyB9XG5cbn1cbiJdfQ==