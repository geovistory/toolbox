
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { createAccountReducer } from 'app/modules/account/api/reducers';
import { createProjectsReducer } from '../../modules/projects/api/projects.reducers';
import { createInformationReducer } from '../../modules/information/api/information.reducers';
import { createActiveProjectReducer } from '../active-project/active-project.reducer';
import { combineReducers, Reducer } from 'redux';


// Define the global store shape by combining our application's
// reducers together into a given structure.
// export function createRootReducer(asyncReducers = {}): Reducer<any> {
//   return composeReducers(
//     defaultFormReducer(),
//     combineReducers(Object.assign({
//       account: createAccountReducer(),
//       projects: createProjectsReducer(),
//       activeProject: createActiveProjectReducer(),
//       routes: routerReducer,
//       information: createInformationReducer()
//     }, asyncReducers))
//   )
// }

export const rootReducer = composeReducers(
    defaultFormReducer(),
    combineReducers({
      account: createAccountReducer(),
      projects: createProjectsReducer(),
      activeProject: createActiveProjectReducer(),
      routes: routerReducer,
      information: createInformationReducer()
    })
  )