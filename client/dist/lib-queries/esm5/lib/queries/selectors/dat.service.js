/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/dat.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DatActions, datDefinitions, datRoot } from '@kleiolab/lib-redux';
import { latestVersion } from '@kleiolab/lib-utils';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
var Selector = /** @class */ (function () {
    function Selector(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
    }
    /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    Selector.prototype.selector = /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    function (indexKey) {
        var _this = this;
        /** @type {?} */
        var all$ = this.ngRedux.select([datRoot, this.model, indexKey])
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        ;
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.ngRedux.select([datRoot, _this.model, indexKey, x]); })
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        ;
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        return { all$: all$, key: key };
    };
    return Selector;
}());
if (false) {
    /** @type {?} */
    Selector.prototype.ngRedux;
    /** @type {?} */
    Selector.prototype.configs;
    /** @type {?} */
    Selector.prototype.model;
}
var DatDigitalSelections = /** @class */ (function (_super) {
    tslib_1.__extends(DatDigitalSelections, _super);
    function DatDigitalSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity__entity_version$ = _this.selector('by_pk_entity__entity_version');
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_pk_text$ = _this.selector('by_pk_text');
        return _this;
    }
    /**
     * @param {?} pkDigital
     * @return {?}
     */
    DatDigitalSelections.prototype.latestVersion = /**
     * @param {?} pkDigital
     * @return {?}
     */
    function (pkDigital) {
        return this.by_pk_entity$.key(pkDigital).pipe(map((/**
         * @param {?} versions
         * @return {?}
         */
        function (versions) { return latestVersion(versions); })));
    };
    return DatDigitalSelections;
}(Selector));
if (false) {
    /** @type {?} */
    DatDigitalSelections.prototype.by_pk_entity__entity_version$;
    /** @type {?} */
    DatDigitalSelections.prototype.by_pk_entity$;
    /** @type {?} */
    DatDigitalSelections.prototype.by_pk_text$;
    /** @type {?} */
    DatDigitalSelections.prototype.ngRedux;
    /** @type {?} */
    DatDigitalSelections.prototype.configs;
    /** @type {?} */
    DatDigitalSelections.prototype.model;
}
var DatNamespaceSelections = /** @class */ (function (_super) {
    tslib_1.__extends(DatNamespaceSelections, _super);
    function DatNamespaceSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_project$ = _this.selector('by_fk_project');
        return _this;
    }
    return DatNamespaceSelections;
}(Selector));
if (false) {
    /** @type {?} */
    DatNamespaceSelections.prototype.by_pk_entity$;
    /** @type {?} */
    DatNamespaceSelections.prototype.by_fk_project$;
    /** @type {?} */
    DatNamespaceSelections.prototype.ngRedux;
    /** @type {?} */
    DatNamespaceSelections.prototype.configs;
    /** @type {?} */
    DatNamespaceSelections.prototype.model;
}
var DatChunkSelections = /** @class */ (function (_super) {
    tslib_1.__extends(DatChunkSelections, _super);
    function DatChunkSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_text$ = _this.selector('by_fk_text');
        return _this;
    }
    return DatChunkSelections;
}(Selector));
if (false) {
    /** @type {?} */
    DatChunkSelections.prototype.by_pk_entity$;
    /** @type {?} */
    DatChunkSelections.prototype.by_fk_text$;
    /** @type {?} */
    DatChunkSelections.prototype.ngRedux;
    /** @type {?} */
    DatChunkSelections.prototype.configs;
    /** @type {?} */
    DatChunkSelections.prototype.model;
}
var DatClassColumnMappingSelections = /** @class */ (function (_super) {
    tslib_1.__extends(DatClassColumnMappingSelections, _super);
    function DatClassColumnMappingSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_column$ = _this.selector('by_fk_column');
        return _this;
    }
    return DatClassColumnMappingSelections;
}(Selector));
if (false) {
    /** @type {?} */
    DatClassColumnMappingSelections.prototype.by_pk_entity$;
    /** @type {?} */
    DatClassColumnMappingSelections.prototype.by_fk_column$;
    /** @type {?} */
    DatClassColumnMappingSelections.prototype.ngRedux;
    /** @type {?} */
    DatClassColumnMappingSelections.prototype.configs;
    /** @type {?} */
    DatClassColumnMappingSelections.prototype.model;
}
var DatColumnSelections = /** @class */ (function (_super) {
    tslib_1.__extends(DatColumnSelections, _super);
    function DatColumnSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_digital$ = _this.selector('by_fk_digital');
        return _this;
    }
    return DatColumnSelections;
}(Selector));
if (false) {
    /** @type {?} */
    DatColumnSelections.prototype.by_pk_entity$;
    /** @type {?} */
    DatColumnSelections.prototype.by_fk_digital$;
    /** @type {?} */
    DatColumnSelections.prototype.ngRedux;
    /** @type {?} */
    DatColumnSelections.prototype.configs;
    /** @type {?} */
    DatColumnSelections.prototype.model;
}
var DatTextPropertySelections = /** @class */ (function (_super) {
    tslib_1.__extends(DatTextPropertySelections, _super);
    function DatTextPropertySelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_entity__fk_system_type$ = _this.selector('by_fk_entity__fk_system_type');
        return _this;
    }
    return DatTextPropertySelections;
}(Selector));
if (false) {
    /** @type {?} */
    DatTextPropertySelections.prototype.by_pk_entity$;
    /** @type {?} */
    DatTextPropertySelections.prototype.by_fk_entity__fk_system_type$;
    /** @type {?} */
    DatTextPropertySelections.prototype.ngRedux;
    /** @type {?} */
    DatTextPropertySelections.prototype.configs;
    /** @type {?} */
    DatTextPropertySelections.prototype.model;
}
var DatSelector = /** @class */ (function (_super) {
    tslib_1.__extends(DatSelector, _super);
    function DatSelector(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        _this.digital$ = new DatDigitalSelections(_this.ngRedux, datDefinitions, 'digital');
        _this.namespace$ = new DatNamespaceSelections(_this.ngRedux, datDefinitions, 'namespace');
        _this.chunk$ = new DatChunkSelections(_this.ngRedux, datDefinitions, 'chunk');
        _this.column$ = new DatColumnSelections(_this.ngRedux, datDefinitions, 'column');
        _this.class_column_mapping$ = new DatClassColumnMappingSelections(_this.ngRedux, datDefinitions, 'class_column_mapping');
        _this.text_property$ = new DatTextPropertySelections(_this.ngRedux, datDefinitions, 'text_property');
        return _this;
    }
    DatSelector.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DatSelector.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ DatSelector.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DatSelector_Factory() { return new DatSelector(i0.ɵɵinject(i1.NgRedux)); }, token: DatSelector, providedIn: "root" });
    return DatSelector;
}(DatActions));
export { DatSelector };
if (false) {
    /** @type {?} */
    DatSelector.prototype.digital$;
    /** @type {?} */
    DatSelector.prototype.namespace$;
    /** @type {?} */
    DatSelector.prototype.chunk$;
    /** @type {?} */
    DatSelector.prototype.column$;
    /** @type {?} */
    DatSelector.prototype.class_column_mapping$;
    /** @type {?} */
    DatSelector.prototype.text_property$;
    /** @type {?} */
    DatSelector.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvZGF0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFRLFVBQVUsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFzQyxNQUFNLHFCQUFxQixDQUFDO0FBR3BILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUVyQztJQUNFLGtCQUNTLE9BQTJCLEVBQzNCLE9BQWdDLEVBQ2hDLEtBQWE7UUFGYixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQ2xCLENBQUM7Ozs7OztJQUVMLDJCQUFROzs7OztJQUFSLFVBQVksUUFBZ0I7UUFBNUIsaUJBYUM7O1lBWE8sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUUsU0FBUztRQUNULG9DQUFvQztRQUNwQyxJQUFJOzs7Ozs7WUFFRSxHQUFHOzs7O1FBQUcsVUFBQyxDQUFDLElBQW9CLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBMUQsQ0FBMEQsQ0FBQTtRQUM1RixTQUFTO1FBQ1Qsb0NBQW9DO1FBQ3BDLElBQUk7O1FBRkos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QXhHUSxPQUFPOzs7c0JBQWhCO0NBc0hDLEFBaEJELENBR2lDLFVBQVUsR0FhMUM7U0FiWSxXQUFXOzs7SUFFdEIsK0JBQTZFOztJQUM3RSxpQ0FBbUY7O0lBQ25GLDZCQUF1RTs7SUFDdkUsOEJBQTBFOztJQUMxRSw0Q0FBa0g7O0lBQ2xILHFDQUE4Rjs7SUFFbEYsOEJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ5UGssIERhdEFjdGlvbnMsIGRhdERlZmluaXRpb25zLCBkYXRSb290LCBJQXBwU3RhdGUsIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBEYXRDaHVuaywgRGF0Q29sdW1uLCBEYXREaWdpdGFsLCBEYXROYW1lc3BhY2UsIERhdFRleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBEYXRDbGFzc0NvbHVtbk1hcHBpbmcgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgbGF0ZXN0VmVyc2lvbiB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5jbGFzcyBTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyB9XG5cbiAgc2VsZWN0b3I8TT4oaW5kZXhLZXk6IHN0cmluZyk6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeCkgPT4gT2JzZXJ2YWJsZTxNPiB9IHtcblxuICAgIGNvbnN0IGFsbCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PEJ5UGs8TT4+KFtkYXRSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleV0pXG4gICAgLy8gLnBpcGUoXG4gICAgLy8gICBkaXN0aW5jdFVudGlsQ2hhbmdlZDxNPihlcXVhbHMpXG4gICAgLy8gKVxuXG4gICAgY29uc3Qga2V5ID0gKHgpOiBPYnNlcnZhYmxlPE0+ID0+IHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oW2RhdFJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5LCB4XSlcbiAgICAvLyAucGlwZShcbiAgICAvLyAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkPE0+KGVxdWFscylcbiAgICAvLyApXG5cbiAgICByZXR1cm4geyBhbGwkLCBrZXkgfVxuICB9XG59XG5cbmNsYXNzIERhdERpZ2l0YWxTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5X19lbnRpdHlfdmVyc2lvbiQgPSB0aGlzLnNlbGVjdG9yPERhdERpZ2l0YWw+KCdieV9wa19lbnRpdHlfX2VudGl0eV92ZXJzaW9uJylcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGF0RGlnaXRhbD4+KCdieV9wa19lbnRpdHknKVxuICBwdWJsaWMgYnlfcGtfdGV4dCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGF0RGlnaXRhbD4+KCdieV9wa190ZXh0JylcblxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgbGF0ZXN0VmVyc2lvbihwa0RpZ2l0YWw6IG51bWJlcik6IE9ic2VydmFibGU8RGF0RGlnaXRhbD4ge1xuICAgIHJldHVybiB0aGlzLmJ5X3BrX2VudGl0eSQua2V5KHBrRGlnaXRhbCkucGlwZShcbiAgICAgIG1hcCh2ZXJzaW9ucyA9PiBsYXRlc3RWZXJzaW9uKHZlcnNpb25zKSksXG4gICAgKVxuICB9XG59XG5cbmNsYXNzIERhdE5hbWVzcGFjZVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxEYXROYW1lc3BhY2U+KCdieV9wa19lbnRpdHknKVxuICBwdWJsaWMgYnlfZmtfcHJvamVjdCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGF0TmFtZXNwYWNlPj4oJ2J5X2ZrX3Byb2plY3QnKVxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgRGF0Q2h1bmtTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8RGF0Q2h1bms+KCdieV9wa19lbnRpdHknKVxuICBwdWJsaWMgYnlfZmtfdGV4dCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGF0Q2h1bms+PignYnlfZmtfdGV4dCcpXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBEYXRDbGFzc0NvbHVtbk1hcHBpbmdTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8RGF0Q2xhc3NDb2x1bW5NYXBwaW5nPignYnlfcGtfZW50aXR5JylcbiAgcHVibGljIGJ5X2ZrX2NvbHVtbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGF0Q2xhc3NDb2x1bW5NYXBwaW5nPj4oJ2J5X2ZrX2NvbHVtbicpXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBEYXRDb2x1bW5TZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8RGF0Q29sdW1uPignYnlfcGtfZW50aXR5JylcbiAgcHVibGljIGJ5X2ZrX2RpZ2l0YWwkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERhdENvbHVtbj4+KCdieV9ma19kaWdpdGFsJylcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIERhdFRleHRQcm9wZXJ0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxEYXRUZXh0UHJvcGVydHk+KCdieV9wa19lbnRpdHknKVxuICBwdWJsaWMgYnlfZmtfZW50aXR5X19ma19zeXN0ZW1fdHlwZSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGF0VGV4dFByb3BlcnR5Pj4oJ2J5X2ZrX2VudGl0eV9fZmtfc3lzdGVtX3R5cGUnKVxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGF0U2VsZWN0b3IgZXh0ZW5kcyBEYXRBY3Rpb25zIHtcblxuICBkaWdpdGFsJCA9IG5ldyBEYXREaWdpdGFsU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRhdERlZmluaXRpb25zLCAnZGlnaXRhbCcpO1xuICBuYW1lc3BhY2UkID0gbmV3IERhdE5hbWVzcGFjZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBkYXREZWZpbml0aW9ucywgJ25hbWVzcGFjZScpO1xuICBjaHVuayQgPSBuZXcgRGF0Q2h1bmtTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgZGF0RGVmaW5pdGlvbnMsICdjaHVuaycpO1xuICBjb2x1bW4kID0gbmV3IERhdENvbHVtblNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBkYXREZWZpbml0aW9ucywgJ2NvbHVtbicpO1xuICBjbGFzc19jb2x1bW5fbWFwcGluZyQgPSBuZXcgRGF0Q2xhc3NDb2x1bW5NYXBwaW5nU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRhdERlZmluaXRpb25zLCAnY2xhc3NfY29sdW1uX21hcHBpbmcnKTtcbiAgdGV4dF9wcm9wZXJ0eSQgPSBuZXcgRGF0VGV4dFByb3BlcnR5U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRhdERlZmluaXRpb25zLCAndGV4dF9wcm9wZXJ0eScpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHtcbiAgICBzdXBlcihuZ1JlZHV4KVxuICB9XG5cbn1cbiJdfQ==