import { NgRedux } from '@angular-redux/store';
import { IAppState, SET_APP_STATE } from '@kleiolab/lib-redux';

export function setAppState(ngRedux: NgRedux<IAppState>, state: IAppState) {
  ngRedux.dispatch({
    type: SET_APP_STATE,
    payload: state
  })
}
