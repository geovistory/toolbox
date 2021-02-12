/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/actions/entity-list.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
var InformationAPIActions = /** @class */ (function () {
    function InformationAPIActions() {
        /**
         * ******************************************************************
         *  Method to distroy the slice of store
         * *******************************************************************
         */
        this.destroy = (/**
         * @return {?}
         */
        function () { return ({
            type: InformationAPIActions.DESTROY,
            meta: null,
            payload: null
        }); });
    }
    InformationAPIActions.DESTROY = 'Information::DESTROY';
    InformationAPIActions.decorators = [
        { type: Injectable }
    ];
    tslib_1.__decorate([
        dispatch(),
        tslib_1.__metadata("design:type", Object)
    ], InformationAPIActions.prototype, "destroy", void 0);
    return InformationAPIActions;
}());
export { InformationAPIActions };
if (false) {
    /** @type {?} */
    InformationAPIActions.DESTROY;
    /**
     * ******************************************************************
     *  Method to distroy the slice of store
     * *******************************************************************
     * @type {?}
     */
    InformationAPIActions.prototype.destroy;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWxpc3QuYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9hY3Rpb25zL2VudGl0eS1saXN0LmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPM0M7SUFBQTs7Ozs7O1FBV2MsWUFBTzs7O1FBQUcsY0FBNEIsT0FBQSxDQUFDO1lBQ2pELElBQUksRUFBRSxxQkFBcUIsQ0FBQyxPQUFPO1lBQ25DLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLEVBSmdELENBSWhELEVBQUE7SUFDSixDQUFDO0lBWGlCLDZCQUFPLEdBQUcsc0JBQXNCLENBQUM7O2dCQUxsRCxVQUFVOztJQVdHO1FBQVgsUUFBUSxFQUFFOzswREFJVDtJQUNKLDRCQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FmWSxxQkFBcUI7OztJQUloQyw4QkFBaUQ7Ozs7Ozs7SUFNakQsd0NBSUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkaXNwYXRjaCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZsdXhTdGFuZGFyZEFjdGlvbiB9IGZyb20gJ2ZsdXgtc3RhbmRhcmQtYWN0aW9uJztcbmltcG9ydCB7IEluZm9ybWF0aW9uIH0gZnJvbSAnLi4vbW9kZWxzJztcblxudHlwZSBQYXlsb2FkID0gSW5mb3JtYXRpb247XG5leHBvcnQgdHlwZSBJbmZvcm1hdGlvbkFQSUFjdGlvbiA9IEZsdXhTdGFuZGFyZEFjdGlvbjxQYXlsb2FkLCB7fT47XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbmZvcm1hdGlvbkFQSUFjdGlvbnMge1xuXG5cblxuICBzdGF0aWMgcmVhZG9ubHkgREVTVFJPWSA9ICdJbmZvcm1hdGlvbjo6REVTVFJPWSc7XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICogIE1ldGhvZCB0byBkaXN0cm95IHRoZSBzbGljZSBvZiBzdG9yZVxuICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gIEBkaXNwYXRjaCgpIGRlc3Ryb3kgPSAoKTogSW5mb3JtYXRpb25BUElBY3Rpb24gPT4gKHtcbiAgICB0eXBlOiBJbmZvcm1hdGlvbkFQSUFjdGlvbnMuREVTVFJPWSxcbiAgICBtZXRhOiBudWxsLFxuICAgIHBheWxvYWQ6IG51bGxcbiAgfSlcbn1cbiJdfQ==