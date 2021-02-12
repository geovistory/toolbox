/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/actions/source-list.actions.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLWxpc3QuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL2FjdGlvbnMvc291cmNlLWxpc3QuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUszQyx1QkFZQzs7O0lBREMsb0NBQTRCOztBQUM3QixDQUFDO0FBR0Y7SUFBQTs7Ozs7O1FBWWMsbUJBQWM7Ozs7UUFBRyxVQUFDLGdCQUEwQixJQUEwQixPQUFBLENBQUM7WUFDakYsSUFBSSxFQUFFLG9CQUFvQixDQUFDLGVBQWU7WUFDMUMsSUFBSSxFQUFFLEVBQUUsZ0JBQWdCLGtCQUFBLEVBQUU7WUFDMUIsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLEVBSmdGLENBSWhGLEVBQUE7Ozs7OztRQVNGLFlBQU87OztRQUFHLGNBQTJCLE9BQUEsQ0FBQztZQUNwQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsT0FBTztZQUNsQyxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxJQUFJO1NBQ2QsQ0FBQyxFQUptQyxDQUluQyxFQUFBO0lBRUosQ0FBQztJQTVCaUIsb0NBQWUsR0FBRyw2QkFBNkIsQ0FBQztJQUVoRCw0QkFBTyxHQUFHLHFCQUFxQixDQUFDOztnQkFMakQsVUFBVTs7SUFZRztRQUFYLFFBQVEsRUFBRTs7Z0VBSVQ7SUFTRjtRQURDLFFBQVEsRUFBRTs7eURBS1Q7SUFFSiwyQkFBQztDQUFBLEFBL0JELElBK0JDO1NBOUJZLG9CQUFvQjs7O0lBRS9CLHFDQUFnRTs7SUFFaEUsNkJBQWdEOzs7Ozs7O0lBT2hELDhDQUlFOzs7Ozs7O0lBUUYsdUNBS0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkaXNwYXRjaCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IFNvdXJjZUxpc3QgfSBmcm9tICcuLi9tb2RlbHMnO1xuXG50eXBlIFBheWxvYWQgPSBTb3VyY2VMaXN0O1xuaW50ZXJmYWNlIE1ldGFEYXRhIHtcbiAgLy8gcGtFbnRpdHk/OiBudW1iZXI7XG4gIC8vIHBrU291cmNlPzogbnVtYmVyO1xuICAvLyBwa1Byb2plY3Q/OiBudW1iZXI7XG4gIC8vIGNybT86IFByb2plY3RDcm07XG5cbiAgLy8gc291cmNlRGV0YWlsPzogUGVJdERldGFpbDtcbiAgLy8gc2VjdGlvbkRldGFpbD86IFBlSXREZXRhaWw7XG5cbiAgLy8gY2xhc3NBbmRUeXBlUGs/OiBDbGFzc0FuZFR5cGVQaztcbiAgLy8gcGtVaUNvbnRleHQ/OiBudW1iZXI7XG4gIHBrQWxsb3dlZENsYXNzZXM/OiBudW1iZXJbXTtcbn07XG5leHBvcnQgdHlwZSBTb3VyY2VMaXN0QVBJQWN0aW9uID0gRmx1eFN0YW5kYXJkQWN0aW9uPFBheWxvYWQsIE1ldGFEYXRhPjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvdXJjZUxpc3RBUElBY3Rpb25zIHtcblxuICBzdGF0aWMgcmVhZG9ubHkgSU5JVElBTElaRV9MSVNUID0gJ1NvdXJjZUxpc3Q6OklOSVRJQUxJWkVfTElTVCc7XG5cbiAgc3RhdGljIHJlYWRvbmx5IERFU1RST1kgPSAnU291cmNlTGlzdDo6REVTVFJPWSc7XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICogIEFjdGlvbnMgdG8gbWFuYWdlIHRoZSBsaXN0XG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICBAZGlzcGF0Y2goKSBpbml0aWFsaXplTGlzdCA9IChwa0FsbG93ZWRDbGFzc2VzOiBudW1iZXJbXSk6IFNvdXJjZUxpc3RBUElBY3Rpb24gPT4gKHtcbiAgICB0eXBlOiBTb3VyY2VMaXN0QVBJQWN0aW9ucy5JTklUSUFMSVpFX0xJU1QsXG4gICAgbWV0YTogeyBwa0FsbG93ZWRDbGFzc2VzIH0sXG4gICAgcGF5bG9hZDogbnVsbFxuICB9KVxuXG5cblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgKiAgTWV0aG9kIHRvIGRpc3Ryb3kgdGhlIHNsaWNlIG9mIHN0b3JlXG4gICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgQGRpc3BhdGNoKClcbiAgZGVzdHJveSA9ICgpOiBTb3VyY2VMaXN0QVBJQWN0aW9uID0+ICh7XG4gICAgdHlwZTogU291cmNlTGlzdEFQSUFjdGlvbnMuREVTVFJPWSxcbiAgICBtZXRhOiBudWxsLFxuICAgIHBheWxvYWQ6IG51bGxcbiAgfSlcblxufVxuIl19