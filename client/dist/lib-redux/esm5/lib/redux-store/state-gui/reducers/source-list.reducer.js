/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/source-list.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { SourceListAPIActions } from '../actions';
import { SourceList } from '../models';
/** @type {?} */
var INITIAL_STATE = new SourceList();
/**
 * @param {?=} state
 * @param {?=} a
 * @return {?}
 */
export function sourceListReducer(state, a) {
    if (state === void 0) { state = INITIAL_STATE; }
    /** @type {?} */
    var action = (/** @type {?} */ (a));
    switch (action.type) {
        case SourceListAPIActions.INITIALIZE_LIST:
            state = tslib_1.__assign({}, state, { list: {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLWxpc3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL3JlZHVjZXJzL3NvdXJjZS1saXN0LnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUF1QixvQkFBb0IsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDOztJQUVqQyxhQUFhLEdBQUcsSUFBSSxVQUFVLEVBQUU7Ozs7OztBQUV0QyxNQUFNLFVBQVUsaUJBQWlCLENBQUMsS0FBaUMsRUFBRSxDQUFTO0lBQTVDLHNCQUFBLEVBQUEscUJBQWlDOztRQUUzRCxNQUFNLEdBQUcsbUJBQUEsQ0FBQyxFQUF1QjtJQUV2QyxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFFbkIsS0FBSyxvQkFBb0IsQ0FBQyxlQUFlO1lBQ3ZDLEtBQUssd0JBQ0EsS0FBSyxJQUNSLElBQUksRUFBRTtvQkFDSixnQkFBZ0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQjtpQkFDL0MsR0FDRixDQUFBO1lBQ0QsTUFBTTtRQUdSOzs4REFFc0Q7UUFDdEQsS0FBSyxvQkFBb0IsQ0FBQyxPQUFPO1lBQy9CLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDWCxNQUFNO0tBRVQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgU291cmNlTGlzdEFQSUFjdGlvbiwgU291cmNlTGlzdEFQSUFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IFNvdXJjZUxpc3QgfSBmcm9tICcuLi9tb2RlbHMnO1xuXG5jb25zdCBJTklUSUFMX1NUQVRFID0gbmV3IFNvdXJjZUxpc3QoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNvdXJjZUxpc3RSZWR1Y2VyKHN0YXRlOiBTb3VyY2VMaXN0ID0gSU5JVElBTF9TVEFURSwgYTogQWN0aW9uKTogU291cmNlTGlzdCB7XG5cbiAgY29uc3QgYWN0aW9uID0gYSBhcyBTb3VyY2VMaXN0QVBJQWN0aW9uO1xuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgIGNhc2UgU291cmNlTGlzdEFQSUFjdGlvbnMuSU5JVElBTElaRV9MSVNUOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsaXN0OiB7XG4gICAgICAgICAgcGtBbGxvd2VkQ2xhc3NlczogYWN0aW9uLm1ldGEucGtBbGxvd2VkQ2xhc3Nlc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBSZWR1Y2VycyBjYWxsZWQgb24gZGVzdHJveSBvZiBjb21wb25lbnRcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBjYXNlIFNvdXJjZUxpc3RBUElBY3Rpb25zLkRFU1RST1k6XG4gICAgICBzdGF0ZSA9IHt9O1xuICAgICAgYnJlYWs7XG5cbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn07XG5cbiJdfQ==