import { NgRedux } from '@angular-redux/store';
import { SET_APP_STATE } from 'app/core/redux-store/reducers';
import { IAppState } from 'app/core/redux-store/model';

export function setAppState(ngRedux: NgRedux<IAppState>, state: IAppState) {
  ngRedux.dispatch({
    type: SET_APP_STATE,
    payload: state
  })
}
