import { combineReducers } from '@ngrx/store'
import { accountReducer } from './account/account.reducers'
import { activeProjectReducer } from './active-project/active-project.reducer'
import { loadingBarReducer } from './loading-bar/loading-bar.reducer'

export const uiReducers = combineReducers({
  account: accountReducer,
  loadingBar: loadingBarReducer,
  activeProject: activeProjectReducer,
})
