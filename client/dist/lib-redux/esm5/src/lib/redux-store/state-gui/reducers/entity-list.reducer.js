/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/entity-list.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Information } from '../models/entity-list.models';
import { InformationAPIActions } from '../actions/entity-list.actions';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWxpc3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9yZWR1Y2Vycy9lbnRpdHktbGlzdC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBd0IscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7SUFHdkYsYUFBYSxHQUFHLElBQUksV0FBVyxFQUFFOzs7Ozs7QUFFdkMsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEtBQWtDLEVBQUUsQ0FBUztJQUE3QyxzQkFBQSxFQUFBLHFCQUFrQzs7UUFFN0QsTUFBTSxHQUFHLG1CQUFBLENBQUMsRUFBd0I7SUFFeEMsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBR25COzs4REFFc0Q7UUFDdEQsS0FBSyxxQkFBcUIsQ0FBQyxPQUFPO1lBQ2hDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDWCxNQUFNO0tBRVQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgSW5mb3JtYXRpb24gfSBmcm9tICcuLi9tb2RlbHMvZW50aXR5LWxpc3QubW9kZWxzJztcbmltcG9ydCB7IEluZm9ybWF0aW9uQVBJQWN0aW9uLCBJbmZvcm1hdGlvbkFQSUFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2VudGl0eS1saXN0LmFjdGlvbnMnO1xuXG5cbmNvbnN0IElOSVRJQUxfU1RBVEUgPSBuZXcgSW5mb3JtYXRpb24oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluZm9ybWF0aW9uUmVkdWNlcihzdGF0ZTogSW5mb3JtYXRpb24gPSBJTklUSUFMX1NUQVRFLCBhOiBBY3Rpb24pOiBJbmZvcm1hdGlvbiB7XG5cbiAgY29uc3QgYWN0aW9uID0gYSBhcyBJbmZvcm1hdGlvbkFQSUFjdGlvbjtcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG5cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogUmVkdWNlcnMgY2FsbGVkIG9uIGRlc3Ryb3kgb2YgY29tcG9uZW50XG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY2FzZSBJbmZvcm1hdGlvbkFQSUFjdGlvbnMuREVTVFJPWTpcbiAgICAgIHN0YXRlID0ge307XG4gICAgICBicmVhaztcblxuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufTtcblxuIl19