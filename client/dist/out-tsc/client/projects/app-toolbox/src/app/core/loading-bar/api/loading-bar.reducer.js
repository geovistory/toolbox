import { LoadingBarActions } from './loading-bar.actions';
const INITIAL_STATE = {
    loading: false,
    progress: 0,
};
export function loadingBarReducer(state = INITIAL_STATE, a) {
    const action = a;
    switch (action.type) {
        case LoadingBarActions.START:
            return Object.assign({}, state, { loading: true });
        case LoadingBarActions.STOP:
            return Object.assign({}, state, { loading: false });
        case LoadingBarActions.COPMLETE:
            return Object.assign({}, state, { loading: false });
    }
    return state;
}
;
//# sourceMappingURL=loading-bar.reducer.js.map