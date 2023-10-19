import { FluxStandardAction } from 'flux-standard-action';
import { omit } from 'ramda';
import { combineReducers } from 'redux';
import { dataReducer } from './data/data.reducer';
import { uiReducers } from './ui/ui.reducers';
import { composeReducers } from './_lib/composeReducers';


export const INIT_SANDBOX_STATE = 'INIT_SANDBOX_STATE';
export const sandboxStateReducer = (lastState = {}, action: FluxStandardAction<any>) => {
  if (action.type === INIT_SANDBOX_STATE) {
    lastState = {
      ...lastState,
      ...action.payload
    };
  }
  return lastState;
};


export const pendingRequestReducer = (state = {}, action) => {

  if (action && action.meta && action.meta.addPending) {
    const uuid = action.meta.addPending;
    state = {
      ...state,
      [uuid]: true
    }
    // console.log('add ' + uuid + ' ' + Date.now())
  }

  if (action && action.meta && action.meta.removePending) {
    const uuid = action.meta.removePending;
    state = {
      ...omit([uuid], state)
    }
  }
  return state;
}


export const resolvedRequestReducer = (state = {}, action) => {

  if (action && action.meta && action.meta.removePending) {
    const uuid = action.meta.removePending;
    state = {
      ...state,
      [uuid]: action.meta
    }
  }
  return state;
}

export const cleanupResolved = (state = {}, action) => {

  if (action && action.type === 'CLEAN_UP_RESOLVED') {
    const uuid = action.meta.uuid;
    state = {
      ...omit([uuid], state)
    }
    // console.log('resolve ' + uuid + ' ' + Date.now().toString())
  }
  return state;
}
export const SET_APP_STATE = 'SET_APP_STATE';
export const setAppState = (state = {}, action) => {
  if (action && action.type === SET_APP_STATE) {
    state = action.payload
  }
  return state;
}

export const rootReducer = composeReducers(
  combineReducers({
    data: dataReducer,
    ui: uiReducers
  }),
  combineReducers({
    sandboxState: sandboxStateReducer,
    pending: pendingRequestReducer,
    resolved: composeReducers(resolvedRequestReducer, cleanupResolved),
  }),
  setAppState
)
