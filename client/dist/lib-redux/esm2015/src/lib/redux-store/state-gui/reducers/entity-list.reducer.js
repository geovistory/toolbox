/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/entity-list.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InformationAPIActions } from '../actions';
import { Information } from '../models';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWxpc3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9yZWR1Y2Vycy9lbnRpdHktbGlzdC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUF3QixxQkFBcUIsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sV0FBVyxDQUFDOztNQUVsQyxhQUFhLEdBQUcsSUFBSSxXQUFXLEVBQUU7Ozs7OztBQUV2QyxNQUFNLFVBQVUsa0JBQWtCLENBQUMsUUFBcUIsYUFBYSxFQUFFLENBQVM7O1VBRXhFLE1BQU0sR0FBRyxtQkFBQSxDQUFDLEVBQXdCO0lBRXhDLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUduQjs7OERBRXNEO1FBQ3RELEtBQUsscUJBQXFCLENBQUMsT0FBTztZQUNoQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ1gsTUFBTTtLQUVUO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IEluZm9ybWF0aW9uQVBJQWN0aW9uLCBJbmZvcm1hdGlvbkFQSUFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IEluZm9ybWF0aW9uIH0gZnJvbSAnLi4vbW9kZWxzJztcblxuY29uc3QgSU5JVElBTF9TVEFURSA9IG5ldyBJbmZvcm1hdGlvbigpO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5mb3JtYXRpb25SZWR1Y2VyKHN0YXRlOiBJbmZvcm1hdGlvbiA9IElOSVRJQUxfU1RBVEUsIGE6IEFjdGlvbik6IEluZm9ybWF0aW9uIHtcblxuICBjb25zdCBhY3Rpb24gPSBhIGFzIEluZm9ybWF0aW9uQVBJQWN0aW9uO1xuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBSZWR1Y2VycyBjYWxsZWQgb24gZGVzdHJveSBvZiBjb21wb25lbnRcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBjYXNlIEluZm9ybWF0aW9uQVBJQWN0aW9ucy5ERVNUUk9ZOlxuICAgICAgc3RhdGUgPSB7fTtcbiAgICAgIGJyZWFrO1xuXG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59O1xuXG4iXX0=