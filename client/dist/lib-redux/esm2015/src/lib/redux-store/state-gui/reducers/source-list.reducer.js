/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/reducers/source-list.reducer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { SourceListAPIActions } from '../actions/source-list.actions';
import { SourceList } from '../models/source-list.models';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlLWxpc3QucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9yZWR1Y2Vycy9zb3VyY2UtbGlzdC5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUF1QixvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7TUFFcEQsYUFBYSxHQUFHLElBQUksVUFBVSxFQUFFOzs7Ozs7QUFFdEMsTUFBTSxVQUFVLGlCQUFpQixDQUFDLFFBQW9CLGFBQWEsRUFBRSxDQUFTOztVQUV0RSxNQUFNLEdBQUcsbUJBQUEsQ0FBQyxFQUF1QjtJQUV2QyxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFFbkIsS0FBSyxvQkFBb0IsQ0FBQyxlQUFlO1lBQ3ZDLEtBQUsscUJBQ0EsS0FBSyxJQUNSLElBQUksRUFBRTtvQkFDSixnQkFBZ0IsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQjtpQkFDL0MsR0FDRixDQUFBO1lBQ0QsTUFBTTtRQUdSOzs4REFFc0Q7UUFDdEQsS0FBSyxvQkFBb0IsQ0FBQyxPQUFPO1lBQy9CLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDWCxNQUFNO0tBRVQ7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFBQSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgU291cmNlTGlzdEFQSUFjdGlvbiwgU291cmNlTGlzdEFQSUFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3NvdXJjZS1saXN0LmFjdGlvbnMnO1xuaW1wb3J0IHsgU291cmNlTGlzdCB9IGZyb20gJy4uL21vZGVscy9zb3VyY2UtbGlzdC5tb2RlbHMnO1xuXG5jb25zdCBJTklUSUFMX1NUQVRFID0gbmV3IFNvdXJjZUxpc3QoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNvdXJjZUxpc3RSZWR1Y2VyKHN0YXRlOiBTb3VyY2VMaXN0ID0gSU5JVElBTF9TVEFURSwgYTogQWN0aW9uKTogU291cmNlTGlzdCB7XG5cbiAgY29uc3QgYWN0aW9uID0gYSBhcyBTb3VyY2VMaXN0QVBJQWN0aW9uO1xuXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgIGNhc2UgU291cmNlTGlzdEFQSUFjdGlvbnMuSU5JVElBTElaRV9MSVNUOlxuICAgICAgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBsaXN0OiB7XG4gICAgICAgICAgcGtBbGxvd2VkQ2xhc3NlczogYWN0aW9uLm1ldGEucGtBbGxvd2VkQ2xhc3Nlc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcblxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBSZWR1Y2VycyBjYWxsZWQgb24gZGVzdHJveSBvZiBjb21wb25lbnRcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBjYXNlIFNvdXJjZUxpc3RBUElBY3Rpb25zLkRFU1RST1k6XG4gICAgICBzdGF0ZSA9IHt9O1xuICAgICAgYnJlYWs7XG5cbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn07XG5cbiJdfQ==