/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/tab.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { TabActions, tabDefinitions, tabRoot } from '@kleiolab/lib-redux';
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
        var all$ = this.ngRedux.select([tabRoot, this.model, indexKey]);
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.ngRedux.select([tabRoot, _this.model, indexKey, x]); });
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
var TabCellSelections = /** @class */ (function (_super) {
    tslib_1.__extends(TabCellSelections, _super);
    function TabCellSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_cell$ = _this.selector('by_pk_cell');
        _this.by_fk_column_fk_row$ = _this.selector('by_fk_column_fk_row');
        return _this;
    }
    return TabCellSelections;
}(Selector));
if (false) {
    /** @type {?} */
    TabCellSelections.prototype.by_pk_cell$;
    /** @type {?} */
    TabCellSelections.prototype.by_fk_column_fk_row$;
    /** @type {?} */
    TabCellSelections.prototype.ngRedux;
    /** @type {?} */
    TabCellSelections.prototype.configs;
    /** @type {?} */
    TabCellSelections.prototype.model;
}
var TabSelector = /** @class */ (function (_super) {
    tslib_1.__extends(TabSelector, _super);
    function TabSelector(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        _this.cell$ = new TabCellSelections(_this.ngRedux, tabDefinitions, 'cell');
        return _this;
    }
    TabSelector.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    TabSelector.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ TabSelector.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function TabSelector_Factory() { return new TabSelector(i0.ɵɵinject(i1.NgRedux)); }, token: TabSelector, providedIn: "root" });
    return TabSelector;
}(TabActions));
export { TabSelector };
if (false) {
    /** @type {?} */
    TabSelector.prototype.cell$;
    /** @type {?} */
    TabSelector.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvdGFiLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUE0QyxVQUFVLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7QUFJcEg7SUFDRSxrQkFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBRmIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUNsQixDQUFDOzs7Ozs7SUFFTCwyQkFBUTs7Ozs7SUFBUixVQUFZLFFBQWdCO1FBQTVCLGlCQU9DOztZQUxPLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztZQUVwRSxHQUFHOzs7O1FBQUcsVUFBQyxDQUFDLElBQW9CLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBMUQsQ0FBMEQsQ0FBQTtRQUU1RixPQUFPLEVBQUUsSUFBSSxNQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUFmRCxJQWVDOzs7SUFiRywyQkFBa0M7O0lBQ2xDLDJCQUF1Qzs7SUFDdkMseUJBQW9COztBQWF4QjtJQUFnQyw2Q0FBUTtJQUl0QywyQkFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBSHRCLFlBSUksa0JBQU0sT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsU0FBRTtRQUgzQixhQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixhQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxXQUFLLEdBQUwsS0FBSyxDQUFRO1FBTmYsaUJBQVcsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFVLFlBQVksQ0FBQyxDQUFBO1FBQ2xELDBCQUFvQixHQUFHLEtBQUksQ0FBQyxRQUFRLENBQWdCLHFCQUFxQixDQUFDLENBQUE7O0lBTTlDLENBQUM7SUFFdEMsd0JBQUM7QUFBRCxDQUFDLEFBVkQsQ0FBZ0MsUUFBUSxHQVV2Qzs7O0lBVEMsd0NBQXlEOztJQUN6RCxpREFBaUY7O0lBRy9FLG9DQUFrQzs7SUFDbEMsb0NBQXVDOztJQUN2QyxrQ0FBb0I7O0FBS3hCO0lBR2lDLHVDQUFVO0lBSXpDLHFCQUFtQixPQUEyQjtRQUE5QyxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUNmO1FBRmtCLGFBQU8sR0FBUCxPQUFPLENBQW9CO1FBRjlDLFdBQUssR0FBRyxJQUFJLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDOztJQUlwRSxDQUFDOztnQkFURixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQXJDUSxPQUFPOzs7c0JBQWhCO0NBOENDLEFBWEQsQ0FHaUMsVUFBVSxHQVExQztTQVJZLFdBQVc7OztJQUV0Qiw0QkFBb0U7O0lBRXhELDhCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCeVBrLCBJQXBwU3RhdGUsIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLCBUYWJBY3Rpb25zLCB0YWJEZWZpbml0aW9ucywgdGFiUm9vdCB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgVGFiQ2VsbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmNsYXNzIFNlbGVjdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IH1cblxuICBzZWxlY3RvcjxNPihpbmRleEtleTogc3RyaW5nKTogeyBhbGwkOiBPYnNlcnZhYmxlPEJ5UGs8TT4+LCBrZXk6ICh4KSA9PiBPYnNlcnZhYmxlPE0+IH0ge1xuXG4gICAgY29uc3QgYWxsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8QnlQazxNPj4oW3RhYlJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5XSlcblxuICAgIGNvbnN0IGtleSA9ICh4KTogT2JzZXJ2YWJsZTxNPiA9PiB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFt0YWJSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleSwgeF0pXG5cbiAgICByZXR1cm4geyBhbGwkLCBrZXkgfVxuICB9XG59XG5cbmNsYXNzIFRhYkNlbGxTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfY2VsbCQgPSB0aGlzLnNlbGVjdG9yPFRhYkNlbGw+KCdieV9wa19jZWxsJylcbiAgcHVibGljIGJ5X2ZrX2NvbHVtbl9ma19yb3ckID0gdGhpcy5zZWxlY3RvcjxCeVBrPFRhYkNlbGw+PignYnlfZmtfY29sdW1uX2ZrX3JvdycpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVGFiU2VsZWN0b3IgZXh0ZW5kcyBUYWJBY3Rpb25zIHtcblxuICBjZWxsJCA9IG5ldyBUYWJDZWxsU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHRhYkRlZmluaXRpb25zLCAnY2VsbCcpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHtcbiAgICBzdXBlcihuZ1JlZHV4KVxuICB9XG5cbn1cbiJdfQ==