/**
 * @fileoverview added by tsickle
 * Generated from: selectors/dat.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL2RhdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBUSxVQUFVLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBc0MsTUFBTSxxQkFBcUIsQ0FBQztBQUdwSCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFcEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFckM7SUFDRSxrQkFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBRmIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUNsQixDQUFDOzs7Ozs7SUFFTCwyQkFBUTs7Ozs7SUFBUixVQUFZLFFBQWdCO1FBQTVCLGlCQWFDOztZQVhPLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFFLFNBQVM7UUFDVCxvQ0FBb0M7UUFDcEMsSUFBSTs7Ozs7O1lBRUUsR0FBRzs7OztRQUFHLFVBQUMsQ0FBQyxJQUFvQixPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFJLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQTFELENBQTBELENBQUE7UUFDNUYsU0FBUztRQUNULG9DQUFvQztRQUNwQyxJQUFJOztR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OztnQkF4R1EsT0FBTzs7O3NCQUFoQjtDQXNIQyxBQWhCRCxDQUdpQyxVQUFVLEdBYTFDO1NBYlksV0FBVzs7O0lBRXRCLCtCQUE2RTs7SUFDN0UsaUNBQW1GOztJQUNuRiw2QkFBdUU7O0lBQ3ZFLDhCQUEwRTs7SUFDMUUsNENBQWtIOztJQUNsSCxxQ0FBOEY7O0lBRWxGLDhCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCeVBrLCBEYXRBY3Rpb25zLCBkYXREZWZpbml0aW9ucywgZGF0Um9vdCwgSUFwcFN0YXRlLCBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgRGF0Q2h1bmssIERhdENvbHVtbiwgRGF0RGlnaXRhbCwgRGF0TmFtZXNwYWNlLCBEYXRUZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRGF0Q2xhc3NDb2x1bW5NYXBwaW5nIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGxhdGVzdFZlcnNpb24gfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuY2xhc3MgU2VsZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgfVxuXG4gIHNlbGVjdG9yPE0+KGluZGV4S2V5OiBzdHJpbmcpOiB7IGFsbCQ6IE9ic2VydmFibGU8QnlQazxNPj4sIGtleTogKHgpID0+IE9ic2VydmFibGU8TT4gfSB7XG5cbiAgICBjb25zdCBhbGwkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxCeVBrPE0+PihbZGF0Um9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXldKVxuICAgIC8vIC5waXBlKFxuICAgIC8vICAgZGlzdGluY3RVbnRpbENoYW5nZWQ8TT4oZXF1YWxzKVxuICAgIC8vIClcblxuICAgIGNvbnN0IGtleSA9ICh4KTogT2JzZXJ2YWJsZTxNPiA9PiB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFtkYXRSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleSwgeF0pXG4gICAgLy8gLnBpcGUoXG4gICAgLy8gICBkaXN0aW5jdFVudGlsQ2hhbmdlZDxNPihlcXVhbHMpXG4gICAgLy8gKVxuXG4gICAgcmV0dXJuIHsgYWxsJCwga2V5IH1cbiAgfVxufVxuXG5jbGFzcyBEYXREaWdpdGFsU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eV9fZW50aXR5X3ZlcnNpb24kID0gdGhpcy5zZWxlY3RvcjxEYXREaWdpdGFsPignYnlfcGtfZW50aXR5X19lbnRpdHlfdmVyc2lvbicpXG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERhdERpZ2l0YWw+PignYnlfcGtfZW50aXR5JylcbiAgcHVibGljIGJ5X3BrX3RleHQkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERhdERpZ2l0YWw+PignYnlfcGtfdGV4dCcpXG5cblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxuXG4gIGxhdGVzdFZlcnNpb24ocGtEaWdpdGFsOiBudW1iZXIpOiBPYnNlcnZhYmxlPERhdERpZ2l0YWw+IHtcbiAgICByZXR1cm4gdGhpcy5ieV9wa19lbnRpdHkkLmtleShwa0RpZ2l0YWwpLnBpcGUoXG4gICAgICBtYXAodmVyc2lvbnMgPT4gbGF0ZXN0VmVyc2lvbih2ZXJzaW9ucykpLFxuICAgIClcbiAgfVxufVxuXG5jbGFzcyBEYXROYW1lc3BhY2VTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8RGF0TmFtZXNwYWNlPignYnlfcGtfZW50aXR5JylcbiAgcHVibGljIGJ5X2ZrX3Byb2plY3QkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERhdE5hbWVzcGFjZT4+KCdieV9ma19wcm9qZWN0JylcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIERhdENodW5rU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPERhdENodW5rPignYnlfcGtfZW50aXR5JylcbiAgcHVibGljIGJ5X2ZrX3RleHQkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERhdENodW5rPj4oJ2J5X2ZrX3RleHQnKVxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgRGF0Q2xhc3NDb2x1bW5NYXBwaW5nU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPERhdENsYXNzQ29sdW1uTWFwcGluZz4oJ2J5X3BrX2VudGl0eScpXG4gIHB1YmxpYyBieV9ma19jb2x1bW4kID0gdGhpcy5zZWxlY3RvcjxCeVBrPERhdENsYXNzQ29sdW1uTWFwcGluZz4+KCdieV9ma19jb2x1bW4nKVxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgRGF0Q29sdW1uU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPERhdENvbHVtbj4oJ2J5X3BrX2VudGl0eScpXG4gIHB1YmxpYyBieV9ma19kaWdpdGFsJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEYXRDb2x1bW4+PignYnlfZmtfZGlnaXRhbCcpXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBEYXRUZXh0UHJvcGVydHlTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8RGF0VGV4dFByb3BlcnR5PignYnlfcGtfZW50aXR5JylcbiAgcHVibGljIGJ5X2ZrX2VudGl0eV9fZmtfc3lzdGVtX3R5cGUkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERhdFRleHRQcm9wZXJ0eT4+KCdieV9ma19lbnRpdHlfX2ZrX3N5c3RlbV90eXBlJylcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdFNlbGVjdG9yIGV4dGVuZHMgRGF0QWN0aW9ucyB7XG5cbiAgZGlnaXRhbCQgPSBuZXcgRGF0RGlnaXRhbFNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBkYXREZWZpbml0aW9ucywgJ2RpZ2l0YWwnKTtcbiAgbmFtZXNwYWNlJCA9IG5ldyBEYXROYW1lc3BhY2VTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgZGF0RGVmaW5pdGlvbnMsICduYW1lc3BhY2UnKTtcbiAgY2h1bmskID0gbmV3IERhdENodW5rU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRhdERlZmluaXRpb25zLCAnY2h1bmsnKTtcbiAgY29sdW1uJCA9IG5ldyBEYXRDb2x1bW5TZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgZGF0RGVmaW5pdGlvbnMsICdjb2x1bW4nKTtcbiAgY2xhc3NfY29sdW1uX21hcHBpbmckID0gbmV3IERhdENsYXNzQ29sdW1uTWFwcGluZ1NlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBkYXREZWZpbml0aW9ucywgJ2NsYXNzX2NvbHVtbl9tYXBwaW5nJyk7XG4gIHRleHRfcHJvcGVydHkkID0gbmV3IERhdFRleHRQcm9wZXJ0eVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBkYXREZWZpbml0aW9ucywgJ3RleHRfcHJvcGVydHknKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7XG4gICAgc3VwZXIobmdSZWR1eClcbiAgfVxuXG59XG4iXX0=