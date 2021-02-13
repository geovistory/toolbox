/**
 * @fileoverview added by tsickle
 * Generated from: selectors/sys.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL3N5cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUE0QyxVQUFVLEVBQWtCLGNBQWMsRUFBeUIsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFJM0osT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBRTNDLE1BQU0sUUFBUTs7Ozs7O0lBSVosWUFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBRmIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUx0QixXQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFNdEQsQ0FBQzs7Ozs7O0lBRUwsUUFBUSxDQUFJLFFBQWdCOztjQUVwQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7Y0FFcEUsR0FBRzs7OztRQUFHLENBQUMsQ0FBQyxFQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUU1RixPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFBO0lBQ3RCLENBQUM7Q0FDRjs7O0lBaEJDLDBCQUEwRDs7SUFHeEQsMkJBQWtDOztJQUNsQywyQkFBdUM7O0lBQ3ZDLHlCQUFvQjs7O0FBY3hCLE1BQU0sZ0NBQWlDLFNBQVEsUUFBK0I7Ozs7OztJQU01RSxZQUNTLE9BQTJCLEVBQzNCLE9BQWdDLEVBQ2hDLEtBQWE7UUFDbEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFIekIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQVJmLGtCQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBeUIsY0FBYyxDQUFDLENBQUM7UUFDdEUsaUJBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUErQixhQUFhLENBQUMsQ0FBQztRQUMxRSw0QkFBdUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUErQix3QkFBd0IsQ0FBQyxDQUFDO1FBQ2hHLGlCQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBK0IsYUFBYSxDQUFDLENBQUM7SUFNOUMsQ0FBQztDQUNyQzs7O0lBVkMseURBQTZFOztJQUM3RSx3REFBaUY7O0lBQ2pGLG1FQUF1Rzs7SUFDdkcsd0RBQWlGOztJQUcvRSxtREFBa0M7O0lBQ2xDLG1EQUF1Qzs7SUFDdkMsaURBQW9COzs7Ozs7Ozs7Ozs7QUFnQnhCLE1BQU0sbUJBQW9CLFNBQVEsUUFBd0I7Ozs7OztJQUd4RCxZQUNTLE9BQTJCLEVBQzNCLE9BQWdDLEVBQ2hDLEtBQWE7UUFDbEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFIekIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUxmLFVBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQU16RCxDQUFDO0NBQ3JDOzs7SUFQQyxvQ0FBNEY7O0lBRzFGLHNDQUFrQzs7SUFDbEMsc0NBQXVDOztJQUN2QyxvQ0FBb0I7O0FBT3hCLE1BQU0sT0FBTyxXQUFZLFNBQVEsVUFBVTtJQUgzQzs7UUFJRSwyQkFBc0IsR0FBRyxJQUFJLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLHVCQUF1QixDQUFDLENBQUE7O1FBR3BILFlBQU8sR0FBRyxJQUFJLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0tBQzFFOzs7WUFSQSxVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7O0lBRUMsNkNBQW9IOztJQUdwSCw4QkFBeUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgQnlQaywgSUFwcFN0YXRlLCBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiwgU3lzQWN0aW9ucywgU3lzQ29uZmlnU2xpY2UsIHN5c0RlZmluaXRpb25zLCBTeXNSZWxldmFudENsYXNzU2xpY2UsIHN5c1Jvb3QgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgU3lzQ29uZmlnVmFsdWUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jbGFzcyBTZWxlY3RvcjxTbGljZT4ge1xuXG4gIHNsaWNlJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8U2xpY2U+KFtzeXNSb290LCB0aGlzLm1vZGVsXSlcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgfVxuXG4gIHNlbGVjdG9yPE0+KGluZGV4S2V5OiBzdHJpbmcpOiB7IGFsbCQ6IE9ic2VydmFibGU8QnlQazxNPj4sIGtleTogKHgpID0+IE9ic2VydmFibGU8TT4gfSB7XG5cbiAgICBjb25zdCBhbGwkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxCeVBrPE0+Pihbc3lzUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXldKVxuXG4gICAgY29uc3Qga2V5ID0gKHgpOiBPYnNlcnZhYmxlPE0+ID0+IHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oW3N5c1Jvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5LCB4XSlcblxuICAgIHJldHVybiB7IGFsbCQsIGtleSB9XG4gIH1cbn1cblxuLy8gU3lzdGVtUmVsZXZhbnRDbGFzcyBTZWxlY3RvcnNcbmNsYXNzIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3I8U3lzUmVsZXZhbnRDbGFzc1NsaWNlPiB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxTeXNTeXN0ZW1SZWxldmFudENsYXNzPignYnlfcGtfZW50aXR5Jyk7XG4gIHB1YmxpYyBieV9ma19jbGFzcyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8U3lzU3lzdGVtUmVsZXZhbnRDbGFzcz4+KCdieV9ma19jbGFzcycpO1xuICBwdWJsaWMgYnlfcmVxdWlyZWRfYnlfc291cmNlcyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8U3lzU3lzdGVtUmVsZXZhbnRDbGFzcz4+KCdieV9yZXF1aXJlZF9ieV9zb3VyY2VzJyk7XG4gIHB1YmxpYyBieV9yZXF1aXJlZCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8U3lzU3lzdGVtUmVsZXZhbnRDbGFzcz4+KCdieV9yZXF1aXJlZCcpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG4vLyAvLyBBbmFseXNpc1R5cGUgU2VsZWN0b3JzXG4vLyBjbGFzcyBTeXNBbmFseXNpc1R5cGVTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3I8U3lzQW5hbHlzaXNUeXBlU2xpY2U+IHtcbi8vICAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPFN5c0FuYWx5c2lzVHlwZT4oJ2J5X3BrX2VudGl0eScpO1xuLy8gICBjb25zdHJ1Y3Rvcihcbi8vICAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuLy8gICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbi8vICAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuLy8gICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbi8vIH1cblxuXG4vLyBDb25maWcgU2VsZWN0b3JzXG5jbGFzcyBTeXNDb25maWdTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3I8U3lzQ29uZmlnU2xpY2U+IHtcbiAgcHVibGljIG1haW4kID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxTeXNDb25maWdWYWx1ZT4oW3N5c1Jvb3QsIHRoaXMubW9kZWwsICdieV9tYWluJywgJ21haW4nXSlcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU3lzU2VsZWN0b3IgZXh0ZW5kcyBTeXNBY3Rpb25zIHtcbiAgc3lzdGVtX3JlbGV2YW50X2NsYXNzJCA9IG5ldyBTeXNTeXN0ZW1SZWxldmFudENsYXNzU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHN5c0RlZmluaXRpb25zLCAnc3lzdGVtX3JlbGV2YW50X2NsYXNzJylcbiAgLy8gYW5hbHlzaXNfdHlwZSQgPSBuZXcgU3lzQW5hbHlzaXNUeXBlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIHN5c0RlZmluaXRpb25zLCAnYW5hbHlzaXNfdHlwZScpXG5cbiAgY29uZmlnJCA9IG5ldyBTeXNDb25maWdTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgc3lzRGVmaW5pdGlvbnMsICdjb25maWcnKVxufVxuIl19