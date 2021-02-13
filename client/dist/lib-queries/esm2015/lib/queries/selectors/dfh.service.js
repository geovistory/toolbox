/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/dfh.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { empty } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DfhActions } from '@kleiolab/lib-redux';
import { dfhDefinitions, dfhRoot } from '@kleiolab/lib-redux';
import { ShouldPauseService } from '../services/should-pause.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
import * as i2 from "../services/should-pause.service";
/**
 * @template Slice
 */
class Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     * @param {?} shouldPause$
     */
    constructor(ngRedux, configs, model, shouldPause$) {
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
    selector(indexKey) {
        /** @type {?} */
        const allNoPause$ = this.ngRedux.select([dfhRoot, this.model, indexKey]);
        /** @type {?} */
        const all$ = this.shouldPause$.pipe(switchMap((/**
         * @param {?} shouldPause
         * @return {?}
         */
        shouldPause => shouldPause ?
            empty() :
            allNoPause$)));
        /** @type {?} */
        const keyNoPause = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => this.ngRedux.select([dfhRoot, this.model, indexKey, x]));
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => this.shouldPause$.pipe(switchMap((/**
         * @param {?} shouldPause
         * @return {?}
         */
        shouldPause => shouldPause ?
            empty() :
            this.ngRedux.select([dfhRoot, this.model, indexKey, x])))));
        return { all$, key, noPause: { all$: allNoPause$, key: keyNoPause } };
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
    /** @type {?} */
    Selector.prototype.shouldPause$;
}
// Profile Selectors
class DfhProfileSelections extends Selector {
    constructor() {
        super(...arguments);
        this.by_pk_profile$ = this.selector('by_pk_profile');
    }
}
if (false) {
    /** @type {?} */
    DfhProfileSelections.prototype.by_pk_profile$;
}
// Class Selectors
class DfhClassSelections extends Selector {
    constructor() {
        super(...arguments);
        this.by_pk_class$ = this.selector('by_pk_class');
        this.by_basic_type$ = this.selector('by_basic_type');
    }
}
if (false) {
    /** @type {?} */
    DfhClassSelections.prototype.by_pk_class$;
    /** @type {?} */
    DfhClassSelections.prototype.by_basic_type$;
}
// Property Selectors
class DfhPropertySelections extends Selector {
    constructor() {
        super(...arguments);
        this.pk_property__has_domain__has_range$ = this.selector('pk_property__has_domain__has_range');
        this.by_pk_property$ = this.selector('by_pk_property');
        this.by_has_domain__pk_property$ = this.selector('by_has_domain__pk_property');
        this.by_has_range__pk_property$ = this.selector('by_has_range__pk_property');
        this.by_has_domain$ = this.selector('by_has_domain');
        this.by_has_range$ = this.selector('by_has_range');
        this.by_is_has_type_subproperty$ = this.selector('by_is_has_type_subproperty');
    }
}
if (false) {
    /** @type {?} */
    DfhPropertySelections.prototype.pk_property__has_domain__has_range$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_pk_property$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_has_domain__pk_property$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_has_range__pk_property$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_has_domain$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_has_range$;
    /** @type {?} */
    DfhPropertySelections.prototype.by_is_has_type_subproperty$;
}
// Label Selectors
class DfhLabelSelections extends Selector {
    constructor() {
        super(...arguments);
        this.by_fks$ = this.selector('by_fks');
        this.by_fk_class__type$ = this.selector('by_fk_class__type');
        this.by_fk_property__type$ = this.selector('by_fk_property__type');
        this.by_fk_profile__type$ = this.selector('by_fk_profile__type');
    }
}
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
export class DfhSelector extends DfhActions {
    /**
     * @param {?} ngRedux
     * @param {?} pause
     */
    constructor(ngRedux, pause) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.pause = pause;
        this.profile$ = new DfhProfileSelections(this.ngRedux, dfhDefinitions, 'profile', this.pause.shouldPause$);
        this.class$ = new DfhClassSelections(this.ngRedux, dfhDefinitions, 'klass', this.pause.shouldPause$);
        this.property$ = new DfhPropertySelections(this.ngRedux, dfhDefinitions, 'property', this.pause.shouldPause$);
        this.label$ = new DfhLabelSelections(this.ngRedux, dfhDefinitions, 'label', this.pause.shouldPause$);
    }
}
DfhSelector.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DfhSelector.ctorParameters = () => [
    { type: NgRedux },
    { type: ShouldPauseService }
];
/** @nocollapse */ DfhSelector.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DfhSelector_Factory() { return new DfhSelector(i0.ɵɵinject(i1.NgRedux), i0.ɵɵinject(i2.ShouldPauseService)); }, token: DfhSelector, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvZGZoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU0zQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7OztBQUN0RSxNQUFNLFFBQVE7Ozs7Ozs7SUFJWixZQUNTLE9BQTJCLEVBQzNCLE9BQWdDLEVBQ2hDLEtBQWEsRUFDYixZQUFpQztRQUhqQyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBTjFDLFdBQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQVExRCxDQUFDOzs7Ozs7SUFFRCxRQUFRLENBQUksUUFBZ0I7O2NBRXBCLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztjQUMzRSxJQUFJLEdBQUcsSUFBSSxD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QUFDO0lBQ3JGLENBQUM7Q0FBQTs7O0lBSkMscUNBQW1EOztJQUNuRCxnREFBK0U7O0lBQy9FLG1EQUFxRjs7SUFDckYsa0RBQW1GOztBQU9yRixNQUFNLE9BQU8sV0FBWSxTQUFRLFVBQVU7Ozs7O0lBT3pDLFlBQ1MsT0FBMkIsRUFDM0IsS0FBeUI7UUFFaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBSFAsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFQbEMsYUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDckcsV0FBTSxHQUFHLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDL0YsY0FBUyxHQUFHLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDeEcsV0FBTSxHQUFHLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUE7SUFPL0YsQ0FBQzs7O1lBZkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBakZRLE9BQU87WUFjUCxrQkFBa0I7Ozs7O0lBc0V6QiwrQkFBcUc7O0lBQ3JHLDZCQUErRjs7SUFDL0YsZ0NBQXdHOztJQUN4Ryw2QkFBK0Y7O0lBRzdGLDhCQUFrQzs7SUFDbEMsNEJBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgQnlQayB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgZW1wdHksIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERmaFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IERmaFByb2ZpbGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgRGZoTGFiZWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgRGZoQ2xhc3MgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IERmaEFjdGlvbnMgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IGRmaERlZmluaXRpb25zLCBkZmhSb290IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBEZmhDbGFzc1NsaWNlLCBEZmhMYWJlbFNsaWNlLCBEZmhQcm9maWxlU2xpY2UsIERmaFByb3BlcnR5U2xpY2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IFNob3VsZFBhdXNlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3Nob3VsZC1wYXVzZS5zZXJ2aWNlJztcbmNsYXNzIFNlbGVjdG9yPFNsaWNlPiB7XG5cbiAgc2xpY2UkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxTbGljZT4oW2RmaFJvb3QsIHRoaXMubW9kZWxdKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nLFxuICAgIHB1YmxpYyBzaG91bGRQYXVzZSQ6IE9ic2VydmFibGU8Ym9vbGVhbj5cbiAgKSB7XG4gIH1cblxuICBzZWxlY3RvcjxNPihpbmRleEtleTogc3RyaW5nKTogeyBhbGwkOiBPYnNlcnZhYmxlPEJ5UGs8TT4+LCBrZXk6ICh4KSA9PiBPYnNlcnZhYmxlPE0+LCBub1BhdXNlOiB7IGFsbCQ6IE9ic2VydmFibGU8QnlQazxNPj4sIGtleTogKHgpID0+IE9ic2VydmFibGU8TT4gfSB9IHtcblxuICAgIGNvbnN0IGFsbE5vUGF1c2UkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxCeVBrPE0+PihbZGZoUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXldKTtcbiAgICBjb25zdCBhbGwkID0gdGhpcy5zaG91bGRQYXVzZSQucGlwZShcbiAgICAgIHN3aXRjaE1hcChzaG91bGRQYXVzZSA9PiBzaG91bGRQYXVzZSA/XG4gICAgICAgIGVtcHR5KCkgOlxuICAgICAgICBhbGxOb1BhdXNlJFxuICAgICAgKVxuICAgICk7XG5cbiAgICBjb25zdCBrZXlOb1BhdXNlID0gKHgpID0+IHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oW2RmaFJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5LCB4XSk7XG4gICAgY29uc3Qga2V5ID0gKHgpOiBPYnNlcnZhYmxlPE0+ID0+IHRoaXMuc2hvdWxkUGF1c2UkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoc2hvdWxkUGF1c2UgPT4gc2hvdWxkUGF1c2UgP1xuICAgICAgICBlbXB0eSgpIDpcbiAgICAgICAgdGhpcy5uZ1JlZHV4LnNlbGVjdDxNPihbZGZoUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXksIHhdKVxuICAgICAgKVxuICAgIClcblxuICAgIHJldHVybiB7IGFsbCQsIGtleSwgbm9QYXVzZTogeyBhbGwkOiBhbGxOb1BhdXNlJCwga2V5OiBrZXlOb1BhdXNlIH0gfVxuICB9XG59XG4vLyBQcm9maWxlIFNlbGVjdG9yc1xuY2xhc3MgRGZoUHJvZmlsZVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvcjxEZmhQcm9maWxlU2xpY2U+IHtcbiAgcHVibGljIGJ5X3BrX3Byb2ZpbGUkID0gdGhpcy5zZWxlY3RvcjxEZmhQcm9maWxlPignYnlfcGtfcHJvZmlsZScpO1xufVxuXG4vLyBDbGFzcyBTZWxlY3RvcnNcbmNsYXNzIERmaENsYXNzU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yPERmaENsYXNzU2xpY2U+IHtcbiAgcHVibGljIGJ5X3BrX2NsYXNzJCA9IHRoaXMuc2VsZWN0b3I8RGZoQ2xhc3M+KCdieV9wa19jbGFzcycpO1xuICBwdWJsaWMgYnlfYmFzaWNfdHlwZSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoQ2xhc3M+PignYnlfYmFzaWNfdHlwZScpO1xufVxuXG4vLyBQcm9wZXJ0eSBTZWxlY3RvcnNcbmNsYXNzIERmaFByb3BlcnR5U2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yPERmaFByb3BlcnR5U2xpY2U+IHtcbiAgcHVibGljIHBrX3Byb3BlcnR5X19oYXNfZG9tYWluX19oYXNfcmFuZ2UkID0gdGhpcy5zZWxlY3RvcjxEZmhQcm9wZXJ0eT4oJ3BrX3Byb3BlcnR5X19oYXNfZG9tYWluX19oYXNfcmFuZ2UnKTtcbiAgcHVibGljIGJ5X3BrX3Byb3BlcnR5JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhQcm9wZXJ0eT4+KCdieV9wa19wcm9wZXJ0eScpO1xuICBwdWJsaWMgYnlfaGFzX2RvbWFpbl9fcGtfcHJvcGVydHkkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERmaFByb3BlcnR5Pj4oJ2J5X2hhc19kb21haW5fX3BrX3Byb3BlcnR5Jyk7XG4gIHB1YmxpYyBieV9oYXNfcmFuZ2VfX3BrX3Byb3BlcnR5JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhQcm9wZXJ0eT4+KCdieV9oYXNfcmFuZ2VfX3BrX3Byb3BlcnR5Jyk7XG4gIHB1YmxpYyBieV9oYXNfZG9tYWluJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhQcm9wZXJ0eT4+KCdieV9oYXNfZG9tYWluJyk7XG4gIHB1YmxpYyBieV9oYXNfcmFuZ2UkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERmaFByb3BlcnR5Pj4oJ2J5X2hhc19yYW5nZScpO1xuICBwdWJsaWMgYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERmaFByb3BlcnR5Pj4oJ2J5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5Jyk7XG59XG5cbi8vIExhYmVsIFNlbGVjdG9yc1xuY2xhc3MgRGZoTGFiZWxTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3I8RGZoTGFiZWxTbGljZT4ge1xuICBwdWJsaWMgYnlfZmtzJCA9IHRoaXMuc2VsZWN0b3I8RGZoTGFiZWw+KCdieV9ma3MnKTtcbiAgcHVibGljIGJ5X2ZrX2NsYXNzX190eXBlJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhMYWJlbD4+KCdieV9ma19jbGFzc19fdHlwZScpO1xuICBwdWJsaWMgYnlfZmtfcHJvcGVydHlfX3R5cGUkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERmaExhYmVsPj4oJ2J5X2ZrX3Byb3BlcnR5X190eXBlJyk7XG4gIHB1YmxpYyBieV9ma19wcm9maWxlX190eXBlJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhMYWJlbD4+KCdieV9ma19wcm9maWxlX190eXBlJyk7XG59XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRGZoU2VsZWN0b3IgZXh0ZW5kcyBEZmhBY3Rpb25zIHtcblxuICBwcm9maWxlJCA9IG5ldyBEZmhQcm9maWxlU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRmaERlZmluaXRpb25zLCAncHJvZmlsZScsIHRoaXMucGF1c2Uuc2hvdWxkUGF1c2UkKVxuICBjbGFzcyQgPSBuZXcgRGZoQ2xhc3NTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgZGZoRGVmaW5pdGlvbnMsICdrbGFzcycsIHRoaXMucGF1c2Uuc2hvdWxkUGF1c2UkKVxuICBwcm9wZXJ0eSQgPSBuZXcgRGZoUHJvcGVydHlTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgZGZoRGVmaW5pdGlvbnMsICdwcm9wZXJ0eScsIHRoaXMucGF1c2Uuc2hvdWxkUGF1c2UkKVxuICBsYWJlbCQgPSBuZXcgRGZoTGFiZWxTZWxlY3Rpb25zKHRoaXMubmdSZWR1eCwgZGZoRGVmaW5pdGlvbnMsICdsYWJlbCcsIHRoaXMucGF1c2Uuc2hvdWxkUGF1c2UkKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIHBhdXNlOiBTaG91bGRQYXVzZVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIobmdSZWR1eClcbiAgfVxufVxuIl19