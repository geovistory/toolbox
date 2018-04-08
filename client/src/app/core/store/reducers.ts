import {
  combineReducers,
} from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { createAccountReducer } from 'app/modules/account/api/reducers';
import { createProjectsReducer } from '../../modules/projects/api/projects.reducers';
import { createInformationReducer } from '../../modules/information/api/information.reducers';


// Define the global store shape by combining our application's
// reducers together into a given structure.
export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    account: createAccountReducer(),
    projects: createProjectsReducer(),
    information: createInformationReducer(),
    routes: routerReducer
  })

);

