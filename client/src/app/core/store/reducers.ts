import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { createAccountReducer } from 'app/modules/account/api/account.reducers';
import { informationReducer } from 'app/modules/information/containers/information/api/information.reducer';
import { sourceListReducer } from 'app/modules/sources/containers/source-list/api/source-list.reducer';
import { FluxStandardAction } from 'flux-standard-action';
import { combineReducers } from 'redux';
import { backofficeReducer } from '../../modules/backoffice/backoffice.reducer';
import { createProjectsReducer } from '../../modules/projects/api/projects.reducers';
import { createActiveProjectReducer } from '../active-project/active-project.reducer';
import { loadingBarReducer } from '../loading-bar/api/loading-bar.reducer';
import { queryListReducer } from 'app/modules/queries/containers/query-list/api/query-list.reducer';


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

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    account: createAccountReducer(),
    backoffice: backofficeReducer,
    loadingBar: loadingBarReducer,
    projects: createProjectsReducer(),
    activeProject: createActiveProjectReducer(),
    routes: routerReducer,
    information: informationReducer,
    sources: sourceListReducer,
    queries: queryListReducer,
    sandboxState: sandboxStateReducer
  })
)
