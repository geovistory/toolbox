/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/actions/source-list.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
/**
 * @record
 */
function MetaData() { }
if (false) {
    /** @type {?|undefined} */
    MetaData.prototype.pkAllowedClasses;
}
;
export class SourceListAPIActions {
    constructor() {
        /**
         * ******************************************************************
         *  Actions to manage the list
         * *******************************************************************
         */
        this.initializeList = (/**
         * @param {?} pkAllowedClasses
         * @return {?}
         */
        (pkAllowedClasses) => ({
            type: SourceListAPIActions.INITIALIZE_LIST,
            meta: { pkAllowedClasses },
            payload: null
        }));
        /**
         * ******************************************************************
         *  Method to distroy the slice of store
         * *******************************************************************
         */
        this.destroy = (/**
         * @return {?}
         */
        () => ({
            type: SourceListAPIActions.DESTROY,
            meta: null,
            payload: null
        }));
    }
}
SourceListAPIActions.INITIALIZE_LIST = 'SourceList::INITIALIZE_LIST';
SourceListAPIActions.DESTROY = 'SourceList::DESTROY';
SourceListAPIActions.decorators = [
    { type: Injectable }
];
tslib_1.__decorate([
    dispatch(),
    tslib_1.__metadata("design:type", Object)
], SourceListAPIActions.prototype, "initializeList", void 0);
tslib_1.__decorate([
    dispatch(),
    tslib_1.__metadata("design:type", Object)
], SourceListAPIActions.prototype, "destroy", void 0);
if (false) {
    /** @type {?} */
    SourceListAPIActions.INITIALIZE_LIST;
    /** @type {?} */
    SourceListAPIActions.DESTROY;
    /**
     * ******************************************************************
     *  Actions to manage the list
     * *******************************************************************
     * @type {?}
     */
    SourceListAPIActions.prototype.initializeList;
    /**
     * ******************************************************************
     *  Method to distroy the slice of store
     * *******************************************************************
     * @type {?}
     */
    SourceListAPIActions.prototype.destroy;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLWxpc3QuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9hY3Rpb25zL3NvdXJjZS1saXN0LmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFLM0MsdUJBWUM7OztJQURDLG9DQUE0Qjs7QUFDN0IsQ0FBQztBQUlGLE1BQU0sT0FBTyxvQkFBb0I7SUFEakM7Ozs7OztRQVljLG1CQUFjOzs7O1FBQUcsQ0FBQyxnQkFBMEIsRUFBdUIsRUFBRSxDQUFDLENBQUM7WUFDakYsSUFBSSxFQUFFLG9CQUFvQixDQUFDLGVBQWU7WUFDMUMsSUFBSSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUU7WUFDMUIsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLEVBQUE7Ozs7OztRQVNGLFlBQU87OztRQUFHLEdBQXdCLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxPQUFPO1lBQ2xDLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLEVBQUE7SUFFSixDQUFDOztBQTVCaUIsb0NBQWUsR0FBRyw2QkFBNkIsQ0FBQztBQUVoRCw0QkFBTyxHQUFHLHFCQUFxQixDQUFDOztZQUxqRCxVQUFVOztBQVlHO0lBQVgsUUFBUSxFQUFFOzs0REFJVDtBQVNGO0lBREMsUUFBUSxFQUFFOztxREFLVDs7O0lBMUJGLHFDQUFnRTs7SUFFaEUsNkJBQWdEOzs7Ozs7O0lBT2hELDhDQUlFOzs7Ozs7O0lBUUYsdUNBS0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkaXNwYXRjaCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IFNvdXJjZUxpc3QgfSBmcm9tICcuLi9tb2RlbHMvc291cmNlLWxpc3QubW9kZWxzJztcblxudHlwZSBQYXlsb2FkID0gU291cmNlTGlzdDtcbmludGVyZmFjZSBNZXRhRGF0YSB7XG4gIC8vIHBrRW50aXR5PzogbnVtYmVyO1xuICAvLyBwa1NvdXJjZT86IG51bWJlcjtcbiAgLy8gcGtQcm9qZWN0PzogbnVtYmVyO1xuICAvLyBjcm0/OiBQcm9qZWN0Q3JtO1xuXG4gIC8vIHNvdXJjZURldGFpbD86IFBlSXREZXRhaWw7XG4gIC8vIHNlY3Rpb25EZXRhaWw/OiBQZUl0RGV0YWlsO1xuXG4gIC8vIGNsYXNzQW5kVHlwZVBrPzogQ2xhc3NBbmRUeXBlUGs7XG4gIC8vIHBrVWlDb250ZXh0PzogbnVtYmVyO1xuICBwa0FsbG93ZWRDbGFzc2VzPzogbnVtYmVyW107XG59O1xuZXhwb3J0IHR5cGUgU291cmNlTGlzdEFQSUFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNZXRhRGF0YT47XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTb3VyY2VMaXN0QVBJQWN0aW9ucyB7XG5cbiAgc3RhdGljIHJlYWRvbmx5IElOSVRJQUxJWkVfTElTVCA9ICdTb3VyY2VMaXN0OjpJTklUSUFMSVpFX0xJU1QnO1xuXG4gIHN0YXRpYyByZWFkb25seSBERVNUUk9ZID0gJ1NvdXJjZUxpc3Q6OkRFU1RST1knO1xuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAqICBBY3Rpb25zIHRvIG1hbmFnZSB0aGUgbGlzdFxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgQGRpc3BhdGNoKCkgaW5pdGlhbGl6ZUxpc3QgPSAocGtBbGxvd2VkQ2xhc3NlczogbnVtYmVyW10pOiBTb3VyY2VMaXN0QVBJQWN0aW9uID0+ICh7XG4gICAgdHlwZTogU291cmNlTGlzdEFQSUFjdGlvbnMuSU5JVElBTElaRV9MSVNULFxuICAgIG1ldGE6IHsgcGtBbGxvd2VkQ2xhc3NlcyB9LFxuICAgIHBheWxvYWQ6IG51bGxcbiAgfSlcblxuXG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICogIE1ldGhvZCB0byBkaXN0cm95IHRoZSBzbGljZSBvZiBzdG9yZVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIEBkaXNwYXRjaCgpXG4gIGRlc3Ryb3kgPSAoKTogU291cmNlTGlzdEFQSUFjdGlvbiA9PiAoe1xuICAgIHR5cGU6IFNvdXJjZUxpc3RBUElBY3Rpb25zLkRFU1RST1ksXG4gICAgbWV0YTogbnVsbCxcbiAgICBwYXlsb2FkOiBudWxsXG4gIH0pXG5cbn1cbiJdfQ==