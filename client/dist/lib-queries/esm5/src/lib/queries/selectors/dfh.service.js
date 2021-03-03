/**
 * @fileoverview added by tsickle
 * Generated from: selectors/dfh.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DfhActions, dfhDefinitions, dfhRoot } from '@kleiolab/lib-redux';
import { empty } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ShouldPauseService } from '../services/should-pause.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
import * as i2 from "../services/should-pause.service";
/**
 * @template Slice
 */
var /**
 * @template Slice
 */
Selector = /** @class */ (function () {
    function Selector(ngRedux, configs, model, shouldPause$) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.shouldPause$ = shouldPause$;
        this.slice$ = this.ngRedux.select([dfhRoot, this.model]);
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
        var allNoPause$ = this.ngRedux.select([dfhRoot, this.model, indexKey]);
        /** @type {?} */
        var all$ = this.shouldPause$.pipe(switchMap((/**
         * @param {?} shouldPause
         * @return {?}
         */
        function (shouldPause) { return shouldPause ?
            empty() :
            allNoPause$; })));
        /** @type {?} */
        var keyNoPause = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.ngRedux.select([dfhRoot, _this.model, indexKey, x]); });
        /** @type {?} */
        var key = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return _this.shouldPause$.pipe(switchMap((/**
         * @param {?} shouldPause
         * @return {?}
         */
        function (shouldPause) { return shouldPause ?
            empty() :
            _this.ngRedux.select([dfhRoot, _this.model, indexKey, x]); }))); });
        return { all$: all$, key: key, noPause: { all$: allNoPause$, key: keyNoPause } };
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
    /** @type {?} */
    Selector.prototype.shouldPause$;
}
// Profile Selectors
var 
// Profile Selectors
DfhProfileSelections = /** @class */ (function (_super) {
    tslib_1.__extends(DfhProfileSelections, _super);
    function DfhProfileSelections() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.by_pk_profile$ = _this.selector('by_pk_profile');
        return _this;
    }
    return DfhProfileSelections;
}(Selector));
if (false) {
    /** @type {?} */
    DfhProfileSelections.prototype.by_pk_profile$;
}
// Class Selectors
var 
// Class Selectors
DfhClassSelections = /** @class */ (function (_super) {
    tslib_1.__extends(DfhClassSelections, _super);
    function DfhClassSelections() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.by_pk_class$ = _this.selector('by_pk_class');
        _this.by_basic_type$ = _this.selector('by_basic_type');
        return _this;
    }
    return DfhClassSelections;
}(Selector));
if (false) {
    /** @type {?} */
    DfhClassSelections.prototype.by_pk_class$;
    /** @type {?} */
    DfhClassSelections.prototype.by_basic_type$;
}
// Property Selectors
var 
// Property Selectors
DfhPropertySelections = /** @class */ (function (_super) {
    tslib_1.__extends(DfhPropertySelections, _super);
    function DfhPropertySelections() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pk_property__has_domain__has_range$ = _this.selector('by_pk_property__has_domain__has_range');
        _this.by_pk_property$ = _this.selector('by_pk_property');
        // public by_has_domain__pk_property$ = this.selector<ByPk<DfhProperty>>('by_has_domain__fk_property');
        // public by_has_range__pk_property$ = this.selector<ByPk<DfhProperty>>('by_has_range__fk_property');
        _this.by_has_domain$ = _this.selector('by_has_domain');
        _this.by_has_range$ = _this.selector('by_has_range');
        _this.by_is_has_type_subproperty$ = _this.selector('by_is_has_type_subproperty');
        return _this;
    }
    return DfhPropertySelections;
}(Selector));
if (false) {
    /** @type {?} */
    DfhPropertySelections.prototype.pk_property__has_domain__has_range$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_pk_property$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_has_domain$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_has_range$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_is_has_type_subproperty$;
}
// Label Selectors
var 
// Label Selectors
DfhLabelSelections = /** @class */ (function (_super) {
    tslib_1.__extends(DfhLabelSelections, _super);
    function DfhLabelSelections() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.by_fks$ = _this.selector('by_fks');
        _this.by_fk_class__type$ = _this.selector('by_fk_class__type');
        _this.by_fk_property__type$ = _this.selector('by_fk_property__type');
        _this.by_fk_profile__type$ = _this.selector('by_fk_profile__type');
        return _this;
    }
    return DfhLabelSelections;
}(Selector));
if (false) {
    /** @type {?} */
    DfhLabelSelections.prototype.by_fks$;
    /** @type {?} */
    DfhLabelSelections.prototype.by_fk_class__type$;
    /** @type {?} */
    DfhLabelSelections.prototype.by_fk_property__type$;
    /** @type {?} */
    DfhLabelSelections.prototype.by_fk_profile__type$;
}
var DfhSelector = /** @class */ (function (_super) {
    tslib_1.__extends(DfhSelector, _super);
    function DfhSelector(ngRedux, pause) {
        var _this = _super.call(this, ngRedux) || this;
        _this.ngRedux = ngRedux;
        _this.pause = pause;
        _this.profile$ = new DfhProfileSelections(_this.ngRedux, dfhDefinitions, 'profile', _this.pause.shouldPause$);
        _this.class$ = new DfhClassSelections(_this.ngRedux, dfhDefinitions, 'klass', _this.pause.shouldPause$);
        _this.property$ = new DfhPropertySelections(_this.ngRedux, dfhDefinitions, 'property', _this.pause.shouldPause$);
        _this.label$ = new DfhLabelSelections(_this.ngRedux, dfhDefinitions, 'label', _this.pause.shouldPause$);
        return _this;
    }
    DfhSelector.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DfhSelector.ctorParameters = function () { return [
        { type: NgRedux },
        { type: ShouldPauseService }
    ]; };
    /** @nocollapse */ DfhSelector.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DfhSelector_Factory() { return new DfhSelector(i0.ɵɵinject(i1.NgRedux), i0.ɵɵinject(i2.ShouldPauseService)); }, token: DfhSelector, providedIn: "root" });
    return DfhSelector;
}(DfhActions));
export { DfhSelector };
if (false) {
    /** @type {?} */
    DfhSelector.prototype.profile$;
    /** @type {?} */
    DfhSelector.prototype.class$;
    /** @type {?} */
    DfhSelector.prototype.property$;
    /** @type {?} */
    DfhSelector.prototype.label$;
    /** @type {?} */
    DfhSelector.prototype.ngRedux;
    /** @type {?} */
    DfhSelector.prototype.pause;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL2RmaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBUSxVQUFVLEVBQWlCLGNBQWMsRUFBb0QsT0FBTyxFQUFzQyxNQUFNLHFCQUFxQixDQUFDO0FBRXJMLE9BQU8sRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7Ozs7O0FBQ3RFOzs7O0lBSUUsa0JBQ1MsT0FBMkIsRUFDM0IsT0FBZ0MsRUFDaEMsS0FBYSxFQUNiLFlBQWlDO1FBSGpDLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFOMUMsV0FBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBUTFELENBQUM7Ozs7OztJQUVELDJCQUFROzs7OztJQUFSLFVBQVksUUFBZ0I7UUFBNUIsaUJBbUJDOztZQWpCTyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7WUFDM0UsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMs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d0c7O0lBQ3hHLDZCQUErRjs7SUFHN0YsOEJBQWtDOztJQUNsQyw0QkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnlQaywgRGZoQWN0aW9ucywgRGZoQ2xhc3NTbGljZSwgZGZoRGVmaW5pdGlvbnMsIERmaExhYmVsU2xpY2UsIERmaFByb2ZpbGVTbGljZSwgRGZoUHJvcGVydHlTbGljZSwgZGZoUm9vdCwgSUFwcFN0YXRlLCBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgRGZoQ2xhc3MsIERmaExhYmVsLCBEZmhQcm9maWxlLCBEZmhQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBlbXB0eSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU2hvdWxkUGF1c2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hvdWxkLXBhdXNlLnNlcnZpY2UnO1xuY2xhc3MgU2VsZWN0b3I8U2xpY2U+IHtcblxuICBzbGljZSQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PFNsaWNlPihbZGZoUm9vdCwgdGhpcy5tb2RlbF0pXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmcsXG4gICAgcHVibGljIHNob3VsZFBhdXNlJDogT2JzZXJ2YWJsZTxib29sZWFuPlxuICApIHtcbiAgfVxuXG4gIHNlbGVjdG9yPE0+KGluZGV4S2V5OiBzdHJpbmcpOiB7IGFsbCQ6IE9ic2VydmFibGU8QnlQazxNPj4sIGtleTogKHgpID0+IE9ic2VydmFibGU8TT4sIG5vUGF1c2U6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeCkgPT4gT2JzZXJ2YWJsZTxNPiB9IH0ge1xuXG4gICAgY29uc3QgYWxsTm9QYXVzZSQgPSB0aGlzLm5nUmVkdXguc2VsZWN0PEJ5UGs8TT4+KFtkZmhSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleV0pO1xuICAgIGNvbnN0IGFsbCQgPSB0aGlzLnNob3VsZFBhdXNlJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHNob3VsZFBhdXNlID0+IHNob3VsZFBhdXNlID9cbiAgICAgICAgZW1wdHkoKSA6XG4gICAgICAgIGFsbE5vUGF1c2UkXG4gICAgICApXG4gICAgKTtcblxuICAgIGNvbnN0IGtleU5vUGF1c2UgPSAoeCkgPT4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxNPihbZGZoUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXksIHhdKTtcbiAgICBjb25zdCBrZXkgPSAoeCk6IE9ic2VydmFibGU8TT4gPT4gdGhpcy5zaG91bGRQYXVzZSQucGlwZShcbiAgICAgIHN3aXRjaE1hcChzaG91bGRQYXVzZSA9PiBzaG91bGRQYXVzZSA/XG4gICAgICAgIGVtcHR5KCkgOlxuICAgICAgICB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFtkZmhSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleSwgeF0pXG4gICAgICApXG4gICAgKVxuXG4gICAgcmV0dXJuIHsgYWxsJCwga2V5LCBub1BhdXNlOiB7IGFsbCQ6IGFsbE5vUGF1c2UkLCBrZXk6IGtleU5vUGF1c2UgfSB9XG4gIH1cbn1cbi8vIFByb2ZpbGUgU2VsZWN0b3JzXG5jbGFzcyBEZmhQcm9maWxlU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yPERmaFByb2ZpbGVTbGljZT4ge1xuICBwdWJsaWMgYnlfcGtfcHJvZmlsZSQgPSB0aGlzLnNlbGVjdG9yPERmaFByb2ZpbGU+KCdieV9wa19wcm9maWxlJyk7XG59XG5cbi8vIENsYXNzIFNlbGVjdG9yc1xuY2xhc3MgRGZoQ2xhc3NTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3I8RGZoQ2xhc3NTbGljZT4ge1xuICBwdWJsaWMgYnlfcGtfY2xhc3MkID0gdGhpcy5zZWxlY3RvcjxEZmhDbGFzcz4oJ2J5X3BrX2NsYXNzJyk7XG4gIHB1YmxpYyBieV9iYXNpY190eXBlJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhDbGFzcz4+KCdieV9iYXNpY190eXBlJyk7XG59XG5cbi8vIFByb3BlcnR5IFNlbGVjdG9yc1xuY2xhc3MgRGZoUHJvcGVydHlTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3I8RGZoUHJvcGVydHlTbGljZT4ge1xuICBwdWJsaWMgcGtfcHJvcGVydHlfX2hhc19kb21haW5fX2hhc19yYW5nZSQgPSB0aGlzLnNlbGVjdG9yPERmaFByb3BlcnR5PignYnlfcGtfcHJvcGVydHlfX2hhc19kb21haW5fX2hhc19yYW5nZScpO1xuICBwdWJsaWMgYnlfcGtfcHJvcGVydHkkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERmaFByb3BlcnR5Pj4oJ2J5X3BrX3Byb3BlcnR5Jyk7XG4gIC8vIHB1YmxpYyBieV9oYXNfZG9tYWluX19wa19wcm9wZXJ0eSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoUHJvcGVydHk+PignYnlfaGFzX2RvbWFpbl9fZmtfcHJvcGVydHknKTtcbiAgLy8gcHVibGljIGJ5X2hhc19yYW5nZV9fcGtfcHJvcGVydHkkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERmaFByb3BlcnR5Pj4oJ2J5X2hhc19yYW5nZV9fZmtfcHJvcGVydHknKTtcbiAgcHVibGljIGJ5X2hhc19kb21haW4kID0gdGhpcy5zZWxlY3RvcjxCeVBrPERmaFByb3BlcnR5Pj4oJ2J5X2hhc19kb21haW4nKTtcbiAgcHVibGljIGJ5X2hhc19yYW5nZSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoUHJvcGVydHk+PignYnlfaGFzX3JhbmdlJyk7XG4gIHB1YmxpYyBieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoUHJvcGVydHk+PignYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHknKTtcbn1cblxuLy8gTGFiZWwgU2VsZWN0b3JzXG5jbGFzcyBEZmhMYWJlbFNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvcjxEZmhMYWJlbFNsaWNlPiB7XG4gIHB1YmxpYyBieV9ma3MkID0gdGhpcy5zZWxlY3RvcjxEZmhMYWJlbD4oJ2J5X2ZrcycpO1xuICBwdWJsaWMgYnlfZmtfY2xhc3NfX3R5cGUkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERmaExhYmVsPj4oJ2J5X2ZrX2NsYXNzX190eXBlJyk7XG4gIHB1YmxpYyBieV9ma19wcm9wZXJ0eV9fdHlwZSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoTGFiZWw+PignYnlfZmtfcHJvcGVydHlfX3R5cGUnKTtcbiAgcHVibGljIGJ5X2ZrX3Byb2ZpbGVfX3R5cGUkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERmaExhYmVsPj4oJ2J5X2ZrX3Byb2ZpbGVfX3R5cGUnKTtcbn1cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBEZmhTZWxlY3RvciBleHRlbmRzIERmaEFjdGlvbnMge1xuXG4gIHByb2ZpbGUkID0gbmV3IERmaFByb2ZpbGVTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgZGZoRGVmaW5pdGlvbnMsICdwcm9maWxlJywgdGhpcy5wYXVzZS5zaG91bGRQYXVzZSQpXG4gIGNsYXNzJCA9IG5ldyBEZmhDbGFzc1NlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBkZmhEZWZpbml0aW9ucywgJ2tsYXNzJywgdGhpcy5wYXVzZS5zaG91bGRQYXVzZSQpXG4gIHByb3BlcnR5JCA9IG5ldyBEZmhQcm9wZXJ0eVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBkZmhEZWZpbml0aW9ucywgJ3Byb3BlcnR5JywgdGhpcy5wYXVzZS5zaG91bGRQYXVzZSQpXG4gIGxhYmVsJCA9IG5ldyBEZmhMYWJlbFNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBkZmhEZWZpbml0aW9ucywgJ2xhYmVsJywgdGhpcy5wYXVzZS5zaG91bGRQYXVzZSQpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgcGF1c2U6IFNob3VsZFBhdXNlU2VydmljZVxuICApIHtcbiAgICBzdXBlcihuZ1JlZHV4KVxuICB9XG59XG4iXX0=