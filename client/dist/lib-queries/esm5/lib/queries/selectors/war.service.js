/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/war.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvd2FyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUE0QyxVQUFVLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXBILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7OztBQUlqQztJQUNFLGtCQUNTLE9BQTJCLEVBQzNCLE9BQWdDLEVBQ2hDLEtBQWE7UUFGYixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQ2xCLENBQUM7Ozs7OztJQUVMLDJCQUFROzs7OztJQUFSLFVBQVksUUFBZ0I7UUFBNUIsaUJBV0M7O1lBVE8sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7O1lBRXBFLEdBQUc7Ozs7UUFBRyxVQUFDLENBQStCOztnQkFDcEMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRzs7OztZQUFDLFVBQUMsSUFBcUIsSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBZCxDQUFjLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQUMsQ0FBQztZQUVsRyxPQUFPLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFJLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbkUsQ0FBQyxDQUFBO1FBRUQsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLEdBQUcsS0FBQSxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDOzs7SUFqQkcsMkJBQWtDOztJQUNsQywyQkFBdUM7O0lBQ3ZDLHlCQUFvQjs7QUFpQnhCO0lBQXVDLG9EQUFRO0lBRzdDLGtDQUNTLE9BQTJCLEVBQzNCLE9BQWdDLEVBQ2hDLEtBQWE7UUFIdEIsWUFJSSxrQkFBTSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxTQUFFO1FBSDNCLGFBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLGFBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFdBQUssR0FBTCxLQUFLLENBQVE7UUFMZixtQkFBYSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQW1CLGNBQWMsQ0FBQyxDQUFBOztJQU1uQyxDQUFDO0lBQ3RDLCtCQUFDO0FBQUQsQ0FBQyxBQVJELENBQXVDLFFBQVEsR0FROUM7OztJQVBDLGlEQUFzRTs7SUFHcEUsMkNBQWtDOztJQUNsQywyQ0FBdUM7O0lBQ3ZDLHlDQUFvQjs7QUFLeEI7SUFHaUMsdUNBQVU7SUFJekMscUJBQW1CLE9BQTJCO1FBQTlDLFlBQ0Usa0JBQU0sT0FBTyxDQUFDLFNBQ2Y7UUFGa0IsYUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFGOUMscUJBQWUsR0FBRyxJQUFJLHdCQUF3QixDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixDQUFDLENBQUM7O0lBSS9GLENBQUM7O2dCQVRGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBMUNRLE9BQU87OztzQkFBaEI7Q0FrREMsQUFWRCxDQUdpQyxVQUFVLEdBTzFDO1NBUFksV0FBVzs7O0lBRXRCLHNDQUErRjs7SUFFbkYsOEJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ5UGssIElBcHBTdGF0ZSwgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sIFdhckFjdGlvbnMsIHdhckRlZmluaXRpb25zLCB3YXJSb290IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBXYXJFbnRpdHlQcmV2aWV3IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IHRvU3RyaW5nIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5cbmNsYXNzIFNlbGVjdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IH1cblxuICBzZWxlY3RvcjxNPihpbmRleEtleTogc3RyaW5nKTogeyBhbGwkOiBPYnNlcnZhYmxlPEJ5UGs8TT4+LCBrZXk6ICh4OiBzdHJpbmcgfCAoc3RyaW5nIHwgbnVtYmVyKVtdKSA9PiBPYnNlcnZhYmxlPE0+IH0ge1xuXG4gICAgY29uc3QgYWxsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8QnlQazxNPj4oW3dhclJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5XSlcblxuICAgIGNvbnN0IGtleSA9ICh4OiBzdHJpbmcgfCAoc3RyaW5nIHwgbnVtYmVyKVtdKTogT2JzZXJ2YWJsZTxNPiA9PiB7XG4gICAgICBjb25zdCBrID0gdHlwZW9mIHggPT09ICdzdHJpbmcnID8geCA6IHgubWFwKChwYXJ0OiBzdHJpbmcgfCBudW1iZXIpID0+IHRvU3RyaW5nKHBhcnQpKS5qb2luKCdfJyk7O1xuXG4gICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxNPihbd2FyUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXksIGtdKVxuICAgIH1cblxuICAgIHJldHVybiB7IGFsbCQsIGtleSB9XG4gIH1cbn1cblxuY2xhc3MgV2FyRW50aXR5UHJldmlld1NlbGVjdG9yIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8V2FyRW50aXR5UHJldmlldz4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgV2FyU2VsZWN0b3IgZXh0ZW5kcyBXYXJBY3Rpb25zIHtcblxuICBlbnRpdHlfcHJldmlldyQgPSBuZXcgV2FyRW50aXR5UHJldmlld1NlbGVjdG9yKHRoaXMubmdSZWR1eCwgd2FyRGVmaW5pdGlvbnMsICdlbnRpdHlfcHJldmlldycpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHtcbiAgICBzdXBlcihuZ1JlZHV4KVxuICB9XG59XG4iXX0=