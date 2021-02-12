import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { FluxStandardAction } from 'flux-standard-action';
import { omit } from 'ramda';
import { combineReducers } from 'redux';
import { accountRootReducer, activeProjectReducer, createProjectsReducer, informationReducer, loadingBarReducer, sourceListReducer } from '../state-gui/reducers';
import { createDatReducer, createDfhReducer, createInfReducer, createProReducer, createSysReducer, createTabReducer, createWarReducer } from '../state-schema/reducers';


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
  defaultFormReducer(),
  combineReducers({
    account: accountRootReducer,
    loadingBar: loadingBarReducer,
    activeProject: activeProjectReducer,
    routes: routerReducer,
    information: informationReducer,
    sources: sourceListReducer,
    sandboxState: sandboxStateReducer,
    projects: createProjectsReducer(),
    sys: createSysReducer(),
    dfh: createDfhReducer(),
    inf: createInfReducer(),
    dat: createDatReducer(),
    pro: createProReducer(),
    war: createWarReducer(),
    tab: createTabReducer(),
    pending: pendingRequestReducer,
    resolved: composeReducers(resolvedRequestReducer, cleanupResolved),
  }),
  setAppState
)
