/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/selectors/war.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { WarActions, warDefinitions, warRoot } from '@kleiolab/lib-redux';
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
        const all$ = this.ngRedux.select([warRoot, this.model, indexKey]);
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
            return this.ngRedux.select([warRoot, this.model, indexKey, k]);
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
class WarEntityPreviewSelector extends Selector {
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
    WarEntityPreviewSelector.prototype.by_pk_entity$;
    /** @type {?} */
    WarEntityPreviewSelector.prototype.ngRedux;
    /** @type {?} */
    WarEntityPreviewSelector.prototype.configs;
    /** @type {?} */
    WarEntityPreviewSelector.prototype.model;
}
export class WarSelector extends WarActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.entity_preview$ = new WarEntityPreviewSelector(this.ngRedux, warDefinitions, 'entity_preview');
    }
}
WarSelector.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WarSelector.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ WarSelector.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function WarSelector_Factory() { return new WarSelector(i0.ɵɵinject(i1.NgRedux)); }, token: WarSelector, providedIn: "root" });
if (false) {
    /** @type {?} */
    WarSelector.prototype.entity_preview$;
    /** @type {?} */
    WarSelector.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvIiwic291cmNlcyI6WyJsaWIvcXVlcmllcy9zZWxlY3RvcnMvd2FyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQTRDLFVBQVUsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFcEgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQzs7O0FBSWpDLE1BQU0sUUFBUTs7Ozs7O0lBQ1osWUFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBRmIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUNsQixDQUFDOzs7Ozs7SUFFTCxRQUFRLENBQUksUUFBZ0I7O2NBRXBCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztjQUVwRSxHQUFHOzs7O1FBQUcsQ0FBQyxDQUErQixFQUFpQixFQUFFOztrQkFDdkQsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRzs7OztZQUFDLENBQUMsSUFBcUIsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUFDLENBQUM7WUFFbEcsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25FLENBQUMsQ0FBQTtRQUVELE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDdEIsQ0FBQztDQUNGOzs7SUFqQkcsMkJBQWtDOztJQUNsQywyQkFBdUM7O0lBQ3ZDLHlCQUFvQjs7QUFpQnhCLE1BQU0sd0JBQXlCLFNBQVEsUUFBUTs7Ozs7O0lBRzdDLFlBQ1MsT0FBMkIsRUFDM0IsT0FBZ0MsRUFDaEMsS0FBYTtRQUNsQixLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUh6QixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBTGYsa0JBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFtQixjQUFjLENBQUMsQ0FBQTtJQU1uQyxDQUFDO0NBQ3JDOzs7SUFQQyxpREFBc0U7O0lBR3BFLDJDQUFrQzs7SUFDbEMsMkNBQXVDOztJQUN2Qyx5Q0FBb0I7O0FBUXhCLE1BQU0sT0FBTyxXQUFZLFNBQVEsVUFBVTs7OztJQUl6QyxZQUFtQixPQUEyQjtRQUM1QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFERyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUY5QyxvQkFBZSxHQUFHLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUkvRixDQUFDOzs7WUFURixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUExQ1EsT0FBTzs7Ozs7SUE2Q2Qsc0NBQStGOztJQUVuRiw4QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnlQaywgSUFwcFN0YXRlLCBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiwgV2FyQWN0aW9ucywgd2FyRGVmaW5pdGlvbnMsIHdhclJvb3QgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IFdhckVudGl0eVByZXZpZXcgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgdG9TdHJpbmcgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cblxuY2xhc3MgU2VsZWN0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgfVxuXG4gIHNlbGVjdG9yPE0+KGluZGV4S2V5OiBzdHJpbmcpOiB7IGFsbCQ6IE9ic2VydmFibGU8QnlQazxNPj4sIGtleTogKHg6IHN0cmluZyB8IChzdHJpbmcgfCBudW1iZXIpW10pID0+IE9ic2VydmFibGU8TT4gfSB7XG5cbiAgICBjb25zdCBhbGwkID0gdGhpcy5uZ1JlZHV4LnNlbGVjdDxCeVBrPE0+Pihbd2FyUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXldKVxuXG4gICAgY29uc3Qga2V5ID0gKHg6IHN0cmluZyB8IChzdHJpbmcgfCBudW1iZXIpW10pOiBPYnNlcnZhYmxlPE0+ID0+IHtcbiAgICAgIGNvbnN0IGsgPSB0eXBlb2YgeCA9PT0gJ3N0cmluZycgPyB4IDogeC5tYXAoKHBhcnQ6IHN0cmluZyB8IG51bWJlcikgPT4gdG9TdHJpbmcocGFydCkpLmpvaW4oJ18nKTs7XG5cbiAgICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PE0+KFt3YXJSb290LCB0aGlzLm1vZGVsLCBpbmRleEtleSwga10pXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYWxsJCwga2V5IH1cbiAgfVxufVxuXG5jbGFzcyBXYXJFbnRpdHlQcmV2aWV3U2VsZWN0b3IgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxXYXJFbnRpdHlQcmV2aWV3PignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBXYXJTZWxlY3RvciBleHRlbmRzIFdhckFjdGlvbnMge1xuXG4gIGVudGl0eV9wcmV2aWV3JCA9IG5ldyBXYXJFbnRpdHlQcmV2aWV3U2VsZWN0b3IodGhpcy5uZ1JlZHV4LCB3YXJEZWZpbml0aW9ucywgJ2VudGl0eV9wcmV2aWV3Jyk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikge1xuICAgIHN1cGVyKG5nUmVkdXgpXG4gIH1cbn1cbiJdfQ==