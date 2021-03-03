/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/dfh.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvZGZoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFRLFVBQVUsRUFBaUIsY0FBYyxFQUFvRCxPQUFPLEVBQXNDLE1BQU0scUJBQXFCLENBQUM7QUFFckwsT0FBTyxFQUFFLEtBQUssRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7Ozs7QUFDdEU7Ozs7SUFJRSxrQkFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhLEVBQ2IsWUFBaUM7UUFIakMsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQU4xQyxXQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFRMUQsQ0FBQzs7Ozs7O0lBRUQsMkJBQVE7Ozs7O0lBQVIsVUFBWSxRQUFnQjtRQUE1QixpQkFtQkM7O1lBakJPLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztZQUMzRSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJ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SUFDeEcsNkJBQStGOztJQUc3Riw4QkFBa0M7O0lBQ2xDLDRCQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCeVBrLCBEZmhBY3Rpb25zLCBEZmhDbGFzc1NsaWNlLCBkZmhEZWZpbml0aW9ucywgRGZoTGFiZWxTbGljZSwgRGZoUHJvZmlsZVNsaWNlLCBEZmhQcm9wZXJ0eVNsaWNlLCBkZmhSb290LCBJQXBwU3RhdGUsIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBEZmhDbGFzcywgRGZoTGFiZWwsIERmaFByb2ZpbGUsIERmaFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGVtcHR5LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTaG91bGRQYXVzZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaG91bGQtcGF1c2Uuc2VydmljZSc7XG5jbGFzcyBTZWxlY3RvcjxTbGljZT4ge1xuXG4gIHNsaWNlJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8U2xpY2U+KFtkZmhSb290LCB0aGlzLm1vZGVsXSlcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZyxcbiAgICBwdWJsaWMgc2hvdWxkUGF1c2UkOiBPYnNlcnZhYmxlPGJvb2xlYW4+XG4gICkge1xuICB9XG5cbiAgc2VsZWN0b3I8TT4oaW5kZXhLZXk6IHN0cmluZyk6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeCkgPT4gT2JzZXJ2YWJsZTxNPiwgbm9QYXVzZTogeyBhbGwkOiBPYnNlcnZhYmxlPEJ5UGs8TT4+LCBrZXk6ICh4KSA9PiBPYnNlcnZhYmxlPE0+IH0gfSB7XG5cbiAgICBjb25zdCBhbGxOb1BhdXNlJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8QnlQazxNPj4oW2RmaFJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5XSk7XG4gICAgY29uc3QgYWxsJCA9IHRoaXMuc2hvdWxkUGF1c2UkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoc2hvdWxkUGF1c2UgPT4gc2hvdWxkUGF1c2UgP1xuICAgICAgICBlbXB0eSgpIDpcbiAgICAgICAgYWxsTm9QYXVzZSRcbiAgICAgIClcbiAgICApO1xuXG4gICAgY29uc3Qga2V5Tm9QYXVzZSA9ICh4KSA9PiB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFtkZmhSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleSwgeF0pO1xuICAgIGNvbnN0IGtleSA9ICh4KTogT2JzZXJ2YWJsZTxNPiA9PiB0aGlzLnNob3VsZFBhdXNlJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHNob3VsZFBhdXNlID0+IHNob3VsZFBhdXNlID9cbiAgICAgICAgZW1wdHkoKSA6XG4gICAgICAgIHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oW2RmaFJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5LCB4XSlcbiAgICAgIClcbiAgICApXG5cbiAgICByZXR1cm4geyBhbGwkLCBrZXksIG5vUGF1c2U6IHsgYWxsJDogYWxsTm9QYXVzZSQsIGtleToga2V5Tm9QYXVzZSB9IH1cbiAgfVxufVxuLy8gUHJvZmlsZSBTZWxlY3RvcnNcbmNsYXNzIERmaFByb2ZpbGVTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3I8RGZoUHJvZmlsZVNsaWNlPiB7XG4gIHB1YmxpYyBieV9wa19wcm9maWxlJCA9IHRoaXMuc2VsZWN0b3I8RGZoUHJvZmlsZT4oJ2J5X3BrX3Byb2ZpbGUnKTtcbn1cblxuLy8gQ2xhc3MgU2VsZWN0b3JzXG5jbGFzcyBEZmhDbGFzc1NlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvcjxEZmhDbGFzc1NsaWNlPiB7XG4gIHB1YmxpYyBieV9wa19jbGFzcyQgPSB0aGlzLnNlbGVjdG9yPERmaENsYXNzPignYnlfcGtfY2xhc3MnKTtcbiAgcHVibGljIGJ5X2Jhc2ljX3R5cGUkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERmaENsYXNzPj4oJ2J5X2Jhc2ljX3R5cGUnKTtcbn1cblxuLy8gUHJvcGVydHkgU2VsZWN0b3JzXG5jbGFzcyBEZmhQcm9wZXJ0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvcjxEZmhQcm9wZXJ0eVNsaWNlPiB7XG4gIHB1YmxpYyBwa19wcm9wZXJ0eV9faGFzX2RvbWFpbl9faGFzX3JhbmdlJCA9IHRoaXMuc2VsZWN0b3I8RGZoUHJvcGVydHk+KCdieV9wa19wcm9wZXJ0eV9faGFzX2RvbWFpbl9faGFzX3JhbmdlJyk7XG4gIHB1YmxpYyBieV9wa19wcm9wZXJ0eSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoUHJvcGVydHk+PignYnlfcGtfcHJvcGVydHknKTtcbiAgLy8gcHVibGljIGJ5X2hhc19kb21haW5fX3BrX3Byb3BlcnR5JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhQcm9wZXJ0eT4+KCdieV9oYXNfZG9tYWluX19ma19wcm9wZXJ0eScpO1xuICAvLyBwdWJsaWMgYnlfaGFzX3JhbmdlX19wa19wcm9wZXJ0eSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoUHJvcGVydHk+PignYnlfaGFzX3JhbmdlX19ma19wcm9wZXJ0eScpO1xuICBwdWJsaWMgYnlfaGFzX2RvbWFpbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoUHJvcGVydHk+PignYnlfaGFzX2RvbWFpbicpO1xuICBwdWJsaWMgYnlfaGFzX3JhbmdlJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhQcm9wZXJ0eT4+KCdieV9oYXNfcmFuZ2UnKTtcbiAgcHVibGljIGJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhQcm9wZXJ0eT4+KCdieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eScpO1xufVxuXG4vLyBMYWJlbCBTZWxlY3RvcnNcbmNsYXNzIERmaExhYmVsU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yPERmaExhYmVsU2xpY2U+IHtcbiAgcHVibGljIGJ5X2ZrcyQgPSB0aGlzLnNlbGVjdG9yPERmaExhYmVsPignYnlfZmtzJyk7XG4gIHB1YmxpYyBieV9ma19jbGFzc19fdHlwZSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoTGFiZWw+PignYnlfZmtfY2xhc3NfX3R5cGUnKTtcbiAgcHVibGljIGJ5X2ZrX3Byb3BlcnR5X190eXBlJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhMYWJlbD4+KCdieV9ma19wcm9wZXJ0eV9fdHlwZScpO1xuICBwdWJsaWMgYnlfZmtfcHJvZmlsZV9fdHlwZSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoTGFiZWw+PignYnlfZmtfcHJvZmlsZV9fdHlwZScpO1xufVxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERmaFNlbGVjdG9yIGV4dGVuZHMgRGZoQWN0aW9ucyB7XG5cbiAgcHJvZmlsZSQgPSBuZXcgRGZoUHJvZmlsZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBkZmhEZWZpbml0aW9ucywgJ3Byb2ZpbGUnLCB0aGlzLnBhdXNlLnNob3VsZFBhdXNlJClcbiAgY2xhc3MkID0gbmV3IERmaENsYXNzU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRmaERlZmluaXRpb25zLCAna2xhc3MnLCB0aGlzLnBhdXNlLnNob3VsZFBhdXNlJClcbiAgcHJvcGVydHkkID0gbmV3IERmaFByb3BlcnR5U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRmaERlZmluaXRpb25zLCAncHJvcGVydHknLCB0aGlzLnBhdXNlLnNob3VsZFBhdXNlJClcbiAgbGFiZWwkID0gbmV3IERmaExhYmVsU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRmaERlZmluaXRpb25zLCAnbGFiZWwnLCB0aGlzLnBhdXNlLnNob3VsZFBhdXNlJClcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwYXVzZTogU2hvdWxkUGF1c2VTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKG5nUmVkdXgpXG4gIH1cbn1cbiJdfQ==