/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/sys.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvc3lzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUE0QyxVQUFVLEVBQWtCLGNBQWMsRUFBeUIsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFJM0osT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBRTNDOzs7O0lBSUUsa0JBQ1MsT0FBMkIsRUFDM0IsT0FBZ0MsRUFDaEMsS0FBYTtRQUZiLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFMdEIsV0FBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBTXRELENBQUM7Ozs7OztJQUVMLDJCQUFROzs7OztJQUFSLFVBQVksUUFBZ0I7UUFBNUIsaUJBT0M7O1lBTE8sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7O1lBRXBFLEdBQUc7Ozs7UUFBRyxVQUFDLENBQUMsSUFBb0IsT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBSSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUExRCxDQUEwRCxDQUFBO1FBRTVGLE9BQU8sRUFBRSxJQUFJLE1BQUEsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFBO0lBQ3RCLENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQzs7O0lBaEJDLDBCQUEwRDs7SUFHeEQsMkJBQWtDOztJQUNsQywyQkFBdUM7O0lBQ3ZDLHlCQUFvQjs7O0FBY3hCOzs7SUFBK0MsNERBQStCO0lBTTVFLDBDQUNTLE9BQTJCLEVBQzNCLE9BQWdDLEVBQ2hDLEtBQWE7UUFIdEIsWUFJSSxrQkFBTSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxTQUFFO1FBSDNCLGFBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLGFBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFdBQUssR0FBTCxLQUFLLENBQVE7UUFSZixtQkFBYSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQXlCLGNBQWMsQ0FBQyxDQUFDO1FBQ3RFLGtCQUFZLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBK0IsYUFBYSxDQUFDLENBQUM7UUFDMUUsNkJBQXVCLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBK0Isd0JBQXdCLENBQUMsQ0FBQztRQUNoRyxrQkFBWSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQStCLGFBQWEsQ0FBQyxDQUFDOztJQU05QyxDQUFDO0lBQ3RDLHVDQUFDO0FBQUQsQ0FBQyxBQVhELENBQStDLFFBQVEsR0FXdEQ7OztJQVZDLHlEQUE2RTs7SUFDN0Usd0RBQWlGOztJQUNqRixtRUFBdUc7O0lBQ3ZHLHdEQUFpRjs7SUFHL0UsbURBQWtDOztJQUNsQyxtREFBdUM7O0lBQ3ZDLGlEQUFvQjs7Ozs7Ozs7Ozs7O0FBZ0J4Qjs7Ozs7Ozs7Ozs7O0lBQWtDLCtDQUF3QjtJQUd4RCw2QkFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBSHRCLFlBSUksa0JBQU0sT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsU0FBRTtRQUgzQixhQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixhQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxXQUFLLEdBQUwsS0FBSyxDQUFRO1FBTGYsV0FBSyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFpQixDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBOztJQU16RCxDQUFDO0lBQ3RDLDBCQUFDO0FBQUQsQ0FBQyxBQVJELENBQWtDLFFBQVEsR0FRekM7OztJQVBDLG9DQUE0Rjs7SUFHMUYsc0NBQWtDOztJQUNsQyxzQ0FBdUM7O0lBQ3ZDLG9DQUFvQjs7QUFJeEI7SUFHaUMsdUNBQVU7SUFIM0M7UUFBQSxxRUFRQztRQUpDLDRCQUFzQixHQUFHLElBQUksZ0NBQWdDLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsdUJBQXVCLENBQUMsQ0FBQTs7UUFHcEgsYUFBTyxHQUFHLElBQUksbUJBQW1CLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUE7O0tBQzFFOztnQkFSQSxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7c0JBakVEO0NBdUVDLEFBUkQsQ0FHaUMsVUFBVSxHQUsxQztTQUxZLFdBQVc7OztJQUN0Qiw2Q0FBb0g7O0lBR3BILDhCQUF5RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBCeVBrLCBJQXBwU3RhdGUsIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLCBTeXNBY3Rpb25zLCBTeXNDb25maWdTbGljZSwgc3lzRGVmaW5pdGlvbnMsIFN5c1JlbGV2YW50Q2xhc3NTbGljZSwgc3lzUm9vdCB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBTeXNDb25maWdWYWx1ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNsYXNzIFNlbGVjdG9yPFNsaWNlPiB7XG5cbiAgc2xpY2UkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxTbGljZT4oW3N5c1Jvb3QsIHRoaXMubW9kZWxdKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyB9XG5cbiAgc2VsZWN0b3I8TT4oaW5kZXhLZXk6IHN0cmluZyk6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeCkgPT4gT2JzZXJ2YWJsZTxNPiB9IHtcblxuICAgIGNvbnN0IGFsbCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PEJ5UGs8TT4+KFtzeXNSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleV0pXG5cbiAgICBjb25zdCBrZXkgPSAoeCk6IE9ic2VydmFibGU8TT4gPT4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxNPihbc3lzUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXksIHhdKVxuXG4gICAgcmV0dXJuIHsgYWxsJCwga2V5IH1cbiAgfVxufVxuXG4vLyBTeXN0ZW1SZWxldmFudENsYXNzIFNlbGVjdG9yc1xuY2xhc3MgU3lzU3lzdGVtUmVsZXZhbnRDbGFzc1NlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvcjxTeXNSZWxldmFudENsYXNzU2xpY2U+IHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPFN5c1N5c3RlbVJlbGV2YW50Q2xhc3M+KCdieV9wa19lbnRpdHknKTtcbiAgcHVibGljIGJ5X2ZrX2NsYXNzJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxTeXNTeXN0ZW1SZWxldmFudENsYXNzPj4oJ2J5X2ZrX2NsYXNzJyk7XG4gIHB1YmxpYyBieV9yZXF1aXJlZF9ieV9zb3VyY2VzJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxTeXNTeXN0ZW1SZWxldmFudENsYXNzPj4oJ2J5X3JlcXVpcmVkX2J5X3NvdXJjZXMnKTtcbiAgcHVibGljIGJ5X3JlcXVpcmVkJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxTeXNTeXN0ZW1SZWxldmFudENsYXNzPj4oJ2J5X3JlcXVpcmVkJyk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbi8vIC8vIEFuYWx5c2lzVHlwZSBTZWxlY3RvcnNcbi8vIGNsYXNzIFN5c0FuYWx5c2lzVHlwZVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvcjxTeXNBbmFseXNpc1R5cGVTbGljZT4ge1xuLy8gICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8U3lzQW5hbHlzaXNUeXBlPignYnlfcGtfZW50aXR5Jyk7XG4vLyAgIGNvbnN0cnVjdG9yKFxuLy8gICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4vLyAgICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuLy8gICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4vLyAgICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxuLy8gfVxuXG5cbi8vIENvbmZpZyBTZWxlY3RvcnNcbmNsYXNzIFN5c0NvbmZpZ1NlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvcjxTeXNDb25maWdTbGljZT4ge1xuICBwdWJsaWMgbWFpbiQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PFN5c0NvbmZpZ1ZhbHVlPihbc3lzUm9vdCwgdGhpcy5tb2RlbCwgJ2J5X21haW4nLCAnbWFpbiddKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTeXNTZWxlY3RvciBleHRlbmRzIFN5c0FjdGlvbnMge1xuICBzeXN0ZW1fcmVsZXZhbnRfY2xhc3MkID0gbmV3IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgc3lzRGVmaW5pdGlvbnMsICdzeXN0ZW1fcmVsZXZhbnRfY2xhc3MnKVxuICAvLyBhbmFseXNpc190eXBlJCA9IG5ldyBTeXNBbmFseXNpc1R5cGVTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgc3lzRGVmaW5pdGlvbnMsICdhbmFseXNpc190eXBlJylcblxuICBjb25maWckID0gbmV3IFN5c0NvbmZpZ1NlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBzeXNEZWZpbml0aW9ucywgJ2NvbmZpZycpXG59XG4iXX0=