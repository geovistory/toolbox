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
var SourceListAPIActions = /** @class */ (function () {
    function SourceListAPIActions() {
        /**
         * ******************************************************************
         *  Actions to manage the list
         * *******************************************************************
         */
        this.initializeList = (/**
         * @param {?} pkAllowedClasses
         * @return {?}
         */
        function (pkAllowedClasses) { return ({
            type: SourceListAPIActions.INITIALIZE_LIST,
            meta: { pkAllowedClasses: pkAllowedClasses },
            payload: null
        }); });
        /**
         * ******************************************************************
         *  Method to distroy the slice of store
         * *******************************************************************
         */
        this.destroy = (/**
         * @return {?}
         */
        function () { return ({
            type: SourceListAPIActions.DESTROY,
            meta: null,
            payload: null
        }); });
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
    return SourceListAPIActions;
}());
export { SourceListAPIActions };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLWxpc3QuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9hY3Rpb25zL3NvdXJjZS1saXN0LmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFLM0MsdUJBWUM7OztJQURDLG9DQUE0Qjs7QUFDN0IsQ0FBQztBQUdGO0lBQUE7Ozs7OztRQVljLG1CQUFjOzs7O1FBQUcsVUFBQyxnQkFBMEIsSUFBMEIsT0FBQSxDQUFDO1lBQ2pGLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxlQUFlO1lBQzFDLElBQUksRUFBRSxFQUFFLGdCQUFnQixrQkFBQSxFQUFFO1lBQzFCLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxFQUpnRixDQUloRixFQUFBOzs7Ozs7UUFTRixZQUFPOzs7UUFBRyxjQUEyQixPQUFBLENBQUM7WUFDcEMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLE9BQU87WUFDbEMsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsRUFKbUMsQ0FJbkMsRUFBQTtJQUVKLENBQUM7SUE1QmlCLG9DQUFlLEdBQUcsNkJBQTZCLENBQUM7SUFFaEQsNEJBQU8sR0FBRyxxQkFBcUIsQ0FBQzs7Z0JBTGpELFVBQVU7O0lBWUc7UUFBWCxRQUFRLEVBQUU7O2dFQUlUO0lBU0Y7UUFEQyxRQUFRLEVBQUU7O3lEQUtUO0lBRUosMkJBQUM7Q0FBQSxBQS9CRCxJQStCQztTQTlCWSxvQkFBb0I7OztJQUUvQixxQ0FBZ0U7O0lBRWhFLDZCQUFnRDs7Ozs7OztJQU9oRCw4Q0FJRTs7Ozs7OztJQVFGLHVDQUtFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGlzcGF0Y2ggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBTb3VyY2VMaXN0IH0gZnJvbSAnLi4vbW9kZWxzJztcblxudHlwZSBQYXlsb2FkID0gU291cmNlTGlzdDtcbmludGVyZmFjZSBNZXRhRGF0YSB7XG4gIC8vIHBrRW50aXR5PzogbnVtYmVyO1xuICAvLyBwa1NvdXJjZT86IG51bWJlcjtcbiAgLy8gcGtQcm9qZWN0PzogbnVtYmVyO1xuICAvLyBjcm0/OiBQcm9qZWN0Q3JtO1xuXG4gIC8vIHNvdXJjZURldGFpbD86IFBlSXREZXRhaWw7XG4gIC8vIHNlY3Rpb25EZXRhaWw/OiBQZUl0RGV0YWlsO1xuXG4gIC8vIGNsYXNzQW5kVHlwZVBrPzogQ2xhc3NBbmRUeXBlUGs7XG4gIC8vIHBrVWlDb250ZXh0PzogbnVtYmVyO1xuICBwa0FsbG93ZWRDbGFzc2VzPzogbnVtYmVyW107XG59O1xuZXhwb3J0IHR5cGUgU291cmNlTGlzdEFQSUFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCBNZXRhRGF0YT47XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTb3VyY2VMaXN0QVBJQWN0aW9ucyB7XG5cbiAgc3RhdGljIHJlYWRvbmx5IElOSVRJQUxJWkVfTElTVCA9ICdTb3VyY2VMaXN0OjpJTklUSUFMSVpFX0xJU1QnO1xuXG4gIHN0YXRpYyByZWFkb25seSBERVNUUk9ZID0gJ1NvdXJjZUxpc3Q6OkRFU1RST1knO1xuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAqICBBY3Rpb25zIHRvIG1hbmFnZSB0aGUgbGlzdFxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbiAgQGRpc3BhdGNoKCkgaW5pdGlhbGl6ZUxpc3QgPSAocGtBbGxvd2VkQ2xhc3NlczogbnVtYmVyW10pOiBTb3VyY2VMaXN0QVBJQWN0aW9uID0+ICh7XG4gICAgdHlwZTogU291cmNlTGlzdEFQSUFjdGlvbnMuSU5JVElBTElaRV9MSVNULFxuICAgIG1ldGE6IHsgcGtBbGxvd2VkQ2xhc3NlcyB9LFxuICAgIHBheWxvYWQ6IG51bGxcbiAgfSlcblxuXG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICogIE1ldGhvZCB0byBkaXN0cm95IHRoZSBzbGljZSBvZiBzdG9yZVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIEBkaXNwYXRjaCgpXG4gIGRlc3Ryb3kgPSAoKTogU291cmNlTGlzdEFQSUFjdGlvbiA9PiAoe1xuICAgIHR5cGU6IFNvdXJjZUxpc3RBUElBY3Rpb25zLkRFU1RST1ksXG4gICAgbWV0YTogbnVsbCxcbiAgICBwYXlsb2FkOiBudWxsXG4gIH0pXG5cbn1cbiJdfQ==