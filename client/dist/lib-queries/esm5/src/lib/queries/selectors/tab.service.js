/**
 * @fileoverview added by tsickle
 * Generated from: selectors/tab.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL3RhYi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBNEMsVUFBVSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBSXBIO0lBQ0Usa0JBQ1MsT0FBMkIsRUFDM0IsT0FBZ0MsRUFDaEMsS0FBYTtRQUZiLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7SUFDbEIsQ0FBQzs7Ozs7O0lBRUwsMkJBQVE7Ozs7O0lBQVIsVUFBWSxRQUFnQjtRQUE1QixpQkFPQzs7WUFMTyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7WUFFcEUsR0FBRzs7OztRQUFHLFVBQUMsQ0FBQyxJQUFvQixPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFJLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQTFELENBQTBELENBQUE7UUFFNUYsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLEdBQUcsS0FBQSxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQzs7O0lBYkcsMkJBQWtDOztJQUNsQywyQkFBdUM7O0lBQ3ZDLHlCQUFvQjs7QUFheEI7SUFBZ0MsNkNBQVE7SUFJdEMsMkJBQ1MsT0FBMkIsRUFDM0IsT0FBZ0MsRUFDaEMsS0FBYTtRQUh0QixZQUlJLGtCQUFNLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLFNBQUU7UUFIM0IsYUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsYUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQU5mLGlCQUFXLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBVSxZQUFZLENBQUMsQ0FBQTtRQUNsRCwwQkFBb0IsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFnQixxQkFBcUIsQ0FBQyxDQUFBOztJQU05QyxDQUFDO0lBRXRDLHdCQUFDO0FBQUQsQ0FBQyxBQVZELENBQWdDLFFBQVEsR0FVdkM7OztJQVRDLHdDQUF5RDs7SUFDekQsaURBQWlGOztJQUcvRSxvQ0FBa0M7O0lBQ2xDLG9DQUF1Qzs7SUFDdkMsa0NBQW9COztBQUt4QjtJQUdpQyx1Q0FBVTtJQUl6QyxxQkFBbUIsT0FBMkI7UUFBOUMsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FDZjtRQUZrQixhQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUY5QyxXQUFLLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQzs7SUFJcEUsQ0FBQzs7Z0JBVEYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFyQ1EsT0FBTzs7O3NCQUFoQjtDQThDQyxBQVhELENBR2lDLFVBQVUsR0FRMUM7U0FSWSxXQUFXOzs7SUFFdEIsNEJBQW9FOztJQUV4RCw4QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnlQaywgSUFwcFN0YXRlLCBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiwgVGFiQWN0aW9ucywgdGFiRGVmaW5pdGlvbnMsIHRhYlJvb3QgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IFRhYkNlbGwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5jbGFzcyBTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyB9XG5cbiAgc2VsZWN0b3I8TT4oaW5kZXhLZXk6IHN0cmluZyk6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeCkgPT4gT2JzZXJ2YWJsZTxNPiB9IHtcblxuICAgIGNvbnN0IGFsbCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PEJ5UGs8TT4+KFt0YWJSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleV0pXG5cbiAgICBjb25zdCBrZXkgPSAoeCk6IE9ic2VydmFibGU8TT4gPT4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxNPihbdGFiUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXksIHhdKVxuXG4gICAgcmV0dXJuIHsgYWxsJCwga2V5IH1cbiAgfVxufVxuXG5jbGFzcyBUYWJDZWxsU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2NlbGwkID0gdGhpcy5zZWxlY3RvcjxUYWJDZWxsPignYnlfcGtfY2VsbCcpXG4gIHB1YmxpYyBieV9ma19jb2x1bW5fZmtfcm93JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxUYWJDZWxsPj4oJ2J5X2ZrX2NvbHVtbl9ma19yb3cnKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxuXG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRhYlNlbGVjdG9yIGV4dGVuZHMgVGFiQWN0aW9ucyB7XG5cbiAgY2VsbCQgPSBuZXcgVGFiQ2VsbFNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCB0YWJEZWZpbml0aW9ucywgJ2NlbGwnKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7XG4gICAgc3VwZXIobmdSZWR1eClcbiAgfVxuXG59XG4iXX0=