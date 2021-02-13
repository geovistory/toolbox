/**
 * @fileoverview added by tsickle
 * Generated from: selectors/sys.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { SysActions, sysDefinitions, sysRoot } from '@kleiolab/lib-redux';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
/**
 * @template Slice
 */
var /**
 * @template Slice
 */
Selector = /** @class */ (function () {
    function Selector(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.slice$ = this.ngRedux.select([sysRoot, this.model]);
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
        var all$ = this.ngRedux.select([sysRoot, this.model, indexKey]);
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.ngRedux.select([sysRoot, _this.model, indexKey, x]); });
        return { all$: all$, key: key };
    };
    return Selector;
}());
if (false) {
    /** @type {?} */
    Selector.prototype.slice$;
    /** @type {?} */
    Selector.prototype.ngRedux;
    /** @type {?} */
    Selector.prototype.configs;
    /** @type {?} */
    Selector.prototype.model;
}
// SystemRelevantClass Selectors
var 
// SystemRelevantClass Selectors
SysSystemRelevantClassSelections = /** @class */ (function (_super) {
    tslib_1.__extends(SysSystemRelevantClassSelections, _super);
    function SysSystemRelevantClassSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        _this.by_fk_class$ = _this.selector('by_fk_class');
        _this.by_required_by_sources$ = _this.selector('by_required_by_sources');
        _this.by_required$ = _this.selector('by_required');
        return _this;
    }
    return SysSystemRelevantClassSelections;
}(Selector));
if (false) {
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.by_pk_entity$;
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.by_fk_class$;
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.by_required_by_sources$;
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.by_required$;
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.ngRedux;
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.configs;
    /** @type {?} */
    SysSystemRelevantClassSelections.prototype.model;
}
// // AnalysisType Selectors
// class SysAnalysisTypeSelections extends Selector<SysAnalysisTypeSlice> {
//   public by_pk_entity$ = this.selector<SysAnalysisType>('by_pk_entity');
//   constructor(
//     public ngRedux: NgRedux<IAppState>,
//     public configs: ReducerConfigCollection,
//     public model: string
//   ) { super(ngRedux, configs, model) }
// }
// Config Selectors
var 
// // AnalysisType Selectors
// class SysAnalysisTypeSelections extends Selector<SysAnalysisTypeSlice> {
//   public by_pk_entity$ = this.selector<SysAnalysisType>('by_pk_entity');
//   constructor(
//     public ngRedux: NgRedux<IAppState>,
//     public configs: ReducerConfigCollection,
//     public model: string
//   ) { super(ngRedux, configs, model) }
// }
// Config Selectors
SysConfigSelections = /** @class */ (function (_super) {
    tslib_1.__extends(SysConfigSelections, _super);
    function SysConfigSelections(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.main$ = _this.ngRedux.select([sysRoot, _this.model, 'by_main', 'main']);
        return _this;
    }
    return SysConfigSelections;
}(Selector));
if (false) {
    /** @type {?} */
    SysConfigSelections.prototype.main$;
    /** @type {?} */
    SysConfigSelections.prototype.ngRedux;
    /** @type {?} */
    SysConfigSelections.prototype.configs;
    /** @type {?} */
    SysConfigSelections.prototype.model;
}
var SysSelector = /** @class */ (function (_super) {
    tslib_1.__extends(SysSelector, _super);
    function SysSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.system_relevant_class$ = new SysSystemRelevantClassSelections(_this.ngRedux, sysDefinitions, 'system_relevant_class');
        // analysis_type$ = new SysAnalysisTypeSelections(this.ngRedux, sysDefinitions, 'analysis_type')
        _this.config$ = new SysConfigSelections(_this.ngRedux, sysDefinitions, 'config');
        return _this;
    }
    SysSelector.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ SysSelector.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SysSelector_Factory() { return new SysSelector(i0.ɵɵinject(i1.NgRedux)); }, token: SysSelector, providedIn: "root" });
    return SysSelector;
}(SysActions));
export { SysSelector };
if (false) {
    /** @type {?} */
    SysSelector.prototype.system_relevant_class$;
    /** @type {?} */
    SysSelector.prototype.config$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL3N5cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBNEMsVUFBVSxFQUFrQixjQUFjLEVBQXlCLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSTNKLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQUUzQzs7OztJQUlFLGtCQUNTLE9BQTJCLEVBQzNCLE9BQWdDLEVBQ2hDLEtBQWE7UUFGYixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBTHRCLFdBQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQU10RCxDQUFDOzs7Ozs7SUFFTCwyQkFBUTs7Ozs7SUFBUixVQUFZLFFBQWdCO1FBQTVCLGlCQU9DOztZQUxPLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztZQUVwRSxHQUFHOzs7O1FBQUcsVUFBQyxDQUFDLElBQW9CLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBMUQsQ0FBMEQsQ0FBQTtRQUU1RixPQUFPLEVBQUUsSUFBSSxNQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7OztJQWhCQywwQkFBMEQ7O0lBR3hELDJCQUFrQzs7SUFDbEMsMkJBQXVDOztJQUN2Qyx5QkFBb0I7OztBQWN4Qjs7O0lBQStDLDREQUErQjtJQU01RSwwQ0FDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBSHRCLFlBSUksa0JBQU0sT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsU0FBRTtRQUgzQixhQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixhQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxXQUFLLEdBQUwsS0FBSyxDQUFRO1FBUmYsbUJBQWEsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUF5QixjQUFjLENBQUMsQ0FBQztRQUN0RSxrQkFBWSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQStCLGFBQWEsQ0FBQyxDQUFDO1FBQzFFLDZCQUF1QixHQUFHLEtBQUksQ0FBQyxRQUFRLENBQStCLHdCQUF3QixDQUFDLENBQUM7UUFDaEcsa0JBQVksR0FBRyxLQUFJLENBQUMsUUFBUSxDQUErQixhQUFhLENBQUMsQ0FBQzs7SUFNOUMsQ0FBQztJQUN0Qyx1Q0FBQztBQUFELENBQUMsQUFYRCxDQUErQyxRQUFRLEdBV3REOzs7SUFWQyx5REFBNkU7O0lBQzdFLHdEQUFpRjs7SUFDakYsbUVBQXVHOztJQUN2Ryx3REFBaUY7O0lBRy9FLG1EQUFrQzs7SUFDbEMsbURBQXVDOztJQUN2QyxpREFBb0I7Ozs7Ozs7Ozs7OztBQWdCeEI7Ozs7Ozs7Ozs7OztJQUFrQywrQ0FBd0I7SUFHeEQsNkJBQ1MsT0FBMkIsRUFDM0IsT0FBZ0MsRUFDaEMsS0FBYTtRQUh0QixZQUlJLGtCQUFNLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLFNBQUU7UUFIM0IsYUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsYUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUxmLFdBQUssR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBaUIsQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTs7SUFNekQsQ0FBQztJQUN0QywwQkFBQztBQUFELENBQUMsQUFSRCxDQUFrQyxRQUFRLEdBUXpDOzs7SUFQQyxvQ0FBNEY7O0lBRzFGLHNDQUFrQzs7SUFDbEMsc0NBQXVDOztJQUN2QyxvQ0FBb0I7O0FBSXhCO0lBR2lDLHVDQUFVO0lBSDNDO1FBQUEscUVBUUM7UUFKQyw0QkFBc0IsR0FBRyxJQUFJLGdDQUFnQyxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLHVCQUF1QixDQUFDLENBQUE7O1FBR3BILGFBQU8sR0FBRyxJQUFJLG1CQUFtQixDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFBOztLQUMxRTs7Z0JBUkEsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O3NCQWpFRDtDQXVFQyxBQVJELENBR2lDLFVBQVUsR0FLMUM7U0FMWSxXQUFXOzs7SUFDdEIsNkNBQW9IOztJQUdwSCw4QkFBeUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgQnlQaywgSUFwcFN0YXRlLCBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiwgU3lzQWN0aW9ucywgU3lzQ29uZmlnU2xpY2UsIHN5c0RlZmluaXRpb25zLCBTeXNSZWxldmFudENsYXNzU2xpY2UsIHN5c1Jvb3QgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgU3lzQ29uZmlnVmFsdWUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jbGFzcyBTZWxlY3RvcjxTbGljZT4ge1xuXG4gIHNsaWNlJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8U2xpY2U+KFtzeXNSb290LCB0aGlzLm1vZGVsXSlcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgfVxuXG4gIHNlbGVjdG9yPE0+KGluZGV4S2V5OiBzdHJpbmcpOiB7IGFsbCQ6IE9ic2VydmFibGU8QnlQazxNPj4sIGtleTogKHgpID0+IE9ic2VydmFibGU8TT4gfSB7XG5cbiAgICBjb25zdCBhbGwkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxCeVBrPE0+Pihbc3lzUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXldKVxuXG4gICAgY29uc3Qga2V5ID0gKHgpOiBPYnNlcnZhYmxlPE0+ID0+IHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oW3N5c1Jvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5LCB4XSlcblxuICAgIHJldHVybiB7IGFsbCQsIGtleSB9XG4gIH1cbn1cblxuLy8gU3lzdGVtUmVsZXZhbnRDbGFzcyBTZWxlY3RvcnNcbmNsYXNzIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3I8U3lzUmVsZXZhbnRDbGFzc1NsaWNlPiB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxTeXNTeXN0ZW1SZWxldmFudENsYXNzPignYnlfcGtfZW50aXR5Jyk7XG4gIHB1YmxpYyBieV9ma19jbGFzcyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8U3lzU3lzdGVtUmVsZXZhbnRDbGFzcz4+KCdieV9ma19jbGFzcycpO1xuICBwdWJsaWMgYnlfcmVxdWlyZWRfYnlfc291cmNlcyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8U3lzU3lzdGVtUmVsZXZhbnRDbGFzcz4+KCdieV9yZXF1aXJlZF9ieV9zb3VyY2VzJyk7XG4gIHB1YmxpYyBieV9yZXF1aXJlZCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8U3lzU3lzdGVtUmVsZXZhbnRDbGFzcz4+KCdieV9yZXF1aXJlZCcpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG4vLyAvLyBBbmFseXNpc1R5cGUgU2VsZWN0b3JzXG4vLyBjbGFzcyBTeXNBbmFseXNpc1R5cGVTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3I8U3lzQW5hbHlzaXNUeXBlU2xpY2U+IHtcbi8vICAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPFN5c0FuYWx5c2lzVHlwZT4oJ2J5X3BrX2VudGl0eScpO1xuLy8gICBjb25zdHJ1Y3Rvcihcbi8vICAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuLy8gICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbi8vICAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuLy8gICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbi8vIH1cblxuXG4vLyBDb25maWcgU2VsZWN0b3JzXG5jbGFzcyBTeXNDb25maWdTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3I8U3lzQ29uZmlnU2xpY2U+IHtcbiAgcHVibGljIG1haW4kID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxTeXNDb25maWdWYWx1ZT4oW3N5c1Jvb3QsIHRoaXMubW9kZWwsICdieV9tYWluJywgJ21haW4nXSlcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3lzU2VsZWN0b3IgZXh0ZW5kcyBTeXNBY3Rpb25zIHtcbiAgc3lzdGVtX3JlbGV2YW50X2NsYXNzJCA9IG5ldyBTeXNTeXN0ZW1SZWxldmFudENsYXNzU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHN5c0RlZmluaXRpb25zLCAnc3lzdGVtX3JlbGV2YW50X2NsYXNzJylcbiAgLy8gYW5hbHlzaXNfdHlwZSQgPSBuZXcgU3lzQW5hbHlzaXNUeXBlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHN5c0RlZmluaXRpb25zLCAnYW5hbHlzaXNfdHlwZScpXG5cbiAgY29uZmlnJCA9IG5ldyBTeXNDb25maWdTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgc3lzRGVmaW5pdGlvbnMsICdjb25maWcnKVxufVxuIl19