/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/entity-list.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InformationAPIActions } from '../actions';
import { Information } from '../models';
/** @type {?} */
var INITIAL_STATE = new Information();
/**
 * @param {?=} state
 * @param {?=} a
 * @return {?}
 */
export function informationReducer(state, a) {
    if (state === void 0) { state = INITIAL_STATE; }
    /** @type {?} */
    var action = (/** @type {?} */ (a));
    switch (action.type) {
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case InformationAPIActions.DESTROY:
            state = {};
            break;
    }
    return state;
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWxpc3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9yZWR1Y2Vycy9lbnRpdHktbGlzdC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUF3QixxQkFBcUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sV0FBVyxDQUFDOztJQUVsQyxhQUFhLEdBQUcsSUFBSSxXQUFXLEVBQUU7Ozs7OztBQUV2QyxNQUFNLFVBQVUsa0JBQWtCLENBQUMsS0FBa0MsRUFBRSxDQUFTO0lBQTdDLHNCQUFBLEVBQUEscUJBQWtDOztRQUU3RCxNQUFNLEdBQUcsbUJBQUEsQ0FBQyxFQUF3QjtJQUV4QyxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFHbkI7OzhEQUVzRDtRQUN0RCxLQUFLLHFCQUFxQixDQUFDLE9BQU87WUFDaEMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNYLE1BQU07S0FFVDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbkFQSUFjdGlvbiwgSW5mb3JtYXRpb25BUElBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbiB9IGZyb20gJy4uL21vZGVscyc7XG5cbmNvbnN0IElOSVRJQUxfU1RBVEUgPSBuZXcgSW5mb3JtYXRpb24oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluZm9ybWF0aW9uUmVkdWNlcihzdGF0ZTogSW5mb3JtYXRpb24gPSBJTklUSUFMX1NUQVRFLCBhOiBBY3Rpb24pOiBJbmZvcm1hdGlvbiB7XG5cbiAgY29uc3QgYWN0aW9uID0gYSBhcyBJbmZvcm1hdGlvbkFQSUFjdGlvbjtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogUmVkdWNlcnMgY2FsbGVkIG9uIGRlc3Ryb3kgb2YgY29tcG9uZW50XG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY2FzZSBJbmZvcm1hdGlvbkFQSUFjdGlvbnMuREVTVFJPWTpcbiAgICAgIHN0YXRlID0ge307XG4gICAgICBicmVhaztcblxuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufTtcblxuIl19