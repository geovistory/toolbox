/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/reducers/account.reducers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { AccountActions } from '../../state-gui/actions/account.actions';
/** @type {?} */
var INITIAL_STATE = {
    account: undefined,
    roles: undefined
};
/** @type {?} */
export var accountRootReducer = (/**
 * @param {?=} lastState
 * @param {?=} action
 * @return {?}
 */
function (lastState, action) {
    if (lastState === void 0) { lastState = INITIAL_STATE; }
    switch (action.type) {
        case AccountActions.LOGIN_SUCCEEDED:
            lastState = tslib_1.__assign({}, lastState, { account: action.meta.account });
            break;
        case AccountActions.ACCOUNT_UPDATED:
            lastState = tslib_1.__assign({}, lastState, { account: action.meta.account });
            break;
        case AccountActions.LOAD_ROLES_SUCCEEDED:
            lastState = tslib_1.__assign({}, lastState, { roles: action.meta.accountRoles });
            break;
        case AccountActions.LOAD_ROLES_FAILED:
            lastState = tslib_1.__assign({}, lastState, { roles: [] });
            break;
    }
    return lastState;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5yZWR1Y2Vycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL3JlZHVjZXJzL2FjY291bnQucmVkdWNlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBaUIsTUFBTSx5Q0FBeUMsQ0FBQzs7SUFJbEYsYUFBYSxHQUFhO0lBQzlCLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLEtBQUssRUFBRSxTQUFTO0NBQ2pCOztBQUVELE1BQU0sS0FBTyxrQkFBa0I7Ozs7O0FBQUcsVUFBQyxTQUFtQyxFQUFFLE1BQXFCO0lBQTFELDBCQUFBLEVBQUEseUJBQW1DO0lBQ3BFLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLGNBQWMsQ0FBQyxlQUFlO1lBQ2pDLFNBQVMsd0JBQ0osU0FBUyxJQUNaLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FDN0IsQ0FBQztZQUNGLE1BQU07UUFHUixLQUFLLGNBQWMsQ0FBQyxlQUFlO1lBQ2pDLFNBQVMsd0JBQ0osU0FBUyxJQUNaLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FDN0IsQ0FBQztZQUNGLE1BQU07UUFFUixLQUFLLGNBQWMsQ0FBQyxvQkFBb0I7WUFDdEMsU0FBUyx3QkFDSixTQUFTLElBQ1osS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUNoQyxDQUFDO1lBQ0YsTUFBTTtRQUVSLEtBQUssY0FBYyxDQUFDLGlCQUFpQjtZQUNuQyxTQUFTLHdCQUNKLFNBQVMsSUFDWixLQUFLLEVBQUUsRUFBRSxHQUNWLENBQUM7WUFDRixNQUFNO0tBSVQ7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY2NvdW50QWN0aW9ucywgQWNjb3VudEFjdGlvbiB9IGZyb20gJy4uLy4uL3N0YXRlLWd1aS9hY3Rpb25zL2FjY291bnQuYWN0aW9ucyc7XG5pbXBvcnQgeyBJQWNjb3VudCB9IGZyb20gJy4uL21vZGVscy9hY2NvdW50Lm1vZGVsJztcblxuXG5jb25zdCBJTklUSUFMX1NUQVRFOiBJQWNjb3VudCA9IHtcbiAgYWNjb3VudDogdW5kZWZpbmVkLFxuICByb2xlczogdW5kZWZpbmVkXG59O1xuXG5leHBvcnQgY29uc3QgYWNjb3VudFJvb3RSZWR1Y2VyID0gKGxhc3RTdGF0ZTogSUFjY291bnQgPSBJTklUSUFMX1NUQVRFLCBhY3Rpb246IEFjY291bnRBY3Rpb24pOiBJQWNjb3VudCA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEFjY291bnRBY3Rpb25zLkxPR0lOX1NVQ0NFRURFRDpcbiAgICAgIGxhc3RTdGF0ZSA9IHtcbiAgICAgICAgLi4ubGFzdFN0YXRlLFxuICAgICAgICBhY2NvdW50OiBhY3Rpb24ubWV0YS5hY2NvdW50XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cblxuICAgIGNhc2UgQWNjb3VudEFjdGlvbnMuQUNDT1VOVF9VUERBVEVEOlxuICAgICAgbGFzdFN0YXRlID0ge1xuICAgICAgICAuLi5sYXN0U3RhdGUsXG4gICAgICAgIGFjY291bnQ6IGFjdGlvbi5tZXRhLmFjY291bnRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgQWNjb3VudEFjdGlvbnMuTE9BRF9ST0xFU19TVUNDRUVERUQ6XG4gICAgICBsYXN0U3RhdGUgPSB7XG4gICAgICAgIC4uLmxhc3RTdGF0ZSxcbiAgICAgICAgcm9sZXM6IGFjdGlvbi5tZXRhLmFjY291bnRSb2xlc1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBBY2NvdW50QWN0aW9ucy5MT0FEX1JPTEVTX0ZBSUxFRDpcbiAgICAgIGxhc3RTdGF0ZSA9IHtcbiAgICAgICAgLi4ubGFzdFN0YXRlLFxuICAgICAgICByb2xlczogW11cbiAgICAgIH07XG4gICAgICBicmVhaztcblxuXG5cbiAgfVxuICByZXR1cm4gbGFzdFN0YXRlO1xufVxuXG4iXX0=