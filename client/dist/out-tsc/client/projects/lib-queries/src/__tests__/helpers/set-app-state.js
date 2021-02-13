import { SET_APP_STATE } from '@kleiolab/lib-redux';
export function setAppState(ngRedux, state) {
    ngRedux.dispatch({
        type: SET_APP_STATE,
        payload: state
    });
}
//# sourceMappingURL=set-app-state.js.map