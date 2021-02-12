/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/entity-list.reducer.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWxpc3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL3JlZHVjZXJzL2VudGl0eS1saXN0LnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQXdCLHFCQUFxQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7O01BRWxDLGFBQWEsR0FBRyxJQUFJLFdBQVcsRUFBRTs7Ozs7O0FBRXZDLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxRQUFxQixhQUFhLEVBQUUsQ0FBUzs7VUFFeEUsTUFBTSxHQUFHLG1CQUFBLENBQUMsRUFBd0I7SUFFeEMsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBR25COzs4REFFc0Q7UUFDdEQsS0FBSyxxQkFBcUIsQ0FBQyxPQUFPO1lBQ2hDLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDWCxNQUFNO0tBRVQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgSW5mb3JtYXRpb25BUElBY3Rpb24sIEluZm9ybWF0aW9uQVBJQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgSW5mb3JtYXRpb24gfSBmcm9tICcuLi9tb2RlbHMnO1xuXG5jb25zdCBJTklUSUFMX1NUQVRFID0gbmV3IEluZm9ybWF0aW9uKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbmZvcm1hdGlvblJlZHVjZXIoc3RhdGU6IEluZm9ybWF0aW9uID0gSU5JVElBTF9TVEFURSwgYTogQWN0aW9uKTogSW5mb3JtYXRpb24ge1xuXG4gIGNvbnN0IGFjdGlvbiA9IGEgYXMgSW5mb3JtYXRpb25BUElBY3Rpb247XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuXG5cbiAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFJlZHVjZXJzIGNhbGxlZCBvbiBkZXN0cm95IG9mIGNvbXBvbmVudFxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIGNhc2UgSW5mb3JtYXRpb25BUElBY3Rpb25zLkRFU1RST1k6XG4gICAgICBzdGF0ZSA9IHt9O1xuICAgICAgYnJlYWs7XG5cbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn07XG5cbiJdfQ==