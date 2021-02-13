/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/entity-list.reducer.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWxpc3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL3JlZHVjZXJzL2VudGl0eS1saXN0LnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0QsT0FBTyxFQUF3QixxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOztNQUd2RixhQUFhLEdBQUcsSUFBSSxXQUFXLEVBQUU7Ozs7OztBQUV2QyxNQUFNLFVBQVUsa0JBQWtCLENBQUMsUUFBcUIsYUFBYSxFQUFFLENBQVM7O1VBRXhFLE1BQU0sR0FBRyxtQkFBQSxDQUFDLEVBQXdCO0lBRXhDLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUduQjs7OERBRXNEO1FBQ3RELEtBQUsscUJBQXFCLENBQUMsT0FBTztZQUNoQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ1gsTUFBTTtLQUVUO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IEluZm9ybWF0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2VudGl0eS1saXN0Lm1vZGVscyc7XG5pbXBvcnQgeyBJbmZvcm1hdGlvbkFQSUFjdGlvbiwgSW5mb3JtYXRpb25BUElBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9lbnRpdHktbGlzdC5hY3Rpb25zJztcblxuXG5jb25zdCBJTklUSUFMX1NUQVRFID0gbmV3IEluZm9ybWF0aW9uKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmZvcm1hdGlvblJlZHVjZXIoc3RhdGU6IEluZm9ybWF0aW9uID0gSU5JVElBTF9TVEFURSwgYTogQWN0aW9uKTogSW5mb3JtYXRpb24ge1xuXG4gIGNvbnN0IGFjdGlvbiA9IGEgYXMgSW5mb3JtYXRpb25BUElBY3Rpb247XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFJlZHVjZXJzIGNhbGxlZCBvbiBkZXN0cm95IG9mIGNvbXBvbmVudFxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGNhc2UgSW5mb3JtYXRpb25BUElBY3Rpb25zLkRFU1RST1k6XG4gICAgICBzdGF0ZSA9IHt9O1xuICAgICAgYnJlYWs7XG5cbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn07XG5cbiJdfQ==