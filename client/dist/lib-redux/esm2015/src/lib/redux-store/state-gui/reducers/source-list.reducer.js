/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/source-list.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { SourceListAPIActions } from '../actions';
import { SourceList } from '../models';
/** @type {?} */
const INITIAL_STATE = new SourceList();
/**
 * @param {?=} state
 * @param {?=} a
 * @return {?}
 */
export function sourceListReducer(state = INITIAL_STATE, a) {
    /** @type {?} */
    const action = (/** @type {?} */ (a));
    switch (action.type) {
        case SourceListAPIActions.INITIALIZE_LIST:
            state = Object.assign({}, state, { list: {
                    pkAllowedClasses: action.meta.pkAllowedClasses
                } });
            break;
        /*****************************************************
        * Reducers called on destroy of component
        *****************************************************/
        case SourceListAPIActions.DESTROY:
            state = {};
            break;
    }
    return state;
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLWxpc3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9yZWR1Y2Vycy9zb3VyY2UtbGlzdC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUF1QixvQkFBb0IsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDOztNQUVqQyxhQUFhLEdBQUcsSUFBSSxVQUFVLEVBQUU7Ozs7OztBQUV0QyxNQUFNLFVBQVUsaUJBQWlCLENBQUMsUUFBb0IsYUFBYSxFQUFFLENBQVM7O1VBRXRFLE1BQU0sR0FBRyxtQkFBQSxDQUFDLEVBQXVCO0lBRXZDLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUVuQixLQUFLLG9CQUFvQixDQUFDLGVBQWU7WUFDdkMsS0FBSyxxQkFDQSxLQUFLLElBQ1IsSUFBSSxFQUFFO29CQUNKLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCO2lCQUMvQyxHQUNGLENBQUE7WUFDRCxNQUFNO1FBR1I7OzhEQUVzRDtRQUN0RCxLQUFLLG9CQUFvQixDQUFDLE9BQU87WUFDL0IsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNYLE1BQU07S0FFVDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBTb3VyY2VMaXN0QVBJQWN0aW9uLCBTb3VyY2VMaXN0QVBJQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgU291cmNlTGlzdCB9IGZyb20gJy4uL21vZGVscyc7XG5cbmNvbnN0IElOSVRJQUxfU1RBVEUgPSBuZXcgU291cmNlTGlzdCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gc291cmNlTGlzdFJlZHVjZXIoc3RhdGU6IFNvdXJjZUxpc3QgPSBJTklUSUFMX1NUQVRFLCBhOiBBY3Rpb24pOiBTb3VyY2VMaXN0IHtcblxuICBjb25zdCBhY3Rpb24gPSBhIGFzIFNvdXJjZUxpc3RBUElBY3Rpb247XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuXG4gICAgY2FzZSBTb3VyY2VMaXN0QVBJQWN0aW9ucy5JTklUSUFMSVpFX0xJU1Q6XG4gICAgICBzdGF0ZSA9IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGxpc3Q6IHtcbiAgICAgICAgICBwa0FsbG93ZWRDbGFzc2VzOiBhY3Rpb24ubWV0YS5wa0FsbG93ZWRDbGFzc2VzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFJlZHVjZXJzIGNhbGxlZCBvbiBkZXN0cm95IG9mIGNvbXBvbmVudFxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGNhc2UgU291cmNlTGlzdEFQSUFjdGlvbnMuREVTVFJPWTpcbiAgICAgIHN0YXRlID0ge307XG4gICAgICBicmVhaztcblxuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufTtcblxuIl19