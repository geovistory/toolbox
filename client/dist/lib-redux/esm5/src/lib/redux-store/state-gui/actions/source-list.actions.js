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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLWxpc3QuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9hY3Rpb25zL3NvdXJjZS1saXN0LmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFLM0MsdUJBWUM7OztJQURDLG9DQUE0Qjs7QUFDN0IsQ0FBQztBQUdGO0lBQUE7Ozs7OztRQVljLG1CQUFjOzs7O1FBQUcsVUFBQyxnQkFBMEIsSUFBMEIsT0FBQSxDQUFDO1lBQ2pGLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxlQUFlO1lBQzFDLElBQUksRUFBRSxFQUFFLGdCQUFnQixrQkFBQSxFQUFFO1lBQzFCLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxFQUpnRixDQUloRixFQUFBOzs7Ozs7UUFTRixZQUFPOzs7UUFBRyxjQUEyQixPQUFBLENBQUM7WUFDcEMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLE9BQU87WUFDbEMsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsRUFKbUMsQ0FJbkMsRUFBQTtJQUVKLENBQUM7SUE1QmlCLG9DQUFlLEdBQUcsNkJBQTZCLENBQUM7SUFFaEQsNEJBQU8sR0FBRyxxQkFBcUIsQ0FBQzs7Z0JBTGpELFVBQVU7O0lBWUc7UUFBWCxRQUFRLEVBQUU7O2dFQUlUO0lBU0Y7UUFEQyxRQUFRLEVBQUU7O3lEQUtUO0lBRUosMkJBQUM7Q0FBQSxBQS9CRCxJQStCQztTQTlCWSxvQkFBb0I7OztJQUUvQixxQ0FBZ0U7O0lBRWhFLDZCQUFnRDs7Ozs7OztJQU9oRCw4Q0FJRTs7Ozs7OztJQVFGLHVDQUtFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGlzcGF0Y2ggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBTb3VyY2VMaXN0IH0gZnJvbSAnLi4vbW9kZWxzL3NvdXJjZS1saXN0Lm1vZGVscyc7XG5cbnR5cGUgUGF5bG9hZCA9IFNvdXJjZUxpc3Q7XG5pbnRlcmZhY2UgTWV0YURhdGEge1xuICAvLyBwa0VudGl0eT86IG51bWJlcjtcbiAgLy8gcGtTb3VyY2U/OiBudW1iZXI7XG4gIC8vIHBrUHJvamVjdD86IG51bWJlcjtcbiAgLy8gY3JtPzogUHJvamVjdENybTtcblxuICAvLyBzb3VyY2VEZXRhaWw/OiBQZUl0RGV0YWlsO1xuICAvLyBzZWN0aW9uRGV0YWlsPzogUGVJdERldGFpbDtcblxuICAvLyBjbGFzc0FuZFR5cGVQaz86IENsYXNzQW5kVHlwZVBrO1xuICAvLyBwa1VpQ29udGV4dD86IG51bWJlcjtcbiAgcGtBbGxvd2VkQ2xhc3Nlcz86IG51bWJlcltdO1xufTtcbmV4cG9ydCB0eXBlIFNvdXJjZUxpc3RBUElBY3Rpb24gPSBGbHV4U3RhbmRhcmRBY3Rpb248UGF5bG9hZCwgTWV0YURhdGE+O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU291cmNlTGlzdEFQSUFjdGlvbnMge1xuXG4gIHN0YXRpYyByZWFkb25seSBJTklUSUFMSVpFX0xJU1QgPSAnU291cmNlTGlzdDo6SU5JVElBTElaRV9MSVNUJztcblxuICBzdGF0aWMgcmVhZG9ubHkgREVTVFJPWSA9ICdTb3VyY2VMaXN0OjpERVNUUk9ZJztcblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgKiAgQWN0aW9ucyB0byBtYW5hZ2UgdGhlIGxpc3RcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gIEBkaXNwYXRjaCgpIGluaXRpYWxpemVMaXN0ID0gKHBrQWxsb3dlZENsYXNzZXM6IG51bWJlcltdKTogU291cmNlTGlzdEFQSUFjdGlvbiA9PiAoe1xuICAgIHR5cGU6IFNvdXJjZUxpc3RBUElBY3Rpb25zLklOSVRJQUxJWkVfTElTVCxcbiAgICBtZXRhOiB7IHBrQWxsb3dlZENsYXNzZXMgfSxcbiAgICBwYXlsb2FkOiBudWxsXG4gIH0pXG5cblxuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAqICBNZXRob2QgdG8gZGlzdHJveSB0aGUgc2xpY2Ugb2Ygc3RvcmVcbiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICBAZGlzcGF0Y2goKVxuICBkZXN0cm95ID0gKCk6IFNvdXJjZUxpc3RBUElBY3Rpb24gPT4gKHtcbiAgICB0eXBlOiBTb3VyY2VMaXN0QVBJQWN0aW9ucy5ERVNUUk9ZLFxuICAgIG1ldGE6IG51bGwsXG4gICAgcGF5bG9hZDogbnVsbFxuICB9KVxuXG59XG4iXX0=