/**
 * @fileoverview added by tsickle
 * Generated from: selectors/pro.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProActions, proDefinitions, proRoot } from '@kleiolab/lib-redux';
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
        var all$ = this.ngRedux.select([proRoot, this.model, indexKey]);
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
            return _this.ngRedux.select([proRoot, _this.model, indexKey, k]);
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
var ProProjectSelector = /** @class */ (function (_super) {
    tslib_1.__extends(ProProjectSelector, _super);
    function ProProjectSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return ProProjectSelector;
}(Selector));
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
var ProInfoProjRelSelector = /** @class */ (function (_super) {
    tslib_1.__extends(ProInfoProjRelSelector, _super);
    function ProInfoProjRelSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_fk_project__fk_entity$ = _this.selector('by_fk_project__fk_entity');
        return _this;
    }
    return ProInfoProjRelSelector;
}(Selector));
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
var ProDfhClassProjRelSelector = /** @class */ (function (_super) {
    tslib_1.__extends(ProDfhClassProjRelSelector, _super);
    function ProDfhClassProjRelSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_fk_project__enabled_in_entities$ = _this.selector('by_fk_project__enabled_in_entities');
        _this.by_fk_project__fk_class$ = _this.selector('by_fk_project__fk_class');
        _this.by_fk_project$ = _this.selector('by_fk_project');
        return _this;
    }
    return ProDfhClassProjRelSelector;
}(Selector));
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
var ProDfhProfileProjRelSelector = /** @class */ (function (_super) {
    tslib_1.__extends(ProDfhProfileProjRelSelector, _super);
    function ProDfhProfileProjRelSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_fk_project__enabled$ = _this.selector('by_fk_project__enabled');
        _this.by_fk_project__fk_profile$ = _this.selector('by_fk_project__fk_profile');
        _this.by_fk_project$ = _this.selector('by_fk_project');
        return _this;
    }
    return ProDfhProfileProjRelSelector;
}(Selector));
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
var ProClassFieldConfigSelector = /** @class */ (function (_super) {
    tslib_1.__extends(ProClassFieldConfigSelector, _super);
    function ProClassFieldConfigSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_fk_project__fk_class$ = _this.selector('by_fk_project__fk_class');
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return ProClassFieldConfigSelector;
}(Selector));
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
var ProTextPropertySelector = /** @class */ (function (_super) {
    tslib_1.__extends(ProTextPropertySelector, _super);
    // public fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language')
    // public fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language')
    function ProTextPropertySelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_fks$ = _this.selector('by_fks');
        _this.by_fks_without_lang$ = _this.selector('by_fks_without_lang');
        return _this;
    }
    return ProTextPropertySelector;
}(Selector));
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
var ProAnalysisSelector = /** @class */ (function (_super) {
    tslib_1.__extends(ProAnalysisSelector, _super);
    function ProAnalysisSelector(ngRedux, configs, model) {
        var _this = _super.call(this, ngRedux, configs, model) || this;
        _this.ngRedux = ngRedux;
        _this.configs = configs;
        _this.model = model;
        _this.by_pk_entity$ = _this.selector('by_pk_entity');
        return _this;
    }
    return ProAnalysisSelector;
}(Selector));
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
var ProSelector = /** @class */ (function (_super) {
    tslib_1.__extends(ProSelector, _super);
    function ProSelector(ngRedux) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        _this.project$ = new ProProjectSelector(_this.ngRedux, proDefinitions, 'project');
        _this.info_proj_rel$ = new ProInfoProjRelSelector(_this.ngRedux, proDefinitions, 'info_proj_rel');
        _this.dfh_class_proj_rel$ = new ProDfhClassProjRelSelector(_this.ngRedux, proDefinitions, 'dfh_class_proj_rel');
        _this.dfh_profile_proj_rel$ = new ProDfhProfileProjRelSelector(_this.ngRedux, proDefinitions, 'dfh_profile_proj_rel');
        _this.class_field_config$ = new ProClassFieldConfigSelector(_this.ngRedux, proDefinitions, 'class_field_config');
        _this.text_property$ = new ProTextPropertySelector(_this.ngRedux, proDefinitions, 'text_property');
        _this.analysis$ = new ProAnalysisSelector(_this.ngRedux, proDefinitions, 'analysis');
        return _this;
    }
    ProSelector.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ProSelector.ctorParameters = function () { return [
        { type: NgRedux }
    ]; };
    /** @nocollapse */ ProSelector.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ProSelector_Factory() { return new ProSelector(i0.ɵɵinject(i1.NgRedux)); }, token: ProSelector, providedIn: "root" });
    return ProSelector;
}(ProActions));
export { ProSelector };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL3Byby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBbUIsVUFBVSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQTJCLE1BQU0scUJBQXFCLENBQUM7QUFHcEgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQzs7O0FBTWpDO0lBQ0Usa0JBQ1MsT0FBMkIsRUFDM0IsT0FBZ0MsRUFDaEMsS0FBYTtRQUZiLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7SUFDbEIsQ0FBQzs7Ozs7O0lBRUwsMkJBQVE7Ozs7O0lBQVIsVUFBWSxRQUFnQjtRQUE1QixpQkFXQzs7WUFUTyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7WUFFcEUsR0FBRzs7OztRQUFHLFVBQUMsQ0FBK0I7O2dCQUNwQyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQyxJQUFxQixJQUFLLE9BQUEsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFkLENBQWMsRUFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFBQyxDQUFDO1lBRWxHLE9BQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUksQ0FBQyxP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QUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUMxRyxvQkFBYyxHQUFHLElBQUksdUJBQXVCLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDNUYsZUFBUyxHQUFHLElBQUksbUJBQW1CLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7O0lBSTlFLENBQUM7O2dCQWZGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBcEhRLE9BQU87OztzQkFBaEI7Q0FrSUMsQUFoQkQsQ0FHaUMsVUFBVSxHQWExQztTQWJZLFdBQVc7OztJQUV0QiwrQkFBMkU7O0lBQzNFLHFDQUEyRjs7SUFDM0YsMENBQXlHOztJQUN6Ryw0Q0FBK0c7O0lBQy9HLDBDQUEwRzs7SUFDMUcscUNBQTRGOztJQUM1RixnQ0FBOEU7O0lBRWxFLDhCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCeVBrLCBJQXBwU3RhdGUsIFByb0FjdGlvbnMsIHByb0RlZmluaXRpb25zLCBwcm9Sb290LCBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgUHJvRGZoQ2xhc3NQcm9qUmVsLCBQcm9EZmhQcm9maWxlUHJvalJlbCwgUHJvSW5mb1Byb2pSZWwsIFByb1RleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBQcm9BbmFseXNpcywgUHJvQ2xhc3NGaWVsZENvbmZpZywgUHJvUHJvamVjdCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyB0b1N0cmluZyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG5cblxuY2xhc3MgU2VsZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgfVxuXG4gIHNlbGVjdG9yPE0+KGluZGV4S2V5OiBzdHJpbmcpOiB7IGFsbCQ6IE9ic2VydmFibGU8QnlQazxNPj4sIGtleTogKHg6IHN0cmluZyB8IChzdHJpbmcgfCBudW1iZXIpW10pID0+IE9ic2VydmFibGU8TT4gfSB7XG5cbiAgICBjb25zdCBhbGwkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxCeVBrPE0+PihbcHJvUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXldKVxuXG4gICAgY29uc3Qga2V5ID0gKHg6IHN0cmluZyB8IChzdHJpbmcgfCBudW1iZXIpW10pOiBPYnNlcnZhYmxlPE0+ID0+IHtcbiAgICAgIGNvbnN0IGsgPSB0eXBlb2YgeCA9PT0gJ3N0cmluZycgPyB4IDogeC5tYXAoKHBhcnQ6IHN0cmluZyB8IG51bWJlcikgPT4gdG9TdHJpbmcocGFydCkpLmpvaW4oJ18nKTs7XG5cbiAgICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFtwcm9Sb290LCB0aGlzLm1vZGVsLCBpbmRleEtleSwga10pXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYWxsJCwga2V5IH1cbiAgfVxufVxuXG5jbGFzcyBQcm9Qcm9qZWN0U2VsZWN0b3IgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxQcm9Qcm9qZWN0PignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuXG5jbGFzcyBQcm9JbmZvUHJvalJlbFNlbGVjdG9yIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8UHJvSW5mb1Byb2pSZWw+KCdieV9ma19wcm9qZWN0X19ma19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5cbmNsYXNzIFByb0RmaENsYXNzUHJvalJlbFNlbGVjdG9yIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfZmtfcHJvamVjdF9fZW5hYmxlZF9pbl9lbnRpdGllcyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8UHJvRGZoQ2xhc3NQcm9qUmVsPj4oJ2J5X2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXMnKVxuICBwdWJsaWMgYnlfZmtfcHJvamVjdF9fZmtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxQcm9EZmhDbGFzc1Byb2pSZWw+KCdieV9ma19wcm9qZWN0X19ma19jbGFzcycpXG4gIHB1YmxpYyBieV9ma19wcm9qZWN0JCA9IHRoaXMuc2VsZWN0b3I8UHJvRGZoQ2xhc3NQcm9qUmVsPignYnlfZmtfcHJvamVjdCcpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIFByb0RmaFByb2ZpbGVQcm9qUmVsU2VsZWN0b3IgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9ma19wcm9qZWN0X19lbmFibGVkJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxQcm9EZmhQcm9maWxlUHJvalJlbD4+KCdieV9ma19wcm9qZWN0X19lbmFibGVkJylcbiAgcHVibGljIGJ5X2ZrX3Byb2plY3RfX2ZrX3Byb2ZpbGUkID0gdGhpcy5zZWxlY3RvcjxQcm9EZmhQcm9maWxlUHJvalJlbD4oJ2J5X2ZrX3Byb2plY3RfX2ZrX3Byb2ZpbGUnKVxuICBwdWJsaWMgYnlfZmtfcHJvamVjdCQgPSB0aGlzLnNlbGVjdG9yPFByb0RmaFByb2ZpbGVQcm9qUmVsPignYnlfZmtfcHJvamVjdCcpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbmNsYXNzIFByb0NsYXNzRmllbGRDb25maWdTZWxlY3RvciBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxQcm9DbGFzc0ZpZWxkQ29uZmlnPj4oJ2J5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJylcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPFByb0NsYXNzRmllbGRDb25maWc+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5cbmNsYXNzIFByb1RleHRQcm9wZXJ0eVNlbGVjdG9yIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfZmtzJCA9IHRoaXMuc2VsZWN0b3I8UHJvVGV4dFByb3BlcnR5PignYnlfZmtzJylcbiAgcHVibGljIGJ5X2Zrc193aXRob3V0X2xhbmckID0gdGhpcy5zZWxlY3RvcjxCeVBrPFByb1RleHRQcm9wZXJ0eT4+KCdieV9ma3Nfd2l0aG91dF9sYW5nJylcbiAgLy8gcHVibGljIGZrX3Byb2plY3RfX2ZrX2RmaF9wcm9wZXJ0eV9fZmtfZGZoX3Byb3BlcnR5X2RvbWFpbl9fZmtfc3lzdGVtX3R5cGVfX2ZrX2xhbmd1YWdlJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxQcm9UZXh0UHJvcGVydHk+PignZmtfcHJvamVjdF9fZmtfZGZoX3Byb3BlcnR5X19ma19kZmhfcHJvcGVydHlfZG9tYWluX19ma19zeXN0ZW1fdHlwZV9fZmtfbGFuZ3VhZ2UnKVxuICAvLyBwdWJsaWMgZmtfcHJvamVjdF9fZmtfZGZoX3Byb3BlcnR5X19ma19kZmhfcHJvcGVydHlfcmFuZ2VfX2ZrX3N5c3RlbV90eXBlX19ma19sYW5ndWFnZSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8UHJvVGV4dFByb3BlcnR5Pj4oJ2ZrX3Byb2plY3RfX2ZrX2RmaF9wcm9wZXJ0eV9fZmtfZGZoX3Byb3BlcnR5X3JhbmdlX19ma19zeXN0ZW1fdHlwZV9fZmtfbGFuZ3VhZ2UnKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5cbmNsYXNzIFByb0FuYWx5c2lzU2VsZWN0b3IgZXh0ZW5kcyBTZWxlY3RvciB7XG5cbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPFByb0FuYWx5c2lzPignYnlfcGtfZW50aXR5JylcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFByb1NlbGVjdG9yIGV4dGVuZHMgUHJvQWN0aW9ucyB7XG5cbiAgcHJvamVjdCQgPSBuZXcgUHJvUHJvamVjdFNlbGVjdG9yKHRoaXMubmdSZWR1eCwgcHJvRGVmaW5pdGlvbnMsICdwcm9qZWN0Jyk7XG4gIGluZm9fcHJval9yZWwkID0gbmV3IFByb0luZm9Qcm9qUmVsU2VsZWN0b3IodGhpcy5uZ1JlZHV4LCBwcm9EZWZpbml0aW9ucywgJ2luZm9fcHJval9yZWwnKTtcbiAgZGZoX2NsYXNzX3Byb2pfcmVsJCA9IG5ldyBQcm9EZmhDbGFzc1Byb2pSZWxTZWxlY3Rvcih0aGlzLm5nUmVkdXgsIHByb0RlZmluaXRpb25zLCAnZGZoX2NsYXNzX3Byb2pfcmVsJyk7XG4gIGRmaF9wcm9maWxlX3Byb2pfcmVsJCA9IG5ldyBQcm9EZmhQcm9maWxlUHJvalJlbFNlbGVjdG9yKHRoaXMubmdSZWR1eCwgcHJvRGVmaW5pdGlvbnMsICdkZmhfcHJvZmlsZV9wcm9qX3JlbCcpO1xuICBjbGFzc19maWVsZF9jb25maWckID0gbmV3IFByb0NsYXNzRmllbGRDb25maWdTZWxlY3Rvcih0aGlzLm5nUmVkdXgsIHByb0RlZmluaXRpb25zLCAnY2xhc3NfZmllbGRfY29uZmlnJyk7XG4gIHRleHRfcHJvcGVydHkkID0gbmV3IFByb1RleHRQcm9wZXJ0eVNlbGVjdG9yKHRoaXMubmdSZWR1eCwgcHJvRGVmaW5pdGlvbnMsICd0ZXh0X3Byb3BlcnR5Jyk7XG4gIGFuYWx5c2lzJCA9IG5ldyBQcm9BbmFseXNpc1NlbGVjdG9yKHRoaXMubmdSZWR1eCwgcHJvRGVmaW5pdGlvbnMsICdhbmFseXNpcycpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHtcbiAgICBzdXBlcihuZ1JlZHV4KVxuICB9XG59XG4iXX0=