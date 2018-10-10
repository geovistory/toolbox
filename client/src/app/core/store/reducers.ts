import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { createAccountReducer } from 'app/modules/account/api/reducers';
import { combineReducers } from 'redux';

import { createProjectsReducer } from '../../modules/projects/api/projects.reducers';
import { sourceListReducer } from '../../modules/sources/containers/source-list/source-list.reducer';
import { createActiveProjectReducer } from '../active-project/active-project.reducer';
import { adminReducer } from '../../modules/admin/admin.reducer';
import { loadingBarReducer } from '../loading-bar/api/loading-bar.reducer';
import { informationReducer } from 'app/modules/information/containers/information/api/information.reducer';
import { FluxStandardAction } from 'flux-standard-action';

export const INIT_SANDBOX_STATE = 'INIT_SANDBOX_STATE';
export const sandboxStateReducer = (lastState = {}, action: FluxStandardAction<any>) => {
  if (action.type === INIT_SANDBOX_STATE) {
    lastState = action.payload;
  }
  return lastState;
};

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    account: createAccountReducer(),
    admin: adminReducer,
    loadingBar: loadingBarReducer,
    projects: createProjectsReducer(),
    activeProject: createActiveProjectReducer(),
    routes: routerReducer,
    information: informationReducer,
    sources: sourceListReducer,
    sandboxState: sandboxStateReducer

  })
)
