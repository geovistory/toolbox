import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { createAccountReducer } from 'app/modules/account/api/reducers';
import { combineReducers } from 'redux';

import { informationReducer } from '../../modules/information2/information.reducer';
import { createProjectsReducer } from '../../modules/projects/api/projects.reducers';
import { sourceListReducer } from '../../modules/sources/containers/source-list/source-list.reducer';
import { createActiveProjectReducer } from '../active-project/active-project.reducer';
import { adminReducer } from '../../modules/admin/admin.reducer';
import { loadingBarReducer } from '../loading-bar/api/loading-bar.reducer';



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
      sources: sourceListReducer
    })
  )