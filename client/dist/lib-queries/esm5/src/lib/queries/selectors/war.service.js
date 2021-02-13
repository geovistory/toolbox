/**
 * @fileoverview added by tsickle
 * Generated from: selectors/war.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { WarActions, warDefinitions, warRoot } from '@kleiolab/lib-redux';
import { toString } from 'ramda';
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
        var all$ = this.ngRedux.select([warRoot, this.model, indexKey]);
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            /** @type {?} */
            var k = typeof x === 'string' ? x : x.map((/**
             * @param {?} part
             * @return {?}
             */
            function (part) { return toString(part); })).join('_');
            ;
            return _this.ngRedux.select([warRoot, _this.model, indexKey, k]);
        });
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
var WarEntityPreviewSelector = /** @class */ (function (_super) {
    tslib_1.__extends(WarEntityPreviewSelector, _super);
    function WarEntityPreviewSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return WarEntityPreviewSelector;
}(Selector));
if (false) {
    /** @type {?} */
    WarEntityPreviewSelector.prototype.by_pk_entity$;
    /** @type {?} */
    WarEntityPreviewSelector.prototype.ngRedux;
    /** @type {?} */
    WarEntityPreviewSelector.prototype.configs;
    /** @type {?} */
    WarEntityPreviewSelector.prototype.model;
}
var WarSelector = /** @class */ (function (_super) {
    tslib_1.__extends(WarSelector, _super);
    function WarSelector(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        _this.entity_preview$ = new WarEntityPreviewSelector(_this.ngRedux, warDefinitions, 'entity_preview');
        return _this;
    }
    WarSelector.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WarSelector.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ WarSelector.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function WarSelector_Factory() { return new WarSelector(i0.ɵɵinject(i1.NgRedux)); }, token: WarSelector, providedIn: "root" });
    return WarSelector;
}(WarActions));
export { WarSelector };
if (false) {
    /** @type {?} */
    WarSelector.prototype.entity_preview$;
    /** @type {?} */
    WarSelector.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL3dhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBNEMsVUFBVSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVwSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDOzs7QUFJakM7SUFDRSxrQkFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBRmIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUNsQixDQUFDOzs7Ozs7SUFFTCwyQkFBUTs7Ozs7SUFBUixVQUFZLFFBQWdCO1FBQTVCLGlCQVdDOztZQVRPLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztZQUVwRSxHQUFHOzs7O1FBQUcsVUFBQyxDQUErQjs7Z0JBQ3BDLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFDLElBQXFCLElBQUssT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQWQsQ0FBYyxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUFDLENBQUM7WUFFbEcsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBSSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25FLENBQUMsQ0FBQTtRQUVELE9BQU8sRUFBRSxJQUFJLE1BQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFBO0lBQ3RCLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQzs7O0lBakJHLDJCQUFrQzs7SUFDbEMsMkJBQXVDOztJQUN2Qyx5QkFBb0I7O0FBaUJ4QjtJQUF1QyxvREFBUTtJQUc3QyxrQ0FDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBSHRCLFlBSUksa0JBQU0sT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsU0FBRTtRQUgzQixhQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixhQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxXQUFLLEdBQUwsS0FBSyxDQUFRO1FBTGYsbUJBQWEsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFtQixjQUFjLENBQUMsQ0FBQTs7SUFNbkMsQ0FBQztJQUN0QywrQkFBQztBQUFELENBQUMsQUFSRCxDQUF1QyxRQUFRLEdBUTlDOzs7SUFQQyxpREFBc0U7O0lBR3BFLDJDQUFrQzs7SUFDbEMsMkNBQXVDOztJQUN2Qyx5Q0FBb0I7O0FBS3hCO0lBR2lDLHVDQUFVO0lBSXpDLHFCQUFtQixPQUEyQjtRQUE5QyxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUNmO1FBRmtCLGFBQU8sR0FBUCxPQUFPLENBQW9CO1FBRjlDLHFCQUFlLEdBQUcsSUFBSSx3QkFBd0IsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOztJQUkvRixDQUFDOztnQkFURixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQTFDUSxPQUFPOzs7c0JBQWhCO0NBa0RDLEFBVkQsQ0FHaUMsVUFBVSxHQU8xQztTQVBZLFdBQVc7OztJQUV0QixzQ0FBK0Y7O0lBRW5GLDhCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCeVBrLCBJQXBwU3RhdGUsIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLCBXYXJBY3Rpb25zLCB3YXJEZWZpbml0aW9ucywgd2FyUm9vdCB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgV2FyRW50aXR5UHJldmlldyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyB0b1N0cmluZyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG5jbGFzcyBTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyB9XG5cbiAgc2VsZWN0b3I8TT4oaW5kZXhLZXk6IHN0cmluZyk6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeDogc3RyaW5nIHwgKHN0cmluZyB8IG51bWJlcilbXSkgPT4gT2JzZXJ2YWJsZTxNPiB9IHtcblxuICAgIGNvbnN0IGFsbCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PEJ5UGs8TT4+KFt3YXJSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleV0pXG5cbiAgICBjb25zdCBrZXkgPSAoeDogc3RyaW5nIHwgKHN0cmluZyB8IG51bWJlcilbXSk6IE9ic2VydmFibGU8TT4gPT4ge1xuICAgICAgY29uc3QgayA9IHR5cGVvZiB4ID09PSAnc3RyaW5nJyA/IHggOiB4Lm1hcCgocGFydDogc3RyaW5nIHwgbnVtYmVyKSA9PiB0b1N0cmluZyhwYXJ0KSkuam9pbignXycpOztcblxuICAgICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oW3dhclJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5LCBrXSlcbiAgICB9XG5cbiAgICByZXR1cm4geyBhbGwkLCBrZXkgfVxuICB9XG59XG5cbmNsYXNzIFdhckVudGl0eVByZXZpZXdTZWxlY3RvciBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPFdhckVudGl0eVByZXZpZXc+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFdhclNlbGVjdG9yIGV4dGVuZHMgV2FyQWN0aW9ucyB7XG5cbiAgZW50aXR5X3ByZXZpZXckID0gbmV3IFdhckVudGl0eVByZXZpZXdTZWxlY3Rvcih0aGlzLm5nUmVkdXgsIHdhckRlZmluaXRpb25zLCAnZW50aXR5X3ByZXZpZXcnKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7XG4gICAgc3VwZXIobmdSZWR1eClcbiAgfVxufVxuIl19