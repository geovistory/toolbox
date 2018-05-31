
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { createAccountReducer } from 'app/modules/account/api/reducers';
import { createProjectsReducer } from '../../modules/projects/api/projects.reducers';
import { createInformationReducer } from '../../modules/information/api/information.reducers';
import { createActiveProjectReducer } from '../active-project/active-project.reducer';
import { combineReducers, Reducer } from 'redux';
import { sourceListReducer } from '../../modules/sources/containers/source-list/source-list.reducer';


export const rootReducer = composeReducers(
    defaultFormReducer(),
    combineReducers({
      account: createAccountReducer(),
      projects: createProjectsReducer(),
      activeProject: createActiveProjectReducer(),
      routes: routerReducer,
      information: createInformationReducer(),
      sources: sourceListReducer
    })
  )