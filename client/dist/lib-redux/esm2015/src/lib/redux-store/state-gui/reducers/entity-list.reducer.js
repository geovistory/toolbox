/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/entity-list.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Information } from '../models/entity-list.models';
import { InformationAPIActions } from '../actions/entity-list.actions';
/** @type {?} */
const INITIAL_STATE = new Information();
/**
 * @param {?=} state
 * @param {?=} a
 * @return {?}
 */
export function informationReducer(state = INITIAL_STATE, a) {
    /** @type {?} */
    const action = (/** @type {?} */ (a));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWxpc3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9yZWR1Y2Vycy9lbnRpdHktbGlzdC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBd0IscUJBQXFCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7TUFHdkYsYUFBYSxHQUFHLElBQUksV0FBVyxFQUFFOzs7Ozs7QUFFdkMsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFFBQXFCLGFBQWEsRUFBRSxDQUFTOztVQUV4RSxNQUFNLEdBQUcsbUJBQUEsQ0FBQyxFQUF3QjtJQUV4QyxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFHbkI7OzhEQUVzRDtRQUN0RCxLQUFLLHFCQUFxQixDQUFDLE9BQU87WUFDaEMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNYLE1BQU07S0FFVDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbiB9IGZyb20gJy4uL21vZGVscy9lbnRpdHktbGlzdC5tb2RlbHMnO1xuaW1wb3J0IHsgSW5mb3JtYXRpb25BUElBY3Rpb24sIEluZm9ybWF0aW9uQVBJQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvZW50aXR5LWxpc3QuYWN0aW9ucyc7XG5cblxuY29uc3QgSU5JVElBTF9TVEFURSA9IG5ldyBJbmZvcm1hdGlvbigpO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5mb3JtYXRpb25SZWR1Y2VyKHN0YXRlOiBJbmZvcm1hdGlvbiA9IElOSVRJQUxfU1RBVEUsIGE6IEFjdGlvbik6IEluZm9ybWF0aW9uIHtcblxuICBjb25zdCBhY3Rpb24gPSBhIGFzIEluZm9ybWF0aW9uQVBJQWN0aW9uO1xuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBSZWR1Y2VycyBjYWxsZWQgb24gZGVzdHJveSBvZiBjb21wb25lbnRcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBjYXNlIEluZm9ybWF0aW9uQVBJQWN0aW9ucy5ERVNUUk9ZOlxuICAgICAgc3RhdGUgPSB7fTtcbiAgICAgIGJyZWFrO1xuXG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59O1xuXG4iXX0=