/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/pro.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvcHJvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFtQixVQUFVLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBMkIsTUFBTSxxQkFBcUIsQ0FBQztBQUdwSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDOzs7QUFNakM7SUFDRSxrQkFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBRmIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUNsQixDQUFDOzs7Ozs7SUFFTCwyQkFBUTs7Ozs7SUFBUixVQUFZLFFBQWdCO1FBQTVCLGlCQVdDOztZQVRPLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztZQUVwRSxHQUFHOzs7O1FBQUcsVUFBQyxDQUErQjs7Z0JBQ3BDLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFDLElBQXFCLElBQUssT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQWQsQ0FBYyxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUFDLENBQUM7WUFFbEcsT0FBTyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBSSxDQUFDLE9BQU8s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QUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFHLG9CQUFjLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUM1RixlQUFTLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQzs7SUFJOUUsQ0FBQzs7Z0JBZkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFwSFEsT0FBTzs7O3NCQUFoQjtDQWtJQyxBQWhCRCxDQUdpQyxVQUFVLEdBYTFDO1NBYlksV0FBVzs7O0lBRXRCLCtCQUEyRTs7SUFDM0UscUNBQTJGOztJQUMzRiwwQ0FBeUc7O0lBQ3pHLDRDQUErRzs7SUFDL0csMENBQTBHOztJQUMxRyxxQ0FBNEY7O0lBQzVGLGdDQUE4RTs7SUFFbEUsOEJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ5UGssIElBcHBTdGF0ZSwgUHJvQWN0aW9ucywgcHJvRGVmaW5pdGlvbnMsIHByb1Jvb3QsIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBQcm9EZmhDbGFzc1Byb2pSZWwsIFByb0RmaFByb2ZpbGVQcm9qUmVsLCBQcm9JbmZvUHJvalJlbCwgUHJvVGV4dFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IFByb0FuYWx5c2lzLCBQcm9DbGFzc0ZpZWxkQ29uZmlnLCBQcm9Qcm9qZWN0IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IHRvU3RyaW5nIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5cblxuXG5jbGFzcyBTZWxlY3RvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyB9XG5cbiAgc2VsZWN0b3I8TT4oaW5kZXhLZXk6IHN0cmluZyk6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeDogc3RyaW5nIHwgKHN0cmluZyB8IG51bWJlcilbXSkgPT4gT2JzZXJ2YWJsZTxNPiB9IHtcblxuICAgIGNvbnN0IGFsbCQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PEJ5UGs8TT4+KFtwcm9Sb290LCB0aGlzLm1vZGVsLCBpbmRleEtleV0pXG5cbiAgICBjb25zdCBrZXkgPSAoeDogc3RyaW5nIHwgKHN0cmluZyB8IG51bWJlcilbXSk6IE9ic2VydmFibGU8TT4gPT4ge1xuICAgICAgY29uc3QgayA9IHR5cGVvZiB4ID09PSAnc3RyaW5nJyA/IHggOiB4Lm1hcCgocGFydDogc3RyaW5nIHwgbnVtYmVyKSA9PiB0b1N0cmluZyhwYXJ0KSkuam9pbignXycpOztcblxuICAgICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oW3Byb1Jvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5LCBrXSlcbiAgICB9XG5cbiAgICByZXR1cm4geyBhbGwkLCBrZXkgfVxuICB9XG59XG5cbmNsYXNzIFByb1Byb2plY3RTZWxlY3RvciBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X3BrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPFByb1Byb2plY3Q+KCdieV9wa19lbnRpdHknKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5cbmNsYXNzIFByb0luZm9Qcm9qUmVsU2VsZWN0b3IgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9ma19wcm9qZWN0X19ma19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxQcm9JbmZvUHJvalJlbD4oJ2J5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cblxuY2xhc3MgUHJvRGZoQ2xhc3NQcm9qUmVsU2VsZWN0b3IgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9ma19wcm9qZWN0X19lbmFibGVkX2luX2VudGl0aWVzJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxQcm9EZmhDbGFzc1Byb2pSZWw+PignYnlfZmtfcHJvamVjdF9fZW5hYmxlZF9pbl9lbnRpdGllcycpXG4gIHB1YmxpYyBieV9ma19wcm9qZWN0X19ma19jbGFzcyQgPSB0aGlzLnNlbGVjdG9yPFByb0RmaENsYXNzUHJvalJlbD4oJ2J5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJylcbiAgcHVibGljIGJ5X2ZrX3Byb2plY3QkID0gdGhpcy5zZWxlY3RvcjxQcm9EZmhDbGFzc1Byb2pSZWw+KCdieV9ma19wcm9qZWN0JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgUHJvRGZoUHJvZmlsZVByb2pSZWxTZWxlY3RvciBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X2ZrX3Byb2plY3RfX2VuYWJsZWQkID0gdGhpcy5zZWxlY3RvcjxCeVBrPFByb0RmaFByb2ZpbGVQcm9qUmVsPj4oJ2J5X2ZrX3Byb2plY3RfX2VuYWJsZWQnKVxuICBwdWJsaWMgYnlfZmtfcHJvamVjdF9fZmtfcHJvZmlsZSQgPSB0aGlzLnNlbGVjdG9yPFByb0RmaFByb2ZpbGVQcm9qUmVsPignYnlfZmtfcHJvamVjdF9fZmtfcHJvZmlsZScpXG4gIHB1YmxpYyBieV9ma19wcm9qZWN0JCA9IHRoaXMuc2VsZWN0b3I8UHJvRGZoUHJvZmlsZVByb2pSZWw+KCdieV9ma19wcm9qZWN0JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuY2xhc3MgUHJvQ2xhc3NGaWVsZENvbmZpZ1NlbGVjdG9yIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfZmtfcHJvamVjdF9fZmtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxCeVBrPFByb0NsYXNzRmllbGRDb25maWc+PignYnlfZmtfcHJvamVjdF9fZmtfY2xhc3MnKVxuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8UHJvQ2xhc3NGaWVsZENvbmZpZz4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cblxuY2xhc3MgUHJvVGV4dFByb3BlcnR5U2VsZWN0b3IgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9ma3MkID0gdGhpcy5zZWxlY3RvcjxQcm9UZXh0UHJvcGVydHk+KCdieV9ma3MnKVxuICBwdWJsaWMgYnlfZmtzX3dpdGhvdXRfbGFuZyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8UHJvVGV4dFByb3BlcnR5Pj4oJ2J5X2Zrc193aXRob3V0X2xhbmcnKVxuICAvLyBwdWJsaWMgZmtfcHJvamVjdF9fZmtfZGZoX3Byb3BlcnR5X19ma19kZmhfcHJvcGVydHlfZG9tYWluX19ma19zeXN0ZW1fdHlwZV9fZmtfbGFuZ3VhZ2UkID0gdGhpcy5zZWxlY3RvcjxCeVBrPFByb1RleHRQcm9wZXJ0eT4+KCdma19wcm9qZWN0X19ma19kZmhfcHJvcGVydHlfX2ZrX2RmaF9wcm9wZXJ0eV9kb21haW5fX2ZrX3N5c3RlbV90eXBlX19ma19sYW5ndWFnZScpXG4gIC8vIHB1YmxpYyBma19wcm9qZWN0X19ma19kZmhfcHJvcGVydHlfX2ZrX2RmaF9wcm9wZXJ0eV9yYW5nZV9fZmtfc3lzdGVtX3R5cGVfX2ZrX2xhbmd1YWdlJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxQcm9UZXh0UHJvcGVydHk+PignZmtfcHJvamVjdF9fZmtfZGZoX3Byb3BlcnR5X19ma19kZmhfcHJvcGVydHlfcmFuZ2VfX2ZrX3N5c3RlbV90eXBlX19ma19sYW5ndWFnZScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cblxuY2xhc3MgUHJvQW5hbHlzaXNTZWxlY3RvciBleHRlbmRzIFNlbGVjdG9yIHtcblxuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8UHJvQW5hbHlzaXM+KCdieV9wa19lbnRpdHknKVxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUHJvU2VsZWN0b3IgZXh0ZW5kcyBQcm9BY3Rpb25zIHtcblxuICBwcm9qZWN0JCA9IG5ldyBQcm9Qcm9qZWN0U2VsZWN0b3IodGhpcy5uZ1JlZHV4LCBwcm9EZWZpbml0aW9ucywgJ3Byb2plY3QnKTtcbiAgaW5mb19wcm9qX3JlbCQgPSBuZXcgUHJvSW5mb1Byb2pSZWxTZWxlY3Rvcih0aGlzLm5nUmVkdXgsIHByb0RlZmluaXRpb25zLCAnaW5mb19wcm9qX3JlbCcpO1xuICBkZmhfY2xhc3NfcHJval9yZWwkID0gbmV3IFByb0RmaENsYXNzUHJvalJlbFNlbGVjdG9yKHRoaXMubmdSZWR1eCwgcHJvRGVmaW5pdGlvbnMsICdkZmhfY2xhc3NfcHJval9yZWwnKTtcbiAgZGZoX3Byb2ZpbGVfcHJval9yZWwkID0gbmV3IFByb0RmaFByb2ZpbGVQcm9qUmVsU2VsZWN0b3IodGhpcy5uZ1JlZHV4LCBwcm9EZWZpbml0aW9ucywgJ2RmaF9wcm9maWxlX3Byb2pfcmVsJyk7XG4gIGNsYXNzX2ZpZWxkX2NvbmZpZyQgPSBuZXcgUHJvQ2xhc3NGaWVsZENvbmZpZ1NlbGVjdG9yKHRoaXMubmdSZWR1eCwgcHJvRGVmaW5pdGlvbnMsICdjbGFzc19maWVsZF9jb25maWcnKTtcbiAgdGV4dF9wcm9wZXJ0eSQgPSBuZXcgUHJvVGV4dFByb3BlcnR5U2VsZWN0b3IodGhpcy5uZ1JlZHV4LCBwcm9EZWZpbml0aW9ucywgJ3RleHRfcHJvcGVydHknKTtcbiAgYW5hbHlzaXMkID0gbmV3IFByb0FuYWx5c2lzU2VsZWN0b3IodGhpcy5uZ1JlZHV4LCBwcm9EZWZpbml0aW9ucywgJ2FuYWx5c2lzJyk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikge1xuICAgIHN1cGVyKG5nUmVkdXgpXG4gIH1cbn1cbiJdfQ==