import { NgRedux } from '@angular-redux/store';
import { SET_APP_STATE } from 'projects/app-toolbox/src/app/core/redux-store/root-reducer';
import { IAppState } from 'projects/app-toolbox/src/app/core/redux-store/model';

export function setAppState(ngRedux: NgRedux<IAppState>, state: IAppState) {
  ngRedux.dispatch({
    type: SET_APP_STATE,
    payload: state
  })
}
