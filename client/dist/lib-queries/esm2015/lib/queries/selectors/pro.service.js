/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/pro.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProActions, proDefinitions, proRoot } from '@kleiolab/lib-redux';
import { toString } from 'ramda';
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
        const all$ = this.ngRedux.select([proRoot, this.model, indexKey]);
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            /** @type {?} */
            const k = typeof x === 'string' ? x : x.map((/**
             * @param {?} part
             * @return {?}
             */
            (part) => toString(part))).join('_');
            ;
            return this.ngRedux.select([proRoot, this.model, indexKey, k]);
        });
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
class ProProjectSelector extends Selector {
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
    }
}
if (false) {
    /** @type {?} */
    ProProjectSelector.prototype.by_pk_entity$;
    /** @type {?} */
    ProProjectSelector.prototype.ngRedux;
    /** @type {?} */
    ProProjectSelector.prototype.configs;
    /** @type {?} */
    ProProjectSelector.prototype.model;
}
class ProInfoProjRelSelector extends Selector {
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
        this.by_fk_project__fk_entity$ = this.selector('by_fk_project__fk_entity');
    }
}
if (false) {
    /** @type {?} */
    ProInfoProjRelSelector.prototype.by_fk_project__fk_entity$;
    /** @type {?} */
    ProInfoProjRelSelector.prototype.ngRedux;
    /** @type {?} */
    ProInfoProjRelSelector.prototype.configs;
    /** @type {?} */
    ProInfoProjRelSelector.prototype.model;
}
class ProDfhClassProjRelSelector extends Selector {
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
        this.by_fk_project__enabled_in_entities$ = this.selector('by_fk_project__enabled_in_entities');
        this.by_fk_project__fk_class$ = this.selector('by_fk_project__fk_class');
        this.by_fk_project$ = this.selector('by_fk_project');
    }
}
if (false) {
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.by_fk_project__enabled_in_entities$;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.by_fk_project__fk_class$;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.by_fk_project$;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.ngRedux;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.configs;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.model;
}
class ProDfhProfileProjRelSelector extends Selector {
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
        this.by_fk_project__enabled$ = this.selector('by_fk_project__enabled');
        this.by_fk_project__fk_profile$ = this.selector('by_fk_project__fk_profile');
        this.by_fk_project$ = this.selector('by_fk_project');
    }
}
if (false) {
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.by_fk_project__enabled$;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.by_fk_project__fk_profile$;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.by_fk_project$;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.ngRedux;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.configs;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.model;
}
class ProClassFieldConfigSelector extends Selector {
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
        this.by_fk_project__fk_class$ = this.selector('by_fk_project__fk_class');
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.by_fk_project__fk_class$;
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.by_pk_entity$;
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.ngRedux;
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.configs;
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.model;
}
class ProTextPropertySelector extends Selector {
    // public fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language')
    // public fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language')
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
        this.by_fks$ = this.selector('by_fks');
        this.by_fks_without_lang$ = this.selector('by_fks_without_lang');
    }
}
if (false) {
    /** @type {?} */
    ProTextPropertySelector.prototype.by_fks$;
    /** @type {?} */
    ProTextPropertySelector.prototype.by_fks_without_lang$;
    /** @type {?} */
    ProTextPropertySelector.prototype.ngRedux;
    /** @type {?} */
    ProTextPropertySelector.prototype.configs;
    /** @type {?} */
    ProTextPropertySelector.prototype.model;
}
class ProAnalysisSelector extends Selector {
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
    }
}
if (false) {
    /** @type {?} */
    ProAnalysisSelector.prototype.by_pk_entity$;
    /** @type {?} */
    ProAnalysisSelector.prototype.ngRedux;
    /** @type {?} */
    ProAnalysisSelector.prototype.configs;
    /** @type {?} */
    ProAnalysisSelector.prototype.model;
}
export class ProSelector extends ProActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.project$ = new ProProjectSelector(this.ngRedux, proDefinitions, 'project');
        this.info_proj_rel$ = new ProInfoProjRelSelector(this.ngRedux, proDefinitions, 'info_proj_rel');
        this.dfh_class_proj_rel$ = new ProDfhClassProjRelSelector(this.ngRedux, proDefinitions, 'dfh_class_proj_rel');
        this.dfh_profile_proj_rel$ = new ProDfhProfileProjRelSelector(this.ngRedux, proDefinitions, 'dfh_profile_proj_rel');
        this.class_field_config$ = new ProClassFieldConfigSelector(this.ngRedux, proDefinitions, 'class_field_config');
        this.text_property$ = new ProTextPropertySelector(this.ngRedux, proDefinitions, 'text_property');
        this.analysis$ = new ProAnalysisSelector(this.ngRedux, proDefinitions, 'analysis');
    }
}
ProSelector.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ProSelector.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ ProSelector.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ProSelector_Factory() { return new ProSelector(i0.ɵɵinject(i1.NgRedux)); }, token: ProSelector, providedIn: "root" });
if (false) {
    /** @type {?} */
    ProSelector.prototype.project$;
    /** @type {?} */
    ProSelector.prototype.info_proj_rel$;
    /** @type {?} */
    ProSelector.prototype.dfh_class_proj_rel$;
    /** @type {?} */
    ProSelector.prototype.dfh_profile_proj_rel$;
    /** @type {?} */
    ProSelector.prototype.class_field_config$;
    /** @type {?} */
    ProSelector.prototype.text_property$;
    /** @type {?} */
    ProSelector.prototype.analysis$;
    /** @type {?} */
    ProSelector.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvcHJvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQW1CLFVBQVUsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUEyQixNQUFNLHFCQUFxQixDQUFDO0FBR3BILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7OztBQU1qQyxNQUFNLFFBQVE7Ozs7OztJQUNaLFlBQ1MsT0FBMkIsRUFDM0IsT0FBZ0MsRUFDaEMsS0FBYTtRQUZiLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7SUFDbEIsQ0FBQzs7Ozs7O0lBRUwsUUFBUSxDQUFJLFFBQWdCOztjQUVwQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7Y0FFcEUsR0FBRzs7OztRQUFHLENBQUMsQ0FBK0IsRUFBaUIsRUFBRTs7a0JBQ3ZELENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7Ozs7WUFBQyxDQUFDLElBQXFCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFBQyxDQUFDO1lBRWxHLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUksQ0FBQyxPQUFPLEVB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QkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQXBIUSxPQUFPOzs7OztJQXVIZCwrQkFBMkU7O0lBQzNFLHFDQUEyRjs7SUFDM0YsMENBQXlHOztJQUN6Ryw0Q0FBK0c7O0lBQy9HLDBDQUEwRzs7SUFDMUcscUNBQTRGOztJQUM1RixnQ0FBOEU7O0lBRWxFLDhCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCeVBrLCBJQXBwU3RhdGUsIFByb0FjdGlvbnMsIHByb0RlZmluaXRpb25zLCBwcm9Sb290LCBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgUHJvRGZoQ2xhc3NQcm9qUmVsLCBQcm9EZmhQcm9maWxlUHJvalJlbCwgUHJvSW5mb1Byb2pSZWwsIFByb1RleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBQcm9BbmFseXNpcywgUHJvQ2xhc3NGaWVsZENvbmZpZywgUHJvUHJvamVjdCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyB0b1N0cmluZyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG5cblxuY2xhc3MgU2VsZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgfVxuXG4gIHNlbGVjdG9yPE0+KGluZGV4S2V5OiBzdHJpbmcpOiB7IGFsbCQ6IE9ic2VydmFibGU8QnlQazxNPj4sIGtleTogKHg6IHN0cmluZyB8IChzdHJpbmcgfCBudW1iZXIpW10pID0+IE9ic2VydmFibGU8TT4gfSB7XG5cbiAgICBjb25zdCBhbGwkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxCeVBrPE0+PihbcHJvUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXldKVxuXG4gICAgY29uc3Qga2V5ID0gKHg6IHN0cmluZyB8IChzdHJpbmcgfCBudW1iZXIpW10pOiBPYnNlcnZhYmxlPE0+ID0+IHtcbiAgICAgIGNvbnN0IGsgPSB0eXBlb2YgeCA9PT0gJ3N0cmluZycgPyB4IDogeC5tYXAoKHBhcnQ6IHN0cmluZyB8IG51bWJlcikgPT4gdG9TdHJpbmcocGFydCkpLmpvaW4oJ18nKTs7XG5cbiAgICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFtwcm9Sb290LCB0aGlzLm1vZGVsLCBpbmRleEtleSwga10pXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYWxsJCwga2V5IH1cbiAgfVxufVxuXG5jbGFzcyBQcm9Qcm9qZWN0U2VsZWN0b3IgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxQcm9Qcm9qZWN0PignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuXG5jbGFzcyBQcm9JbmZvUHJvalJlbFNlbGVjdG9yIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8UHJvSW5mb1Byb2pSZWw+KCdieV9ma19wcm9qZWN0X19ma19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5cbmNsYXNzIFByb0RmaENsYXNzUHJvalJlbFNlbGVjdG9yIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfZmtfcHJvamVjdF9fZW5hYmxlZF9pbl9lbnRpdGllcyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8UHJvRGZoQ2xhc3NQcm9qUmVsPj4oJ2J5X2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXMnKVxuICBwdWJsaWMgYnlfZmtfcHJvamVjdF9fZmtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxQcm9EZmhDbGFzc1Byb2pSZWw+KCdieV9ma19wcm9qZWN0X19ma19jbGFzcycpXG4gIHB1YmxpYyBieV9ma19wcm9qZWN0JCA9IHRoaXMuc2VsZWN0b3I8UHJvRGZoQ2xhc3NQcm9qUmVsPignYnlfZmtfcHJvamVjdCcpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIFByb0RmaFByb2ZpbGVQcm9qUmVsU2VsZWN0b3IgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9ma19wcm9qZWN0X19lbmFibGVkJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxQcm9EZmhQcm9maWxlUHJvalJlbD4+KCdieV9ma19wcm9qZWN0X19lbmFibGVkJylcbiAgcHVibGljIGJ5X2ZrX3Byb2plY3RfX2ZrX3Byb2ZpbGUkID0gdGhpcy5zZWxlY3RvcjxQcm9EZmhQcm9maWxlUHJvalJlbD4oJ2J5X2ZrX3Byb2plY3RfX2ZrX3Byb2ZpbGUnKVxuICBwdWJsaWMgYnlfZmtfcHJvamVjdCQgPSB0aGlzLnNlbGVjdG9yPFByb0RmaFByb2ZpbGVQcm9qUmVsPignYnlfZmtfcHJvamVjdCcpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIFByb0NsYXNzRmllbGRDb25maWdTZWxlY3RvciBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxQcm9DbGFzc0ZpZWxkQ29uZmlnPj4oJ2J5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJylcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPFByb0NsYXNzRmllbGRDb25maWc+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5cbmNsYXNzIFByb1RleHRQcm9wZXJ0eVNlbGVjdG9yIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfZmtzJCA9IHRoaXMuc2VsZWN0b3I8UHJvVGV4dFByb3BlcnR5PignYnlfZmtzJylcbiAgcHVibGljIGJ5X2Zrc193aXRob3V0X2xhbmckID0gdGhpcy5zZWxlY3RvcjxCeVBrPFByb1RleHRQcm9wZXJ0eT4+KCdieV9ma3Nfd2l0aG91dF9sYW5nJylcbiAgLy8gcHVibGljIGZrX3Byb2plY3RfX2ZrX2RmaF9wcm9wZXJ0eV9fZmtfZGZoX3Byb3BlcnR5X2RvbWFpbl9fZmtfc3lzdGVtX3R5cGVfX2ZrX2xhbmd1YWdlJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxQcm9UZXh0UHJvcGVydHk+PignZmtfcHJvamVjdF9fZmtfZGZoX3Byb3BlcnR5X19ma19kZmhfcHJvcGVydHlfZG9tYWluX19ma19zeXN0ZW1fdHlwZV9fZmtfbGFuZ3VhZ2UnKVxuICAvLyBwdWJsaWMgZmtfcHJvamVjdF9fZmtfZGZoX3Byb3BlcnR5X19ma19kZmhfcHJvcGVydHlfcmFuZ2VfX2ZrX3N5c3RlbV90eXBlX19ma19sYW5ndWFnZSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8UHJvVGV4dFByb3BlcnR5Pj4oJ2ZrX3Byb2plY3RfX2ZrX2RmaF9wcm9wZXJ0eV9fZmtfZGZoX3Byb3BlcnR5X3JhbmdlX19ma19zeXN0ZW1fdHlwZV9fZmtfbGFuZ3VhZ2UnKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5cbmNsYXNzIFByb0FuYWx5c2lzU2VsZWN0b3IgZXh0ZW5kcyBTZWxlY3RvciB7XG5cbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPFByb0FuYWx5c2lzPignYnlfcGtfZW50aXR5JylcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFByb1NlbGVjdG9yIGV4dGVuZHMgUHJvQWN0aW9ucyB7XG5cbiAgcHJvamVjdCQgPSBuZXcgUHJvUHJvamVjdFNlbGVjdG9yKHRoaXMubmdSZWR1eCwgcHJvRGVmaW5pdGlvbnMsICdwcm9qZWN0Jyk7XG4gIGluZm9fcHJval9yZWwkID0gbmV3IFByb0luZm9Qcm9qUmVsU2VsZWN0b3IodGhpcy5uZ1JlZHV4LCBwcm9EZWZpbml0aW9ucywgJ2luZm9fcHJval9yZWwnKTtcbiAgZGZoX2NsYXNzX3Byb2pfcmVsJCA9IG5ldyBQcm9EZmhDbGFzc1Byb2pSZWxTZWxlY3Rvcih0aGlzLm5nUmVkdXgsIHByb0RlZmluaXRpb25zLCAnZGZoX2NsYXNzX3Byb2pfcmVsJyk7XG4gIGRmaF9wcm9maWxlX3Byb2pfcmVsJCA9IG5ldyBQcm9EZmhQcm9maWxlUHJvalJlbFNlbGVjdG9yKHRoaXMubmdSZWR1eCwgcHJvRGVmaW5pdGlvbnMsICdkZmhfcHJvZmlsZV9wcm9qX3JlbCcpO1xuICBjbGFzc19maWVsZF9jb25maWckID0gbmV3IFByb0NsYXNzRmllbGRDb25maWdTZWxlY3Rvcih0aGlzLm5nUmVkdXgsIHByb0RlZmluaXRpb25zLCAnY2xhc3NfZmllbGRfY29uZmlnJyk7XG4gIHRleHRfcHJvcGVydHkkID0gbmV3IFByb1RleHRQcm9wZXJ0eVNlbGVjdG9yKHRoaXMubmdSZWR1eCwgcHJvRGVmaW5pdGlvbnMsICd0ZXh0X3Byb3BlcnR5Jyk7XG4gIGFuYWx5c2lzJCA9IG5ldyBQcm9BbmFseXNpc1NlbGVjdG9yKHRoaXMubmdSZWR1eCwgcHJvRGVmaW5pdGlvbnMsICdhbmFseXNpcycpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHtcbiAgICBzdXBlcihuZ1JlZHV4KVxuICB9XG59XG4iXX0=