import { AccountActions } from './account.actions';
const INITIAL_STATE = {
    account: undefined,
    roles: undefined
};
const accountRootReducer = (lastState = INITIAL_STATE, action) => {
    switch (action.type) {
        case AccountActions.LOGIN_SUCCEEDED:
            lastState = Object.assign({}, lastState, { account: action.meta.account });
            break;
        case AccountActions.ACCOUNT_UPDATED:
            lastState = Object.assign({}, lastState, { account: action.meta.account });
            break;
        case AccountActions.LOAD_ROLES_SUCCEEDED:
            lastState = Object.assign({}, lastState, { roles: action.meta.accountRoles });
            break;
        case AccountActions.LOAD_ROLES_FAILED:
            lastState = Object.assign({}, lastState, { roles: [] });
            break;
    }
    return lastState;
};
export const createAccountReducer = () => {
    return accountRootReducer;
};
//# sourceMappingURL=account.reducers.js.map