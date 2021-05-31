import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { FluxStandardAction } from 'flux-standard-action';
import { omit } from 'ramda';
import { combineReducers } from 'redux';
import { accountRootReducer } from '../state-gui/reducers/account.reducers';
import { activeProjectReducer } from '../state-gui/reducers/active-project.reducer';
import { informationReducer } from '../state-gui/reducers/entity-list.reducer';
import { loadingBarReducer } from '../state-gui/reducers/loading-bar.reducer';
import { createProjectsReducer } from '../state-gui/reducers/projects.reducers';
import { sourceListReducer } from '../state-gui/reducers/source-list.reducer';
import { createDatReducer } from '../state-schema/reducers/dat.reducer';
import { createDfhReducer } from '../state-schema/reducers/dfh.reducer';
import { createInfReducer } from '../state-schema/reducers/inf.reducer';
import { createProReducer } from '../state-schema/reducers/pro.reducer';
import { schemaModifierReducer } from '../state-schema/reducers/schema.reducer';
import { createSysReducer } from '../state-schema/reducers/sys.reducer';
import { createTabReducer } from '../state-schema/reducers/tab.reducer';
import { createWarReducer } from '../state-schema/reducers/war.reducer';


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
  schemaModifierReducer,
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
