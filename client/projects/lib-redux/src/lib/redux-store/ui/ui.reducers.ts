import { combineReducers } from '@ngrx/store'
import { loadingBarReducer } from './loadingbar/loading-bar.reducer'
import { accountRootReducer } from './reducers/account.reducers'
import { activeProjectReducer } from './reducers/active-project.reducer'

export const uiReducers = combineReducers({
  account: accountRootReducer,
  loadingBar: loadingBarReducer,
  activeProject: activeProjectReducer,
})
