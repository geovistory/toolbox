/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/dat.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvZGF0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQVEsVUFBVSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQXNDLE1BQU0scUJBQXFCLENBQUM7QUFHcEgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXBELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRXJDLE1BQU0sUUFBUTs7Ozs7O0lBQ1osWUFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBRmIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUNsQixDQUFDOzs7Ozs7SUFFTCxRQUFRLENBQUksUUFBZ0I7O2NBRXBCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFFLFNBQVM7UUFDVCxvQ0FBb0M7UUFDcEMsSUFBSTs7Ozs7O2NBRUUsR0FBRzs7OztRQUFHLENBQUMsQ0FBQyxFQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM1RixTQUFTO1FBQ1Qsb0NBQW9DO1FBQ3BDLElBQUk7O1FBRkosU0FBUztRQUNULG9DQUFv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LDRDQUFrQzs7SUFDbEMsNENBQXVDOztJQUN2QywwQ0FBb0I7O0FBT3hCLE1BQU0sT0FBTyxXQUFZLFNBQVEsVUFBVTs7OztJQVN6QyxZQUFtQixPQUEyQjtRQUM1QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFERyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQVA5QyxhQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3RSxlQUFVLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNuRixXQUFNLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RSxZQUFPLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxRSwwQkFBcUIsR0FBRyxJQUFJLCtCQUErQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDbEgsbUJBQWMsR0FBRyxJQUFJLHlCQUF5QixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBSTlGLENBQUM7OztZQWRGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQXhHUSxPQUFPOzs7OztJQTJHZCwrQkFBNkU7O0lBQzdFLGlDQUFtRjs7SUFDbkYsNkJBQXVFOztJQUN2RSw4QkFBMEU7O0lBQzFFLDRDQUFrSDs7SUFDbEgscUNBQThGOztJQUVsRiw4QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnlQaywgRGF0QWN0aW9ucywgZGF0RGVmaW5pdGlvbnMsIGRhdFJvb3QsIElBcHBTdGF0ZSwgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IERhdENodW5rLCBEYXRDb2x1bW4sIERhdERpZ2l0YWwsIERhdE5hbWVzcGFjZSwgRGF0VGV4dFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IERhdENsYXNzQ29sdW1uTWFwcGluZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBsYXRlc3RWZXJzaW9uIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmNsYXNzIFNlbGVjdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IH1cblxuICBzZWxlY3RvcjxNPihpbmRleEtleTogc3RyaW5nKTogeyBhbGwkOiBPYnNlcnZhYmxlPEJ5UGs8TT4+LCBrZXk6ICh4KSA9PiBPYnNlcnZhYmxlPE0+IH0ge1xuXG4gICAgY29uc3QgYWxsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8QnlQazxNPj4oW2RhdFJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5XSlcbiAgICAvLyAucGlwZShcbiAgICAvLyAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkPE0+KGVxdWFscylcbiAgICAvLyApXG5cbiAgICBjb25zdCBrZXkgPSAoeCk6IE9ic2VydmFibGU8TT4gPT4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxNPihbZGF0Um9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXksIHhdKVxuICAgIC8vIC5waXBlKFxuICAgIC8vICAgZGlzdGluY3RVbnRpbENoYW5nZWQ8TT4oZXF1YWxzKVxuICAgIC8vIClcblxuICAgIHJldHVybiB7IGFsbCQsIGtleSB9XG4gIH1cbn1cblxuY2xhc3MgRGF0RGlnaXRhbFNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHlfX2VudGl0eV92ZXJzaW9uJCA9IHRoaXMuc2VsZWN0b3I8RGF0RGlnaXRhbD4oJ2J5X3BrX2VudGl0eV9fZW50aXR5X3ZlcnNpb24nKVxuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEYXREaWdpdGFsPj4oJ2J5X3BrX2VudGl0eScpXG4gIHB1YmxpYyBieV9wa190ZXh0JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEYXREaWdpdGFsPj4oJ2J5X3BrX3RleHQnKVxuXG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cblxuICBsYXRlc3RWZXJzaW9uKHBrRGlnaXRhbDogbnVtYmVyKTogT2JzZXJ2YWJsZTxEYXREaWdpdGFsPiB7XG4gICAgcmV0dXJuIHRoaXMuYnlfcGtfZW50aXR5JC5rZXkocGtEaWdpdGFsKS5waXBlKFxuICAgICAgbWFwKHZlcnNpb25zID0+IGxhdGVzdFZlcnNpb24odmVyc2lvbnMpKSxcbiAgICApXG4gIH1cbn1cblxuY2xhc3MgRGF0TmFtZXNwYWNlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPERhdE5hbWVzcGFjZT4oJ2J5X3BrX2VudGl0eScpXG4gIHB1YmxpYyBieV9ma19wcm9qZWN0JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEYXROYW1lc3BhY2U+PignYnlfZmtfcHJvamVjdCcpXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBEYXRDaHVua1NlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxEYXRDaHVuaz4oJ2J5X3BrX2VudGl0eScpXG4gIHB1YmxpYyBieV9ma190ZXh0JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEYXRDaHVuaz4+KCdieV9ma190ZXh0JylcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIERhdENsYXNzQ29sdW1uTWFwcGluZ1NlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxEYXRDbGFzc0NvbHVtbk1hcHBpbmc+KCdieV9wa19lbnRpdHknKVxuICBwdWJsaWMgYnlfZmtfY29sdW1uJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEYXRDbGFzc0NvbHVtbk1hcHBpbmc+PignYnlfZmtfY29sdW1uJylcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIERhdENvbHVtblNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxEYXRDb2x1bW4+KCdieV9wa19lbnRpdHknKVxuICBwdWJsaWMgYnlfZmtfZGlnaXRhbCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGF0Q29sdW1uPj4oJ2J5X2ZrX2RpZ2l0YWwnKVxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgRGF0VGV4dFByb3BlcnR5U2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPERhdFRleHRQcm9wZXJ0eT4oJ2J5X3BrX2VudGl0eScpXG4gIHB1YmxpYyBieV9ma19lbnRpdHlfX2ZrX3N5c3RlbV90eXBlJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEYXRUZXh0UHJvcGVydHk+PignYnlfZmtfZW50aXR5X19ma19zeXN0ZW1fdHlwZScpXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEYXRTZWxlY3RvciBleHRlbmRzIERhdEFjdGlvbnMge1xuXG4gIGRpZ2l0YWwkID0gbmV3IERhdERpZ2l0YWxTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgZGF0RGVmaW5pdGlvbnMsICdkaWdpdGFsJyk7XG4gIG5hbWVzcGFjZSQgPSBuZXcgRGF0TmFtZXNwYWNlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRhdERlZmluaXRpb25zLCAnbmFtZXNwYWNlJyk7XG4gIGNodW5rJCA9IG5ldyBEYXRDaHVua1NlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBkYXREZWZpbml0aW9ucywgJ2NodW5rJyk7XG4gIGNvbHVtbiQgPSBuZXcgRGF0Q29sdW1uU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRhdERlZmluaXRpb25zLCAnY29sdW1uJyk7XG4gIGNsYXNzX2NvbHVtbl9tYXBwaW5nJCA9IG5ldyBEYXRDbGFzc0NvbHVtbk1hcHBpbmdTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgZGF0RGVmaW5pdGlvbnMsICdjbGFzc19jb2x1bW5fbWFwcGluZycpO1xuICB0ZXh0X3Byb3BlcnR5JCA9IG5ldyBEYXRUZXh0UHJvcGVydHlTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgZGF0RGVmaW5pdGlvbnMsICd0ZXh0X3Byb3BlcnR5Jyk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikge1xuICAgIHN1cGVyKG5nUmVkdXgpXG4gIH1cblxufVxuIl19