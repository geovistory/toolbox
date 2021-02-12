/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/entity-list.reducer.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWxpc3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL3JlZHVjZXJzL2VudGl0eS1saXN0LnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQXdCLHFCQUFxQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7O0lBRWxDLGFBQWEsR0FBRyxJQUFJLFdBQVcsRUFBRTs7Ozs7O0FBRXZDLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxLQUFrQyxFQUFFLENBQVM7SUFBN0Msc0JBQUEsRUFBQSxxQkFBa0M7O1FBRTdELE1BQU0sR0FBRyxtQkFBQSxDQUFDLEVBQXdCO0lBRXhDLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUduQjs7OERBRXNEO1FBQ3RELEtBQUsscUJBQXFCLENBQUMsT0FBTztZQUNoQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ1gsTUFBTTtLQUVUO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IEluZm9ybWF0aW9uQVBJQWN0aW9uLCBJbmZvcm1hdGlvbkFQSUFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IEluZm9ybWF0aW9uIH0gZnJvbSAnLi4vbW9kZWxzJztcblxuY29uc3QgSU5JVElBTF9TVEFURSA9IG5ldyBJbmZvcm1hdGlvbigpO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5mb3JtYXRpb25SZWR1Y2VyKHN0YXRlOiBJbmZvcm1hdGlvbiA9IElOSVRJQUxfU1RBVEUsIGE6IEFjdGlvbik6IEluZm9ybWF0aW9uIHtcblxuICBjb25zdCBhY3Rpb24gPSBhIGFzIEluZm9ybWF0aW9uQVBJQWN0aW9uO1xuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBSZWR1Y2VycyBjYWxsZWQgb24gZGVzdHJveSBvZiBjb21wb25lbnRcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBjYXNlIEluZm9ybWF0aW9uQVBJQWN0aW9ucy5ERVNUUk9ZOlxuICAgICAgc3RhdGUgPSB7fTtcbiAgICAgIGJyZWFrO1xuXG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59O1xuXG4iXX0=