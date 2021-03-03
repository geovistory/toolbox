/**
 * @fileoverview added by tsickle
 * Generated from: selectors/dfh.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        this.pk_property__has_domain__has_range$ = this.selector('by_pk_property__has_domain__has_range');
        this.by_pk_property$ = this.selector('by_pk_property');
        // public by_has_domain__pk_property$ = this.selector<ByPk<DfhProperty>>('by_has_domain__fk_property');
        // public by_has_range__pk_property$ = this.selector<ByPk<DfhProperty>>('by_has_range__fk_property');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL2RmaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFRLFVBQVUsRUFBaUIsY0FBYyxFQUFvRCxPQUFPLEVBQXNDLE1BQU0scUJBQXFCLENBQUM7QUFFckwsT0FBTyxFQUFFLEtBQUssRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7Ozs7QUFDdEUsTUFBTSxRQUFROzs7Ozs7O0lBSVosWUFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhLEVBQ2IsWUFBaUM7UUFIakMsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQU4xQyxXQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFRMUQsQ0FBQzs7Ozs7O0lBRUQsUUFBUSxDQUFJLFFBQWdCOztjQUVwQixXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzs7Y0FDM0UsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUNqQyxTQUFTOzs7O1FBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ1QsV0FBVyxFQUNaLENBQ0Y7O2NBRUssVUFBVTs7OztRQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBOztjQUM5RSxHQUFHOzs7O1FBQUcsQ0FBQyxDQUFDLEVBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDdEQsU0FBUzs7OztRQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUNULElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQzNELENBQ0YsQ0FBQTtRQUVELE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUE7SUFDdkUsQ0FBQztDQUNGOzs7SUE5QkMsMEJBQTBEOztJQUd4RCwyQkFBa0M7O0lBQ2xDLDJCQUF1Qzs7SUFDdkMseUJBQW9COztJQUNwQixnQ0FBd0M7OztBQTBCNUMsTUFBTSxvQkFBcUIsU0FBUSxRQUF5QjtJQUE1RDs7UUFDUyxtQkFBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQWEsZUFBZSxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUFBOzs7SUFEQyw4Q0FBbUU7OztBQUlyRSxNQUFNLGtCQUFtQixTQUFRLFFBQXVCO0lBQXhEOztRQUNTLGlCQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBVyxhQUFhLENBQUMsQ0FBQztRQUN0RCxtQkFBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQWlCLGVBQWUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7Q0FBQTs7O0lBRkMsMENBQTZEOztJQUM3RCw0Q0FBdUU7OztBQUl6RSxNQUFNLHFCQUFzQixTQUFRLFFBQTBCO0lBQTlEOztRQUNTLHdDQUFtQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQWMsdUNBQXVDLENBQUMsQ0FBQztRQUMxRyxvQkFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQW9CLGdCQUFnQixDQUFDLENBQUM7OztRQUdyRSxtQkFBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQW9CLGVBQWUsQ0FBQyxDQUFDO1FBQ25FLGtCQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBb0IsY0FBYyxDQUFDLENBQUM7UUFDakUsZ0NBQTJCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBb0IsNEJBQTRCLENBQUMsQ0FBQztJQUN0RyxDQUFDO0NBQUE7OztJQVBDLG9FQUFpSDs7SUFDakgsZ0RBQTRFOztJQUc1RSwrQ0FBMEU7O0lBQzFFLDhDQUF3RTs7SUFDeEUsNERBQW9HOzs7QUFJdEcsTUFBTSxrQkFBbUIsU0FBUSxRQUF1QjtJQUF4RDs7UUFDUyxZQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBVyxRQUFRLENBQUMsQ0FBQztRQUM1Qyx1QkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFpQixtQkFBbUIsQ0FBQyxDQUFDO1FBQ3hFLDBCQUFxQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQWlCLHNCQUFzQixDQUFDLENBQUM7UUFDOUUseUJBQW9CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBaUIscUJBQXFCLENBQUMsQ0FBQztJQUNyRixDQUFDO0NBQUE7OztJQUpDLHFDQUFtRDs7SUFDbkQsZ0RBQStFOztJQUMvRSxtREFBcUY7O0lBQ3JGLGtEQUFtRjs7QUFPckYsTUFBTSxPQUFPLFdBQVksU0FBUSxVQUFVOzs7OztJQU96QyxZQUNTLE9BQTJCLEVBQzNCLEtBQXlCO1FBRWhDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUhQLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBUGxDLGFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3JHLFdBQU0sR0FBRyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQy9GLGNBQVMsR0FBRyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3hHLFdBQU0sR0FBRyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBTy9GLENBQUM7OztZQWZGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQXpFUSxPQUFPO1lBTVAsa0JBQWtCOzs7OztJQXNFekIsK0JBQXFHOztJQUNyRyw2QkFBK0Y7O0lBQy9GLGdDQUF3Rzs7SUFDeEcsNkJBQStGOztJQUc3Riw4QkFBa0M7O0lBQ2xDLDRCQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCeVBrLCBEZmhBY3Rpb25zLCBEZmhDbGFzc1NsaWNlLCBkZmhEZWZpbml0aW9ucywgRGZoTGFiZWxTbGljZSwgRGZoUHJvZmlsZVNsaWNlLCBEZmhQcm9wZXJ0eVNsaWNlLCBkZmhSb290LCBJQXBwU3RhdGUsIFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBEZmhDbGFzcywgRGZoTGFiZWwsIERmaFByb2ZpbGUsIERmaFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGVtcHR5LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTaG91bGRQYXVzZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaG91bGQtcGF1c2Uuc2VydmljZSc7XG5jbGFzcyBTZWxlY3RvcjxTbGljZT4ge1xuXG4gIHNsaWNlJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8U2xpY2U+KFtkZmhSb290LCB0aGlzLm1vZGVsXSlcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZyxcbiAgICBwdWJsaWMgc2hvdWxkUGF1c2UkOiBPYnNlcnZhYmxlPGJvb2xlYW4+XG4gICkge1xuICB9XG5cbiAgc2VsZWN0b3I8TT4oaW5kZXhLZXk6IHN0cmluZyk6IHsgYWxsJDogT2JzZXJ2YWJsZTxCeVBrPE0+Piwga2V5OiAoeCkgPT4gT2JzZXJ2YWJsZTxNPiwgbm9QYXVzZTogeyBhbGwkOiBPYnNlcnZhYmxlPEJ5UGs8TT4+LCBrZXk6ICh4KSA9PiBPYnNlcnZhYmxlPE0+IH0gfSB7XG5cbiAgICBjb25zdCBhbGxOb1BhdXNlJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8QnlQazxNPj4oW2RmaFJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5XSk7XG4gICAgY29uc3QgYWxsJCA9IHRoaXMuc2hvdWxkUGF1c2UkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoc2hvdWxkUGF1c2UgPT4gc2hvdWxkUGF1c2UgP1xuICAgICAgICBlbXB0eSgpIDpcbiAgICAgICAgYWxsTm9QYXVzZSRcbiAgICAgIClcbiAgICApO1xuXG4gICAgY29uc3Qga2V5Tm9QYXVzZSA9ICh4KSA9PiB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFtkZmhSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleSwgeF0pO1xuICAgIGNvbnN0IGtleSA9ICh4KTogT2JzZXJ2YWJsZTxNPiA9PiB0aGlzLnNob3VsZFBhdXNlJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHNob3VsZFBhdXNlID0+IHNob3VsZFBhdXNlID9cbiAgICAgICAgZW1wdHkoKSA6XG4gICAgICAgIHRoaXMubmdSZWR1eC5zZWxlY3Q8TT4oW2RmaFJvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5LCB4XSlcbiAgICAgIClcbiAgICApXG5cbiAgICByZXR1cm4geyBhbGwkLCBrZXksIG5vUGF1c2U6IHsgYWxsJDogYWxsTm9QYXVzZSQsIGtleToga2V5Tm9QYXVzZSB9IH1cbiAgfVxufVxuLy8gUHJvZmlsZSBTZWxlY3RvcnNcbmNsYXNzIERmaFByb2ZpbGVTZWxlY3Rpb25zIGV4dGVuZHMgU2VsZWN0b3I8RGZoUHJvZmlsZVNsaWNlPiB7XG4gIHB1YmxpYyBieV9wa19wcm9maWxlJCA9IHRoaXMuc2VsZWN0b3I8RGZoUHJvZmlsZT4oJ2J5X3BrX3Byb2ZpbGUnKTtcbn1cblxuLy8gQ2xhc3MgU2VsZWN0b3JzXG5jbGFzcyBEZmhDbGFzc1NlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvcjxEZmhDbGFzc1NsaWNlPiB7XG4gIHB1YmxpYyBieV9wa19jbGFzcyQgPSB0aGlzLnNlbGVjdG9yPERmaENsYXNzPignYnlfcGtfY2xhc3MnKTtcbiAgcHVibGljIGJ5X2Jhc2ljX3R5cGUkID0gdGhpcy5zZWxlY3RvcjxCeVBrPERmaENsYXNzPj4oJ2J5X2Jhc2ljX3R5cGUnKTtcbn1cblxuLy8gUHJvcGVydHkgU2VsZWN0b3JzXG5jbGFzcyBEZmhQcm9wZXJ0eVNlbGVjdGlvbnMgZXh0ZW5kcyBTZWxlY3RvcjxEZmhQcm9wZXJ0eVNsaWNlPiB7XG4gIHB1YmxpYyBwa19wcm9wZXJ0eV9faGFzX2RvbWFpbl9faGFzX3JhbmdlJCA9IHRoaXMuc2VsZWN0b3I8RGZoUHJvcGVydHk+KCdieV9wa19wcm9wZXJ0eV9faGFzX2RvbWFpbl9faGFzX3JhbmdlJyk7XG4gIHB1YmxpYyBieV9wa19wcm9wZXJ0eSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoUHJvcGVydHk+PignYnlfcGtfcHJvcGVydHknKTtcbiAgLy8gcHVibGljIGJ5X2hhc19kb21haW5fX3BrX3Byb3BlcnR5JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhQcm9wZXJ0eT4+KCdieV9oYXNfZG9tYWluX19ma19wcm9wZXJ0eScpO1xuICAvLyBwdWJsaWMgYnlfaGFzX3JhbmdlX19wa19wcm9wZXJ0eSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoUHJvcGVydHk+PignYnlfaGFzX3JhbmdlX19ma19wcm9wZXJ0eScpO1xuICBwdWJsaWMgYnlfaGFzX2RvbWFpbiQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoUHJvcGVydHk+PignYnlfaGFzX2RvbWFpbicpO1xuICBwdWJsaWMgYnlfaGFzX3JhbmdlJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhQcm9wZXJ0eT4+KCdieV9oYXNfcmFuZ2UnKTtcbiAgcHVibGljIGJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhQcm9wZXJ0eT4+KCdieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eScpO1xufVxuXG4vLyBMYWJlbCBTZWxlY3RvcnNcbmNsYXNzIERmaExhYmVsU2VsZWN0aW9ucyBleHRlbmRzIFNlbGVjdG9yPERmaExhYmVsU2xpY2U+IHtcbiAgcHVibGljIGJ5X2ZrcyQgPSB0aGlzLnNlbGVjdG9yPERmaExhYmVsPignYnlfZmtzJyk7XG4gIHB1YmxpYyBieV9ma19jbGFzc19fdHlwZSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoTGFiZWw+PignYnlfZmtfY2xhc3NfX3R5cGUnKTtcbiAgcHVibGljIGJ5X2ZrX3Byb3BlcnR5X190eXBlJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxEZmhMYWJlbD4+KCdieV9ma19wcm9wZXJ0eV9fdHlwZScpO1xuICBwdWJsaWMgYnlfZmtfcHJvZmlsZV9fdHlwZSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8RGZoTGFiZWw+PignYnlfZmtfcHJvZmlsZV9fdHlwZScpO1xufVxuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERmaFNlbGVjdG9yIGV4dGVuZHMgRGZoQWN0aW9ucyB7XG5cbiAgcHJvZmlsZSQgPSBuZXcgRGZoUHJvZmlsZVNlbGVjdGlvbnModGhpcy5uZ1JlZHV4LCBkZmhEZWZpbml0aW9ucywgJ3Byb2ZpbGUnLCB0aGlzLnBhdXNlLnNob3VsZFBhdXNlJClcbiAgY2xhc3MkID0gbmV3IERmaENsYXNzU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRmaERlZmluaXRpb25zLCAna2xhc3MnLCB0aGlzLnBhdXNlLnNob3VsZFBhdXNlJClcbiAgcHJvcGVydHkkID0gbmV3IERmaFByb3BlcnR5U2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRmaERlZmluaXRpb25zLCAncHJvcGVydHknLCB0aGlzLnBhdXNlLnNob3VsZFBhdXNlJClcbiAgbGFiZWwkID0gbmV3IERmaExhYmVsU2VsZWN0aW9ucyh0aGlzLm5nUmVkdXgsIGRmaERlZmluaXRpb25zLCAnbGFiZWwnLCB0aGlzLnBhdXNlLnNob3VsZFBhdXNlJClcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBwYXVzZTogU2hvdWxkUGF1c2VTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKG5nUmVkdXgpXG4gIH1cbn1cbiJdfQ==