/**
 * @fileoverview added by tsickle
 * Generated from: selectors/dat.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DatActions, datDefinitions, datRoot } from '@kleiolab/lib-redux';
import { latestVersion } from '@kleiolab/lib-utils';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
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
    }
    /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    selector(indexKey) {
        /** @type {?} */
        const all$ = this.ngRedux.select([datRoot, this.model, indexKey])
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        ;
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => this.ngRedux.select([datRoot, this.model, indexKey, x]))
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        ;
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        return { all$, key };
    }
}
if (false) {
    /** @type {?} */
    Selector.prototype.ngRedux;
    /** @type {?} */
    Selector.prototype.configs;
    /** @type {?} */
    Selector.prototype.model;
}
class DatDigitalSelections extends Selector {
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
        this.by_pk_entity__entity_version$ = this.selector('by_pk_entity__entity_version');
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_pk_text$ = this.selector('by_pk_text');
    }
    /**
     * @param {?} pkDigital
     * @return {?}
     */
    latestVersion(pkDigital) {
        return this.by_pk_entity$.key(pkDigital).pipe(map((/**
         * @param {?} versions
         * @return {?}
         */
        versions => latestVersion(versions))));
    }
}
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
class DatNamespaceSelections extends Selector {
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
        this.by_fk_project$ = this.selector('by_fk_project');
    }
}
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
class DatChunkSelections extends Selector {
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
        this.by_fk_text$ = this.selector('by_fk_text');
    }
}
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
class DatClassColumnMappingSelections extends Selector {
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
        this.by_fk_column$ = this.selector('by_fk_column');
    }
}
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
class DatColumnSelections extends Selector {
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
        this.by_fk_digital$ = this.selector('by_fk_digital');
    }
}
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
class DatTextPropertySelections extends Selector {
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
        this.by_fk_entity__fk_system_type$ = this.selector('by_fk_entity__fk_system_type');
    }
}
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
export class DatSelector extends DatActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.digital$ = new DatDigitalSelections(this.ngRedux, datDefinitions, 'digital');
        this.namespace$ = new DatNamespaceSelections(this.ngRedux, datDefinitions, 'namespace');
        this.chunk$ = new DatChunkSelections(this.ngRedux, datDefinitions, 'chunk');
        this.column$ = new DatColumnSelections(this.ngRedux, datDefinitions, 'column');
        this.class_column_mapping$ = new DatClassColumnMappingSelections(this.ngRedux, datDefinitions, 'class_column_mapping');
        this.text_property$ = new DatTextPropertySelections(this.ngRedux, datDefinitions, 'text_property');
    }
}
DatSelector.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DatSelector.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ DatSelector.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DatSelector_Factory() { return new DatSelector(i0.ɵɵinject(i1.NgRedux)); }, token: DatSelector, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL2RhdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFRLFVBQVUsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFzQyxNQUFNLHFCQUFxQixDQUFDO0FBR3BILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQUVyQyxNQUFNLFFBQVE7Ozs7OztJQUNaLFlBQ1MsT0FBMkIsRUFDM0IsT0FBZ0MsRUFDaEMsS0FBYTtRQUZiLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7SUFDbEIsQ0FBQzs7Ozs7O0lBRUwsUUFBUSxDQUFJLFFBQWdCOztjQUVwQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxRSxTQUFTO1FBQ1Qsb0NBQW9DO1FBQ3BDLElBQUk7Ozs7OztjQUVFLEdBQUc7Ozs7UUFBRyxDQUFDLENBQUMsRUFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDNUYsU0FBUztRQUNULG9DQUFvQztRQUNwQyxJQUFJOztRQUZKLFNBQVM7UUFDVCxv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QUV6Ryw0Q0FBa0M7O0lBQ2xDLDRDQUF1Qzs7SUFDdkMsMENBQW9COztBQU94QixNQUFNLE9BQU8sV0FBWSxTQUFRLFVBQVU7Ozs7SUFTekMsWUFBbUIsT0FBMkI7UUFDNUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBREcsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFQOUMsYUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0UsZUFBVSxHQUFHLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbkYsV0FBTSxHQUFHLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkUsWUFBTyxHQUFHLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUUsMEJBQXFCLEdBQUcsSUFBSSwrQkFBK0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2xILG1CQUFjLEdBQUcsSUFBSSx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUk5RixDQUFDOzs7WUFkRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUF4R1EsT0FBTzs7Ozs7SUEyR2QsK0JBQTZFOztJQUM3RSxpQ0FBbUY7O0lBQ25GLDZCQUF1RTs7SUFDdkUsOEJBQTBFOztJQUMxRSw0Q0FBa0g7O0lBQ2xILHFDQUE4Rjs7SUFFbEYsOEJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ5UGssIERhdEFjdGlvbnMsIGRhdERlZmluaXRpb25zLCBkYXRSb290LCBJQXBwU3RhdGUsIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBEYXRDaHVuaywgRGF0Q29sdW1uLCBEYXREaWdpdGFsLCBEYXROYW1lc3BhY2UsIERhdFRleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBEYXRDbGFzc0NvbHVtbk1hcHBpbmcgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgbGF0ZXN0VmVyc2lvbiB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5jbGFzcyBTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyB9XG5cbiAgc2VsZWN0b3I8TT4oaW5kZXhLZXk6IHN0cmluZyk6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeCkgPT4gT2JzZXJ2YWJsZTxNPiB9IHtcblxuICAgIGNvbnN0IGFsbCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PEJ5UGs8TT4+KFtkYXRSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleV0pXG4gICAgLy8gLnBpcGUoXG4gICAgLy8gICBkaXN0aW5jdFVudGlsQ2hhbmdlZDxNPihlcXVhbHMpXG4gICAgLy8gKVxuXG4gICAgY29uc3Qga2V5ID0gKHgpOiBPYnNlcnZhYmxlPE0+ID0+IHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oW2RhdFJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5LCB4XSlcbiAgICAvLyAucGlwZShcbiAgICAvLyAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkPE0+KGVxdWFscylcbiAgICAvLyApXG5cbiAgICByZXR1cm4geyBhbGwkLCBrZXkgfVxuICB9XG59XG5cbmNsYXNzIERhdERpZ2l0YWxTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5X19lbnRpdHlfdmVyc2lvbiQgPSB0aGlzLnNlbGVjdG9yPERhdERpZ2l0YWw+KCdieV9wa19lbnRpdHlfX2VudGl0eV92ZXJzaW9uJylcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGF0RGlnaXRhbD4+KCdieV9wa19lbnRpdHknKVxuICBwdWJsaWMgYnlfcGtfdGV4dCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGF0RGlnaXRhbD4+KCdieV9wa190ZXh0JylcblxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG5cbiAgbGF0ZXN0VmVyc2lvbihwa0RpZ2l0YWw6IG51bWJlcik6IE9ic2VydmFibGU8RGF0RGlnaXRhbD4ge1xuICAgIHJldHVybiB0aGlzLmJ5X3BrX2VudGl0eSQua2V5KHBrRGlnaXRhbCkucGlwZShcbiAgICAgIG1hcCh2ZXJzaW9ucyA9PiBsYXRlc3RWZXJzaW9uKHZlcnNpb25zKSksXG4gICAgKVxuICB9XG59XG5cbmNsYXNzIERhdE5hbWVzcGFjZVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxEYXROYW1lc3BhY2U+KCdieV9wa19lbnRpdHknKVxuICBwdWJsaWMgYnlfZmtfcHJvamVjdCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGF0TmFtZXNwYWNlPj4oJ2J5X2ZrX3Byb2plY3QnKVxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgRGF0Q2h1bmtTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8RGF0Q2h1bms+KCdieV9wa19lbnRpdHknKVxuICBwdWJsaWMgYnlfZmtfdGV4dCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGF0Q2h1bms+PignYnlfZmtfdGV4dCcpXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBEYXRDbGFzc0NvbHVtbk1hcHBpbmdTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8RGF0Q2xhc3NDb2x1bW5NYXBwaW5nPignYnlfcGtfZW50aXR5JylcbiAgcHVibGljIGJ5X2ZrX2NvbHVtbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGF0Q2xhc3NDb2x1bW5NYXBwaW5nPj4oJ2J5X2ZrX2NvbHVtbicpXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBEYXRDb2x1bW5TZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8RGF0Q29sdW1uPignYnlfcGtfZW50aXR5JylcbiAgcHVibGljIGJ5X2ZrX2RpZ2l0YWwkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERhdENvbHVtbj4+KCdieV9ma19kaWdpdGFsJylcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIERhdFRleHRQcm9wZXJ0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxEYXRUZXh0UHJvcGVydHk+KCdieV9wa19lbnRpdHknKVxuICBwdWJsaWMgYnlfZmtfZW50aXR5X19ma19zeXN0ZW1fdHlwZSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGF0VGV4dFByb3BlcnR5Pj4oJ2J5X2ZrX2VudGl0eV9fZmtfc3lzdGVtX3R5cGUnKVxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGF0U2VsZWN0b3IgZXh0ZW5kcyBEYXRBY3Rpb25zIHtcblxuICBkaWdpdGFsJCA9IG5ldyBEYXREaWdpdGFsU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRhdERlZmluaXRpb25zLCAnZGlnaXRhbCcpO1xuICBuYW1lc3BhY2UkID0gbmV3IERhdE5hbWVzcGFjZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBkYXREZWZpbml0aW9ucywgJ25hbWVzcGFjZScpO1xuICBjaHVuayQgPSBuZXcgRGF0Q2h1bmtTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgZGF0RGVmaW5pdGlvbnMsICdjaHVuaycpO1xuICBjb2x1bW4kID0gbmV3IERhdENvbHVtblNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBkYXREZWZpbml0aW9ucywgJ2NvbHVtbicpO1xuICBjbGFzc19jb2x1bW5fbWFwcGluZyQgPSBuZXcgRGF0Q2xhc3NDb2x1bW5NYXBwaW5nU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRhdERlZmluaXRpb25zLCAnY2xhc3NfY29sdW1uX21hcHBpbmcnKTtcbiAgdGV4dF9wcm9wZXJ0eSQgPSBuZXcgRGF0VGV4dFByb3BlcnR5U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRhdERlZmluaXRpb25zLCAndGV4dF9wcm9wZXJ0eScpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHtcbiAgICBzdXBlcihuZ1JlZHV4KVxuICB9XG5cbn1cbiJdfQ==