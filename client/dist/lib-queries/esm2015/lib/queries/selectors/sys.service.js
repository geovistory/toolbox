/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/sys.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { SysActions, sysDefinitions, sysRoot } from '@kleiolab/lib-redux';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
/**
 * @template Slice
 */
class Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
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
    selector(indexKey) {
        /** @type {?} */
        const all$ = this.ngRedux.select([sysRoot, this.model, indexKey]);
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => this.ngRedux.select([sysRoot, this.model, indexKey, x]));
        return { all$, key };
    }
}
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
class SysSystemRelevantClassSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_class$ = this.selector('by_fk_class');
        this.by_required_by_sources$ = this.selector('by_required_by_sources');
        this.by_required$ = this.selector('by_required');
    }
}
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
class SysConfigSelections extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.main$ = this.ngRedux.select([sysRoot, this.model, 'by_main', 'main']);
    }
}
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
export class SysSelector extends SysActions {
    constructor() {
        super(...arguments);
        this.system_relevant_class$ = new SysSystemRelevantClassSelections(this.ngRedux, sysDefinitions, 'system_relevant_class');
        // analysis_type$ = new SysAnalysisTypeSelections(this.ngRedux, sysDefinitions, 'analysis_type')
        this.config$ = new SysConfigSelections(this.ngRedux, sysDefinitions, 'config');
    }
}
SysSelector.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ SysSelector.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function SysSelector_Factory() { return new SysSelector(i0.ɵɵinject(i1.NgRedux)); }, token: SysSelector, providedIn: "root" });
if (false) {
    /** @type {?} */
    SysSelector.prototype.system_relevant_class$;
    /** @type {?} */
    SysSelector.prototype.config$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvc3lzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQTRDLFVBQVUsRUFBa0IsY0FBYyxFQUF5QixPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUkzSixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFFM0MsTUFBTSxRQUFROzs7Ozs7SUFJWixZQUNTLE9BQTJCLEVBQzNCLE9BQWdDLEVBQ2hDLEtBQWE7UUFGYixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBTHRCLFdBQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQU10RCxDQUFDOzs7Ozs7SUFFTCxRQUFRLENBQUksUUFBZ0I7O2NBRXBCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztjQUVwRSxHQUFHOzs7O1FBQUcsQ0FBQyxDQUFDLEVBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRTVGLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDdEIsQ0FBQztDQUNGOzs7SUFoQkMsMEJBQTBEOztJQUd4RCwyQkFBa0M7O0lBQ2xDLDJCQUF1Qzs7SUFDdkMseUJBQW9COzs7QUFjeEIsTUFBTSxnQ0FBaUMsU0FBUSxRQUErQjs7Ozs7O0lBTTVFLFlBQ1MsT0FBMkIsRUFDM0IsT0FBZ0MsRUFDaEMsS0FBYTtRQUNsQixLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUh6QixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBUmYsa0JBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUF5QixjQUFjLENBQUMsQ0FBQztRQUN0RSxpQkFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQStCLGFBQWEsQ0FBQyxDQUFDO1FBQzFFLDRCQUF1QixHQUFHLElBQUksQ0FBQyxRQUFRLENBQStCLHdCQUF3QixDQUFDLENBQUM7UUFDaEcsaUJBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUErQixhQUFhLENBQUMsQ0FBQztJQU05QyxDQUFDO0NBQ3JDOzs7SUFWQyx5REFBNkU7O0lBQzdFLHdEQUFpRjs7SUFDakYsbUVBQXVHOztJQUN2Ryx3REFBaUY7O0lBRy9FLG1EQUFrQzs7SUFDbEMsbURBQXVDOztJQUN2QyxpREFBb0I7Ozs7Ozs7Ozs7OztBQWdCeEIsTUFBTSxtQkFBb0IsU0FBUSxRQUF3Qjs7Ozs7O0lBR3hELFlBQ1MsT0FBMkIsRUFDM0IsT0FBZ0MsRUFDaEMsS0FBYTtRQUNsQixLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUh6QixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBTGYsVUFBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFpQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBTXpELENBQUM7Q0FDckM7OztJQVBDLG9DQUE0Rjs7SUFHMUYsc0NBQWtDOztJQUNsQyxzQ0FBdUM7O0lBQ3ZDLG9DQUFvQjs7QUFPeEIsTUFBTSxPQUFPLFdBQVksU0FBUSxVQUFVO0lBSDNDOztRQUlFLDJCQUFzQixHQUFHLElBQUksZ0NBQWdDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsdUJBQXVCLENBQUMsQ0FBQTs7UUFHcEgsWUFBTyxHQUFHLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUE7S0FDMUU7OztZQVJBLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7SUFFQyw2Q0FBb0g7O0lBR3BILDhCQUF5RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBCeVBrLCBJQXBwU3RhdGUsIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLCBTeXNBY3Rpb25zLCBTeXNDb25maWdTbGljZSwgc3lzRGVmaW5pdGlvbnMsIFN5c1JlbGV2YW50Q2xhc3NTbGljZSwgc3lzUm9vdCB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBTeXNDb25maWdWYWx1ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNsYXNzIFNlbGVjdG9yPFNsaWNlPiB7XG5cbiAgc2xpY2UkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxTbGljZT4oW3N5c1Jvb3QsIHRoaXMubW9kZWxdKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyB9XG5cbiAgc2VsZWN0b3I8TT4oaW5kZXhLZXk6IHN0cmluZyk6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeCkgPT4gT2JzZXJ2YWJsZTxNPiB9IHtcblxuICAgIGNvbnN0IGFsbCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PEJ5UGs8TT4+KFtzeXNSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleV0pXG5cbiAgICBjb25zdCBrZXkgPSAoeCk6IE9ic2VydmFibGU8TT4gPT4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxNPihbc3lzUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXksIHhdKVxuXG4gICAgcmV0dXJuIHsgYWxsJCwga2V5IH1cbiAgfVxufVxuXG4vLyBTeXN0ZW1SZWxldmFudENsYXNzIFNlbGVjdG9yc1xuY2xhc3MgU3lzU3lzdGVtUmVsZXZhbnRDbGFzc1NlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvcjxTeXNSZWxldmFudENsYXNzU2xpY2U+IHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPFN5c1N5c3RlbVJlbGV2YW50Q2xhc3M+KCdieV9wa19lbnRpdHknKTtcbiAgcHVibGljIGJ5X2ZrX2NsYXNzJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxTeXNTeXN0ZW1SZWxldmFudENsYXNzPj4oJ2J5X2ZrX2NsYXNzJyk7XG4gIHB1YmxpYyBieV9yZXF1aXJlZF9ieV9zb3VyY2VzJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxTeXNTeXN0ZW1SZWxldmFudENsYXNzPj4oJ2J5X3JlcXVpcmVkX2J5X3NvdXJjZXMnKTtcbiAgcHVibGljIGJ5X3JlcXVpcmVkJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxTeXNTeXN0ZW1SZWxldmFudENsYXNzPj4oJ2J5X3JlcXVpcmVkJyk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbi8vIC8vIEFuYWx5c2lzVHlwZSBTZWxlY3RvcnNcbi8vIGNsYXNzIFN5c0FuYWx5c2lzVHlwZVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvcjxTeXNBbmFseXNpc1R5cGVTbGljZT4ge1xuLy8gICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8U3lzQW5hbHlzaXNUeXBlPignYnlfcGtfZW50aXR5Jyk7XG4vLyAgIGNvbnN0cnVjdG9yKFxuLy8gICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4vLyAgICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuLy8gICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4vLyAgICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxuLy8gfVxuXG5cbi8vIENvbmZpZyBTZWxlY3RvcnNcbmNsYXNzIFN5c0NvbmZpZ1NlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvcjxTeXNDb25maWdTbGljZT4ge1xuICBwdWJsaWMgbWFpbiQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PFN5c0NvbmZpZ1ZhbHVlPihbc3lzUm9vdCwgdGhpcy5tb2RlbCwgJ2J5X21haW4nLCAnbWFpbiddKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTeXNTZWxlY3RvciBleHRlbmRzIFN5c0FjdGlvbnMge1xuICBzeXN0ZW1fcmVsZXZhbnRfY2xhc3MkID0gbmV3IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgc3lzRGVmaW5pdGlvbnMsICdzeXN0ZW1fcmVsZXZhbnRfY2xhc3MnKVxuICAvLyBhbmFseXNpc190eXBlJCA9IG5ldyBTeXNBbmFseXNpc1R5cGVTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgc3lzRGVmaW5pdGlvbnMsICdhbmFseXNpc190eXBlJylcblxuICBjb25maWckID0gbmV3IFN5c0NvbmZpZ1NlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBzeXNEZWZpbml0aW9ucywgJ2NvbmZpZycpXG59XG4iXX0=